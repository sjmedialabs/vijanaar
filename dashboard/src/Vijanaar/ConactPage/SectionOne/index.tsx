import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface InputData {
  backgroundImageUrl: string;
  title: string;
  subTitle: string;
}

const ContactPageSectionOne: React.FC = () => {
  const [inputData, setInputData] = useState<InputData>({
    backgroundImageUrl: "",
    title: "",
    subTitle: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const imageComponentData = {
    id: uuidv4(),
    text: "Upload your background image",
  };

  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    setInputData((prev) => ({ ...prev, backgroundImageUrl: receivedUrl }));
  };

  // ===============================
  // FETCH DATA (REAL API)
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/contactuspage`
        );
        if (response.status === 200 && response.data?.bannerSection) {
          const sectionData = response.data.bannerSection;
          setInputData({
            backgroundImageUrl: sectionData.backgroundImageUrl || "",
            title: sectionData.title || "",
            subTitle: sectionData.subTitle || "",
          });
          setInitialDataLoaded(true);
        }
      } catch (err: any) {
        console.error("Failed to fetch existing data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===============================
  // PATCH API - Update bannerSection
  // ===============================
  const sendDataHandler = async () => {
    if (
      !inputData.backgroundImageUrl.trim() ||
      !inputData.title.trim() ||
      !inputData.subTitle.trim()
    ) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/contactuspage`,
        {
          sectionName: "bannerSection",
          data: inputData,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSuccess(true);
        setError(false);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err: any) {
      console.error("Update failed:", err);
      setError(true);
      setSuccess(false);
      setTimeout(() => setError(false), 5000);
    }
  };

  if (loading) {
    return <p>Loading existing data...</p>;
  }

  return (
    <>
      <h1 className="main-heading">
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
          <Alert severity="error">
            We require all fields: Image, Title & Subtitle.
          </Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Data updated successfully.</Alert>
        </Stack>
      )}

      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            Failed to update the data. Please try again.
          </Alert>
        </Stack>
      )}
     </div>

      {/* Title Input */}
      <Label className="label-styling">Banner Title</Label>
      <Input
        value={inputData.title}
        className="input-styling"
        onChange={(e) =>
          setInputData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Enter banner title"
      />

      {/* Subtitle Input */}
      <Label className="label-styling">Banner Subtitle</Label>
      <textarea
        value={inputData.subTitle}
        onChange={(e) =>
          setInputData((prev) => ({ ...prev, subTitle: e.target.value }))
        }
        placeholder="Enter banner subtitle"
        className="form-textarea"
      />


      
      {initialDataLoaded && inputData.backgroundImageUrl && (
        <div className="mt-4">
          <p className="label-styling">Preview:</p>
          <img
            src={inputData.backgroundImageUrl}
            alt="Current Background"
            style={{ width: "150px", borderRadius: "8px" }}
          />
        </div>
      )}

      {/* Upload Image */}
      <ImageUploadEl
        data={{
          id: imageComponentData.id,
          text: imageComponentData.text,
          url: inputData.backgroundImageUrl,
        }}
                  requiredWidth={1920}
          requiredHeight={600}
          maxSizeMB={1}
        gettingRemoteUrl={gettingRemoteUrl}
      />

      <div className="mt-5">
        <button
          className="update-button-styling-customized"
          onClick={sendDataHandler}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default ContactPageSectionOne;
