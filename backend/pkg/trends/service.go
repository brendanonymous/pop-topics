package trends

import (
	"errors"
	"log"
	"sync"
	"time"

	"scraper/pkg/scraper"
)

type Service struct {
	mu          sync.RWMutex
	data        []scraper.SearchRecord
	lastUpdated time.Time
	fetch       func() []scraper.SearchRecord
}

func NewService() *Service {
	return &Service{fetch: scraper.Scrape}
}

func (s *Service) Refresh() error {
	fetcher := s.fetch
	if fetcher == nil {
		fetcher = scraper.Scrape
	}

	records := fetcher()
	if len(records) == 0 {
		return errors.New("no trends records returned")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	s.data = records
	s.lastUpdated = time.Now()
	return nil
}

func (s *Service) Snapshot() []scraper.SearchRecord {
	s.mu.RLock()
	defer s.mu.RUnlock()

	out := make([]scraper.SearchRecord, len(s.data))
	copy(out, s.data)
	return out
}

func (s *Service) StartBackgroundRefresh(successInterval, retryInterval time.Duration) {
	go func() {
		for {
			if err := s.Refresh(); err != nil {
				log.Printf("weekly trends refresh failed: %v", err)
				time.Sleep(retryInterval)
				continue
			}
			time.Sleep(successInterval)
		}
	}()
}
