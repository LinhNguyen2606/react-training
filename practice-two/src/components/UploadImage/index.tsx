// Hook
import { useState } from 'react';

// Icon
import { Upload } from '@assets/icons';

//Helper
import { convertFileToBase64 } from '@helpers';

// Components
import { Avatar, Icons } from '@components';

// SCSS
import '@components/UploadImage/UploadImage.scss';

// Constant
import { ERROR_MESSAGE } from '@constants';

interface UploadImageProps {
  alt: string;
  label?: string;
  bgColor?: string;
  originalImage: string;
  onChange: (value: string) => void;
}

const UploadImage = ({
  alt,
  label = 'Upload new photo',
  bgColor,
  originalImage,
  onChange,
}: UploadImageProps) => {
  const [uploadImage, setUploadImage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const acceptedImageType = ['image/jpeg', 'image/png', 'image/gif'];

  /**
   * Handles the image upload event.
   * @param e - The change event object.
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the file from the onChange event of the file input
    const selectedFile = e.target.files?.[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    setErrorMessage(undefined);

    // If no file is selected, exit the function
    if (!selectedFile) return;

    if (!acceptedImageType.includes(selectedFile.type)) {
      setErrorMessage(ERROR_MESSAGE.AVATAR_TYPES);
      return;
    }

    // Check the file size, if it exceeds the limit, display an error message and exit the function
    if (selectedFile.size > maxSizeInBytes) {
      setErrorMessage(ERROR_MESSAGE.AVATAR_SIZE);
      return;
    }

    // Convert the file to base64 and store it in the uploadImage state
    const src = await convertFileToBase64(selectedFile);

    // If imageURL exists, update the uploadImage value and call the onChange function
    if (src) {
      setUploadImage(src);
      onChange(src);
    }
  };

  return (
    <>
      <div className="upload">
        <Avatar
          src={uploadImage !== undefined ? uploadImage : originalImage}
          alt={alt}
          bgColor={bgColor}
          size="md"
        />
        <label className="upload__label">
          <input
            className="upload__input"
            type="file"
            onChange={handleImageUpload}
          />
          <Icons src={Upload} />
          {label}
        </label>
      </div>
      {errorMessage && <span className="upload__error">{errorMessage}</span>}
    </>
  );
};

export default UploadImage;
