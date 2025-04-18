package scraper

import (
	"strings"
	"time"

	"github.com/go-rod/rod"
)

type SearchRecord struct {
	Terms  string `json:"terms"`
	Volume string `json:"volume"`
	Growth string `json:"growth"`
}

const URL string = "https://trends.google.com/trending?geo=US&hours=168&sort=search-volume"

func Scrape() []SearchRecord {
	browser := rod.New().MustConnect()
	defer browser.MustClose()

	page := browser.MustPage(URL)

	// wait for load
	time.Sleep(5 * time.Second)

	records := []SearchRecord{}

	rows := page.MustElements("tr")
	for _, row := range rows[2:] { // skip first 2 header rows
		text := row.MustText()
		data := strings.Split(text, "\n")
		if len(data) >= 5 {
			records = append(
				records,
				SearchRecord{
					Terms:  data[1],
					Volume: data[2],
					Growth: data[4],
				})
		}
	}

	return records
}
