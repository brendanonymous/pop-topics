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

	rows := page.MustElements(`tr[role="row"]`)
	for _, row := range rows {
		termElement, err := row.Element(`td:nth-child(2) .mZ3RIc`)
		if err != nil {
			continue
		}
		volumeElement, err := row.Element(`td:nth-child(3) .lqv0Cb`)
		if err != nil {
			// Google sometimes renders the count only in the volume cell's text.
			volumeElement, err = row.Element(`td:nth-child(3)`)
			if err != nil {
				continue
			}
		}
		growthElement, _ := row.Element(`td:nth-child(3) .TXt85b`)

		term, err := termElement.Text()
		if err != nil {
			continue
		}
		volume, err := volumeElement.Text()
		if err != nil {
			continue
		}
		volume = strings.TrimSpace(strings.Split(volume, "\n")[0])
		if volume == "" || strings.Contains(strings.ToLower(volume), "arrow") {
			continue
		}

		growth := ""
		if growthElement != nil {
			growth, _ = growthElement.Text()
		}

		records = append(records, SearchRecord{
			Terms:  strings.TrimSpace(term),
			Volume: strings.TrimSpace(volume),
			Growth: strings.TrimSpace(strings.TrimPrefix(growth, "arrow_upward")),
		})
	}
	return records
}
