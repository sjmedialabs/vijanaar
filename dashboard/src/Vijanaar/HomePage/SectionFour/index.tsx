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

interface Point {
  id: string;
  heading: string;
  description: string;
}

interface SectionFourData {
  title: string;
  subTitle: string;
  description: string;
  points: Point[];
  image: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const HomePageSectionFour: React.FC = () => {
  const [data, setData] = useState<SectionFourData>({
    title: "",
    subTitle: "",
    description: "",
    points: [],
    image: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/homepage`, getAuthHeaders());
        if (res.data?.sectionThree) {
          const sectionThree = res.data.sectionThree;
          setData({
            title: sectionThree.title || "",
            subTitle: sectionThree.subTitle || "",
            description: sectionThree.description || "",
            points: (sectionThree.points || []).map((p: any) => ({
              id: uuidv4(),
              heading: p.title || "",
              description: p.description || "",
            })),
            image: sectionThree.imageUrl || "",
          });
        }
      } catch (err) {
        console.error("Error fetching sectionThree:", err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const updateField = (field: keyof SectionFourData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePoint = (id: string, field: keyof Point, value: string) => {
    setData((prev) => ({
      ...prev,
      points: prev.points.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const addPoint = () => {
  setData((prev) => ({
    ...prev,
    points: [{ id: uuidv4(), heading: "", description: "" }, ...prev.points],
  }));
};


  const deletePoint = (id: string) => {
    if(window.confirm("Are you sure you want to delete this point?")){
      setData((prev) => ({
      ...prev,
      points: prev.points.filter((p) => p.id !== id),
    }));
    }
    
  };

  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    updateField("image", receivedUrl);
  };

  const saveHandler = async () => {
   
    if (!data.title.trim() && !data.subTitle.trim() && !data.description.trim()) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }

    // check if any point is empty
      const hasEmptyPoint = data.points.some(
        (p) => !p.heading.trim() || !p.description.trim()
      );

      if (hasEmptyPoint) {
        setError(true);
        setTimeout(() => setError(false), 4000);
        return;
      }

    try {
      const payload = {
        sectionName: "sectionThree",
        data: {
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          points: data.points.map((p) => ({ title: p.heading, description: p.description })),
          imageUrl: data.image,
        },
      };

      await axios.patch(`${API_BASE}/homepage`, payload, getAuthHeaders());
      setSuccess(true);
      setError(false);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error updating sectionThree:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };

  return (
    <div className="homepage-section4">
      <h1 className="main-heading">About</h1>

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
          <Alert severity="success">Section 4 updated successfully.</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Please fill all the cards.</Alert>
        </Stack>
      )}
     </div>

      {/* Title */}
      <div className="form-group flex flex-col md:flex-row items-start gap-10">
         <div>
            <Label htmlFor="section4Title" className="label-styling">Title</Label>
          <Input
            type="text"
            id="section4Title"
            placeholder="Enter section 4 title"
            className="input-styling"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
         </div>
         <div>
          <Label htmlFor="section4SubTitle" className="label-styling">Subtitle</Label>
          <Input
            type="text"
            id="section4SubTitle"
            placeholder="Enter section 4 subtitle"
            className="input-styling"
            value={data.subTitle}
            onChange={(e) => updateField("subTitle", e.target.value)}
          />
         </div>
      </div>

     
        <button className="add-button-styling" onClick={addPoint}>
          Add Point
        </button>
    

      {/* Points */}
      <div className="points-container">
        <h3 className="points-heading">Points</h3>
        <div className=" flex flex-wrap gap-10">
           {data.points.map((point) => (
          <div key={point.id} className="point-item">
            <Input
              type="text"
              placeholder="Point heading"
              className="input-styling"
              value={point.heading}
              onChange={(e) => updatePoint(point.id, "heading", e.target.value)}
            />
            <RichTextEditor
              value={point.description}
              onChange={(val) => updatePoint(point.id, "description", val)}
              charLimit={250} // <-- Word limit for point descriptions
              placeholder="Enter point description..."
            />
            <button className="delete-button-styling-customized" onClick={() => deletePoint(point.id)}>
              Delete
            </button>
          </div>
        ))}
        </div>
      </div>

      {/* Image */}
      {data.image && (
        <div className="preview">
          <p>Preview:</p>
          <img src={data.image} alt="Section 4" />
        </div>
      )}

      <ImageUploadEl
        data={{ id: "section4-image", text: "Upload section 4 image", url: data.image }}
          requiredWidth={540}       // minimum width in pixels
          requiredHeight={450}      // minimum height in pixels
          maxSizeMB={1} 
        gettingRemoteUrl={gettingRemoteUrl}
      />

      {/* Save button */}
     
        <button className="update-button-styling-customized mt-5" onClick={saveHandler}>
          Update
        </button>
      
    </div>
  );
};

export default HomePageSectionFour;
