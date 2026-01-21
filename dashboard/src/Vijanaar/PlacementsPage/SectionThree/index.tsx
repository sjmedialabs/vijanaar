"use client";
import { useState, useEffect } from "react";
import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from "../../ImageUpload";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookies from "js-cookie";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";

type SuccessStory = {
  id?: string; // local UUID
  congratsImage?: string;
  name: string;
  role: string;
  companyLogo?: string;
  salary: string;
  bottomText1: string;
  bottomText2: string;
};

const PlacementPageSectionThree = () => {
  const [title, setTitle] = useState("Our Success Stories 🎉");
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const token = Cookies.get("token");

  // ✅ Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/placementpage`);
        if (res.status === 200 && res.data?.sectionTwo) {
          const section = res.data.sectionTwo;
          setTitle(section.title || "Our Success Stories 🎉");
          setStories(
            section.stories?.map((story: any) => ({
              id: uuidv4(),
              congratsImage: story.imageUrl || "",
              name: story.name || "",
              role: story.role || "",
              companyLogo: story.companyLogoUrl || "",
              salary: story.package ? `${story.package} LPA` : "",
              bottomText1: story.description1 || "",
              bottomText2: story.description2 || "",
            })) || []
          );
        }
      } catch (err) {
        console.error("Failed to fetch sectionTwo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Add or Update local story
  const saveEditStory = () => {
    if (!editingStory) return;
    if (!editingStory.name.trim() || !editingStory.role.trim() || !editingStory.salary.trim()) {
      alert("All fields are required!");
      return;
    }

    if (editingStory.id && stories.find((s) => s.id === editingStory.id)) {
      // Update existing
      setStories((prev) => prev.map((s) => (s.id === editingStory.id ? editingStory : s)));
    } else {
      // Add new story (new card at the top)
      setStories((prev) => [{ ...editingStory, id: uuidv4() }, ...prev]);
    }

    setEditingStory(null);
  };

  // ✅ Delete local story
  const deleteStory = () => {
    if (!deleteConfirmId) return;
    setStories((prev) => prev.filter((s) => s.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  // ✅ Single API call to update entire sectionTwo
  const handleUpdateSection = async () => {
    setUpdating(true);
    try {
      const formattedStories = stories.map((story) => ({
        imageUrl: story.congratsImage || "",
        name: story.name,
        role: story.role,
        companyLogoUrl: story.companyLogo || "",
        package: Number(story.salary.replace(" LPA", "")) || 0,
        description1: story.bottomText1,
        description2: story.bottomText2,
      }));

      const payload = {
        sectionName: "sectionTwo",
        data: {
          title,
          stories: formattedStories,
        },
      };

      await axios.patch(`${API_BASE}/placementpage`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Section updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update section.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mica-section-four">
      <h2 className="main-heading">Success Stories</h2>

      <Label className="label-styling">Title</Label>
      <Input
        value={title}
        className="input-styling"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Section title"
      />

      <div style={{ marginTop: "10px" }}>
        <button
          className="add-button"
          onClick={() =>
            setEditingStory({ name: "", role: "", salary: "", bottomText1: "", bottomText2: "" })
          }
        >
          Add Success Story
        </button>
      </div>

      <div className="subproducts-grid">
        {stories.map((story) => (
          <div key={story.id} className="success-card">
            {story.congratsImage && <img src={story.congratsImage} alt="Congrats" className="congrats-img" />}
            <h3 className="story-name">{story.name}</h3>
            <p className="story-role">{story.role}</p>
            {story.companyLogo && <img src={story.companyLogo} alt="Company" className="company-logo" />}
            <p className="story-salary">{story.salary}</p>
            <div className="story-bottom-texts">
              <p>{story.bottomText1}</p>
              <p>{story.bottomText2}</p>
            </div>
            <div className="subproduct-actions">
              <button onClick={() => setEditingStory(story)}>Edit</button>
              <button onClick={() => setDeleteConfirmId(story.id!)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Single Update Section Button */}
      <div style={{ marginTop: "20px" }}>
        <button className="update-button-styling-customized" onClick={handleUpdateSection} disabled={updating}>
          {updating ? "Updating..." : "Update"}
        </button>
      </div>

      {/* Add/Edit Modal */}
      {editingStory && (
        <div className="modal-overlay mt-10">
          <div className="modal-content scrollable-modal">
            <h4>{editingStory.id ? "Edit Success Story" : "Add Success Story"}</h4>

            <Label>Congratulations Image</Label>
            <ImageUploadEl
              data={{ id: uuidv4(), text: "Upload congratulations image", url: editingStory?.congratsImage || "" }}
              requiredWidth={350}
              requiredHeight={90}
              maxSizeMB={1}
              gettingRemoteUrl={(_id, url) =>
                setEditingStory((prev) => (prev ? { ...prev, congratsImage: url } : prev))
              }
            />

            <Label>Name</Label>
            <Input
              value={editingStory.name}
              onChange={(e) => setEditingStory({ ...editingStory, name: e.target.value })}
              placeholder="Name"
            />

            <Label>Role</Label>
            <Input
              value={editingStory.role}
              onChange={(e) => setEditingStory({ ...editingStory, role: e.target.value })}
              placeholder="Role"
            />

            <Label>Company Logo</Label>
            <ImageUploadEl
              data={{ id: uuidv4(), text: "Upload company logo", url: editingStory?.companyLogo || "" }}
              requiredWidth={65}
              requiredHeight={50}
              maxSizeMB={1}
              gettingRemoteUrl={(_id, url) =>
                setEditingStory((prev) => (prev ? { ...prev, companyLogo: url } : prev))
              }
            />

            <Label>Salary Package</Label>
            <Input
              value={editingStory.salary}
              onChange={(e) => setEditingStory({ ...editingStory, salary: e.target.value })}
              placeholder="e.g. 4.5 LPA"
            />

            <Label>Bottom Text 1</Label>
            <RichTextEditor
              value={editingStory.bottomText1}
              onChange={(val) =>
                setEditingStory((prev) => (prev ? { ...prev, bottomText1: val } : prev))
              }
              charLimit={100}
              placeholder="Enter first bottom text"
            />

            <Label>Bottom Text 2</Label>
            <RichTextEditor
              value={editingStory.bottomText2}
              onChange={(val) =>
                setEditingStory((prev) => (prev ? { ...prev, bottomText2: val } : prev))
              }
              charLimit={100}
              placeholder="Enter second bottom text"
            />

            <div className="modal-actions">
              <button onClick={saveEditStory}>{editingStory.id ? "Update" : "Save"}</button>
              <button onClick={() => setEditingStory(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this success story?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={deleteStory}>
                Confirm
              </button>
              <button onClick={() => setDeleteConfirmId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementPageSectionThree;
