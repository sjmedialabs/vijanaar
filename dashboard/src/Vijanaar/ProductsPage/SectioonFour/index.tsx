import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import serverErrorPic from "../../../assets/serverErrorPic.png";
import { Select, MenuItem, FormControl, InputLabel, TextField} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";

interface Point {
  description: string;
}

interface CurriculumSection {
  title: string;
  points: Point[];
}

interface Course {
  _id: string;
  bannerSection: {
      courseName: string
  }
  curriculum?: CurriculumSection[];
}

const CourseSectionFour: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coursedetails`);
      setCourses(res.data);
      console.log("Courser Curriculem",res.data.curriculum);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurriculum = async (courseId: string) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coursedetails/${courseId}`);
      setCurriculum(res.data.curriculum || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch curriculum");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (e: SelectChangeEvent<string>) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    fetchCurriculum(courseId);
  };

  // Add new section
  const handleAddSection = () => {
    setCurriculum([...curriculum, { title: "", points: [{ description: "" }] }]);
  };

  // Update section title
  const handleSectionTitleChange = (index: number, value: string) => {
    const updated = [...curriculum];
    updated[index].title = value;
    setCurriculum(updated);
  };

  // Add new point
  const handleAddPoint = (sectionIndex: number) => {
    const updated = [...curriculum];
    updated[sectionIndex].points.push({ description: "" });
    setCurriculum(updated);
  };

  // Update point description
  const handlePointChange = (sectionIndex: number, pointIndex: number, value: string) => {
    const updated = [...curriculum];
    updated[sectionIndex].points[pointIndex].description = value;
    setCurriculum(updated);
  };

  // Delete point
  const handleDeletePoint = (sectionIndex: number, pointIndex: number) => {
    const updated = [...curriculum];
    updated[sectionIndex].points.splice(pointIndex, 1);
    setCurriculum(updated);
  };

  // Delete section
  const handleDeleteSection = (sectionIndex: number) => {
    const updated = [...curriculum];
    updated.splice(sectionIndex, 1);
    setCurriculum(updated);
  };

  // Save/Update curriculum
  const handleSave = async () => {
    if (!selectedCourseId) {
      alert("Please select a course first.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      alert("Unauthorized!");
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourseId}`,
        {
          sectionName: "curriculum",
          data: curriculum,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Curriculum updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update curriculum");
    }
  };

  return (
    <div className="section-four-container">
      <h1 className="main-heading">Curriculum</h1>
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
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <div className="section-four-error-container">
          <img src={serverErrorPic} alt="Server Error" />
          <button onClick={fetchCourses}>Reload</button>
        </div>
      )}

      {!loading && !error && (
        <>
          {selectedCourseId && (
            <div className="curriculum-editor flex gap-8 flex-col">
              {curriculum.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border-2 bg-white border-gray-200 p-4 rounded-lg">
                <div className="curriculum-section">
                  <div className="section-header">
                    <TextField
                      label="Section Title"
                      fullWidth
                      value={section.title}
                      onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                      margin="normal"
                    />
                  </div>

                  <div className="points-list bg-transparent">
                    {section.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="point-item bg-transparent">
                        <Label>{`Point ${pointIndex + 1}`}</Label>
                    <RichTextEditor
                    value={point.description}
                    onChange={(val) => handlePointChange(sectionIndex, pointIndex, val)}
                    charLimit={120}
                    placeholder="Enter point description..."
                  />
                        <div>
                        <button className="delete-button-styling-customized" style={{width:"140px"}} onClick={() => handleDeletePoint(sectionIndex, pointIndex)}>
                          Delete Point
                        </button></div>
                      </div>
                    ))}
                  </div>
                  <div className="space-x-4">
                    <button className="delete-button-styling-customized" style={{width:"140px"}} onClick={() => handleDeleteSection(sectionIndex)}>
                      Delete Section
                    </button>
                  <button className="add-button-styling" style={{width:"140px"}} onClick={() => handleAddPoint(sectionIndex)}>
                    Add Point
                  </button>
                  </div>
                </div>
                </div>
              ))}
        <div className="space-x-4 flex border-spacing-y-4 pt-4">
              <button className="add-button-styling" style={{width:"140px"}} onClick={handleAddSection}>
                Add Section
              </button>
              <div>
              <Button className="update-button-styling-customized" onClick={handleSave}>
                Update
              </Button></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseSectionFour;
