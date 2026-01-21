import React, { useState, useEffect } from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

interface SectionSixData {
  title: string;
  subTitle: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const HomePageSectionSix: React.FC = () => {
  const [data, setData] = useState<SectionSixData>({
    title: "",
    subTitle: "",
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Prefill data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/homepage`, {
        });
        if (res.data?.sectionFive) {
          setData({
            title: res.data.sectionFive.title || "",
            subTitle: res.data.sectionFive.subTitle || "",
          });
        }
      } catch (err) {
        console.error("Error fetching sectionFive data:", err);
        setError("Failed to load section data.");
        setTimeout(() => setError(null), 4000);
      }
    };
    fetchData();
  }, []);

  const updateField = (field: keyof SectionSixData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const saveHandler = async () => {
    if (!data.title.trim() && !data.subTitle.trim()) {
      setError("Please fill title or subtitle.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    try {
      const token = Cookies.get("token");

      await axios.patch(
        `${API_BASE}/homepage`,
        {
          sectionName: "sectionFive",
          data: {
            title: data.title,
            subTitle: data.subTitle,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Section 6 updated successfully.");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      console.error("Error updating sectionFive:", err);
      setError("Failed to update section.");
      setTimeout(() => setError(null), 4000);
    }
  };

  return (
    <div className="homepage-section6">
      <h1 className="main-heading">Testimonials</h1>

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
          <Alert severity="success">{success}</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      </div>

      {/* Title */}
      <div className="form-group flex flex-col md:flex-row items-start gap-10">
        <div>
          <Label htmlFor="section6Title" className="label-styling">Title</Label>
          <Input
            type="text"
            id="section6Title"
            className="input-styling"
            placeholder="Enter section 6 title"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div>
           <Label htmlFor="section6SubTitle" className="label-styling">Subtitle</Label>
        <Input
          type="text"
          id="section6SubTitle"
          className="input-styling"
          placeholder="Enter section 6 subtitle"
          value={data.subTitle}
          onChange={(e) => updateField("subTitle", e.target.value)}
        />
        </div>
      </div>

      {/* Subtitle */}
      <div className="form-group">
       
      </div>

      {/* Save button */}
      
        <button
          className="update-button-styling-customized"
          onClick={saveHandler}
        >
          Update
        </button>
      
    </div>
  );
};

export default HomePageSectionSix;
