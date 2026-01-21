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
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // <-- Import reusable component

interface Card {
  id: string; // frontend id (uuid)
  _id?: string; // backend MongoDB id
  title: string;
  description: string;
  image: string;
}

interface SectionFourData {
  title: string;
  subTitle: string;
  highlights: {
    _id: string;
    imageUrl: string;
    title: string;
    description: string;
  }[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const HomePageSectionFive: React.FC = () => {
  const [data, setData] = useState<{
    title: string;
    subTitle: string;
    cards: Card[];
  }>({
    title: "Section Five Title",
    subTitle: "This is the subtitle for section 5",
    cards: [],
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch sectionFour data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/homepage`);
        const sectionFour: SectionFourData = res.data.sectionFour;

        if (sectionFour) {
          setData({
            title: sectionFour.title || "",
            subTitle: sectionFour.subTitle || "",
            cards:
              sectionFour.highlights?.map((h) => ({
                id: uuidv4(),
                _id: h._id,
                title: h.title || "",
                description: h.description || "",
                image: h.imageUrl || "",
              })) || [],
          });
        }
      } catch (err) {
        console.error("Error fetching sectionFour data:", err);
      }
    };

    fetchData();
  }, []);

  // Update section fields
  const updateField = (field: "title" | "subTitle", value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Local update card state
  const updateCardLocal = (id: string, field: keyof Card, value: string) => {
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  // Image upload callback
  const gettingRemoteUrl = (id: string, receivedUrl: string) => {
    updateCardLocal(id, "image", receivedUrl);
  };


  // ===========================
  // Cards API Handlers
  // ===========================

  const updateHandel = async () => {
  // Validation
  if (!data.title.trim() || !data.subTitle.trim()) {
    setError("Please fill title and subtitle.");
    setTimeout(() => setError(null), 4000);
    return;
  }

  // Optional: validate all cards
  const hasEmptyCard = data.cards.some(
    (c) => !c.title.trim() || !c.description.trim() || !c.image.trim()
  );
  if (hasEmptyCard) {
    setError("Please fill all card fields before saving.");
    setTimeout(() => setError(null), 4000);
    return;
  }

  try {
    const token = Cookies.get("token");

    const payload = {
      sectionName: "sectionFour",
      data: {
        title: data.title,
        subTitle: data.subTitle,
        highlights: data.cards.map((c) => ({
          imageUrl: c.image,
          title: c.title,
          description: c.description,
        })),
      },
    };

    const res = await axios.patch(`${API_BASE}/homepage`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res)

    setSuccess("Section 4 updated successfully!");
    setTimeout(() => setSuccess(null), 4000);
  } catch (err) {
    console.error(err);
    setError("Failed to update section 4.");
    setTimeout(() => setError(null), 4000);
  }
};


  // Add a new empty card at the TOP
const addCard = () => {
  setData((prev) => ({
    ...prev,
    cards: [{ id: uuidv4(), title: "", description: "", image: "" }, ...prev.cards],
  }));
};

// Delete card locally
const deleteCard = (id: string) => {
  setData((prev) => ({
    ...prev,
    cards: prev.cards.filter((c) => c.id !== id),
  }));
};

  return (
    <div className="homepage-section5">
      <h1 className="main-heading">Highlights</h1>

      {/* Alerts */}
      <div  style={{
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
          <Label htmlFor="section5Title" className="label-styling">Title</Label>
          <Input
            type="text"
            id="section5Title"
            placeholder="Enter section 4 title"
            className="input-styling"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div>
           <Label htmlFor="section5SubTitle" className="label-styling">Subtitle</Label>
        <Input
          type="text"
          id="section5SubTitle"
          className="input-styling"
          placeholder="Enter section 4 subtitle"
          value={data.subTitle}
          onChange={(e) => updateField("subTitle", e.target.value)}
        />
        </div>
      </div>


       <button className="add-button-styling" onClick={addCard}>
          Add Card
        </button>
      

      {/* Cards */}
      <div className="cards-container">
        <h3 className="cards-heading">Cards</h3>
      
        <div className="flex flex-wrap gap-10">
            {data.cards.map((card) => (
          <div key={card.id} className="card-item">
            <Input
              type="text"
              placeholder="Card title"
              className="input-styling"
              value={card.title}
              onChange={(e) => updateCardLocal(card.id, "title", e.target.value)}
            />

            {/* Reusable RichTextEditor with 120 char limit */}
            <RichTextEditor
              value={card.description}
              onChange={(val) => updateCardLocal(card.id, "description", val)}
              charLimit={120}
              placeholder="Enter card description..."
            />

            {card.image && (
              <div className="preview">
                <p className="label-styling">Preview:</p>
                <img src={card.image} alt={card.title} />
              </div>
            )}

            <ImageUploadEl
              data={{
                id: card.id,
                text: "Upload card image",
                url: card.image,
              }}
                requiredWidth={42}       // minimum width in pixels
                requiredHeight={42}      // minimum height in pixels
                maxSizeMB={1} 
              gettingRemoteUrl={gettingRemoteUrl}
            />

            <button
              className="delete-button-styling-customized mt-5"
              onClick={() => deleteCard(card.id)}
            >
              Delete
            </button>
          </div>
        ))}
        </div>
        

        {/* Single button to update all cards */}
        
          <button
            className="update-button-styling-customized"
            onClick={updateHandel}
          >
            Update
          </button>
      
      </div>
    </div>
  );
};

export default HomePageSectionFive;
