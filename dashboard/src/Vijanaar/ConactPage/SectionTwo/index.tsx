import { useState, useEffect } from 'react';
import * as React from 'react';
import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Cookies from "js-cookie";

interface SectionOneData {
  title: string;
  description: string;
  googleMapEmbdedLink: string;
}

const ContactPageSectionTwo: React.FC = () => {
  const [sectionOne, setSectionOne] = useState<SectionOneData>({
    title: "",
    description: "",
    googleMapEmbdedLink: ""
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // =======================
  // GET DATA (API)
  // =======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/contactuspage`
        );
        if (res.status === 200 && res.data?.sectionOne) {
          setSectionOne({
            title: res.data.sectionOne.title || "",
            description: res.data.sectionOne.description || "",
            googleMapEmbdedLink: res.data.sectionOne.googleMapEmbdedLink || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch sectionOne data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =======================
  // PATCH DATA (API)
  // =======================
  const updateHandler = async () => {
    if (
      !sectionOne.title.trim() ||
      !sectionOne.description.trim() ||
      !sectionOne.googleMapEmbdedLink.trim()
    ) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/contactuspage`,
        {
          sectionName: "sectionOne",
          data: sectionOne,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setSuccess(true);
        setError(false);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Failed to update sectionOne:", err);
      setError(true);
      setSuccess(false);
      setTimeout(() => setError(false), 5000);
    }
  };

  if (loading) {
    return <p>Loading Section 2 data...</p>;
  }

  return (
    <>
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
          <Alert severity="error">All fields are required.</Alert>
        </Stack>
      )}
      {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Data updated successfully.</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Failed to update data. Please try again.</Alert>
        </Stack>
      )}
      </div>

      <h1 className='main-heading'>
         Contact details
      </h1>

      <Label htmlFor="title" className='label-styling'>Title</Label>
      <Input
        type="text"
        id="title"
        className='input-styling'
        placeholder="Enter section title"
        value={sectionOne.title}
        onChange={(e) => setSectionOne({ ...sectionOne, title: e.target.value })}
      />

      <Label htmlFor="description" className='label-styling'>Description</Label>
      <textarea
        id="description"
        
        placeholder="Enter description"
        value={sectionOne.description}
        onChange={(e) =>
          setSectionOne({ ...sectionOne, description: e.target.value })
        }
        className="form-textarea" style={{width:400}}
      />

      <Label htmlFor="googleMapEmbdedLink" className='label-styling'>Google Map Embed Link</Label>
      <Input
        type="text"
        id="googleMapEmbdedLink"
        className='input-styling'
        placeholder="Enter map embed link"
        value={sectionOne.googleMapEmbdedLink}
        onChange={(e) =>
          setSectionOne({ ...sectionOne, googleMapEmbdedLink: e.target.value })
        }
      />

      <button
        type='button'
        className='update-button-styling-customized mt-5'
        onClick={updateHandler}
      >
        Update
      </button>
    </>
  );
};

export default ContactPageSectionTwo;
