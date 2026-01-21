import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from '../../ImageUpload';
import VideoUploadEl from '../../VideoUpoad';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Cookies from "js-cookie";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";
import Switch from '@mui/material/Switch';

interface SlideData {
  _id?: string;
  title: string;
  titleVisible: boolean;
  subTitle: string;
  subTitleVisible: boolean;
  description: string;
  descriptionVisible: boolean;
  backgroundImageUrl: string; // can be image or video
  videoUrl: string; // demo video
  buttonsVisible: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const HomePageSectionOne: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [selectedSlideId, setSelectedSlideId] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  // 🔹 New loading states for update/delete
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(`${API_BASE}/homepage`);
        if (res.data?.bannerSection) {
          setSlides(res.data.bannerSection);
          if (res.data.bannerSection.length > 0) {
            setSelectedSlideId(res.data.bannerSection[0]._id);
          }
        }
      } catch (err) {
        console.error("Error fetching slides:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const currentSlide = slides.find(s => s._id === selectedSlideId);

  useEffect(() => {
    if (currentSlide?.backgroundImageUrl?.endsWith(".mp4")) {
      setMediaType("video");
    } else {
      setMediaType("image");
    }
  }, [currentSlide]);

  const updateSlideField = (field: keyof SlideData, value: any) => {
    setSlides(prev =>
      prev.map(slide =>
        slide._id === selectedSlideId ? { ...slide, [field]: value } : slide
      )
    );
  };

  const handleBackgroundUpload = (_id: string, receivedUrl: string, type: "image" | "video") => {
    updateSlideField("backgroundImageUrl", receivedUrl);
    console.log(type);
  };

  const sendDataHandler = async () => {
    if (!currentSlide) return;

    if (
      !currentSlide.title.trim() &&
      !currentSlide.subTitle.trim() &&
      !currentSlide.backgroundImageUrl.trim() &&
      !currentSlide.videoUrl.trim()
    ) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
      return;
    }

    try {
      setUpdating(true); // start updating
      const payload = { ...currentSlide };
      delete payload._id;

      if (currentSlide._id && !currentSlide._id.startsWith("temp-")) {
        await axios.patch(
          `${API_BASE}/homepage/bannerSection/${currentSlide._id}`,
          payload,
          getAuthHeaders()
        );
      } else {
        const res = await axios.post(
          `${API_BASE}/homepage/bannerSection`,
          payload,
          getAuthHeaders()
        );
        const updatedSlides = res.data.bannerSection || [];
        setSlides(updatedSlides);
        setSelectedSlideId(updatedSlides[updatedSlides.length - 1]._id);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving slide:", err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setUpdating(false); // stop updating
    }
  };

  const addNewSlide = () => {
    const tempId = `temp-${Date.now()}`;
    const newSlide: SlideData = {
      _id: tempId,
      title: "",
      titleVisible: true,
      subTitle: "",
      subTitleVisible: true,
      description: "",
      descriptionVisible: true,
      backgroundImageUrl: "",
      videoUrl: "",
      buttonsVisible: true,
    };
    setSlides(prev => [...prev, newSlide]);
    setSelectedSlideId(tempId);
    setMediaType("image");
  };

  const deleteSlide = async (id?: string) => {
    if (!id || id.startsWith("temp-")) return;
    if (window.confirm("Are you sure you want to delete this slide?")) {
      try {
        setDeleting(true); // start deleting
        await axios.delete(`${API_BASE}/homepage/bannerSection/${id}`, getAuthHeaders());
        setSlides(prev => prev.filter(slide => slide._id !== id));
        setSelectedSlideId(slides[0]?._id || "");
      } catch (err) {
        console.error("Error deleting slide:", err);
        setError(true);
      } finally {
        setDeleting(false); // stop deleting
      }
    }
  };

  const toggleVisibility = (field: keyof SlideData, value: boolean) => {
    updateSlideField(field, value);
  };

  if (loading) return <p>Loading slides...</p>;

  return (
    <div className="homepage-section">
      <h1 className="main-heading">Banner</h1>

      {/* Alerts */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "auto",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        {showErrorAlert && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">We require at least one field.</Alert>
          </Stack>
        )}
        {success && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">Slide saved successfully.</Alert>
          </Stack>
        )}
        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Something went wrong with the API.</Alert>
          </Stack>
        )}
      </div>

      {/* Dropdown */}
      <div className="slide-selector">
        <div className="dropdown-container">
          <Label htmlFor="slideSelect" className='select-slide-styling'>Select Slide</Label>
          <select
            id="slideSelect"
            value={selectedSlideId}
            onChange={(e) => setSelectedSlideId(e.target.value)}
            className="dropdown"
          >
            {slides.map((slide) => (
              <option key={slide._id} value={slide._id}>
                {slide.title.trim() || "Untitled Slide"}
              </option>
            ))}
          </select>
        </div>
        <button className="add-button-styling" onClick={addNewSlide}>
          Add Slide
        </button>
      </div>

      {/* Slide Editing */}
      {currentSlide && (
        <div className="slide-editor">
          {/* Title */}
          <div className="form-group flex gap-10 items-center">
            <div>
              <Label htmlFor="inputTitle" className='label-styling'>Title</Label>
              <Input
                type="text"
                id="inputTitle"
                placeholder="Enter slide title"
                className='input-styling'
                value={currentSlide.title}
                onChange={(e) => updateSlideField("title", e.target.value)}
              />
            </div>
            <div className='mt-10'>
              <Switch
                checked={currentSlide.titleVisible}
                onChange={(e) => toggleVisibility("titleVisible", e.target.checked)}
                color="primary"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="form-group flex gap-10 items-center">
            <div>
              <Label htmlFor="inputSubTitle" className='label-styling'>SubTitle</Label>
              <Input
                type="text"
                id="inputSubTitle"
                placeholder="Enter slide subtitle"
                className='input-styling'
                value={currentSlide.subTitle}
                onChange={(e) => updateSlideField("subTitle", e.target.value)}
              />
            </div>
            <div className='mt-10'>
              <Switch
                checked={currentSlide.subTitleVisible}
                onChange={(e) => toggleVisibility("subTitleVisible", e.target.checked)}
                color="primary"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group flex gap-10 items-center">
            <div>
              <Label htmlFor="inputDescription" className='label-styling'>Description</Label>
              <RichTextEditor
                value={currentSlide.description}
                onChange={(data) => updateSlideField("description", data)}
                charLimit={250}
                placeholder="Enter slide description..."
                disabled={!currentSlide.descriptionVisible}
              />
            </div>
            <div className='mt-10'>
              <Switch
                checked={currentSlide.descriptionVisible}
                onChange={(e) => toggleVisibility("descriptionVisible", e.target.checked)}
                color="primary"
              />
            </div>
          </div>

          {/* Demo Video Url */}
          <div className="form-group flex gap-10 items-center">
            <div>
              <Label htmlFor="inputSubTitle" className='label-styling'>Demo Video</Label>
              <Input
                type="text"
                id="inputWatchDemoVideo"
                placeholder="Enter slide Demo Video URL"
                className='input-styling'
                value={currentSlide.videoUrl}
                onChange={(e) => updateSlideField("videoUrl", e.target.value)}
              />
            </div>
          </div>

          {/* Background Media */}
          <div className="form-group">
            <Label className='label-styling'>Upload Background</Label>
            {/* Switches for selecting type */}
            <div className="flex gap-6 items-center mb-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={mediaType === "image"}
                  onChange={() => setMediaType("image")}
                  color="primary"
                />
                <span>Image</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={mediaType === "video"}
                  onChange={() => setMediaType("video")}
                  color="primary"
                />
                <span>Video</span>
              </div>
            </div>

            {/* Conditional rendering */}
            {mediaType === "video" ? (
              <VideoUploadEl
                data={{
                  id: `${currentSlide._id}-background-video`,
                  text: "background video",
                  urlText: currentSlide.backgroundImageUrl.endsWith(".mp4")
                    ? currentSlide.backgroundImageUrl
                    : "",
                }}
                gettingRemoteUrl={(id, url) => handleBackgroundUpload(id, url, "video")}
              />
            ) : (
              <ImageUploadEl
                data={{
                  id: `${currentSlide._id}-background-image`,
                  text: "Upload slide background image",
                  url: currentSlide.backgroundImageUrl.endsWith(".mp4")
                    ? ""
                    : currentSlide.backgroundImageUrl,
                }}
                requiredWidth={1900}
                requiredHeight={760}
                maxSizeMB={2}
                gettingRemoteUrl={(id, url) => handleBackgroundUpload(id, url, "image")}
              />
            )}
          </div>

          {/* Preview */}
          {(currentSlide.backgroundImageUrl || currentSlide.videoUrl) && (
            <div className="preview">
              <p>Preview:</p>
              {currentSlide.backgroundImageUrl ? (
                currentSlide.backgroundImageUrl.endsWith(".mp4") ? (
                  <video
                    src={currentSlide.backgroundImageUrl}
                    controls
                    style={{ maxWidth: "25%", height: "auto" }}
                  />
                ) : (
                  <img
                    src={currentSlide.backgroundImageUrl}
                    alt="Slide Background"
                    style={{ maxWidth: "25%", height: "auto" }}
                  />
                )
              ) : null}
            </div>
          )} 

          {/* Buttons Visible */}
          <div className="form-group">
            <Switch
              checked={currentSlide.buttonsVisible}
              onChange={(e) => toggleVisibility("buttonsVisible", e.target.checked)}
              color="primary"
            />
            Buttons Visible
          </div>

          {/* Save / Delete */}
          <div className="button-group">
            <button
              className="update-button-styling-customized"
              onClick={sendDataHandler}
              disabled={updating || deleting}
              style={{ cursor: updating || deleting ? "not-allowed" : "pointer" }}
            >
              {updating
                ? "Updating..."
                : currentSlide._id && !currentSlide._id.startsWith("temp-")
                ? "Update"
                : "Save"}
            </button>

            {currentSlide._id && !currentSlide._id.startsWith("temp-") && (
              <button
                className="delete-button-styling-customized"
                onClick={() => deleteSlide(currentSlide._id)}
                disabled={updating || deleting}
                style={{ cursor: updating || deleting ? "not-allowed" : "pointer" }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageSectionOne;
