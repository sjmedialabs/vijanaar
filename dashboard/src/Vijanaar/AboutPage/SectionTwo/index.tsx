import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { useState, useEffect } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // <-- Import reusable component

interface SectionOneData {
  title: string;
  description1: string;
  description2: string;
}

const AboutPageSectionTwo: React.FC = () => {
  const [inputData, setInputData] = useState<SectionOneData>({
    title: "",
    description1: "",
    description2: "",
  });

  const [success, setSuccess] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState(false);

  // Fetch sectionOne data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/aboutuspage`
        );
        if (res.data?.sectionOne) {
          setInputData(res.data.sectionOne);
        }
      } catch (err) {
        console.error("Error fetching sectionOne:", err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  // Save/Update handler
  const saveHandler = async () => {
    if (
      !inputData.title.trim() &&
      !inputData.description1.trim() &&
      !inputData.description2.trim()
    ) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const payload = {
        sectionName: "sectionOne",
        data: {
          title: inputData.title,
          description1: inputData.description1,
          description2: inputData.description2,
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
      console.error("Error updating sectionOne:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <>
      <h1 className="main-heading">
        About-Us
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
          <Alert severity="success">Data saved successfully.</Alert>
        </Stack>
      )}

      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Something went wrong. Try again.</Alert>
        </Stack>
      )}
      </div>

      {/* Title */}
      <div className="mt-4">
        <Label htmlFor="inputTitle" className="label-styling">Title</Label>
        <Input
          type="text"
          id="inputTitle"
          className="input-styling"
          placeholder="Enter your about section title"
          value={inputData.title}
          onChange={(e) =>
            setInputData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      {/* Description 1 */}
      <div className="mt-4">
        <Label htmlFor="inputDescription1" className="label-styling">Description 1</Label>
        <RichTextEditor
          value={inputData.description1}
          onChange={(val) =>
            setInputData((prev) => ({ ...prev, description1: val }))
          }
          charLimit={300}
          placeholder="Enter first description..."
        />
      </div>

      {/* Description 2 */}
      <div className="mt-4">
        <Label htmlFor="inputDescription2">Description 2</Label>
        <RichTextEditor
          value={inputData.description2}
          onChange={(val) =>
            setInputData((prev) => ({ ...prev, description2: val }))
          }
          charLimit={300}
          placeholder="Enter second description..."
        />
      </div>

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

export default AboutPageSectionTwo;
