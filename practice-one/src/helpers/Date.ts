/**
 * Convert the day such as: May 21, 2020 17:02:06
 */
export const convertDate = () =>
  new Date()
    .toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    })
    .replace('at', '');
