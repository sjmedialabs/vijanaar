import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";

interface BannerSectionData {
  title: string;
  subTitle: string;
  backgroundImageUrl: string;
}

const AboutPageSectionOne: React.FC = () => {
  const [inputData, setInputData] = useState<BannerSectionData>({
    title: "",
    subTitle: "",
    backgroundImageUrl: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const imageComponentData = {
    id: uuidv4(),
    text: "Upload your background image",
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/aboutuspage`
        );
        if (res.data?.bannerSection) {
          setInputData(res.data.bannerSection);
        }
      } catch (err) {
        console.error("Error fetching About Us page:", err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    setInputData((prev) => ({ ...prev, backgroundImageUrl: receivedUrl }));
  };

  // ===============================
  // SAVE HANDLER (REAL PATCH API)
  // ===============================
  const saveHandler = async () => {
    if (
      !inputData.title.trim() &&
      !inputData.subTitle.trim() &&
      !inputData.backgroundImageUrl.trim()
    ) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const payload = {
        sectionName: "bannerSection",
        data: {
          title: inputData.title,
          subTitle: inputData.subTitle,
          backgroundImageUrl: inputData.backgroundImageUrl,
        },
      };

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/aboutuspage`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error updating About Us page:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <>
      <h1 className="main-heading mb-0">
        Banner
      </h1>

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
          <Alert severity="error">We require at least one field.</Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Data updated successfully.</Alert>
        </Stack>
      )}

      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Something went wrong. Try again.</Alert>
        </Stack>
      )}
      </div>

      {/* Title */}
      <div className="flex flex-col md:flex-row items-start gap-10 mt-0">
        <div>
          <Label htmlFor="inputTitle" className="label-styling">Title</Label>
        <Input
          type="text"
          id="inputTitle"
          placeholder="Enter your about section title"
          className="input-styling"
          value={inputData.title}
          onChange={(e) =>
            setInputData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        </div>
        <div>
           <Label htmlFor="inputSubTitle" className="label-styling">Subtitle</Label>
        <Input
          type="text"
          id="inputSubTitle"
          placeholder="Enter your about section subtitle"
          className="input-styling"
          value={inputData.subTitle}
          onChange={(e) =>
            setInputData((prev) => ({ ...prev, subTitle: e.target.value }))
          }
        />
        </div>
      </div>

      

      {/* Current Image */}
      {inputData.backgroundImageUrl && (
        <div className="mt-4">
          <p>Preview:</p>
          <img
            src={inputData.backgroundImageUrl}
            alt="Current Background"
            style={{ maxWidth: "150px", borderRadius: "8px" }}
          />
        </div>
      )}

      {/* Upload New Image */}
      <ImageUploadEl
        data={{
          id: imageComponentData.id,
          text: imageComponentData.text,
          url: inputData.backgroundImageUrl,
        }}
          requiredWidth={1920}       // minimum width in pixels
          requiredHeight={600}      // minimum height in pixels
          maxSizeMB={1} 
        gettingRemoteUrl={gettingRemoteUrl}
      />

      {/* Save Button */}
      <div className="mt-5">
        <button
          className="update-button-styling-customized"
          onClick={saveHandler}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default AboutPageSectionOne;
