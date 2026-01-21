import { useState, useEffect } from "react";
import * as React from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";
import axios from "axios";
import ImageUploadEl from "../../ImageUpload"; // ✅ Use uploader
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // ✅ Replace CKEditor
import "./index.css";

interface ReformCard {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AboutPageSectionFive: React.FC = () => {
  const [cards, setCards] = useState<ReformCard[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // ==========================
  // Fetch sectionThree from DB
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/aboutuspage`);
        if (res.data?.sectionThree) {
          setCards(res.data.sectionThree);
        }
      } catch (err) {
        console.error("Error fetching about page sectionThree:", err);
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);

  // ==========================
  // Update field
  // ==========================
  const updateCardField = (
    index: number,
    field: keyof ReformCard,
    value: string
  ) => {
    setCards((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ==========================
  // Save data (PATCH API)
  // ==========================
 const handleSave = async () => {
  // Check if any card has empty fields
  const hasEmptyCard = cards.some(
    (c) => !c.title.trim() || !c.description.trim()
  );

  if (cards.length === 0 || hasEmptyCard) {
    setErrorAlert(true);
    setTimeout(() => setErrorAlert(false), 5000);
    return;
  }

  try {
    const token = Cookies.get("token");

    const res = await axios.patch(
      `${API_BASE}/aboutuspage`,
      {
        sectionName: "sectionThree",
        data: cards, // send entire array
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data?.sectionThree) {
      setCards(res.data.sectionThree);
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  } catch (err) {
    console.error("Error updating sectionThree:", err);
    setErrorAlert(true);
    setTimeout(() => setErrorAlert(false), 5000);
  }
};


  return (
    <>
      <h1 className="main-heading">
        Mission & Vision
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
        {errorAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error"> Please fill all the fields.</Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Data saved successfully!</Alert>
        </Stack>
      )}
      </div>

      <div className="cards-wrapper">
        {cards.map((card, index) => (
          <div className="card-box" key={index}>
            {/* Title */}
            <Label htmlFor={`cardTitle-${index}`} className="label-styling">
              Card Title {index + 1}
            </Label>
            <Input
              type="text"
              id={`cardTitle-${index}`}
              className="input-styling"
              placeholder="Enter card title"
              value={card.title}
              onChange={(e) =>
                updateCardField(index, "title", e.target.value)
              }
            />

            {/* Description */}
            <Label htmlFor={`cardDesc-${index}`} className="label-styling">
              Card Description {index + 1}
            </Label>
            <RichTextEditor
              value={card.description}
              onChange={(val) => updateCardField(index, "description", val)}
              charLimit={500}
              placeholder="Enter card description..."
            />

            {/* Image */}
            <Label>Card Image {index + 1}</Label>
            {card.imageUrl && (
              <div className="image-preview mb-2">
                <img
                  src={card.imageUrl}
                  alt={`Card ${index + 1}`}
                  className="w-20 h-28 object-cover border rounded"
                />
              </div>
            )}
            <ImageUploadEl
              data={{
                id: card._id || `temp-${index}`,
                text: "Upload card image",
                url: card.imageUrl,
              }}
                requiredWidth={128}       // minimum width in pixels
                requiredHeight={128}      // minimum height in pixels
                maxSizeMB={1} 
              gettingRemoteUrl={(_id, url) =>
                updateCardField(index, "imageUrl", url)
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button
          className="update-button-styling-customized"
          type="button"
          onClick={handleSave}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default AboutPageSectionFive;
