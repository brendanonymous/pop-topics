export function parseTrendVolume(value) {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return value;
  }
  if (typeof value !== 'string') return null;

  const clean = value.trim().replaceAll(',', '').toUpperCase();
  const match = clean.match(/^(\d+(?:\.\d+)?)\s*([KMB])?\+?(?:\s+SEARCHES?)?$/);
  if (!match) return null;

  const magnitude = { K: 1_000, M: 1_000_000, B: 1_000_000_000 }[match[2]] ?? 1;
  const volume = Number(match[1]) * magnitude;
  return Number.isFinite(volume) ? volume : null;
}

export function normalizeTrendVolume(value) {
  const volume = parseTrendVolume(value);
  if (volume === null) return 60;

  // Preserve the existing visual range while basing it on the actual count.
  let size = volume / 20_000;
  if (size <= 50) {
    size += 45;
  } else if (size <= 100) {
    size += 15;
  }

  return size;
}

export function normalizeScaleSize(bubbleSize) {
  if (bubbleSize >= 200) {
    return 1.5;
  } else if (bubbleSize >= 150) {
    return 2;
  } else if (bubbleSize >= 100) {
    return 3;
  } else if (bubbleSize >= 60) {
    return 4;
  } else if (bubbleSize >= 30) {
    return 5;
  } else if (bubbleSize >= 20) {
    return 10;
  } else {
    return 19;
  }
}

export function formatSearchQuery(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
