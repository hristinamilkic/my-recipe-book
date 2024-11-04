package controllers

import (
	"net/http"
	"recipe-book/models"   // Zameniti sa imenom tvog modula
	"recipe-book/services" // Zameniti sa imenom tvog modula
	"strconv"

	"github.com/gin-gonic/gin"
)

// Kreiranje novog recepta
func CreateRecipe(c *gin.Context) {
    var recipe models.Recipe
    if err := c.ShouldBindJSON(&recipe); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := services.CreateRecipe(&recipe); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create recipe"})
        return
    }

    c.JSON(http.StatusOK, recipe)
}

// Dohvatanje svih recepata
func GetRecipes(c *gin.Context) {
    recipes, err := services.GetAllRecipes()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recipes"})
        return
    }

    c.JSON(http.StatusOK, recipes)
}

// Dohvatanje recepta po ID-ju
func GetRecipeByID(c *gin.Context) {
    id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
    recipe, err := services.GetRecipeByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Recipe not found"})
        return
    }

    c.JSON(http.StatusOK, recipe)
}

// Ažuriranje recepta
func UpdateRecipe(c *gin.Context) {
    id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
    var recipe models.Recipe
    if err := c.ShouldBindJSON(&recipe); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := services.UpdateRecipe(id, &recipe); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update recipe"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Recipe updated successfully"})
}

// Brisanje recepta
func DeleteRecipe(c *gin.Context) {
    id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
    if err := services.DeleteRecipe(id); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete recipe"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Recipe deleted successfully"})
}

func TogglePrivacy(c *gin.Context) {
    id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
    isPrivate := c.Query("private") == "true"

    if err := services.TogglePrivacy(id, isPrivate); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to toggle privacy"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Recipe privacy toggled"})
}

func GetRecipeByToken(c *gin.Context) {
    token := c.Param("token")
    recipe, err := services.GetRecipeByToken(token)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Recipe not found"})
        return
    }

    c.JSON(http.StatusOK, recipe)
}
