import React, { useState, useEffect } from "react";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

interface Stat {
  value: string;
  description: string;
}

const HomePageSectionEight: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { value: "", description: "" },
    { value: "", description: "" },
    { value: "", description: "" },
    { value: "", description: "" },
  ]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/homepage`);
        if (res.data?.sectionSeven) {
          const s7 = res.data.sectionSeven;
          setStats([
            { value: s7.value1 || "", description: s7.description1 || "" },
            { value: s7.value2 || "", description: s7.description2 || "" },
            { value: s7.value3 || "", description: s7.description3 || "" },
            { value: s7.value4 || "", description: s7.description4 || "" },
          ]);
        }
      } catch (err) {
        console.error("Error fetching Section 8 data:", err);
      }
    };

    fetchData();
  }, []);

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setStats((prev) =>
      prev.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      )
    );
  };

  const saveHandler = async () => {
    if (stats.every((stat) => !stat.value.trim() && !stat.description.trim())) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }

    try {
      const token = Cookies.get("token");
      const payload = {
        sectionName: "sectionSeven",
        data: {
          value1: stats[0].value,
          description1: stats[0].description,
          value2: stats[1].value,
          description2: stats[1].description,
          value3: stats[2].value,
          description3: stats[2].description,
          value4: stats[3].value,
          description4: stats[3].description,
        },
      };

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/homepage`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error updating Section 8:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };

  return (
    <div className="homepage-section8">
      <h1 className="main-heading">Statistic Values</h1>

      {/* Alerts */}
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
         {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Section 8 stats updated successfully.</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Something went wrong. Please try again.</Alert>
        </Stack>
      )}
      </div>
      

      {/* Stats Editor */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="form-group">
              <Label htmlFor={`statValue-${index}`}>Value</Label>
              <Input
                type="text"
                id={`statValue-${index}`}
                placeholder="Enter stat value"
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
              />
            </div>

            <div className="form-group">
              <Label htmlFor={`statDescription-${index}`}>Description</Label>
              <Input
                type="text"
                id={`statDescription-${index}`}
                placeholder="Enter stat description"
                value={stat.description}
                onChange={(e) =>
                  updateStat(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
     
        <button
          className="update-button-styling-customized"
          onClick={saveHandler}
        >
          Update
        </button>
      
    </div>
  );
};

export default HomePageSectionEight;
