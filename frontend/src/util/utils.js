export function normalizeTrendVolume(str) {
    if (!str) return 0;
  
    // remove plus and convert to uppercase just in case
    const clean = str.replace('+', '').toUpperCase();
  
    if (clean.endsWith('M')) {
      return parseFloat(clean) * 10;
    } else if (clean.endsWith('K')) {
      return parseFloat(clean) / 100;
    } else {
      return parseFloat(clean);
    }
  }

export function normalizeScaleSize(bubbleSize) {
  if (bubbleSize >= 100) {
    return 2
  }
  if ((bubbleSize < 100) && (bubbleSize >= 60)) {
    return 3
  }
  return 4;
}

export function formatSearchQuery(query) {
  return 'https://www.google.com/search?q=' + query.replaceAll(' ', '+');
}