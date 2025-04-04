package weekly_trends_handlers

import (
	"net/http"
	"scraper/pkg/scraper"

	"github.com/gin-gonic/gin"
)

func (handler WeeklyTrendsHandler) Get(c *gin.Context) {
	results := scraper.Scrape()

	c.JSON(http.StatusOK, results)
}
