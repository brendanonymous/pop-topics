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


  