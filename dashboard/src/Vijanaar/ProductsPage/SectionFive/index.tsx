import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import serverErrorPic from "../../../assets/serverErrorPic.png";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import "./index.css";
import Label from "../../../components/form/Label";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // ✅ Use RichTextEditor
import Button from "../../../components/ui/button/Button";

interface Training {
  description1: string;
  description2: string;
}

interface Course {
  _id: string;
  bannerSection: {
    courseName: string;
  };
  onlineTraining?: Training;
  SelfplaceTraining?: Training;
  classroomTraining?: Training;
  CorporateTraining?: Training;
}

const CoursesSectionFive: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [onlineTraining, setOnlineTraining] = useState<Training>({
    description1: "",
    description2: "",
  });
  const [selfplaceTraining, setSelfplaceTraining] = useState<Training>({
    description1: "",
    description2: "",
  });
  const [classroomTraining, setClassroomTraining] = useState<Training>({
    description1: "",
    description2: "",
  });
  const [corporateTraining, setCorporateTraining] = useState<Training>({
    description1: "",
    description2: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails`
      );
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (courseId: string) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${courseId}`
      );
      const course: Course = res.data;

      setOnlineTraining(course.onlineTraining || { description1: "", description2: "" });
      setSelfplaceTraining(course.SelfplaceTraining || { description1: "", description2: "" });
      setClassroomTraining(course.classroomTraining || { description1: "", description2: "" });
      setCorporateTraining(course.CorporateTraining || { description1: "", description2: "" });
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

  const handleUpdate = async (sectionName: string, data: Training) => {
    if (!selectedCourseId) return alert("Please select a course first.");
    const token = Cookies.get("token");
    if (!token) return alert("Unauthorized!");
    if(data.description1.trim()==="" || data.description2.trim()==="") return alert("Required all fields")

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourseId}`,
        { sectionName, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${sectionName} updated successfully!`);
      fetchCourseDetails(selectedCourseId);
    } catch (err) {
      console.error(err);
      alert(`Failed to update ${sectionName}`);
    }
  };

  return (
    <div className="section-five-container">
      <h1 className="main-heading">Training Options</h1>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <div className="section-five-error-container">
          <img src={serverErrorPic} alt="Server Error" />
          <button onClick={fetchCourses}>Reload</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Course</InputLabel>
            <Select
              value={selectedCourseId}
              onChange={handleCourseChange}
              label="Select Course"
            >
              <MenuItem value="">-- Select a Course --</MenuItem>
              {courses.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.bannerSection.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCourseId && (
            <div className="trainings-editor">
              {/* Online Training */}
              <h2>Online Training</h2>
              <Label>Description 1</Label>
              <RichTextEditor
                value={onlineTraining.description1}
                onChange={(val) => setOnlineTraining({ ...onlineTraining, description1: val })}
                charLimit={250}
                placeholder="Enter description 1..."
              />
              <Label>Description 2</Label>
              <RichTextEditor
                value={onlineTraining.description2}
                onChange={(val) => setOnlineTraining({ ...onlineTraining, description2: val })}
                charLimit={250}
                placeholder="Enter description 2..."
              />
              <Button onClick={() => handleUpdate("onlineTraining", onlineTraining)}>Update Online Training</Button>

              {/* Selfplace Training */}
              <h2>Selfplace Training</h2>
              <Label>Description 1</Label>
              <RichTextEditor
                value={selfplaceTraining.description1}
                onChange={(val) => setSelfplaceTraining({ ...selfplaceTraining, description1: val })}
                charLimit={250}
                placeholder="Enter description 1..."
              />
              <Label>Description 2</Label>
              <RichTextEditor
                value={selfplaceTraining.description2}
                onChange={(val) => setSelfplaceTraining({ ...selfplaceTraining, description2: val })}
                charLimit={250}
                placeholder="Enter description 2..."
              />
              <Button onClick={() => handleUpdate("SelfplaceTraining", selfplaceTraining)}>Update Selfplace Training</Button>

              {/* Classroom Training */}
              <h2>Classroom Training</h2>
              <Label>Description 1</Label>
              <RichTextEditor
                value={classroomTraining.description1}
                onChange={(val) => setClassroomTraining({ ...classroomTraining, description1: val })}
                charLimit={250}
                placeholder="Enter description 1..."
              />
              <Label>Description 2</Label>
              <RichTextEditor
                value={classroomTraining.description2}
                onChange={(val) => setClassroomTraining({ ...classroomTraining, description2: val })}
                charLimit={250}
                placeholder="Enter description 2..."
              />
              <Button onClick={() => handleUpdate("classroomTraining", classroomTraining)}>Update Classroom Training</Button>

              {/* Corporate Training */}
              <h2>Corporate Training</h2>
              <Label>Description 1</Label>
              <RichTextEditor
                value={corporateTraining.description1}
                onChange={(val) => setCorporateTraining({ ...corporateTraining, description1: val })}
                charLimit={250}
                placeholder="Enter description 1..."
              />
              <Label>Description 2</Label>
              <RichTextEditor
                value={corporateTraining.description2}
                onChange={(val) => setCorporateTraining({ ...corporateTraining, description2: val })}
                charLimit={250}
                placeholder="Enter description 2..."
              />
              <Button onClick={() => handleUpdate("CorporateTraining", corporateTraining)}>Update Corporate Training</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesSectionFive;
