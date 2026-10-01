package weekly_trends_handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (handler WeeklyTrendsHandler) Get(c *gin.Context) {
	if handler.trends == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "trends service unavailable"})
		return
	}

	results := handler.trends.Snapshot()
	if len(results) == 0 {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "weekly trends unavailable"})
		return
	}

	c.JSON(http.StatusOK, results)
}
