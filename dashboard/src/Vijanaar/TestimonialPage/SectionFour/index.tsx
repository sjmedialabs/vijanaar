"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { v4 as uuidv4 } from "uuid";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";

type CardItem = {
  _id?: string;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
};

interface SectionData {
  title: string;
  subTitle: string;
  testimonials: CardItem[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const TestimonialSectionTwo = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubTitle, setSectionSubTitle] = useState("");
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCard, setEditingCard] = useState<CardItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const imageComponentData = { id: uuidv4(), text: "Upload card image" };

  // update image url after upload
  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    if (editingCard) {
      setEditingCard((prev) => (prev ? { ...prev, imageUrl: receivedUrl } : prev));
    }
  };

  // Fetch sectionOne data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/testimonialspage`);
        const data: SectionData = res.data.sectionOne;
        if (data) {
          setSectionTitle(data.title || "");
          setSectionSubTitle(data.subTitle || "");
          setCards(data.testimonials || []);
        }
      } catch (err) {
        console.error("Failed to fetch Section One:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add/Edit card locally
  const saveEditCardLocally = () => {
    if (!editingCard) return;

    if (!editingCard.name || !editingCard.role || !editingCard.description) {
      alert("Please fill in all fields before saving.");
      return;
    }

    if (editingCard._id) {
      setCards(cards.map((c) => (c._id === editingCard._id ? editingCard : c)));
    } else {
      const newCard = { ...editingCard, _id: uuidv4() };
      setCards([newCard, ...cards]); // add new card at top
    }

    setEditingCard(null);
  };

  // Delete card locally
  const deleteCardLocally = () => {
    if (!deleteConfirmId) return;
    setCards(cards.filter((c) => c._id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  // Single update button for all changes
 // Single update button for all changes
const handleUpdateAll = async () => {
  setSaving(true);
  try {
    const token = Cookies.get("token");

    // 🧹 Clean up testimonials (remove _id field)
    const cleanedCards = cards.map(({ _id, ...rest }) => rest);

    const payload = {
      sectionName: "sectionOne",
      data: {
        title: sectionTitle,
        subTitle: sectionSubTitle,
        testimonials: cleanedCards,
      },
    };

    const res = await axios.patch(`${API_BASE}/testimonialspage`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.sectionOne) {
      setSectionTitle(res.data.sectionOne.title || "");
      setSectionSubTitle(res.data.sectionOne.subTitle || "");
      setCards(res.data.sectionOne.testimonials || []);
    }

    alert("Section updated successfully!");
  } catch (err: any) {
    console.error("Error updating section:", err.response?.data || err);
    alert("Failed to update section. Check console for details.");
  } finally {
    setSaving(false);
  }
};


  if (loading) return <div>Loading...</div>;

  return (
    <div className="mica-section-four">
      <h2 className="main-heading">Testimonial</h2>

      {/* Section Title & Subtitle */}
      <div>
        <Label className="label-styling">Section Title</Label>
        <Input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          className="input-styling"
          placeholder="Section title"
        />
      </div>
      <div>
        <Label className="label-styling">Section Subtitle</Label>
        <Input
          value={sectionSubTitle}
          className="input-styling"
          onChange={(e) => setSectionSubTitle(e.target.value)}
          placeholder="Section subtitle"
        />
      </div>

      {/* Add New Card */}
      <button
        className="add-button"
        onClick={() =>
          setEditingCard({ name: "", role: "", description: "", imageUrl: "" })
        }
      >
        Add Card
      </button>

      {/* Cards Grid */}
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card._id || uuidv4()} className="card-item">
            <div className="card-preview">
              {card.imageUrl && (
                <img src={card.imageUrl} alt={card.name} className="card-image" />
              )}
              <div className="card-info">
                <h4 className="card-name">{card.name}</h4>
                <p className="card-role">{card.role}</p>
                <p
                  className="card-description"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                ></p>
              </div>
            </div>

            <div className="card-actions">
              <button className="edit-btn" onClick={() => setEditingCard(card)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setDeleteConfirmId(card._id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {editingCard && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{editingCard._id ? "Edit Card" : "Add Card"}</h4>

            <Label>Name</Label>
            <Input
              value={editingCard.name}
              onChange={(e) =>
                setEditingCard({ ...editingCard, name: e.target.value })
              }
              placeholder="Card name"
            />

            <Label>Role</Label>
            <Input
              value={editingCard.role}
              onChange={(e) =>
                setEditingCard({ ...editingCard, role: e.target.value })
              }
              placeholder="Card role"
            />

            <Label>Description</Label>
            <RichTextEditor
              value={editingCard.description}
              onChange={(val) =>
                setEditingCard({ ...editingCard, description: val })
              }
              charLimit={250}
              placeholder="Enter description..."
            />

            <Label>Image</Label>
            {editingCard.imageUrl && (
              <div className="image-preview mb-2">
                <img
                  src={editingCard.imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )}

            <ImageUploadEl
              data={{
                id: imageComponentData.id,
                text: imageComponentData.text,
                url: editingCard.imageUrl || "",
              }}
              requiredWidth={80}
              requiredHeight={80}
              maxSizeMB={1}
              gettingRemoteUrl={gettingRemoteUrl}
            />

            <div className="modal-actions">
              <button onClick={saveEditCardLocally}>
                {editingCard._id ? "Save" : "Add"}
              </button>
              <button onClick={() => setEditingCard(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this card?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={deleteCardLocally}>
                Confirm
              </button>
              <button onClick={() => setDeleteConfirmId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Update All Button */}
      <button className="update-button-styling-customized" onClick={handleUpdateAll} disabled={saving}>
        {saving ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default TestimonialSectionTwo;
