import React, { useState, useEffect } from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";
import ImageUploadEl from "../../ImageUpload"; // ✅ Import uploader
import "./index.css";

interface SectionEightData {
  title: string;
  subTitle: string;
  images: { _id?: string; imageUrl: string }[];
}

const HomePageSectionNine: React.FC = () => {
  const [data, setData] = useState<SectionEightData>({
    title: "",
    subTitle: "",
    images: [],
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Fetch sectionEight data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/homepage`
        );
        if (res.data?.sectionEight) {
          setData(res.data.sectionEight);
        }
      } catch (err) {
        console.error("Error fetching Section 9 data:", err);
      }
    };

    fetchData();
  }, []);

  const updateImage = (index: number, value: string) => {
    setData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = { ...updatedImages[index], imageUrl: value };
      return { ...prev, images: updatedImages };
    });
  };

  const addImage = () => {
    setData((prev) => ({
      ...prev,
      images: [...prev.images, { imageUrl: "" }],
    }));
  };

  const deleteImage = async (index: number, id?: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      if (id) {
        const token = Cookies.get("token");
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/homepage/sectionEight.images/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const saveHandler = async () => {
    if (
      !data.title.trim() &&
      !data.subTitle.trim() &&
      data.images.every((img) => !img.imageUrl.trim())
    ) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const payload = {
        sectionName: "sectionEight",
        data: {
          title: data.title,
          subTitle: data.subTitle,
          images: data.images,
        },
      };

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/homepage`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error updating Section 9:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };

  return (
    <div className="homepage-section9">
      <h1 className="home-page-section9-heading">HomePage Alumni Section</h1>

      {/* Alerts */}
      <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "auto",
          minWidth: "300px",
          textAlign: "center",
            }}>

      
      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Section 9 updated successfully.</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            Please fill title, subtitle, or at least one image.
          </Alert>
        </Stack>
      )}
    </div>

      {/* Title */}
      <div className="form-group flex flex-col md:flex-row items-start gap-10">
        <div>
          <Label htmlFor="section9Title" className="label-styling">Title</Label>
        <Input
          type="text"
          id="section9Title"
          placeholder="Enter section 9 title"
          className="input-styling"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        </div>
        <div>
         <Label htmlFor="section9SubTitle" className="label-styling">Subtitle</Label>
        <Input
          type="text"
          id="section9SubTitle"
          className="input-styling"
          placeholder="Enter section 9 subtitle"
          value={data.subTitle}
          onChange={(e) => setData({ ...data, subTitle: e.target.value })}
        />
        </div>
      </div>

       <button className="add-button-styling mb-5" onClick={addImage}>
          Add Image
        </button>

      {/* Images */}
      <div className="images-container">
        {data.images.map((img, index) => (
          <div key={index} className="image-card">
            <div className="form-group">
              <Label className="label-styling">Image {index + 1}</Label>

              {/* ✅ Show preview if available */}
              {img.imageUrl && (
                <div className="mb-2">
                  <img
                    src={img.imageUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-40 h-28 object-cover border rounded mb-2"
                  />
                </div>
              )}

              {/* ✅ Use uploader */}
              <ImageUploadEl
                data={{
                  id: img._id || `temp-${index}`,
                  text: "Upload image",
                  url: img.imageUrl,
                }}
                  requiredWidth={120}       // minimum width in pixels
                  requiredHeight={80}      // minimum height in pixels
                  maxSizeMB={1} 
                gettingRemoteUrl={(_id, url) => updateImage(index, url)}
              />
            </div>

            <button
              className="delete-button-styling-customized"
              onClick={() => deleteImage(index, img._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Image */}
      <div className="btn-container">
       
      </div>

      {/* Save Button */}
     
        <button
          className="update-button-styling-customized"
          onClick={saveHandler}
        >
          Update
        </button>
      
    </div>
  );
};

export default HomePageSectionNine;
