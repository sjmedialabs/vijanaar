"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

interface Job {
  jobTitle: string;
}

interface OpportunitiesSection {
  title: string;
  jobs: Job[];
}

interface Course {
  _id: string;
  bannerSection: {
    courseName: string;
  };
  oppurtunitiesSection?: OpportunitiesSection;
}

const CoursesSectionNine: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [opportunities, setOpportunities] = useState<OpportunitiesSection>({
    title: "",
    jobs: [],
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
        const res = await axios.get(`${BASE_URL}/coursedetails/${selectedCourseId}`);
        setOpportunities(
          res.data.oppurtunitiesSection || { title: "", jobs: [] }
        );
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
      setLoading(false);
    };
    fetchCourseData();
  }, [selectedCourseId, BASE_URL]);

  // Handle job changes
  const handleJobChange = (index: number, value: string) => {
    const updatedJobs = [...opportunities.jobs];
    updatedJobs[index] = { jobTitle: value };
    setOpportunities({ ...opportunities, jobs: updatedJobs });
  };

  const addJob = () => {
    setOpportunities({
      ...opportunities,
      jobs: [{ jobTitle: "" }, ...opportunities.jobs],
    });
  };

  const removeJob = (index: number) => {
    const updatedJobs = [...opportunities.jobs];
    updatedJobs.splice(index, 1);
    setOpportunities({ ...opportunities, jobs: updatedJobs });
  };

 const handleUpdate = async () => {
  if (!selectedCourseId) return;
  setUpdating(true);
  const token = Cookies.get("token");

  try {
    // Validate: no empty job titles
    const hasEmptyJob = opportunities.jobs.some(
      (job) => !job.jobTitle || job.jobTitle.trim() === ""
    );

    if (hasEmptyJob) {
      alert("Please enter a job title for all opportunities before saving.");
      setUpdating(false);
      return;
    }

    await axios.patch(
      `${BASE_URL}/coursedetails/${selectedCourseId}`,
      {
        sectionName: "oppurtunitiesSection",
        data: opportunities,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Opportunities section updated successfully!");
  } catch (err) {
    console.error("Error updating section:", err);
    alert("Failed to update opportunities section.");
  }

  setUpdating(false);
};

  return (
    <div className="courses-section-nine">
      <h2 className="main-heading">Manage Opportunities</h2>

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
          <div>
            <Label className="label-styling"> 
            Title:
          </Label>

            <Input
              type="text"
              className="input-styling"
              value={opportunities.title}
              onChange={(e) =>
                setOpportunities({ ...opportunities, title: e.target.value })
              }
            />
          </div>

          <button type="button" className="add-button-styling mt-5" style={{width:"140px"}} onClick={addJob}>
              Add Job
            </button>

          {/* Jobs */}
          <div className="jobs-list">
            <h4 className="sub-sub-title">Jobs</h4>
           <div className="flex flex-wrap gap-10">
             {opportunities.jobs.map((job, index) => (
              <div key={index} className="job-card">
                <Label className="Label-styling">
                  Job Title:
                  </Label>
                  <Input
                    type="text"
                    className="input-styling"
                    value={job.jobTitle}
                    onChange={(e) => handleJobChange(index, e.target.value)}
                  />
                
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeJob(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            </div>
            
          </div>

          {/* Save */}
          <button
            className="update-button-styling-customized"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating..." : "update"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesSectionNine;
