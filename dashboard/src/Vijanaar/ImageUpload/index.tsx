import './index.css';
import { LuUpload } from "react-icons/lu";
import React, { useState, ChangeEvent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type ImageUploadElProps = {
  data: {
    id: string;
    text: string;
    url: string;
  };
  requiredWidth: number;   // Minimum image width
  requiredHeight: number;  // Minimum image height
  maxSizeMB?: number;      // Maximum file size in MB
  gettingRemoteUrl: (id: string, url: string) => void;
};

const ImageUploadEl: React.FC<ImageUploadElProps> = ({
  data,
  requiredWidth,
  requiredHeight,
  maxSizeMB = 2, // default 1MB
  gettingRemoteUrl
}) => {
  const { id, text, url } = data;
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    inputElement?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }

    // Check file size
    const maxSizeInBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(`File size exceeds ${maxSizeMB}MB. Please choose a smaller image.`);
      return;
    }

    // Check image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      if (img.width < requiredWidth || img.height < requiredHeight) {
        alert(`Image must be at least ${requiredWidth}x${requiredHeight}px. Your image is ${img.width}x${img.height}px`);
        return;
      }

      // Upload if valid
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload/image`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error(`Failed to upload. Status: ${res.status}`);

        const result = await res.json();
        if (!result.imageUrl) throw new Error('No imageUrl found in response');

        // Pass URL to parent
        gettingRemoteUrl(id, result.imageUrl);
      } catch (err) {
        alert(`Upload failed. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <>
      <p className='label-styling'>
        Minimum size: {requiredWidth}x{requiredHeight}px, Max file size: {maxSizeMB}MB
      </p>

      <div className='input-file-container-image' onClick={handleClick}>
        <input
          type="file"
          id={id}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className='image-upload-container'>
          <LuUpload size={20} color='#fff' style={{ marginBottom: '0px' }} />
          <p className='input-field-text-styling-image'>Upload</p>
        </div>
      </div>

      {loading && (
        <CircularProgress color="inherit" size={20} style={{ marginTop: '5px' }} />
      )}
    </>
  );
};

export default ImageUploadEl;
