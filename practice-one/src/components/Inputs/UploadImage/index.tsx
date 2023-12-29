// Hook
import { useState } from 'react';

// Icon
import { Upload } from '../../../assets/icons';

//Helper
import { convertFileToBase64 } from '../../../helpers';

// Components
import { Avatar, Icon} from '../../DataDisplay';

// SCSS
import './UploadImage.scss';

type UploadImageProps = {
  originalImage: string;
  alt: string;
  bgColor?: string;
  label?: string;
  onChange: (value: string) => void;
};

const UploadImage = ({
  originalImage,
  alt,
  bgColor,
  label = 'Upload new photo',
  onChange
}: UploadImageProps) => {
  const [uploadImage, setUploadImage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the file from the onChange event of the file input
    const selectedFile = e.target.files?.[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    // If no file is selected, exit the function
    if (!selectedFile) return;

    // Check the file size, if it exceeds the limit, display an error message and exit the function
    if (selectedFile.size > maxSizeInBytes) {
      setErrorMessage('File size should be less than 5MB');
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
            additionalClass="upload__avatar"
        />
        <label className="upload__label">
          <input
            className="upload__input"
            type="file"
            onChange={handleImageUpload}
          />
          <Icon src={Upload}/>
          {label}
        </label>
      </div>
      {errorMessage && <span className="upload__error">{errorMessage}</span>}
    </>
  );
};

export default UploadImage;
