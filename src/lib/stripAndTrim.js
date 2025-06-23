export function getTrimmedExcerpt(htmlString, maxLength = 150) {
    if (!htmlString) return '';
  
    // Strip HTML tags
    const strippedString = htmlString.replace(/<[^>]+>/g, '');
  
    // Trim to character limit
    const trimmed =
      strippedString.length > maxLength
        ? strippedString.slice(0, maxLength).trim() + '...'
        : strippedString;
  
    return trimmed;
  }