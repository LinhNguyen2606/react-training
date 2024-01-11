/**
 * Generate the random color for the avatar
 */
export const generateRandomColor = () => {
  let color = '#';

  do {
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  } while (color === '#FFFFFF' || color === '#FFF');

  return color;
};
