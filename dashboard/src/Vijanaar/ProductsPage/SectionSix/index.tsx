import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import serverErrorPic from "../../../assets/serverErrorPic.png";
import { Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";

interface Advantage {
  description: string;
}

interface AdvantagesSection {
  title: string;
  advantages: Advantage[];
}

interface Course {
  _id: string;
  bannerSection: { courseName: string };
  advantagesSection?: AdvantagesSection;
}

const CoursesSectionSix: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [advantagesSection, setAdvantagesSection] = useState<AdvantagesSection>({
    title: "",
    advantages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coursedetails`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch course by ID
  const fetchCourseDetails = async (courseId: string) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coursedetails/${courseId}`);
      setAdvantagesSection(res.data.advantagesSection || { title: "", advantages: [] });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (e: SelectChangeEvent<string>) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    fetchCourseDetails(courseId);
  };

  // Add/Edit/Delete advantages
  const handleAddAdvantage = () => {
    setAdvantagesSection({
      ...advantagesSection,
      advantages: [ { description: "" },...advantagesSection.advantages],
    });
  };

  const handleAdvantageChange = (index: number, value: string) => {
    const updated = [...advantagesSection.advantages];
    updated[index].description = value;
    setAdvantagesSection({ ...advantagesSection, advantages: updated });
  };

  const handleDeleteAdvantage = (index: number) => {
    const updated = [...advantagesSection.advantages];
    updated.splice(index, 1);
    setAdvantagesSection({ ...advantagesSection, advantages: updated });
  };

  const handleTitleChange = (value: string) => {
    setAdvantagesSection({ ...advantagesSection, title: value });
  };

 const handleSave = async () => {
  if (!selectedCourseId) return alert("Please select a course first.");

  const token = Cookies.get("token");
  if (!token) return alert("Unauthorized!");

  // ✅ Check if the section title is empty
  if (!advantagesSection.title.trim()) {
    return alert("Please enter a title for the advantages section.");
  }

  // ✅ Check if any advantage description is empty
  const emptyAdvantage = advantagesSection.advantages.find(
    (adv) => !adv.description.trim()
  );
  if (emptyAdvantage) {
    return alert("Please fill in all advantage descriptions before saving.");
  }

  try {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourseId}`,
      {
        sectionName: "advantagesSection",
        data: advantagesSection,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Advantages Section updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update Advantages Section");
  }
};


  return (
    <div className="section-six-container">
      <h1 className="main-heading">Advantages</h1>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <div className="section-six-error-container">
          <img src={serverErrorPic} alt="Server Error" />
          <button onClick={fetchCourses}>Reload</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Course</InputLabel>
            <Select value={selectedCourseId} onChange={handleCourseChange} label="Select Course">
              <MenuItem value="">-- Select a Course --</MenuItem>
              {courses.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.bannerSection.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCourseId && (
            <div className="advantages-editor">
              <Label htmlFor="inputTitle" className='label-styling'>Title</Label>
             
              <Input
                type="text"
                id="inputTitle"
                placeholder="Enter slide title"
                className='input-styling'
                value={advantagesSection.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />

              <button className="add-button-styling mt-5" onClick={handleAddAdvantage}>
                Add
              </button>


              {advantagesSection.advantages.map((adv, index) => (
                <div key={index} className="advantage-item">
                  <Label className="label-styling mb-0">{`Advantage ${index + 1}`}</Label>
                  <RichTextEditor
                    value={adv.description}
                    onChange={(val) => handleAdvantageChange(index, val)}
                    charLimit={100} // ✅ 100-character limit
                    placeholder="Enter advantage description..."
                  />
                <div>
                  <button className="delete-button-styling-customized" onClick={() => handleDeleteAdvantage(index)}>
                    Delete
                  </button></div>
                </div>
              ))}

              
              <button className="update-button-styling-customized mt-5" onClick={handleSave}>
                update
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesSectionSix;
