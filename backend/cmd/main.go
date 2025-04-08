package main

import (
	weekly_trends_handlers "scraper/pkg/rest/handlers/weekly_trends"

	"github.com/gin-gonic/gin"
)

func main() {
	r := SetupRouter()

	r.Run(":3000")
}

func SetupRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	weeklyTrendsHandler := weekly_trends_handlers.NewWeeklyTrendsHandler()

	router.GET("/api/weekly_trends", weeklyTrendsHandler.Get)

	return router
}
