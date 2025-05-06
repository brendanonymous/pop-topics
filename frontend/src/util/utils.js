export function normalizeTrendVolume(str) {
    if (!str) return 0;
  
    // remove plus and convert to uppercase just in case
    const clean = str.replace('+', '').toUpperCase();
    let size = 0;
    if (clean.endsWith('M')) {
      size = parseFloat(clean) * 10;
    } else if (clean.endsWith('K')) {
      size = parseFloat(clean) / 100;
    } else {
      size = parseFloat(clean);
    }

    size *= 5
    console.log('raw size ' + size)
    if (size <= 30) {
      size += 45;
    } else if (size <= 50) {
      size += 45;
    } else if (size <= 100) {
      size += 15;
    }


    console.log('normalized ' + size)

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
