import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from '../../ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Cookies from "js-cookie";
import RichTextEditor from '../../../components/RichTextEditor/richtexteditor'; // ✅ RichTextEditor

interface InputData {
  title: string;
  subTitle: string;
  backgroundImageUrl: string;
}

const PlacementPageSectionOne: React.FC = () => {
  const [inputData, setInputData] = useState<InputData>({
    title: "",
    subTitle: "",
    backgroundImageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const imageComponentData = {
    id: uuidv4(),
    text: 'Upload your background image',
  };

  // ===============================
  // Fetch data from DB
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/placementpage`);
        if (response.status === 200 && response.data?.bannerSection) {
          const sectionData = response.data.bannerSection;
          setInputData({
            title: sectionData.title || "",
            subTitle: sectionData.subTitle || "",
            backgroundImageUrl: sectionData.backgroundImageUrl || ""
          });
        }
      } catch (err) {
        console.error("Failed to fetch existing data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    setInputData(prev => ({ ...prev, backgroundImageUrl: receivedUrl }));
  };

  // ===============================
  // Send data to PATCH API
  // ===============================
  const sendDataHandler = async () => {
    if (!inputData.title.trim() || !inputData.subTitle.trim() || !inputData.backgroundImageUrl.trim()) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 4000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const dataToSend = {
        sectionName: "bannerSection",
        data: inputData
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/placementpage`,
        dataToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setInputData({
          title: response.data.bannerSection.title || "",
          subTitle: response.data.bannerSection.subTitle || "",
          backgroundImageUrl: response.data.bannerSection.backgroundImageUrl || ""
        });
        setSuccess(true);
        setError(false);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError(true);
      setSuccess(false);
    }
  };

  if (loading) return <div>Loading...</div>;

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
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">We require all fields.</Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Data updated successfully.</Alert>
        </Stack>
      )}

      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Failed to update the data.</Alert>
        </Stack>
      )}

     </div>
      <div className="mt-4">
        <Label htmlFor="inputTitle" className='label-styling'>Title</Label>
        <Input
          type="text"
          id="inputTitle"
          className='input-styling'
          placeholder="Enter your banner title"
          value={inputData.title}
          onChange={(e) => setInputData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="inputSubTitle" className='label-styling'>SubTitle</Label>
        <RichTextEditor
          value={inputData.subTitle}
          onChange={(val) => setInputData(prev => ({ ...prev, subTitle: val }))}
          charLimit={250} // ✅ Limit subtitle to 250 characters
          placeholder="Enter your banner subtitle"
        />
      </div>

      {inputData.backgroundImageUrl && (
        <div className="mt-4">
          <p className='label-styling'>Preview:</p>
          <img
            src={inputData.backgroundImageUrl}
            alt="Current Background"
            style={{ maxWidth: '150px', borderRadius: '8px', marginTop: '8px' }}
          />
        </div>
      )}

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
        <button className="update-button-styling-customized" onClick={sendDataHandler}>
          Update
        </button>
      </div>
    </>
  );
};

export default PlacementPageSectionOne;
