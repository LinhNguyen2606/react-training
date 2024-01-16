export { generateRandomColor } from '@helpers/generate';
export { dateFormat } from '@helpers/date';
export { highlightKeyword } from '@helpers/highlight';
export { delayRespone } from '@helpers/delay';
export { extractData } from '@helpers/extract';
export { validateUsername, validateEmail } from '@helpers/validate';

/**
 * Convert a File to Base64 using a Promise
 *
 * @param {File} file - The File object to convert
 * @returns {Promise<string>} A Promise that resolves with the Base64 string
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};
