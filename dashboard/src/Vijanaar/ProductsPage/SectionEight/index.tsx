"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";
import ImageUploadEl from "../../ImageUpload";
import RichTextEditor from "../../../components/RichTextEditor/richtexteditor";

interface Point {
  imageeUrl: string; // ✅ updated
  description: string;
}

interface VideoSection {
  videoUrl: string;
}

interface EnrollSection {
  title: string;
  description: string;
  points: Point[];
}

interface Course {
  _id: string;
  bannerSection: {
    courseName: string;
  };
  videoSection?: VideoSection;
  enrollSection?: EnrollSection;
}

const CoursesSectionEight: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const [videoSection, setVideoSection] = useState<VideoSection>({ videoUrl: "" });
  const [enrollSection, setEnrollSection] = useState<EnrollSection>({
    title: "",
    description: "",
    points: [],
  });

  const [loading, setLoading] = useState(false);
  const [updatingVideo, setUpdatingVideo] = useState(false);
  const [updatingEnroll, setUpdatingEnroll] = useState(false);

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
        const res = await axios.get(`${BASE_URL}/coursedetails/${selectedCourseId}`);
        setVideoSection(res.data.videoSection || { videoUrl: "" });
        setEnrollSection(
          res.data.enrollSection || { title: "", description: "", points: [] }
        );
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
      setLoading(false);
    };
    fetchCourseData();
  }, [selectedCourseId, BASE_URL]);

  // Handle point changes
  const handlePointChange = (index: number, field: keyof Point, value: string) => {
    const updatedPoints = [...enrollSection.points];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    setEnrollSection({ ...enrollSection, points: updatedPoints });
  };

  // Add new point at top
  const addPoint = () => {
    setEnrollSection({
      ...enrollSection,
      points: [{ imageeUrl: "", description: "" }, ...enrollSection.points],
    });
  };

  // Remove point
  const removePoint = (index: number) => {
    const updatedPoints = [...enrollSection.points];
    updatedPoints.splice(index, 1);
    setEnrollSection({ ...enrollSection, points: updatedPoints });
  };

  // Image upload callback
  const handleImageUpload = (index: number, url: string) => {
    handlePointChange(index, "imageeUrl", url);
  };

  // Update video section
  const updateVideoSection = async () => {
    if (!selectedCourseId) return;
    setUpdatingVideo(true);
    const token = Cookies.get("token");

    try {
      await axios.patch(
        `${BASE_URL}/coursedetails/${selectedCourseId}`,
        { sectionName: "videoSection", data: videoSection },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Video section updated successfully!");
    } catch (err) {
      console.error("Error updating video section:", err);
      alert("Failed to update video section.");
    }
    setUpdatingVideo(false);
  };

  // Update enroll section
  const updateEnrollSection = async () => {
    if (!selectedCourseId) return;
    setUpdatingEnroll(true);
    const token = Cookies.get("token");

    try {
      // Validate all points have image
      const hasEmptyImage = enrollSection.points.some(
        (point) => !point.imageeUrl || point.imageeUrl.trim() === ""
      );

      if (hasEmptyImage) {
        alert("Please upload an image for all points before saving.");
        setUpdatingEnroll(false);
        return;
      }

      await axios.patch(
        `${BASE_URL}/coursedetails/${selectedCourseId}`,
        { sectionName: "enrollSection", data: enrollSection },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Enroll section updated successfully!");
    } catch (err) {
      console.error("Error updating enroll section:", err);
      alert("Failed to update enroll section.");
    }

    setUpdatingEnroll(false);
  };

  return (
    <div className="courses-section-eight">
      <h2 className="main-heading">Videos & Enroll</h2>

      {/* Course dropdown */}
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
          {/* Video Section */}
          <div className="video-section">
            <h3 className="sub-title">Video Section</h3>
            <label>
              Video URL:
              <input
                type="text"
                className="input-field"
                value={videoSection.videoUrl}
                onChange={(e) =>
                  setVideoSection({ ...videoSection, videoUrl: e.target.value })
                }
              />
            </label>
            <button
              className="update-button-styling-customized"
              style={{ width: "140px" }}
              onClick={updateVideoSection}
              disabled={updatingVideo}
            >
              {updatingVideo ? "Updating..." : "Update Video"}
            </button>
          </div>

          {/* Enroll Section */}
          <div className="enroll-section">
            <h3 className="sub-title">Enroll Section</h3>

            <label style={{ display: "block", marginBottom: "10px" }}>Title:</label>
            <RichTextEditor
              value={enrollSection.title}
              onChange={(val) => setEnrollSection({ ...enrollSection, title: val })}
              charLimit={100}
              placeholder="Enter title..."
            />

            <label style={{ display: "block", marginTop: "15px", marginBottom: "10px" }}>
              Description:
            </label>
            <RichTextEditor
              value={enrollSection.description}
              onChange={(val) =>
                setEnrollSection({ ...enrollSection, description: val })
              }
              charLimit={100}
              placeholder="Enter description..."
            />

            {/* Points */}
            <div className="points-list">
              <h4 className="sub-sub-title">Points</h4>
              <button
                type="button"
                className="add-button-styling"
                onClick={addPoint}
                style={{ width: "140px" }}
              >
                Add Point
              </button>

              <div className="flex flex-wrap justify-start gap-10 mt-4">
                {enrollSection.points.map((point, index) => (
                  <div key={index} className="point-card">
                    <ImageUploadEl
                      data={{
                        id: `point-${index}`,
                        text: "Upload Image",
                        url: point.imageeUrl, // ✅ updated
                      }}
                      requiredWidth={32}
                      requiredHeight={32}
                      maxSizeMB={1}
                      gettingRemoteUrl={(_id, url) => handleImageUpload(index, url)}
                    />
                    {point.imageeUrl && (
                      <img src={point.imageeUrl} alt="Preview" className="preview-img w-32" />
                    )}

                    <label style={{ display: "block", marginTop: "10px" }}>Description:</label>
                    <RichTextEditor
                      value={point.description}
                      onChange={(val) => handlePointChange(index, "description", val)}
                      charLimit={200}
                      placeholder="Enter point description..."
                    />

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removePoint(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="update-button"
              onClick={updateEnrollSection}
              disabled={updatingEnroll}
              style={{ marginTop: "20px" }}
            >
              {updatingEnroll ? "Updating..." : "Update Enroll Section"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesSectionEight;
