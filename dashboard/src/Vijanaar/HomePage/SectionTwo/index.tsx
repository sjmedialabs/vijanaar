import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { useState, useEffect } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Cookies from "js-cookie";

interface ImageCard {
  id: string;
  url: string;
  _id?: string; // backend _id for each image
}

interface SectionTwoData {
  _id?: string; // backend id of sectionOne item
  title: string;
  subTitle: string;
  images: ImageCard[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const HomePageSectionTwo: React.FC = () => {
  const [data, setData] = useState<SectionTwoData>({
    title: "",
    subTitle: "",
    images: [],
  });

  const [success, setSuccess] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState(false);

  // ===============================
  // FETCH DATA (GET /homepage)
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/homepage`);
        if (res.data?.sectionOne) {
          const sectionOne = res.data.sectionOne;

          setData({
            _id: sectionOne._id, // keep backend id for PATCH
            title: sectionOne.title || "",
            subTitle: sectionOne.subTitle || "",
            images: (sectionOne.images || []).map((img: { _id?: string; imageUrl: string }) => ({
              id: uuidv4(), // frontend id for UI rendering
              _id: img._id, // backend id for DELETE/PATCH if needed
              url: img.imageUrl || "",
            })),
          });
        }
      } catch (err) {
        console.error("Error fetching sectionOne:", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // HANDLERS
  // ===============================
  const updateField = (field: keyof SectionTwoData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateImage = (id: string, url: string) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, url } : img
      ),
    }));
  };

  // ===============================
  // ADD IMAGE (POST API)
  // ===============================
  const addImageCard = async () => {
    const newImage: ImageCard = { id: uuidv4(), url: "" };

    // Update frontend state immediately
    setData((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));

    try {
      // Call backend POST API to add new image
      const payload = { imageUrl: newImage.url };
      const res = await axios.post(
        `${API_BASE}/homepage/sectionOne.images`,
        payload,
        getAuthHeaders()
      );

      console.log("New image added to DB:", res.data);
    } catch (err) {
      console.error("Error adding new image:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };

  // ===============================
  // DELETE IMAGE (DELETE API)
  // ===============================
  const deleteImageCard = async (img: ImageCard) => {
    // if (!img._id) {
    //   // If no backend _id, just remove from frontend
    //   setData((prev) => ({
    //     ...prev,
    //     images: prev.images.filter((i) => i.id !== img.id),
    //   }));
    //   return;
    // }

    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(
          `${API_BASE}/homepage/sectionOne.images/${img._id}`,
          getAuthHeaders()
        );

        // Remove from frontend state
        setData((prev) => ({
          ...prev,
          images: prev.images.filter((i) => i.id !== img.id),
        }));

        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } catch (err) {
        console.error("Error deleting image:", err);
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    }
  };

  // ===============================
  // SAVE (PATCH API)
  // ===============================
  // ===============================
// SAVE (PATCH API)
// ===============================
const saveDataHandler = async () => {
  // Check for empty fields
  if (
    !data.title.trim() &&
    !data.subTitle.trim() &&
    data.images.every((img) => !img.url.trim())
  ) {
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 4000);
    return;
  }

  // ✅ New check: at least one image missing
  if (data.images.some((img) => !img.url.trim())) {
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 4000);
    return;
  }

  try {
    const payload = {
      sectionName: "sectionOne",
      data: {
        title: data.title,
        subTitle: data.subTitle,
        images: data.images.map((img) => ({ imageUrl: img.url })),
      },
    };

    await axios.patch(`${API_BASE}/homepage`, payload, getAuthHeaders());

    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  } catch (err) {
    console.error("Error updating sectionOne:", err);
    setError(true);
    setTimeout(() => setError(false), 4000);
  }
};


  return (
    <div className="homepage-section2">
      <h1 className="main-heading">Career Accelerators</h1>

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
              <Alert severity="error">Please fill all required fields. Make sure no image card is empty.</Alert>
            </Stack>
          )}
          {success && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">Operation completed successfully.</Alert>
            </Stack>
          )}
          {error && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">Something went wrong with the API.</Alert>
            </Stack>
          )}
      </div>
      {/* Title */}
      <div className="form-group flex flex-col md:flex-row items-start gap-10">
        <div>
          <Label htmlFor="inputTitle" className='label-styling'>Title</Label>
            <Input
              type="text"
              id="inputTitle"
              placeholder="Enter your section 2 title"
              className='input-styling'
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
        </div>
        <div>
          <Label htmlFor="inputSubTitle" className='label-styling'>Subtitle</Label>
          <Input
          type="text"
          id="inputSubTitle"
          placeholder="Enter your section 2 subtitle"
          className='input-styling'
          value={data.subTitle}
          onChange={(e) => updateField("subTitle", e.target.value)}
        />
        </div>
      </div>

        <button className="add-button-styling" type="button" onClick={addImageCard}>
        Add Card
      </button>

      {/* Subtitle 
      <div className="form-group flex items-center gap-10">
        <div>
          <Label htmlFor="inputSubTitle" className='label-styling'>Subtitle</Label>
          <Input
          type="text"
          id="inputSubTitle"
          placeholder="Enter your section 2 subtitle"
          className='input-styling'
          value={data.subTitle}
          onChange={(e) => updateField("subTitle", e.target.value)}
        />
        </div>
      </div>*/}

      {/* Images Grid */}
      <div className="images-grid">
        {data.images.map((imgCard) => (
          <div key={imgCard.id} className="image-card">
            {imgCard.url && (
              <div className="preview">
                <img src={imgCard.url} alt="Preview" />
              </div>
            )}
            <ImageUploadEl
              data={{ id: imgCard.id, text: "Upload Image", url: imgCard.url }}
              requiredWidth={680}       // minimum width in pixels
              requiredHeight={380}      // minimum height in pixels
              maxSizeMB={1}              // maximum file size in MB
              gettingRemoteUrl={(_, url) => updateImage(imgCard.id, url)}
            />
            <button
              className="delete-button-styling-customized mt-5"
              type="button"
              onClick={() => deleteImageCard(imgCard)}
              
            >
              Delete
            </button>
          </div>
        ))}
      </div>


      {/* Save Button */}
      
        <button className="update-button-styling-customized mt-5" onClick={saveDataHandler}>
          Update
        </button>
  
    </div>
  );
};

export default HomePageSectionTwo;
