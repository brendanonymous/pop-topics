package weekly_trends_handlers

import "scraper/pkg/trends"

type WeeklyTrendsHandler struct {
	trends *trends.Service
}

func NewWeeklyTrendsHandler(trendsService *trends.Service) WeeklyTrendsHandler {
	return WeeklyTrendsHandler{trends: trendsService}
}
