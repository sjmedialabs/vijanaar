import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RichTextEditor from "../../components/RichTextEditor/richtexteditor";
import "./index.css";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ImageUploadEl from "../ImageUpload";

interface BannerSection {
  courseName: string;
  backgroundImageUrl: string;
  imageUrl: string;
  title: string;
  subTitle: string;
  courseFee: string | number;
  duration: string;
  startDate: string;
  trainingMode: string;
}

interface SectionOne {
  imageUrl: string;
  title: string;
}

interface SectionTwo {
  title: string;
  description1: string;
  description2: string;
}

interface CurriculumPoint {
  description: string;
}

interface CurriculumModule {
  title: string;
  points: CurriculumPoint[];
}

interface DescriptionBlock {
  description1: string;
  description2: string;
}

interface Advantage {
  description: string;
}

interface Tool {
  imageUrl: string;
  description: string;
}

interface EnrollPoint {
  imageeUrl: string;
  description: string;
}

interface Job {
  jobTitle: string;
}

interface Highlight {
  description: string;
}

interface CourseDetail {
  bannerSection: BannerSection;
  sectionOne: SectionOne[];
  sectionTwo: SectionTwo;
  curriculum: CurriculumModule[];
  onlineTraining: DescriptionBlock;
  SelfplaceTraining: DescriptionBlock;
  classroomTraining: DescriptionBlock;
  CorporateTraining: DescriptionBlock;
  advantagesSection: { title: string; advantages: Advantage[] };
  toolsSection: { title: string; tools: Tool[] };
  videoSection: { videoUrl: string };
  enrollSection: { title: string; description: string; points: EnrollPoint[] };
  oppurtunitiesSection: { title: string; jobs: Job[] };
  highLightsSection: { title: string; highlights: Highlight[] };
}
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const AdminCourseForm = () => {
  const [formData, setFormData] = useState<CourseDetail>({
    bannerSection: {
      courseName: "",
      backgroundImageUrl: "",
      imageUrl: "",
      title: "",
      subTitle: "",
      courseFee: "",
      duration: "",
      startDate: "",
      trainingMode: "",
    },
    sectionOne: [],
    sectionTwo: { title: "", description1: "", description2: "" },
    curriculum: [],
    onlineTraining: { description1: "", description2: "" },
    SelfplaceTraining: { description1: "", description2: "" },
    classroomTraining: { description1: "", description2: "" },
    CorporateTraining: { description1: "", description2: "" },
    advantagesSection: { title: "", advantages: [] },
    toolsSection: { title: "", tools: [] },
    videoSection: { videoUrl: "" },
    enrollSection: { title: "", description: "", points: [] },
    oppurtunitiesSection: { title: "", jobs: [] },
    highLightsSection: { title: "", highlights: [] },
  });
  const[existedCourses,setExistedCourses]=useState<any>(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(false)
  const fetchCourses=async ()=>{
    setLoading(true);
    try{
      const res= await axios.get(`${API_BASE}/coursedetails`)
      console.log(res.data);
      setExistedCourses(res.data)
      setError(false);
    }catch(e){
      setError(true);
      console.log("error:",e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCourses()
  },[])
  if(loading){
    return(
      <div className="flex justify-center items-center">
       <p className="text-md text-[gray] text-center">Loading....</p>
      </div>
    )
  }
   if (error || !existedCourses) {
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center">
        
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={fetchCourses}
        >
          Reload
        </button>
      </div>
    );
  }
  // ---------------- Update Utility ----------------
  const updateForm = <K extends keyof CourseDetail>(
    section: K,
    value: CourseDetail[K]
  ) => setFormData(prev => ({ ...prev, [section]: value }));

  // ---------------- Sanitized Submit ----------------
const handleSubmit = async () => {
  try {
    // ---------------- Validation ----------------
    const emptySectionOne = formData.sectionOne.some(s => !s.title || !s.imageUrl);
    const emptyCurriculum = formData.curriculum.some(
      m => !m.title || m.points.some(p => !p.description)
    );
    const emptyTools = formData.toolsSection.tools.some(t => !t.imageUrl || !t.description);
    const emptyEnrollPoints = formData.enrollSection.points.some(p => !p.imageeUrl || !p.description);
    const emptyJobs = formData.oppurtunitiesSection.jobs.some(j => !j.jobTitle);
    const emptyHighlights = formData.highLightsSection.highlights.some(h => !h.description);
    const emptyAdvantages = formData.advantagesSection.advantages.some(a => !a.description);

    if (
      emptySectionOne ||
      emptyCurriculum ||
      emptyTools ||
      emptyEnrollPoints ||
      emptyJobs ||
      emptyHighlights ||
      emptyAdvantages
    ) {
      alert("Please fill all required fields before submitting!");
      return; // Stop submission
    }

    // ---------------- Sanitized Submit ----------------
    const sanitizedData: CourseDetail = {
      ...formData,
      sectionOne: formData.sectionOne,
      curriculum: formData.curriculum,
      toolsSection: formData.toolsSection,
      enrollSection: formData.enrollSection,
      oppurtunitiesSection: formData.oppurtunitiesSection,
      highLightsSection: formData.highLightsSection,
      advantagesSection: formData.advantagesSection,
    };

    const token = Cookies.get("token");
    if (!token) {
      alert("You are not authenticated!");
      return;
    }

    await axios.post(`${API_BASE}/coursedetails`, sanitizedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Course saved successfully!");
  } catch (err: any) {
    console.error("Error saving course:", err);
    alert("Failed to save course");
  }
};

const deleteCourseHandel = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this course?")) return;

  try {
    setLoading(true);
    const res = await axios.delete(`${API_BASE}/coursedetails/${id}`);
    console.log("Deleted:", res.data);

    // Remove deleted course from UI without re-fetching
    setExistedCourses((prev: any[]) =>
      prev.filter((course: any) => course._id !== id)
    );

    alert("Course deleted successfully!");
  } catch (error: any) {
    console.error("Delete Error:", error.message);
    alert("Failed to delete course. Please try again.");
  } finally {
    setLoading(false);
  }
};



return (
  <>
   <h1 className="main-heading">Add New Course</h1>

  <div className="p-6 space-y-6 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
   
        {/* ---------------- Banner Section ---------------- */}
        <div className="section-card">
        <h2 className="section-header">Banner Section</h2>

        {/* Course Name */}
        <Label>Course Name</Label>
        <Input
            type="text"
            placeholder="Course Name"
            value={formData.bannerSection.courseName}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                courseName: e.target.value,
            })
            }
        />

        {/* Background Image Upload */}
        <Label>Background Image</Label>
        <p className="label-styling">Preview:</p>
        {formData.bannerSection.backgroundImageUrl && (
            <img
              alt="preview1"
              src={formData.bannerSection.backgroundImageUrl}
              width={200}   // required
              height={100}  // required
            />
          )}
        <ImageUploadEl
            data={{
            id: "backgroundImageUrl",
            text: "Background Image",
            url: formData.bannerSection.backgroundImageUrl,
            }}
              requiredWidth={1917}       // minimum width in pixels
              requiredHeight={765}      // minimum height in pixels
              maxSizeMB={1} 
            gettingRemoteUrl={(_id, url) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                backgroundImageUrl: url,
            })
            }
        />
       

        {/* Course Image Upload */}
        <Label>Course Image</Label>
        <p className="label-styling">Preview:</p>
           {formData.bannerSection.imageUrl && (
            <div className="mt-2">
            <img
                src={formData.bannerSection.imageUrl}
                alt="Course Preview"
                className="w-40 h-24 object-cover rounded border"
            />
            </div>
        )}
        <ImageUploadEl
            data={{
            id: "courseImageUrl",
            text: "Course Image",
            url: formData.bannerSection.imageUrl,
            }}
              requiredWidth={290}       // minimum width in pixels
              requiredHeight={220}      // minimum height in pixels
              maxSizeMB={1} 
            gettingRemoteUrl={(_id, url) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                imageUrl: url,
            })
            }
        />
     

        {/* Title */}
        <Label>Title</Label>
        <Input
            type="text"
            placeholder="Enter Title"
            value={formData.bannerSection.title}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                title: e.target.value,
            })
            }
        />

        {/* Subtitle */}
        <Label>Subtitle</Label>
        <Input
            type="text"
            placeholder="Enter Subtitle"
            value={formData.bannerSection.subTitle}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                subTitle: e.target.value,
            })
            }
        />

        {/* Course Fee */}
        <Label>Course Fee</Label>
        <Input
            type="number"
            placeholder="Course Fee"
            value={formData.bannerSection.courseFee}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                courseFee: Number(e.target.value),
            })
            }
        />

        {/* Duration */}
        <Label>Duration</Label>
        <Input
            type="text"
            placeholder="Duration (e.g. 3 Months)"
            value={formData.bannerSection.duration}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                duration: e.target.value,
            })
            }
        />

        {/* Start Date */}
        <Label>Start Date</Label>
        <Input
            type="date"
            value={formData.bannerSection.startDate}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                startDate: e.target.value,
            })
            }
        />

        {/* Training Mode */}
        <Label>Training Mode</Label>
        <Input
            type="text"
            placeholder="Training Mode (Online, Classroom, etc.)"
            value={formData.bannerSection.trainingMode}
            onChange={(e) =>
            updateForm("bannerSection", {
                ...formData.bannerSection,
                trainingMode: e.target.value,
            })
            }
        />
        </div>


{/* ---------------- Section One ---------------- */}
<div className="section-card">
  <h2 className="section-header">Features Section</h2>

  {formData.sectionOne.map((s, idx) => (
    <div
      key={idx}
      className="border p-4 rounded mb-3 bg-white shadow-sm space-y-3"
    >
      {/* Image Upload */}
      <Label>Image</Label>
      <ImageUploadEl
        data={{
          id: `sectionOneImage-${idx}`,
          text: "Section One Image",
          url: s.imageUrl,
        }}
          requiredWidth={55}       // minimum width in pixels
          requiredHeight={55}      // minimum height in pixels
          maxSizeMB={1} 
        gettingRemoteUrl={(_id, url) => {
          const updated = [...formData.sectionOne];
          updated[idx].imageUrl = url;
          updateForm("sectionOne", updated);
        }}
      />

      {/* Preview */}
      {s.imageUrl && (
        <div className="mt-2">
          <img
            src={s.imageUrl}
            alt={`Section One ${idx + 1}`}
            className="w-40 h-24 object-cover rounded border"
          />
        </div>
      )}

      {/* Title */}
      <Label>Title</Label>
      <Input
        type="text"
        placeholder="Enter Title"
        value={s.title}
        onChange={(e) => {
          const updated = [...formData.sectionOne];
          updated[idx].title = e.target.value;
          updateForm("sectionOne", updated);
        }}
      />

      {/* Remove Button */}
      <button
        className="delete-button-styling-customized"
        onClick={() => {
          const updated = [...formData.sectionOne];
          updated.splice(idx, 1);
          updateForm("sectionOne", updated);
        }}
      >
        Remove
      </button>
    </div>
  ))}

  {/* Add New Item */}
  <button
    className="add-button-styling"
    onClick={() =>
      updateForm("sectionOne", [
        ...formData.sectionOne,
        { imageUrl: "", title: "" },
      ])
    }
  >
     Add
  </button>
</div>


{/* ---------------- Section Two ---------------- */}
<div className="section-card">
  <h2 className="section-header">Overview Section</h2>

  {/* Title */}
  <Label>Title</Label>
  <Input
    type="text"
    placeholder="Title"
    value={formData.sectionTwo.title}
    onChange={(e) =>
      updateForm("sectionTwo", {
        ...formData.sectionTwo,
        title: e.target.value,
      })
    }
  />

  {/* Description 1 */}
  <Label>Description 1 (max 300 chars)</Label>
  <RichTextEditor
    value={formData.sectionTwo.description1}
    onChange={(val) =>
      updateForm("sectionTwo", { ...formData.sectionTwo, description1: val })
    }
    charLimit={300}
    placeholder="Enter Description 1..."
  />

  {/* Description 2 */}
  <Label>Description 2 (max 300 chars)</Label>
  <RichTextEditor
    value={formData.sectionTwo.description2}
    onChange={(val) =>
      updateForm("sectionTwo", { ...formData.sectionTwo, description2: val })
    }
    charLimit={300}
    placeholder="Enter Description 2..."
  />
</div>

{/* ---------------- Curriculum Section ---------------- */}
<div className="section-card">
  <h2 className="section-header">Curriculum</h2>

  {formData.curriculum.map((module, moduleIdx) => (
    <div key={moduleIdx} className="module-card border p-4 mb-4 rounded">
      <div className="flex justify-between items-center mb-2">
        {/* Module Title */}
        <Label>Module Title</Label>

        {/* Delete Module Button */}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this module?")) {
              const updated = [...formData.curriculum];
              updated.splice(moduleIdx, 1);
              updateForm("curriculum", updated);
            }
          }}
        >
          Delete Module
        </button>
      </div>

      <Input
        type="text"
        placeholder="Module Title"
        value={module.title}
        onChange={(e) => {
          const updated = [...formData.curriculum];
          updated[moduleIdx].title = e.target.value;
          updateForm("curriculum", updated);
        }}
      />

      {/* Points */}
      {module.points.map((point, pointIdx) => (
        <div key={pointIdx} className="flex flex-col gap-2 mb-2">
          <Label>Point Description (max 300 chars)</Label>
          <RichTextEditor
            value={point.description}
            onChange={(val) => {
              const updated = [...formData.curriculum];
              updated[moduleIdx].points[pointIdx].description = val;
              updateForm("curriculum", updated);
            }}
            charLimit={300}
            placeholder="Enter point description..."
          />
          <button
            className="bg-red-500 text-white px-3 py-1 rounded w-max mt-1"
            onClick={() => {
              const updated = [...formData.curriculum];
              updated[moduleIdx].points.splice(pointIdx, 1);
              updateForm("curriculum", updated);
            }}
          >
            Remove Point
          </button>
        </div>
      ))}

      <button
        className="add-button-styling"
        onClick={() => {
          const updated = [...formData.curriculum];
          updated[moduleIdx].points.push({ description: "" });
          updateForm("curriculum", updated);
        }}
      >
        Add Point
      </button>

      <hr className="my-4" />
    </div>
  ))}

  <button
    className="bg-green-500 text-white px-4 py-2 rounded"
    onClick={() =>
      updateForm("curriculum", [
        ...formData.curriculum,
        { title: "", points: [] },
      ])
    }
  >
    Add Module
  </button>
</div>


{/* ---------------- Tools ---------------- */}
<div className="section-card">
  <h2 className="section-header">Tools</h2>

  <Label>Title</Label>
  <Input
    type="text"
    placeholder="Title"
    value={formData.toolsSection.title}
    onChange={(e) =>
      updateForm("toolsSection", {
        ...formData.toolsSection,
        title: e.target.value,
      })
    }
  />

  {formData.toolsSection.tools.map((t, idx) => (
    <div key={idx} className="flex flex-col gap-2 mb-4 border p-3 rounded">
      <div>
        <Label>Tool Image</Label>
        <ImageUploadEl
          data={{ id: `tool-${idx}`, text: "Tool Image", url: t.imageUrl }}
            requiredWidth={85}       // minimum width in pixels
            requiredHeight={85}      // minimum height in pixels
            maxSizeMB={1} 
          gettingRemoteUrl={(_id, url) => {
            const updated = [...formData.toolsSection.tools];
            updated[idx].imageUrl = url;
            updateForm("toolsSection", { ...formData.toolsSection, tools: updated });
          }}
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          type="text"
          placeholder="Description"
          value={t.description}
          onChange={(e) => {
            const updated = [...formData.toolsSection.tools];
            updated[idx].description = e.target.value;
            updateForm("toolsSection", { ...formData.toolsSection, tools: updated });
          }}
        />
      </div>

      <button
        className="bg-red-500 text-white px-3 py-1 rounded w-max mt-2"
        onClick={() => {
          const updated = [...formData.toolsSection.tools];
          updated.splice(idx, 1);
          updateForm("toolsSection", { ...formData.toolsSection, tools: updated });
        }}
      >
        Remove Tool
      </button>
    </div>
  ))}

  <button
    className="add-button-styling"
    onClick={() =>
      updateForm("toolsSection", {
        ...formData.toolsSection,
        tools: [...formData.toolsSection.tools, { imageUrl: "", description: "" }],
      })
    }
  >
    Add Tool
  </button>
</div>

{/* ---------------- Trainings ---------------- */}
{(
  ["onlineTraining", "SelfplaceTraining", "classroomTraining", "CorporateTraining"] as const
).map((key) => (
  <div key={key} className="section-card">
    <h2 className="section-header">{key}</h2>

    <Label>Description 1</Label>
    <RichTextEditor
      value={formData[key].description1}
      onChange={(val) => updateForm(key, { ...formData[key], description1: val })}
      placeholder="Description 1..."
      charLimit={250}
    />

    <Label>Description 2</Label>
    <RichTextEditor
      value={formData[key].description2}
      onChange={(val) => updateForm(key, { ...formData[key], description2: val })}
      placeholder="Description 2..."
      charLimit={250}
    />
  </div>
))}


    {/* ---------------- Advantages ---------------- */}
    <div className="section-card">
      <h2 className="section-header">Advantages</h2>
      <Label>Title</Label>
      <Input
        type="text"
        placeholder="Title"
        value={formData.advantagesSection.title}
        onChange={(e) =>
          updateForm("advantagesSection", {
            ...formData.advantagesSection,
            title: e.target.value,
          })
        }
      />
      {formData.advantagesSection.advantages.map((a, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          <RichTextEditor
            value={a.description}
            onChange={(val) => {
              const updated = [...formData.advantagesSection.advantages];
              updated[idx].description = val;
              updateForm("advantagesSection", {
                ...formData.advantagesSection,
                advantages: updated,
              });
            }}
            placeholder="Advantage..."
          />
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              const updated = [...formData.advantagesSection.advantages];
              updated.splice(idx, 1);
              updateForm("advantagesSection", {
                ...formData.advantagesSection,
                advantages: updated,
              });
            }}
          >
            X
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          updateForm("advantagesSection", {
            ...formData.advantagesSection,
            advantages: [...formData.advantagesSection.advantages, { description: "" }],
          })
        }
      >
        Add Advantage
      </button>
    </div>


    {/* ---------------- Video ---------------- */}
    <div className="section-card">
      <h2 className="section-header">Video</h2>
      <Label>Video URL</Label>
      <Input
        type="text"
        placeholder="Video URL"
        value={formData.videoSection.videoUrl}
        onChange={(e) =>
          updateForm("videoSection", { videoUrl: e.target.value })
        }
      />
    </div>

{/* ---------------- Enroll Section ---------------- */}
<div className="section-card">
  <h2 className="section-header">Enroll Section</h2>

  <Label>Title</Label>
  <Input
    type="text"
    placeholder="Title"
    value={formData.enrollSection.title}
    onChange={(e) =>
      updateForm("enrollSection", { ...formData.enrollSection, title: e.target.value })
    }
  />

  <Label>Description</Label>
  <RichTextEditor
    value={formData.enrollSection.description}
    onChange={(val) =>
      updateForm("enrollSection", { ...formData.enrollSection, description: val })
    }
    placeholder="Description..."
  />

  {formData.enrollSection.points.map((p, idx) => (
    <div key={idx} className="bg-amber-100 p-4 rounded-xl mt-3 shadow">
      <div>
        <Label>Image</Label>
        <ImageUploadEl
          data={{
            id: `enroll-point-${idx}-image`,
            text: "Enroll Point Image",
            url: p.imageeUrl,
          }}
          requiredWidth={32}
          requiredHeight={32}
          maxSizeMB={1}
          gettingRemoteUrl={(_, url) => {
            const updated = [...formData.enrollSection.points];
            updated[idx].imageeUrl = url;
            updateForm("enrollSection", { ...formData.enrollSection, points: updated });
          }}
        />
                {/* Image Preview */}
        {p.imageeUrl && (
          <img
            src={p.imageeUrl}
            alt={`Enroll Point ${idx}`}
            style={{ width: "50px", height: "50px", marginTop: "5px", borderRadius: "4px", objectFit: "cover" }}
          />
        )}
      </div>
      <div>
        <Label>Description</Label>
        <RichTextEditor
          value={p.description}
          onChange={(val) => {
            const updated = [...formData.enrollSection.points];
            updated[idx].description = val;
            updateForm("enrollSection", { ...formData.enrollSection, points: updated });
          }}
          placeholder="Description..."
          charLimit={180}
        />
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded mt-5"
        onClick={() => {
          const updated = [...formData.enrollSection.points];
          updated.splice(idx, 1);
          updateForm("enrollSection", { ...formData.enrollSection, points: updated });
        }}
      >
        Delete
      </button>
    </div>
  ))}

  <button
    className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
    onClick={() =>
      updateForm("enrollSection", {
        ...formData.enrollSection,
        points: [...formData.enrollSection.points, { imageeUrl: "", description: "" }],
      })
    }
  >
    + Add Enroll Point
  </button>
</div>



    {/* ---------------- Opportunities ---------------- */}
    <div className="section-card">
      <h2 className="section-header">Opportunities</h2>
      <Label>Title</Label>
      <Input
        type="text"
        placeholder="Title"
        value={formData.oppurtunitiesSection.title}
        onChange={(e) =>
          updateForm("oppurtunitiesSection", {
            ...formData.oppurtunitiesSection,
            title: e.target.value,
          })
        }
      />
      {formData.oppurtunitiesSection.jobs.map((j, idx) => (
        <div key={idx} className="">
          <div>
            <div className="flex justify-between">
              <Label>Job Title</Label>
            <button
            className="delete-button-styling-customized mt-4" style={{height:'30px',marginBottom:'0px'}}
            onClick={() => {
              const updated = [...formData.oppurtunitiesSection.jobs];
              updated.splice(idx, 1);
              updateForm("oppurtunitiesSection", {
                ...formData.oppurtunitiesSection,
                jobs: updated,
              });
            }}
          >
            Delete
          </button>
            </div>
            <Input
              type="text"
              placeholder="Job Title"
              value={j.jobTitle}
              onChange={(e) => {
                const updated = [...formData.oppurtunitiesSection.jobs];
                updated[idx].jobTitle = e.target.value;
                updateForm("oppurtunitiesSection", {
                  ...formData.oppurtunitiesSection,
                  jobs: updated,
                });
              }}
            />
          </div>
          
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          updateForm("oppurtunitiesSection", {
            ...formData.oppurtunitiesSection,
            jobs: [...formData.oppurtunitiesSection.jobs, { jobTitle: "" }],
          })
        }
      >
        + Add Job
      </button>
    </div>

{/* ---------------- Highlights ---------------- */}
<div className="section-card">
  <h2 className="section-header">Highlights</h2>

  <Label>Title</Label>
  <Input
    type="text"
    placeholder="Title"
    value={formData.highLightsSection.title}
    onChange={(e) =>
      updateForm("highLightsSection", {
        ...formData.highLightsSection,
        title: e.target.value,
      })
    }
  />

  {formData.highLightsSection.highlights.map((h, idx) => (
    <div key={idx} className="flex gap-2 items-start">
      <div className="flex-1">
        <div className="flex justify-between">
          <Label>Highlight</Label>
         <button
        className="bg-red-500 text-white px-3 py-1 mb-0 mt-6 rounded" style={{height:'30px'}}
        onClick={() => {
          const updated = [...formData.highLightsSection.highlights];
          updated.splice(idx, 1);
          updateForm("highLightsSection", {
            ...formData.highLightsSection,
            highlights: updated,
          });
        }}
      >
        X
      </button>
        </div>
        <RichTextEditor
          value={h.description}
          onChange={(val) => {
            const updated = [...formData.highLightsSection.highlights];
            updated[idx].description = val;
            updateForm("highLightsSection", {
              ...formData.highLightsSection,
              highlights: updated,
            });
          }}
          placeholder="Highlight..."
          charLimit={150}
        />
      </div>
     
    </div>
  ))}

  <button
    className="bg-blue-500 text-white px-4 py-2 rounded"
    onClick={() =>
      updateForm("highLightsSection", {
        ...formData.highLightsSection,
        highlights: [...formData.highLightsSection.highlights, { description: "" }],
      })
    }
  >
    + Add Highlight
  </button>
</div>


    {/* ---------------- Save ---------------- */}
    <button
      className="update-button-styling-customized"
      onClick={handleSubmit}
    >
      Update
    </button>
  </div>

  <div className="mt-4">
     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {existedCourses?.map((course:any) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Course Banner */}
            <div className="relative">
              <img
                src={course.bannerSection.imageUrl}
                alt={course.bannerSection.courseName}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#FFB800] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Trending
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {course.bannerSection.courseName}
              </h3>

              {/* Description (HTML from CKEditor) */}
              <div
                className="text-gray-600 text-sm mb-4 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: course.sectionTwo.description1 }}
              />

              {/* Course Info */}
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {course.bannerSection.duration}
                </div>
                <div>
                  <span className="font-medium">Training Mode:</span>{" "}
                  {course.bannerSection.trainingMode}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={()=>(deleteCourseHandel(course._id))}
                className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
  </div>
  </>
);

};

export default AdminCourseForm;
