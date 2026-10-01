package trends

import (
	"testing"

	"scraper/pkg/scraper"
)

func TestSnapshotReturnsCopy(t *testing.T) {
	svc := NewService()
	svc.mu.Lock()
	svc.data = []scraper.SearchRecord{{Terms: "alpha", Volume: "2M+", Growth: "100%"}}
	svc.mu.Unlock()

	got := svc.Snapshot()
	got[0].Terms = "beta"

	svc.mu.RLock()
	defer svc.mu.RUnlock()
	if svc.data[0].Terms != "alpha" {
		t.Fatalf("expected snapshot to be copied, got %q", svc.data[0].Terms)
	}
}

func TestRefreshUsesInjectedFetcher(t *testing.T) {
	svc := NewService()
	svc.fetch = func() []scraper.SearchRecord {
		return []scraper.SearchRecord{{Terms: "alpha", Volume: "500K+", Growth: "100%"}}
	}

	if err := svc.Refresh(); err != nil {
		t.Fatalf("expected refresh to succeed, got %v", err)
	}

	got := svc.Snapshot()
	if len(got) != 1 || got[0].Terms != "alpha" {
		t.Fatalf("expected refreshed data to be stored, got %#v", got)
	}
}
