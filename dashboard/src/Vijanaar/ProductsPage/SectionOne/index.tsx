import './index.css';
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import ImageUploadEl from '../../ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from "axios";
import Cookies from "js-cookie";

// Banner Section Shape
interface BannerData {
  courseName: string; // for card display
  backgroundImageUrl: string;
  imageUrl: string; // card image
  title: string;
  subTitle: string;
  courseFee: number | string;
  duration: string;
  startDate: string;
  trainingMode: string;
}

interface CourseOption {
  _id: string;
  bannerSection: { courseName: string };
}

const CoursesSectionOne: React.FC = () => {
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [bannerData, setBannerData] = useState<BannerData>({
    courseName: "",
    backgroundImageUrl: "",
    imageUrl: "",
    title: "",
    subTitle: "",
    courseFee: "",
    duration: "",
    startDate: "",
    trainingMode: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const imageBackgroundComponentData = {
    id: uuidv4(),
    text: 'Upload your background image',
  };

  const imageCardComponentData = {
    id: uuidv4(),
    text: "Upload card image",
  };

  // ✅ Fetch all courses for dropdown
  const fetchCourses = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coursedetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  // ✅ Fetch selected course banner data
  const fetchBannerData = async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.bannerSection) {
        setBannerData({
          courseName: res.data.bannerSection.courseName || "",
          backgroundImageUrl: res.data.bannerSection.backgroundImageUrl || "",
          imageUrl: res.data.bannerSection.imageUrl || "",
          title: res.data.bannerSection.title || "",
          subTitle: res.data.bannerSection.subTitle || "",
          courseFee: res.data.bannerSection.courseFee || "",
          duration: res.data.bannerSection.duration || "",
          startDate: res.data.bannerSection.startDate || "",
          trainingMode: res.data.bannerSection.trainingMode || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch banner data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Handle uploaded images
  const gettingRemoteUrl = (_id: string, receivedUrl: string) => {
    setBannerData({ ...bannerData, backgroundImageUrl: receivedUrl });
  };
  const gettingCardImageUrl = (_id: string, receivedUrl: string) => {
    setBannerData({ ...bannerData, imageUrl: receivedUrl });
  };

  // ✅ Update Course Banner Section
  const updateBannerData = async () => {
    if (!selectedCourseId) return;

    if (
    !bannerData.title.trim() ||
    !bannerData.subTitle.trim() ||
    !bannerData.backgroundImageUrl.trim() ||
    !bannerData.imageUrl.trim() ||
    !bannerData.startDate.trim() ||
    !bannerData.duration.trim() ||
    !bannerData.courseFee.toString().trim() ||
    !bannerData.courseName.trim()
  ) {
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 10000);
    return;
  }

    const payload = {
      sectionName: "bannerSection",
      data: {
        ...bannerData,
        courseFee: bannerData.courseFee ? Number(bannerData.courseFee) : 0,
      },
    };

    try {
      const token = Cookies.get("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourseId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setSuccess(true);
        setError(false);
        setTimeout(() => setSuccess(false), 10000);
        fetchBannerData(selectedCourseId);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError(true);
      setSuccess(false);
      setTimeout(() => setError(false), 10000);
    }
  };

  return (
    <div className="section-one-admin">
      <h1 className='main-heading'>Banner</h1>

      {/* ✅ Dropdown for Courses */}
      <div className="form-group">
        <Label className='label-styling'>Select Course</Label>
        <select
          className="form-select" style={{width:'400px'}}
          value={selectedCourseId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedCourseId(id);
            fetchBannerData(id);
          }}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.bannerSection?.courseName || "Unnamed Course"}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      )}
      {/*Alerts */}
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
        {showErrorAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">We require all fields.</Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Data updated successfully.</Alert>
        </Stack>
      )}

      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Failed to fetch/update the data. Please try again.</Alert>
        </Stack>
      )}
      </div>

      {selectedCourseId && !loading && (
        <>
          <div className='form-group'>
            <Label className='label-styling'>Course Name</Label>
            <Input
              type="text"
              placeholder="Enter course name for card"
              className='input-styling'
              value={bannerData.courseName}
              onChange={(e) => setBannerData({ ...bannerData, courseName: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <Label className='label-styling'>Preview</Label>
            {bannerData.imageUrl && (
              <div className="current-image-preview">
                <img src={bannerData.imageUrl} alt="Card"  style={{width:"150px",height:"100px"}}/>
              </div>
            )}
            <ImageUploadEl
              data={{
                id: imageCardComponentData.id,
                text: imageCardComponentData.text,
                url: bannerData.imageUrl,
              }}
                        requiredWidth={290}
          requiredHeight={220}
          maxSizeMB={1}
              gettingRemoteUrl={gettingCardImageUrl}
            />
          </div>

          <div className='form-group'>
            <Label className='label-styling'>Course Title</Label>
            <Input
              type="text"
              placeholder="Enter course title"
              className='input-styling'
              value={bannerData.title}
              onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <Label className='label-styling'>Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter subtitle"
              className='input-styling'
              value={bannerData.subTitle}
              onChange={(e) => setBannerData({ ...bannerData, subTitle: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <Label className='label-styling'>Start Date</Label>
            <Input
              type="text"
              className='input-styling'
              placeholder="e.g. 26th October, 2025"
              value={bannerData.startDate}
              onChange={(e) => setBannerData({ ...bannerData, startDate: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <Label className='label-styling'>Duration</Label>
            <Input
              type="text"
              placeholder="e.g. 11 Months"
              className='input-styling'
              value={bannerData.duration}
              onChange={(e) => setBannerData({ ...bannerData, duration: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <Label className='label-styling'>Fees</Label>
            <Input
              type="text"
              placeholder="e.g. ₹4,50,000 + GST"
              className='input-styling'
              value={bannerData.courseFee}
              onChange={(e) => setBannerData({ ...bannerData, courseFee: e.target.value })}
            />
          </div>

          {/* Current Background Image Preview */}
          {bannerData.backgroundImageUrl && (
            <div className="current-image-preview">
              <p className='label-styling'>Preview:</p>
              <img src={bannerData.backgroundImageUrl} alt="Background" className="preview-img" style={{width:"150px",height:"100px"}} />
            </div>
          )}

          <ImageUploadEl
            data={{
              id: imageBackgroundComponentData.id,
              text: imageBackgroundComponentData.text,
              url: bannerData.backgroundImageUrl,
            }}
                      requiredWidth={1016}
          requiredHeight={720}
          maxSizeMB={1}
            gettingRemoteUrl={gettingRemoteUrl}
          />

          <div className='btn-wrapper'>
            <button className='update-button-styling-customized' onClick={updateBannerData}>
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesSectionOne;
