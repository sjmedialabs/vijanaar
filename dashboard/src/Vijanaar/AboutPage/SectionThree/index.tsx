import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { useState, useEffect } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Cookies from "js-cookie";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // <-- Import RichTextEditor

interface Card {
  _id?: string; // MongoDB id for deletion
  title: string;
  description: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AboutPageSectionThree: React.FC = () => {
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // ==========================
  // Fetch sectionTwo from DB
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/aboutuspage`);
        if (res.data?.sectionTwo) {
          setTitle(res.data.sectionTwo.title || "");
          setCards(res.data.sectionTwo.points || []);
        }
      } catch (err) {
        console.error("Error fetching about page data:", err);
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);

  // Add new card at the top (optional) so new card is visible without scrolling
const handleAddCard = () => {
  setCards([{ title: "", description: "" }, ...cards]);
};

// Delete card locally
const handleDeleteCard = (index: number) => {
  if (!window.confirm("Are you sure you want to delete this card?")) return;
  const updatedCards = [...cards];
  updatedCards.splice(index, 1);
  setCards(updatedCards);
};
  // ==========================
  // Save data (PATCH API)
  // ==========================
 const handleSave = async () => {
  // Check for empty title OR any card with empty title/description
  const hasEmptyCard = cards.some(
    (c) => !c.title.trim() || !c.description.trim()
  );

  if (!title.trim() || hasEmptyCard) {
    setErrorAlert(true);
    setTimeout(() => setErrorAlert(false), 5000);
    return;
  }

  try {
    const token = Cookies.get("token");

    const res = await axios.patch(
      `${API_BASE}/aboutuspage`,
      {
        sectionName: "sectionTwo",
        data: {
          title,
          points: cards,
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data?.sectionTwo) {
      setTitle(res.data.sectionTwo.title || "");
      setCards(res.data.sectionTwo.points || []);
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  } catch (err) {
    console.error("Error updating sectionTwo:", err);
    setErrorAlert(true);
    setTimeout(() => setErrorAlert(false), 5000);
  }
};


  return (
    <>
      <h1 className='main-heading'>Why Choose Us</h1>

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
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Please fill all the cards.</Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Data saved successfully!</Alert>
        </Stack>
      )}

      </div>
      {/* Title */}
      <div className='mt-4'>
        <Label htmlFor="inputTitle" className='label-styling'>Title</Label>
        <Input
          type="text"
          id="inputTitle"
          placeholder="Enter section title"
          className='input-styling'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
     <div className="mt-4">
        <button className="add-button-styling" type="button" onClick={handleAddCard}>
          Add Card
        </button>
      </div>

      {/* Cards */}
      <div className="cards-wrapper">
        {cards.map((card, index) => (
          <div className="card-box" key={card._id || index}>
            <Label htmlFor={`cardTitle-${index}`} className='label-styling'>Card Title {index + 1}</Label>
            <Input
              type="text"
              id={`cardTitle-${index}`}
              placeholder="Enter card title"
              className='input-styling'
              value={card.title}
              onChange={(e) => {
                const updatedCards = [...cards];
                updatedCards[index].title = e.target.value;
                setCards(updatedCards);
              }}
            />

            <Label htmlFor={`cardDescription-${index}`} className='label-styling'>Card Description {index + 1}</Label>
            <RichTextEditor
              value={card.description}
              onChange={(val) => {
                const updatedCards = [...cards];
                updatedCards[index].description = val;
                setCards(updatedCards);
              }}
              charLimit={200}
              placeholder="Enter card description..."
            />

            <button
              className="delete-button-styling-customized"
              style={{ backgroundColor: 'red' }}
              type="button"
              onClick={() => handleDeleteCard(index)}
            >
              Delete
            </button>
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

export default AboutPageSectionThree;
