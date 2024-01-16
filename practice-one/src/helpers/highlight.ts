/**
 * Highlights a keyword in a given text by wrapping it with <mark> tags.
 * @param {string} text The text to be highlighted.
 * @param {string} keyword The keyword to be highlighted.
 * @returns {string} The text with the keyword highlighted using <mark> tags.
 */
export const highlightKeyword = (text: string, keyword: string): string => {
  const re = new RegExp(`(${keyword})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
};
