// ProductsPageSectionTwo.tsx
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import serverErrorPic from "../../../assets/serverErrorPic.png";
import TextField from "@mui/material/TextField";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import ImageUploadEl from "../../ImageUpload";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface Feature {
  _id?: string;
  title: string;
  imageUrl: string;
}

interface Course {
  _id: string;
  bannerSection?: {
    courseName?: string;
  };
  sectionOne?: Feature[];
}

const CoursesSectionTwo: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);
  // editData will be used for both add and edit. If _id is present => edit, else add.
  const [editData, setEditData] = useState<Feature | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [featureToDelete, setFeatureToDelete] = useState<Feature | null>(null);

  // unique id for ImageUploadEl in modal (regenerated each time modal opens)
  const [modalImageComponentId, setModalImageComponentId] = useState<string>("");

  // Helper to create new blank feature
  const blankFeature = (): Feature => ({ title: "", imageUrl: "" });

  // Generate a new image component id for modal each open
  const createNewImageComponentId = () => uuidv4();

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
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to load courses", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (courseId: string) => {
    if (!courseId) return;
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${courseId}`
      );
      setFeatures(res.data.sectionOne || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (event: any) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    // reset features while fetching
    setFeatures([]);
    fetchCourseDetails(courseId);
  };

  // Open edit modal with feature prefilled
  const handleEditClick = (feature: Feature) => {
    setEditData({ ...feature }); // copy
    setModalImageComponentId(createNewImageComponentId());
    setOpenModal(true);
  };

  // Open add modal with blank feature
  const handleAddClick = () => {
    setEditData(blankFeature());
    setModalImageComponentId(createNewImageComponentId());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(null);
  };

  // Called by ImageUploadEl in modal
  const gettingRemoteUrl = (_id: string, recievedUrl: string) => {
    if (editData) {
      setEditData({ ...editData, imageUrl: recievedUrl });
    }
  };

  const handleInputChange = (field: keyof Feature, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  // UPDATE existing item -> PATCH /coursedetails/:id/:sectionName/:itemId
  const handleUpdate = async () => {
    if (!editData || !selectedCourse || !editData._id) return;
    try {
      const token = Cookies.get("token");
      const itemId = editData._id;

      // data to patch (only fields we want)
      const data = {
        title: editData.title,
        imageUrl: editData.imageUrl,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourse}/sectionOne/${itemId}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Server returns updated course document (per your API style). update features.
      setFeatures(response.data.sectionOne || []);
      handleCloseModal();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update feature.");
    }
  };

  // ADD new item -> POST /coursedetails/:id/:sectionName
const handleSaveNew = async () => {
  if (!editData || !selectedCourse) return;

  // ✅ Basic validation: prevent empty title or image
  if (!editData.title?.trim() || !editData.imageUrl?.trim()) {
    alert("Please fill in all required fields before saving.");
    return;
  }

  try {
    const token = Cookies.get("token");
    const body = {
      title: editData.title.trim(),
      imageUrl: editData.imageUrl.trim(),
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourse}/sectionOne`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ Update list only if valid response received
    setFeatures(response.data.sectionOne || []);
    handleCloseModal();
  } catch (err) {
    console.error("Add failed", err);
    alert("Failed to add feature.");
  }
};


  // DELETE item -> DELETE /coursedetails/:id/:sectionName/:itemId
  const handleDeleteClick = (feature: Feature) => {
    setFeatureToDelete(feature);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!featureToDelete || !selectedCourse || !featureToDelete._id) return;
    try {
      const token = Cookies.get("token");
      const itemId = featureToDelete._id;

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/coursedetails/${selectedCourse}/sectionOne/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFeatures(response.data.sectionOne || []);
      setDeleteModalOpen(false);
      setFeatureToDelete(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete feature.");
    }
  };

  return (
    <>
      <div className="products-section-two-admin">
        <h2 className="main-heading">Features</h2>

        {/* Dropdown for courses */}
        <FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel id="course-select-label">Select Course</InputLabel>
  <Select
    labelId="course-select-label"
    id="course-select"
    value={selectedCourse}
    label="Select Course"
    onChange={handleCourseChange}
  >
    {courses.map((course) => (
      <MenuItem key={course._id} value={course._id}>
        {course.bannerSection?.courseName || course._id}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <div className="products-page-error-message-container">
            <img src={serverErrorPic} alt="Server Error" />
            <button onClick={() => fetchCourseDetails(selectedCourse)}>
              Reload
            </button>
          </div>
        )}

        {!loading && !error && selectedCourse && (
          <>
            <div className="mb-4 flex justify-end">
              <button
                className="add-button-styling"
                onClick={handleAddClick}
              >
                Add Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {features.map((feature) => (
                <div
                  key={feature._id || Math.random()}
                  className="bg-[#f5f7fb] rounded-2xl shadow p-4 text-center flex flex-col items-center justify-between"
                >
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-30 mb-3 object-contain"
                  />
                  <p className="text-sm font-medium">{feature.title}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="text-white rounded text-sm bg-blue-600 py-2 px-6"
                      onClick={() => handleEditClick(feature)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white rounded text-sm bg-red-600 py-2 px-4"
                      onClick={() => handleDeleteClick(feature)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit / Add Modal */}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <Box sx={{ width: 420, p: 3 }}>
          <h2>{editData?._id ? "Edit Feature" : "Add Feature"}</h2>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={editData?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />

          <ImageUploadEl
            data={{
              id: modalImageComponentId,
              text: "Upload feature image",
              url: editData?.imageUrl || "",
            }}
                      requiredWidth={55}
          requiredHeight={55}
          maxSizeMB={1}
            gettingRemoteUrl={gettingRemoteUrl}
          />

          {/* preview */}
          {editData?.imageUrl && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <img
                src={editData.imageUrl}
                alt="preview"
                style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>

            {editData?._id ? (
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSaveNew}>
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box sx={{ width: 350, p: 3, textAlign: "center" }}>
          <h3>Delete Feature</h3>
          <p>Are you sure you want to delete this feature?</p>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CoursesSectionTwo;
