import React, { useState, useEffect } from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { v4 as uuidv4 } from "uuid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const TestimonialSectionOne: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const imageComponentData = {
    id: uuidv4(),
    text: "Upload Banner Background",
  };

  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    setBackgroundImage(receivedUrl);
  };

  // ==========================
  // Fetch bannerSection data
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/testimonialspage`);
        if (res.data?.bannerSection) {
          setTitle(res.data.bannerSection.title || "");
          setDescription(res.data.bannerSection.subTitle || "");
          setBackgroundImage(res.data.bannerSection.backgroundImageUrl || "");
        }
      } catch (err) {
        console.error("Error fetching bannerSection:", err);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);

  // ==========================
  // Update bannerSection
  // ==========================
  const updateHandler = async () => {
    if (!title.trim() || !description.trim() || !backgroundImage.trim()) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await axios.patch(
        `${API_BASE}/testimonialspage`,
        {
          sectionName: "bannerSection",
          data: {
            title,
            subTitle: description,
            backgroundImageUrl: backgroundImage,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.bannerSection) {
        setTitle(res.data.bannerSection.title || "");
        setDescription(res.data.bannerSection.subTitle || "");
        setBackgroundImage(res.data.bannerSection.backgroundImageUrl || "");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error updating bannerSection:", err);
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
    }
  };

  return (
    <div className="testimonial-banner-editor">
      <h2 className="main-heading">Banner</h2>

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
      {showErrorAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">All fields are required or something went wrong.</Alert>
        </Stack>
      )}
      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Banner updated successfully!</Alert>
        </Stack>
      )}

      </div>
      <div>
        <Label className="label-styling">Banner Title</Label>
      <Input
        type="text"
        value={title}
        className="input-styling"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter banner title"
      />
      </div>

      <Label className="label-styling">Description</Label>
      <textarea
        className="editor-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />

      <Label className="label-styling">Background Image</Label>
      {backgroundImage && (
        <div>
          <p className="label-styling">Preview</p>
          <img src={backgroundImage} alt="Banner Preview" width={150} height={100}/>
        </div>
      )}
      <ImageUploadEl
        data={{
          id: imageComponentData.id,
          text: imageComponentData.text,
          url: backgroundImage,
        }}
                  requiredWidth={1920}
          requiredHeight={600}
          maxSizeMB={1}
        gettingRemoteUrl={gettingRemoteUrl}
      />

      <button type="button" className="update-button-styling-customized mt-5" onClick={updateHandler}>
        Update
      </button>
    </div>
  );
};

export default TestimonialSectionOne;
