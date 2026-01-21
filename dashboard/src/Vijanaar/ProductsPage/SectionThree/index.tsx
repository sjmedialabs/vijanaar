import React, { useEffect, useState } from "react";
import "./index.css";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import serverErrorPic from "../../../assets/serverErrorPic.png";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // ✅ Use RichTextEditor

interface Course {
  _id: string;
  bannerSection: {
    courseName: string;
  };
  sectionTwo?: {
    title: string;
    description1: string;
    description2: string;
  };
}

const CoursesSectionThree: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // form state
  const [secTwoTitle, setSecTwoTitle] = useState("");
  const [secTwoDesc1, setSecTwoDesc1] = useState("");
  const [secTwoDesc2, setSecTwoDesc2] = useState("");

  // Fetch all courses for dropdown
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

  // Fetch specific course when selected
  const fetchCourseDetails = async (courseId: string) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coursedetails/${courseId}`);
      const course: Course = res.data;
      setSecTwoTitle(course.sectionTwo?.title || "");
      setSecTwoDesc1(course.sectionTwo?.description1 || "");
      setSecTwoDesc2(course.sectionTwo?.description2 || "");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (event: any) => {
    const courseId = event.target.value;
    setSelectedCourseId(courseId);
    fetchCourseDetails(courseId);
  };

  // Save/Update SectionTwo
  const handleSaveOrUpdate = async () => {
    if (!selectedCourseId) {
      alert("Please select a course first.");
      return;
    }
    if (!secTwoTitle.trim() || !secTwoDesc1.trim() || !secTwoDesc2.trim()) {
      alert("Please fill all fields.");
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
          sectionName: "sectionTwo",
          data: {
            title: secTwoTitle,
            description1: secTwoDesc1,
            description2: secTwoDesc2,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Section Two updated successfully!");
      fetchCourseDetails(selectedCourseId);
    } catch (err) {
      console.error(err);
      alert("Failed to update Section Two");
    }
  };

  return (
    <div className="products-page-container">
      <h1 className="main-heading">
       Overview
      </h1>

      {/* Dropdown for courses */}
     <FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel id="course-select-label">Select Course</InputLabel>
  <Select
    labelId="course-select-label"
    id="course-select"
    value={selectedCourseId}
    label="Select Course"
    onChange={handleCourseChange}
  >
    {courses.map((c) => (
      <MenuItem key={c._id} value={c._id}>
        {c.bannerSection?.courseName || c._id}
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
        <div className="products-page-error-message-container">
          <img src={serverErrorPic} alt="Server Error" />
          <button onClick={fetchCourses}>Reload</button>
        </div>
      )}

      {!loading && !error && selectedCourseId && (
        <>
         <div>
           <Label className="label-styling">Title</Label>
          <Input
            value={secTwoTitle}
            onChange={(e) => setSecTwoTitle(e.target.value)}
            className="input-styling"
            placeholder="Section Two Title"
          />
         </div>

          {/* Description 1 */}
          <Label>Description 1</Label>
          <RichTextEditor
            value={secTwoDesc1}
            onChange={(val) => setSecTwoDesc1(val)}
            charLimit={350}
            placeholder="Enter Description 1..."
          />

          {/* Description 2 */}
          <Label>Description 2</Label>
          <RichTextEditor
            value={secTwoDesc2}
            onChange={(val) => setSecTwoDesc2(val)}
            charLimit={350}
            placeholder="Enter Description 2..."
          />

          <button
            type="button"
            onClick={handleSaveOrUpdate}
            className="update-button-styling-customized"
          >
            Update
          </button>
        </>
      )}
    </div>
  );
};

export default CoursesSectionThree;
