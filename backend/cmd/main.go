package main

import (
	weekly_trends_handlers "scraper/pkg/rest/handlers/weekly_trends"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := SetupRouter()

	r.Run(":3000")
}

func SetupRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(
		cors.New(cors.Config{
			AllowAllOrigins:  true,
			AllowMethods:     []string{"GET", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}),
	)
	weeklyTrendsHandler := weekly_trends_handlers.NewWeeklyTrendsHandler()

	router.GET("/weekly_trends", weeklyTrendsHandler.Get)

	return router
}
