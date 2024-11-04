package services

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"recipe-book/config"
	"recipe-book/models"
)

// Dodavanje novog recepta
func CreateRecipe(recipe *models.Recipe) error {
    token, err := generatePrivacyToken()
    if err != nil {
        return err
    }
    recipe.PrivacyToken = token

    query := "INSERT INTO recipes (title, ingredients, instructions, is_private, image_url, privacy_token) VALUES (?, ?, ?, ?, ?, ?)"
    result, err := config.DB.Exec(query, recipe.Title, recipe.Ingredients, recipe.Instructions, recipe.IsPrivate, recipe.ImageURL, recipe.PrivacyToken)
    if err != nil {
        return err
    }

    id, _ := result.LastInsertId()
    recipe.ID = id
    return nil
}

// Dohvatanje svih recepata
func GetAllRecipes() ([]models.Recipe, error) {
    rows, err := config.DB.Query("SELECT id, title, ingredients, instructions, is_private FROM recipes")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var recipes []models.Recipe
    for rows.Next() {
        var recipe models.Recipe
        if err := rows.Scan(&recipe.ID, &recipe.Title, &recipe.Ingredients, &recipe.Instructions, &recipe.IsPrivate); err != nil {
            return nil, err
        }
        recipes = append(recipes, recipe)
    }
    return recipes, nil
}

// Dohvatanje recepta po ID-ju
func GetRecipeByID(id int64) (*models.Recipe, error) {
    var recipe models.Recipe
    query := "SELECT id, title, ingredients, instructions, is_private FROM recipes WHERE id = ?"
    err := config.DB.QueryRow(query, id).Scan(&recipe.ID, &recipe.Title, &recipe.Ingredients, &recipe.Instructions, &recipe.IsPrivate)
    if err != nil {
        return nil, errors.New("recipe not found")
    }
    return &recipe, nil
}

// Ažuriranje recepta po ID-ju
func UpdateRecipe(id int64, updatedRecipe *models.Recipe) error {
    query := "UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, is_private = ? WHERE id = ?"
    _, err := config.DB.Exec(query, updatedRecipe.Title, updatedRecipe.Ingredients, updatedRecipe.Instructions, updatedRecipe.IsPrivate, id)
    return err
}

// Brisanje recepta po ID-ju
func DeleteRecipe(id int64) error {
    query := "DELETE FROM recipes WHERE id = ?"
    _, err := config.DB.Exec(query, id)
    return err
}

func generatePrivacyToken() (string, error) {
    bytes := make([]byte, 16)
    if _, err := rand.Read(bytes); err != nil {
        return "", err
    }
    return hex.EncodeToString(bytes), nil
}

func TogglePrivacy(id int64, isPrivate bool) error {
    query := "UPDATE recipes SET is_private = ? WHERE id = ?"
    _, err := config.DB.Exec(query, isPrivate, id)
    return err
}

func GetRecipeByToken(token string) (*models.Recipe, error) {
    var recipe models.Recipe
    query := "SELECT id, title, ingredients, instructions, is_private, image_url, is_favorite FROM recipes WHERE privacy_token = ?"
    err := config.DB.QueryRow(query, token).Scan(&recipe.ID, &recipe.Title, &recipe.Ingredients, &recipe.Instructions, &recipe.IsPrivate, &recipe.ImageURL, &recipe.IsFavorite)
    if err != nil {
        return nil, errors.New("recipe not found")
    }
    return &recipe, nil
}