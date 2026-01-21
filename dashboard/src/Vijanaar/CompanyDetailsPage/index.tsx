import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ImageUploadEl from "../ImageUpload";
import Cookies from "js-cookie";

// ✅ Types
interface SectionOne {
  headerLogoUrl: string;
  footerLogoUrl: string;
  favIconUrl: string;
  companyName: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
}

interface SocialMediaLinks {
  twitter: string;
  youtube: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  google: string;
}

interface DigitalTags {
  metaDescription: string;
  metaTags: string;
  gTags: string;
  googleVerificationLink: string;
}

interface Address {
  _id: string;
  address: string;
  default: boolean;
}

interface CompanyDetailsType {
  sectionOne: SectionOne;
  socialMediaLinks: SocialMediaLinks;
  digitalMarketingTags: DigitalTags;
  addresses: Address[];
}

const CompanyDetails = () => {
  const [details, setDetails] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [editedAddress, setEditedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch details on mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/companydetails`);
        setDetails(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [API_BASE_URL]);

  // ✅ Sync edited address with dropdown
  useEffect(() => {
    if (details?.addresses?.[selectedAddressIndex]) {
      setEditedAddress(details.addresses[selectedAddressIndex].address || "");
    }
  }, [selectedAddressIndex, details]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>No company details found.</p>;

  // ✅ Handlers
  const handleSectionOneChange = (field: keyof SectionOne, value: string) => {
    setDetails({
      ...details,
      sectionOne: { ...details.sectionOne, [field]: value },
    });
  };

  const handleSocialChange = (
    platform: keyof SocialMediaLinks,
    value: string
  ) => {
    setDetails({
      ...details,
      socialMediaLinks: { ...details.socialMediaLinks, [platform]: value },
    });
  };

  // ✅ Save sectionOne
  const saveSectionOne = async () => {
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `${API_BASE_URL}/companydetails`,
        { sectionName: "sectionOne", data: details.sectionOne },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Logos & Company Info updated successfully.");
    } catch (err) {
      console.error("Error saving sectionOne:", err);
      alert("Failed to update sectionOne.");
    }
  };

  // ✅ Save social media
  const saveSocialMedia = async () => {
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `${API_BASE_URL}/companydetails`,
        { sectionName: "socialMediaLinks", data: details.socialMediaLinks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Social Media updated successfully.");
    } catch (err) {
      console.error("Error saving social media:", err);
      alert("Failed to update social media.");
    }
  };

  // ✅ Save digital tags
  const saveDigitalTags = async () => {
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `${API_BASE_URL}/companydetails`,
        { sectionName: "digitalMarketingTags", data: details.digitalMarketingTags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Digital Marketing Tags updated successfully.");
    } catch (err) {
      console.error("Error saving digital tags:", err);
      alert("Failed to update digital tags.");
    }
  };

  // ✅ Address CRUD
  const addAddress = async () => {
    if (!newAddress.trim()) return alert("Enter address first!");
    const token = Cookies.get("token");
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/companydetails/addresses`,
        {
          action: "add",
          data: { address: newAddress, default: details.addresses.length === 0 },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetails(res.data);
      setNewAddress("");
      setSelectedAddressIndex(res.data.addresses.length - 1);
      alert("Address added successfully.");
    } catch (err) {
      console.error("Error adding address:", err);
      alert("Failed to add address.");
    }
  };

  const updateAddress = async () => {
    const token = Cookies.get("token");
    const addressId = details.addresses[selectedAddressIndex]._id;
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/companydetails/addresses`,
        { action: "edit", addressId, data: { address: editedAddress } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetails(res.data);
      alert("Address updated successfully.");
    } catch (err) {
      console.error("Error updating address:", err);
      alert("Failed to update address.");
    }
  };

  const deleteAddress = async (index: number) => {
    const token = Cookies.get("token");
    const addressId = details.addresses[index]._id;
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/companydetails/addresses`,
        { action: "delete", addressId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetails(res.data);
      setSelectedAddressIndex(0);
      alert("Address deleted successfully.");
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("Failed to delete address.");
    }
  };

  // ✅ Fix: Only one default address allowed
  const setDefaultAddress = async (index: number, checked: boolean) => {
    const token = Cookies.get("token");
    const addressId = details.addresses[index]._id;

    try {
      // Update UI instantly
      const updatedAddresses = details.addresses.map((addr, i) => ({
        ...addr,
        default: i === index ? checked : false,
      }));

      setDetails({
        ...details,
        addresses: updatedAddresses,
      });

      // Call API
      const res = await axios.patch(
        `${API_BASE_URL}/companydetails/addresses`,
        { action: "setDefault", addressId, data: { default: checked } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDetails(res.data);
      alert("Default address updated successfully.");
    } catch (err) {
      console.error("Error setting default address:", err);
      alert("Failed to set default address.");
    }
  };

  return (
    <div className="company-details">
      <h2 className="dashboard-title">Company Details</h2>

      {/* Section One */}
      <div className="section">
        <h3 className="sub-heading">Logos & Company Info</h3>

        {/* Header Logo */}
        <Label>Header Logo</Label>
        {details.sectionOne.headerLogoUrl && (
          <img
            src={details.sectionOne.headerLogoUrl}
            alt="Header Logo"
            className="w-32 h-20 object-contain mb-2 border rounded"
          />
        )}
        <ImageUploadEl
          data={{
            id: "headerLogo",
            text: "Upload Header Logo",
            url: details.sectionOne.headerLogoUrl,
          }}
                    requiredWidth={245}
          requiredHeight={85}
          maxSizeMB={1}
          gettingRemoteUrl={(_id, url) =>
            handleSectionOneChange("headerLogoUrl", url)
          }
        />

        {/* Footer Logo */}
        <Label>Footer Logo</Label>
        {details.sectionOne.footerLogoUrl && (
          <img
            src={details.sectionOne.footerLogoUrl}
            alt="Footer Logo"
            className="w-32 h-20 object-contain mb-2 border rounded"
          />
        )}
        <ImageUploadEl
          data={{
            id: "footerLogo",
            text: "Upload Footer Logo",
            url: details.sectionOne.footerLogoUrl,
          }}
                    requiredWidth={215}
          requiredHeight={75}
          maxSizeMB={1}
          gettingRemoteUrl={(_id, url) =>
            handleSectionOneChange("footerLogoUrl", url)
          }
        />

        {/* Favicon */}
        <Label>Favicon</Label>
        {details.sectionOne.favIconUrl && (
          <img
            src={details.sectionOne.favIconUrl}
            alt="Favicon"
            className="w-16 h-16 object-contain mb-2 border rounded"
          />
        )}
        <ImageUploadEl
          data={{
            id: "favicon",
            text: "Upload Favicon",
            url: details.sectionOne.favIconUrl,
          }}
                    requiredWidth={16}
          requiredHeight={16}
          maxSizeMB={1}
          gettingRemoteUrl={(_id, url) =>
            handleSectionOneChange("favIconUrl", url)
          }
        />

        <Label>Company Name</Label>
        <Input
          value={details.sectionOne.companyName || ""}
          onChange={(e) => handleSectionOneChange("companyName", e.target.value)}
          placeholder="Company name"
        />

        <Label>Phone 1</Label>
        <Input
          value={details.sectionOne.phone1 || ""}
          onChange={(e) => handleSectionOneChange("phone1", e.target.value)}
          placeholder="Phone 1"
        />

        <Label>Phone 2</Label>
        <Input
          value={details.sectionOne.phone2 || ""}
          onChange={(e) => handleSectionOneChange("phone2", e.target.value)}
          placeholder="Phone 2"
        />

        <Label>Email 1</Label>
        <Input
          value={details.sectionOne.email1 || ""}
          onChange={(e) => handleSectionOneChange("email1", e.target.value)}
          placeholder="Email 1"
        />

        <Label>Email 2</Label>
        <Input
          value={details.sectionOne.email2 || ""}
          onChange={(e) => handleSectionOneChange("email2", e.target.value)}
          placeholder="Email 2"
        />

        <button className="save-button" onClick={saveSectionOne}>
          Update Logos & Company Info
        </button>
      </div>

      <hr />

      {/* Address Section */}
      <div className="section">
        <h3 className="sub-heading">Addresses</h3>
        <div className="form-group">
          <Label>Select Address</Label>
          <select
            className="form-select"
            value={selectedAddressIndex}
            onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}
          >
            {details.addresses.map((addr, i) => (
              <option key={addr._id} value={i}>
                Address {i + 1} {addr.default ? "(Default)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Address */}
        {details.addresses[selectedAddressIndex] && (
          <div className="form-group mt-4">
            <Label>
              Address {selectedAddressIndex + 1}{" "}
              {details.addresses[selectedAddressIndex].default ? "(Default)" : ""}
            </Label>
            <textarea
              className="form-textarea"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />

            <div className="flex justify-between items-end mt-2">
              <div className="flex gap-2 mt-4">
                <button className="update-button" onClick={updateAddress}>
                  Update Address
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteAddress(selectedAddressIndex)}
                >
                  Delete Address
                </button>
              </div>

              <div className="flex">
                <input
                  type="checkbox"
                  checked={details.addresses[selectedAddressIndex].default || false}
                  onChange={(e) =>
                    setDefaultAddress(selectedAddressIndex, e.target.checked)
                  }
                />
                <span className="ml-2">Set as Default</span>
              </div>
            </div>
          </div>
        )}

        {/* Add New Address */}
        <div className="form-group mt-6">
          <Label>New Address</Label>
          <textarea
            className="form-textarea"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
          />
          <button className="save-button mt-2" onClick={addAddress}>
            Add Address
          </button>
        </div>
      </div>

      <hr />

      {/* Social Media */}
      <div className="section">
        <h3 className="sub-heading">Social Media Links</h3>
        {Object.keys(details.socialMediaLinks).map((platform) => (
          <div key={platform}>
            <Label>{platform.toUpperCase()}</Label>
            <Input
              value={(details.socialMediaLinks as any)[platform] || ""}
              onChange={(e) =>
                handleSocialChange(platform as keyof SocialMediaLinks, e.target.value)
              }
              placeholder={`${platform} URL`}
            />
          </div>
        ))}
        <button className="save-button" onClick={saveSocialMedia}>
          Update Social Media
        </button>
      </div>

      <hr />

      {/* Digital Marketing Tags */}
      <div className="section">
        <h3 className="sub-heading">Digital Marketing Tags</h3>
        <Label>Meta Description</Label>
        <textarea
          className="form-textarea"
          value={details.digitalMarketingTags.metaDescription || ""}
          onChange={(e) =>
            setDetails({
              ...details,
              digitalMarketingTags: {
                ...details.digitalMarketingTags,
                metaDescription: e.target.value,
              },
            })
          }
        />

        <Label>Meta Tags</Label>
        <Input
          value={details.digitalMarketingTags.metaTags || ""}
          onChange={(e) =>
            setDetails({
              ...details,
              digitalMarketingTags: {
                ...details.digitalMarketingTags,
                metaTags: e.target.value,
              },
            })
          }
          placeholder="Comma separated tags"
        />

        <Label>Google Tag (gTags)</Label>
        <Input
          value={details.digitalMarketingTags.gTags || ""}
          onChange={(e) =>
            setDetails({
              ...details,
              digitalMarketingTags: {
                ...details.digitalMarketingTags,
                gTags: e.target.value,
              },
            })
          }
          placeholder="Google Analytics GTag"
        />

        <Label>Google Verification Link</Label>
        <Input
          value={details.digitalMarketingTags.googleVerificationLink || ""}
          onChange={(e) =>
            setDetails({
              ...details,
              digitalMarketingTags: {
                ...details.digitalMarketingTags,
                googleVerificationLink: e.target.value,
              },
            })
          }
          placeholder="Google verification link"
        />

        <button className="save-button" onClick={saveDigitalTags}>
          Update Meta Info
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
