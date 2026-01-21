import './index.css';
import { LuUpload } from "react-icons/lu";
import React, { useState, ChangeEvent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type VideoUploadElProps = {
  data: {
    id: string;
    text: string;
    urlText: string;
  };
  gettingRemoteUrl: (id: string, url: string) => void;
};

const VideoUploadEl: React.FC<VideoUploadElProps> = ({ data, gettingRemoteUrl }) => {
  const { id, text, urlText } = data;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleClick = () => {
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    inputElement?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setErrorMsg("❌ Invalid file type. Please upload a valid video (MP4, MOV, AVI, etc.).");
      return;
    }

    // Validate file size (max 10MB)
    const maxSizeInMB = 10;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setErrorMsg(`❌ File size exceeds ${maxSizeInMB}MB. Please choose a smaller video.`);
      return;
    }

    // Validate aspect ratio (9:16)
    const videoEl = document.createElement("video");
    videoEl.src = URL.createObjectURL(file);

    videoEl.onloadedmetadata = async () => {
      const { videoWidth, videoHeight } = videoEl;

      const aspectRatio = videoWidth / videoHeight;
      const targetRatio = 16 / 9;
      const tolerance = 0.02; // allow ±2% margin

      if (Math.abs(aspectRatio - targetRatio) > tolerance) {
        setErrorMsg("❌ Only videos with 16:9 ratio are allowed (portrait).");
        return;
      }

      // Upload
      setLoading(true);
      const formData = new FormData();
      formData.append("video", file);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload/video`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload video. Status: ${res.status}`);
        }

        const result = await res.json();
        if (!result.videoUrl) {
          throw new Error("Invalid server response: no videoUrl found.");
        }

        gettingRemoteUrl(id, result.videoUrl);
      } catch (err) {
        setErrorMsg(`❌ Upload failed. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <>
      <p className='label-styling'> Max size: 10 MB | Allowed ratio: 16:9</p>
      <div className="input-file-container" onClick={handleClick}>
        <input
          type="file"
          id={id}
          hidden
          accept="video/*"
          onChange={handleFileChange}
        />
        <div className='video-upload-container'>
          <LuUpload size={20} color="#fff" />
          <p className="input-field-text-styling">Upload</p>
        </div>
      </div>

      {errorMsg && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
      )}

      {loading && (<CircularProgress color="inherit" size={20} style={{ marginTop: "5px" }} />)}
    </>
  );
};

export default VideoUploadEl;
