/**
 * Message for validation form
 */
export const ERROR_MESSAGE = {
  EMPTY_INPUT: 'Please enter a valid field',
  EMAIL: 'Please enter a valid email address.',
  AVATAR_SIZE:
    'Avatar file size exceeds the limit (5MB). Please choose a smaller file.',
  AVATAR_TYPES: 'Only image files (JPEG, PNG, GIF) are allowed.',
};

/**
 * Regex for form validator.
 */
export const REGEX = {
  EMAIL: /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
