package main

import (
	"log"
	"net/http"

	"recipe-book/config"
	"recipe-book/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Povezivanje na bazu podataka
	config.ConnectDatabase()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"}, 
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"}, 
	}))

	
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Server is running!"})
	})
	router.POST("/recipes", controllers.CreateRecipe)
	router.GET("/recipes", controllers.GetRecipes)
	router.GET("/recipes/:id", controllers.GetRecipeByID)
	router.PUT("/recipes/:id", controllers.UpdateRecipe)
	router.DELETE("/recipes/:id", controllers.DeleteRecipe)
	router.GET("/recipes/token/:token", controllers.GetRecipeByToken) // Ruta za dohvat recepta putem privacy_token-a
	router.PUT("/recipes/:id/privacy", controllers.TogglePrivacy)
	router.PUT("/recipes/:id/favorite", controllers.ToggleFavorite) 

	
	log.Fatal(router.Run(":8080"))
}
