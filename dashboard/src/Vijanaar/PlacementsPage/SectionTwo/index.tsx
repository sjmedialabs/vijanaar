import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Cookies from "js-cookie";

interface ImageData {
  id: string;
  url: string;
}

interface InputData {
  title: string;
  images: ImageData[];
}

const PlacementpageSectionTwo: React.FC = () => {
  const [inputData, setInputData] = useState<InputData>({
    title: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // ===============================
  // Fetch sectionOne data from DB
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/placementpage`);
        if (res.status === 200 && res.data?.sectionOne) {
          const section = res.data.sectionOne;
          setInputData({
            title: section.title || "",
            images: section.images?.map((img: { imageUrl: string }) => ({
              id: uuidv4(),
              url: img.imageUrl || ""
            })) || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch Section Two data:", err);
        setShowErrorAlert(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===============================
  // Update Title/SubTitle
  // ===============================
  const updateField = (field: keyof InputData, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update single image
  const updateImage = (id: string, url: string) => {
    setInputData((prev) => ({
      ...prev,
      images: prev.images.map((img) => (img.id === id ? { ...img, url } : img)),
    }));
  };

  // Add image card
  const addImage = () => {
    setInputData((prev) => ({
      ...prev,
      images: [{ id: uuidv4(), url: "" }, ...prev.images],
    }));
  };

  // Delete image card
  const deleteImage = (id: string) => {
    setInputData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  // ===============================
  // Save data via PATCH API
  // ===============================
 const saveDataHandler = async () => {
  // ❌ Prevent update if title and all image URLs are empty
  if (
    !inputData.title.trim() &&
    inputData.images.every((img) => !img.url.trim())
  ) {
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 4000);
    return;
  }

  // ❌ Prevent update if any image has an empty URL
  const hasEmptyImage = inputData.images.some((img) => !img.url.trim());
  if (hasEmptyImage) {
    alert("Please remove empty image entries or fill all image URLs before saving.");
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 4000);
    return;
  }

  try {
    const token = Cookies.get("token");
    if (!token) {
      alert("Unauthorized: Token missing");
      return;
    }

    const dataToSend = {
      sectionName: "sectionOne",
      data: {
        title: inputData.title.trim(),
        images: inputData.images.map((img) => ({ imageUrl: img.url.trim() })),
      },
    };

    const res = await axios.patch(`${API_BASE}/placementpage`, dataToSend, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }
  } catch (err) {
    console.error("Failed to update Section One:", err);
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 4000);
  }
};


  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className='main-heading'>Partners</h1>

      {/* Alerts */}
      <div  style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "auto",
          minWidth: "300px",
          textAlign: "center",
        }}>
        {showErrorAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Please fill at least one field.</Alert>
        </Stack>
      )}
      {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Section updated successfully.</Alert>
        </Stack>
      )}
      </div>

      {/* Title */}
      <div className='mt-4'>
        <Label htmlFor="inputTitle" className='label-styling'>Title</Label>
        <Input
          type="text"
          id="inputTitle"
          className='input-styling'
          placeholder="Enter section title"
          value={inputData.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>

       <button className="add-button-styling mt-5" onClick={addImage}>Add Image</button>
      {/* Images */}
      <div className="images-grid">
        {inputData.images.map((img) => (
          <div key={img.id} className="image-card">
            {img.url && (
              <div className="preview">
                <img src={img.url} alt="Preview" />
              </div>
            )}
            <ImageUploadEl
              data={{ id: img.id, text: "Upload Image", url: img.url }}
              requiredWidth={120}
              requiredHeight={80}
              maxSizeMB={1}
              gettingRemoteUrl={(_, url) => updateImage(img.id, url)}
            />
            <button className="delete-button-styling-customized mt-5" onClick={() => deleteImage(img.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      
       
        <button className='update-button-styling-customized mt-5' onClick={saveDataHandler}>
          Update
        </button>
      
    </div>
  );
};

export default PlacementpageSectionTwo;
