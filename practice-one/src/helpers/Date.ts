/**
 * Convert the day such as: May 21, 2020 17:02:06
 */
const dateFormat = (date: string) =>
  new Date(date)
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

export default dateFormat;
