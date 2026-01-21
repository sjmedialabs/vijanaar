"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";

interface Highlight {
  description: string;
}

interface HighLightsSection {
  title: string;
  highlights: Highlight[];
}

interface Course {
  _id: string;
  bannerSection: {
    courseName: string;
  };
  highLightsSection?: HighLightsSection;
}

const CoursesSectionTen: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [highlights, setHighlights] = useState<HighLightsSection>({
    title: "",
    highlights: [],
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all courses
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

  // Fetch selected course details
  useEffect(() => {
    if (!selectedCourseId) return;
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/coursedetails/${selectedCourseId}`
        );
        setHighlights(
          res.data.highLightsSection || { title: "", highlights: [] }
        );
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
      setLoading(false);
    };
    fetchCourseData();
  }, [selectedCourseId, BASE_URL]);

  // Handle highlight description change
  const handleHighlightChange = (index: number, value: string) => {
    setHighlights((prev) => {
      const updated = [...prev.highlights];
      updated[index] = { description: value };
      return { ...prev, highlights: updated };
    });
  };

  // Add new highlight at the top
  const addHighlight = () => {
    setHighlights((prev) => ({
      ...prev,
      highlights: [{ description: "" }, ...prev.highlights],
    }));
  };

  // Remove highlight
  const removeHighlight = (index: number) => {
    setHighlights((prev) => {
      const updated = [...prev.highlights];
      updated.splice(index, 1);
      return { ...prev, highlights: updated };
    });
  };

  // Update highlights section
  const handleUpdate = async () => {
    if (!selectedCourseId) return;
    setUpdating(true);
    const token = Cookies.get("token");

    try {
      // Validate: no empty highlight descriptions
      const hasEmptyHighlight = highlights.highlights.some(
        (highlight) => !highlight.description || highlight.description.trim() === ""
      );

      if (hasEmptyHighlight) {
        alert("Please enter a description for all highlights before saving.");
        setUpdating(false);
        return;
      }

      await axios.patch(
        `${BASE_URL}/coursedetails/${selectedCourseId}`,
        {
          sectionName: "highLightsSection",
          data: highlights,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Highlights section updated successfully!");
    } catch (err) {
      console.error("Error updating section:", err);
      alert("Failed to update highlights section.");
    }

    setUpdating(false);
  };

  return (
    <div className="courses-section-ten">
      <h2 className="main-heading">Highlights</h2>

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

      {!loading && selectedCourseId && (
        <div className="section-content">
          {/* Title */}
          <label>
            Title:
            <RichTextEditor
              value={highlights.title}
              onChange={(val) => setHighlights({ ...highlights, title: val })}
              charLimit={150}
              placeholder="Enter section title..."
            />
          </label>

          {/* Add highlight button */}
          <button
            type="button"
            className="add-button-styling"
            style={{ width: "140px" }}
            onClick={addHighlight}
          >
            Add Highlight
          </button>

          {/* Highlights list */}
          <div className="highlight-list">
            <h4 className="sub-sub-title">Highlights</h4>
            <div className="flex flex-wrap gap-10">
              {highlights.highlights.map((item, index) => (
                <div key={index} className="highlight-card">
                  <label>
                    Description:
                    <RichTextEditor
                      value={item.description}
                      onChange={(val) => handleHighlightChange(index, val)}
                      charLimit={150}
                      placeholder="Enter highlight description..."
                    />
                  </label>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeHighlight(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save changes */}
          <button
            className="update-button"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesSectionTen;
