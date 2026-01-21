"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import ImageUploadEl from "../../ImageUpload"; // adjust path if needed
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor"; // ✅ RichTextEditor
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

interface Tool {
  imageUrl: string;
  description: string;
}

interface ToolsSection {
  title: string;
  tools: Tool[];
}

interface Course {
  _id: string;
  bannerSection: {
    courseName: string;
  };
  toolsSection?: ToolsSection;
}

const CoursesSectionSeven: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseData, setCourseData] = useState<ToolsSection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all courses for dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/coursedetails`);
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, [BASE_URL]);

  // Fetch specific course data when selected
  useEffect(() => {
    if (!selectedCourseId) return;
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/coursedetails/${selectedCourseId}`);
        setCourseData(res.data.toolsSection || { title: "", tools: [] });
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
      setLoading(false);
    };
    fetchCourseData();
  }, [selectedCourseId, BASE_URL]);

  // Handle title change
  const handleTitleChange = (value: string) => {
    if (!courseData) return;
    setCourseData({ ...courseData, title: value });
  };

  // Handle tool description change
  const handleToolChange = (index: number, field: keyof Tool, value: string) => {
    if (!courseData) return;
    const updatedTools = [...courseData.tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    setCourseData({ ...courseData, tools: updatedTools });
  };

  // Add a new empty tool
  const handleAddTool = () => {
    if (!courseData) return;
    setCourseData({
      ...courseData,
      tools: [...courseData.tools, { imageUrl: "", description: "" }],
    });
  };

  // Delete a tool by index
  const handleDeleteTool = (index: number) => {
    if (!courseData) return;
    const updatedTools = courseData.tools.filter((_, i) => i !== index);
    setCourseData({ ...courseData, tools: updatedTools });
  };

  // Handle uploaded image URL
  const handleImageUpload = (id: string, url: string) => {
    if (!courseData) return;
    const toolIndex = parseInt(id.split("-")[1]); // e.g. tool-0, tool-1
    if (isNaN(toolIndex)) return;
    const updatedTools = [...courseData.tools];
    updatedTools[toolIndex].imageUrl = url;
    setCourseData({ ...courseData, tools: updatedTools });
  };

  // Update API call (PATCH) with validation for images
  const handleUpdate = async () => {
    if (!courseData || !selectedCourseId) return;

    // ✅ Validation: every tool must have an image
    const missingImage = courseData.tools.find((tool) => !tool.imageUrl.trim());
    if (missingImage) {
      return alert("Please upload an image for all tool cards before updating.");
    }

    setUpdating(true);
    const token = Cookies.get("token");

    try {
      await axios.patch(
        `${BASE_URL}/coursedetails/${selectedCourseId}`,
        {
          sectionName: "toolsSection",
          data: courseData,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Course tools updated successfully!");
    } catch (err) {
      console.error("Error updating course tools:", err);
      alert("Failed to update course tools.");
    }
    setUpdating(false);
  };

  return (
    <div className="courses-section-seven">
      <h2 className="main-heading">Languages & Tools</h2>

      {/* Dropdown */}
      <select
        className="course-dropdown"
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
      >
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.bannerSection.courseName}
          </option>
        ))}
      </select>

      {loading && <p className="loading-text">Loading course data...</p>}

      {/* Course Tools Section */}
      {courseData && (
        <div className="tools-container">
          {/* Editable Tools Section Title */}
          <div>
            <Label htmlFor="tiltle1" className="label-styling">
              Title
            </Label>
            <Input
              type="text"
              id="tiltle1"
              value={courseData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="input-styling"
            />
          </div>

          {/* Add Tool Button */}
          <Button className="add-button-styling mt-5" onClick={handleAddTool}>
            Add
          </Button>

          {/* Tool Cards */}
          <div className="flex justify-start flex-wrap gap-10 mt-5">
            {courseData.tools.map((tool, index) => (
              <div key={index} className="tool-card">
                <div className="flex justify-between items-center">
                  <label>Upload Tool Image:</label>
                </div>
                <p className="label-styling mb-0">Preview:</p>
                {tool.imageUrl && (
                  <img
                    src={tool.imageUrl}
                    alt="Tool Preview"
                    style={{ width: "100px", borderRadius: "6px" }}
                  />
                )}
                <ImageUploadEl
                  data={{
                    id: `tool-${index}`,
                    text: "Tool Image",
                    url: "Upload",
                  }}
                  requiredWidth={85}
                  requiredHeight={85}
                  maxSizeMB={1}
                  gettingRemoteUrl={handleImageUpload}
                />

                <label style={{ marginTop: "10px" }}>Description:</label>
                <RichTextEditor
                  value={tool.description}
                  onChange={(val) => handleToolChange(index, "description", val)}
                  charLimit={50} // ✅ 50-character limit
                  placeholder="Enter tool description..."
                />
                <Button
                    className="delete-button-styling-customized"
                    onClick={() => handleDeleteTool(index)}
                  >
                    Delete
                  </Button>
              </div>
            ))}
          </div>

          {/* Update Button */}
          <Button
            className="update-button-styling-customized mt-5"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating.." : "Update"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoursesSectionSeven;
