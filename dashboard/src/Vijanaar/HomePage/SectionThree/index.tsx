import React, { useState, useEffect } from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

interface SectionThreeData {
  title: string;
  subTitle: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const HomePageSectionThreeEl: React.FC = () => {
  const [data, setData] = useState<SectionThreeData>({
    title: "",
    subTitle: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // ===============================
  // FETCH DATA (GET /homepage)
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/homepage`, getAuthHeaders());
        if (res.data?.sectionTwo) {
          const sectionTwo = res.data.sectionTwo;
          setData({
            title: sectionTwo.title || "",
            subTitle: sectionTwo.subTitle || "",
          });
        }
      } catch (err) {
        console.error("Error fetching sectionTwo:", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // HANDLERS
  // ===============================
  const updateField = (field: keyof SectionThreeData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // ===============================
  // PATCH API TO UPDATE SECTION TWO
  // ===============================
  const saveHandler = async () => {
    if (!data.title.trim() && !data.subTitle.trim()) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 4000);
      return;
    }

    try {
      const payload = {
        sectionName: "sectionTwo",
        data: {
          title: data.title,
          subTitle: data.subTitle,
        },
      };

      await axios.patch(`${API_BASE}/homepage`, payload, getAuthHeaders());

      setSuccess(true);
      setError(false);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error updating sectionTwo:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };

  return (
    <div className="homepage-section3">
      <h1 className="main-heading">Courses Offered</h1>

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
        {showErrorAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Please fill at least one field.</Alert>
        </Stack>
        )}
        {success && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Section 3 updated successfully.</Alert>
          </Stack>
        )}
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">Something went wrong with the API.</Alert>
          </Stack>
        )}
      </div>

      {/* Title */}
      <div className="form-group flex flex-col md:flex-row items-start gap-10">
        <div>
          <Label htmlFor="section3Title" className="label-styling">Title</Label>
          <Input
            type="text"
            id="section3Title"
            placeholder="Enter section 3 title"
            className="input-styling"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div>
            <Label htmlFor="section3SubTitle" className="label-styling">Subtitle</Label>
            <Input
              type="text"
              id="section3SubTitle"
              placeholder="Enter section 3 subtitle"
              className="input-styling"
              value={data.subTitle}
              onChange={(e) => updateField("subTitle", e.target.value)}
            />
          </div>
      </div>

      

      {/* Save button */}
     
        <button className="update-button-styling-customized" onClick={saveHandler}>
          Update
        </button>
      
    </div>
  );
};

export default HomePageSectionThreeEl;
