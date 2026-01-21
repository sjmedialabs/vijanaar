const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt = require('bcrypt');  // For hashing password
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
// require('dotenv').config();


//------------------------------------------------Models-------------------------------------------------
const HomePage=require('./Models/HomePage');
const TestimonialsPage=require('./Models/Testimonial');
const TrainingProgram=require('./Models/TrainingPogram');
const AboutusPage=require('./Models/AboutPage');
const PlacementPage=require('./Models/Placements');
const Login=require('./Models/User');
const ContactUsPage=require('./Models/Contactus');
const CompanyDetailsPage=require('./Models/CompanyDetails');
const CourseDetail=require('./Models/Course');

//image and video upload using multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const BASE_URL = process.env.BASE_URL || 'https://api.vijanaar.com';


const app=express();

// Middleware - Remove the duplicate express.json() and apply limits globally
app.use(cors());
app.use(express.json());
//app.use(express.json({ limit: '500mb' })); // High limit for JSON
//app.use(express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 })); // High limit for URL-encoded, with parameterLimit as a precaution
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Basic route
app.get('/', (req, res) => {
    res.send('API is running');
});

// --------------------------------------------------middleware for authentication-----------------------------------
const verifyToken = (req, res, next) => {
  try {
    // Token can be sent in headers or cookies
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Expecting: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET || "mysecret", (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(403).json({ message: "Invalid token" });
      }

      // Save user data to request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//------------------------------------------------Login and Register-----------------------------------
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Login({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Login API
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await Login.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ---------------- Nodemailer Setup ----------------
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,       // from .env
    pass: process.env.EMAIL_PASS        // from .env
  }
});
// ---------------- Generate Reset Token & Send Email ----------------
app.post('/forgot-password', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await Login.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
   user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: username, // assuming username is email
      subject: 'Admin Dashboard Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello Admin,</h2>
          <p>We received a request to reset your password for the <strong>Admin Dashboard</strong>.</p>
          <p>Click the link below to reset your password. This link is valid for 15 Minutes only.</p>
          <p><a href="${resetLink}" style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a></p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thanks,<br/>SJ MediaLabs Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------- Reset Password ----------------
app.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await Login.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


//----------------------------------------------------------------HomePage----------------------------------------------------

// POST API
app.post("/homepage", async (req, res) => {
  try {
    const homePageData = new HomePage(req.body);
    await homePageData.save();
    res.status(201).json({ message: "HomePage data saved successfully", data: homePageData });
  } catch (error) {
    console.error("Error saving homepage:", error.message);
    res.status(500).json({ error: "Failed to save homepage data" });
  }
});
app.patch("/homepage",verifyToken, async (req, res) => {
  try {
    const { sectionName, data } = req.body; 
    // Example body:
    // { "sectionName": "sectionTwo", "data": { "title": "New Title" } }

    if (!sectionName || !data) {
      return res.status(400).json({ error: "sectionName and data are required" });
    }

    // Build update path dynamically
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    // Assuming only 1 homepage doc
    const updated = await HomePage.findOneAndUpdate(
      {},                     // no filter, just the first doc
      { $set: updatePath },   // update only provided fields
      { new: true }           // return updated doc
    );

    if (!updated) {
      return res.status(404).json({ error: "HomePage document not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ADD new item to section
app.post("/homepage/:sectionName",verifyToken, async (req, res) => {
  try {
    const { sectionName } = req.params;
    const data = req.body;

    const updated = await HomePage.findOneAndUpdate(
      {}, // assuming one homepage doc
      { $push: { [sectionName]: data } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "HomePage not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EDIT one item inside section
app.patch("/homepage/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { sectionName, itemId } = req.params;
    const data = req.body;

    // Build update paths like { "sectionTwo.$.title": "newTitle" }
    const updatePath = {};
    for (const key in data) {
      updatePath[`${sectionName}.$.${key}`] = data[key];
    }

    const updated = await HomePage.findOneAndUpdate(
      { [`${sectionName}._id`]: itemId }, // find array element by id
      { $set: updatePath },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE one item inside section
app.delete("/homepage/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { sectionName, itemId } = req.params;

    const updated = await HomePage.findOneAndUpdate(
      {},
      { $pull: { [sectionName]: { _id: itemId } } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Special PUT API to toggle visibility fields
app.put("/homepage/banner/:id/visibility", async (req, res) => {
    try {
        const { titleVisible, subTitleVisible, descriptionVisible, buttonsVisible } = req.body;
        const bannerId = req.params.id;

        // Find the homepage document containing the banner
        const homepage = await HomePage.findOne({ "bannerSection._id": bannerId });
        if (!homepage) return res.status(404).json({ message: "Banner not found" });

        const banner = homepage.bannerSection.id(bannerId);

        // Update visibility fields if provided
        if (titleVisible !== undefined) banner.titleVisible = titleVisible;
        if (subTitleVisible !== undefined) banner.subTitleVisible = subTitleVisible;
        if (descriptionVisible !== undefined) banner.descriptionVisible = descriptionVisible;
        if (buttonsVisible !== undefined) banner.buttonsVisible = buttonsVisible;

        await homepage.save();
        res.status(200).json({ message: "Banner visibility updated", banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/homepage", async (req, res) => {
  try {
    const homepage = await HomePage.findOne();
    if (!homepage) {
      return res.status(404).json({ error: "HomePage document not found" });
    }
    res.json(homepage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//----------------------------------------------------------TestimonialsPage------------------------------------------------------------
// 1. POST API - Create new testimonials page
app.post("/testimonialspage",verifyToken, async (req, res) => {
  try {
    const data = new TestimonialsPage(req.body);
    await data.save();
    res.status(201).json({ message: "Testimonials page created successfully", data });
  } catch (err) {
    console.error("Error creating testimonials page:", err.message);
    res.status(500).json({ error: "Failed to create testimonials page" });
  }
});
app.patch("/testimonialspage",verifyToken, async (req, res) => {
  try {
    const { sectionName, data } = req.body; 
    // Example body:
    // { "sectionName": "bannerSection", "data": { "title": "Updated Title" } }

    if (!sectionName || !data) {
      return res.status(400).json({ error: "sectionName and data are required" });
    }

    // Build update path dynamically
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    // Assuming only 1 TestimonialsPage document exists
    const updated = await TestimonialsPage.findOneAndUpdate(
      {},                     // no filter → update the first doc
      { $set: updatePath },   // update only provided fields
      { new: true }           // return updated doc
    );

    if (!updated) {
      return res.status(404).json({ error: "TestimonialsPage document not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT API - Manage testimonials
app.put("/testimonialspage",verifyToken, async (req, res) => {
  const { action, testimonialId, testimonialData } = req.body;

  try {
    // since we only have one document
    const page = await TestimonialsPage.findOne();
    if (!page) return res.status(404).json({ error: "Page not found" });

    switch (action) {
      case "add":
        page.sectionOne.testimonials.push(testimonialData);
        break;

      case "edit":
        if(!testimonialId) return res.status(404).json({error:"We need testimonialId"})
        const testimonial = page.sectionOne.testimonials.id(testimonialId);
        if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });
        testimonial.set(testimonialData);
        break;

      case "delete":
        if(!testimonialId) return res.status(404).json({error:"We need testimonialId"})
        page.sectionOne.testimonials.pull({ _id: testimonialId });
        break;

      default:
        return res.status(400).json({ error: "Invalid action. Use add, edit, or delete" });
    }

    await page.save();
    res.json({ message: `Testimonial ${action} successful`, data: page });
  } catch (err) {
    console.error("Error updating testimonials:", err.message);
    res.status(500).json({ error: "Failed to update testimonials" });
  }
});

app.get("/testimonialspage", async (req, res) => {
  try {
    const testimonials = await TestimonialsPage.findOne();
    if (!testimonials) {
      return res.status(404).json({ error: "testimonials page document not found" });
    }
    res.json(testimonials); // ✅ send the document, not the model
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//-----------------------------------------------------------About us Page-------------------------------------------------------

app.post("/aboutuspage",verifyToken, async (req, res) => {
  try {
    const aboutPage = new AboutusPage(req.body);
    await aboutPage.save();
    res.status(201).json({
      message: "About Us Page data saved successfully",
      data: aboutPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.patch("/aboutuspage", async (req, res) => {
  try {
    const { sectionName, data } = req.body; 
    // Example body:
    // { "sectionName": "bannerSection", "data": { "title": "Updated Title" } }
    // { "sectionName": "sectionOne", "data": { "description1": "Updated text" } }

    if (!sectionName || !data) {
      return res.status(400).json({ error: "sectionName and data are required" });
    }

    // Build update path dynamically
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    // Since you’ll usually have only ONE document
    const updated = await AboutusPage.findOneAndUpdate(
      {},                     // no filter → update first doc
      { $set: updatePath },   // update only provided fields
      { new: true }           // return updated doc
    );

    if (!updated) {
      return res.status(404).json({ error: "AboutusPage document not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
// ADD new item to an array section (e.g., sectionTwo.points OR sectionThree)
app.post("/aboutuspage/:sectionName", verifyToken,async (req, res) => {
  try {
    const { sectionName } = req.params;
    const data = req.body;

    // Special handling if sectionName is "sectionTwo.points"
    const updateField = sectionName === "points" 
      ? "sectionTwo.points" 
      : sectionName;

    const updated = await AboutusPage.findOneAndUpdate(
      {}, // assuming only one AboutusPage document
      { $push: { [updateField]: data } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "AboutusPage not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// EDIT one item inside an array section
app.patch("/aboutuspage/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { sectionName, itemId } = req.params;
    const data = req.body;

    // Decide the path (sectionTwo.points OR sectionThree)
    const arrayPath = sectionName === "points" ? "sectionTwo.points" : sectionName;

    // Build update path dynamically
    const updatePath = {};
    for (const key in data) {
      updatePath[`${arrayPath}.$.${key}`] = data[key];
    }

    const updated = await AboutusPage.findOneAndUpdate(
      { [`${arrayPath}._id`]: itemId }, // find array element by its _id
      { $set: updatePath },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE one item inside an array section
app.delete("/aboutuspage/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { sectionName, itemId } = req.params;

    // Decide the path (sectionTwo.points OR sectionThree)
    const arrayPath = sectionName === "points" ? "sectionTwo.points" : sectionName;

    const updated = await AboutusPage.findOneAndUpdate(
      {},
      { $pull: { [arrayPath]: { _id: itemId } } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET API - Fetch About Us Page
app.get("/aboutuspage", async (req, res) => {
  try {
    const aboutPage = await AboutusPage.findOne(); // since usually only one doc
    if (!aboutPage) {
      return res.status(404).json({ error: "About Us Page not found" });
    }
    res.json(aboutPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//----------------------------------------------------Placements Page-----------------------------------------------------------
// POST API - Save Placement Page
app.post("/placementpage",verifyToken, async (req, res) => {
  try {
    const placementPage = new PlacementPage(req.body);
    await placementPage.save();
    res.status(201).json({
      message: "Placement Page created successfully",
      data: placementPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.patch("/placementpage", async (req, res) => {
  try {
    const { sectionName, data } = req.body;
    // Example body:
    // { "sectionName": "bannerSection", "data": { "title": "Updated Banner" } }
    // { "sectionName": "sectionOne", "data": { "title": "Updated Section Title" } }
    // { "sectionName": "sectionTwo", "data": { "title": "Updated Stories Title" } }

    if (!sectionName || !data) {
      return res
        .status(400)
        .json({ error: "sectionName and data are required" });
    }

    // Build update path dynamically
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    // Update the first PlacementPage document
    const updated = await PlacementPage.findOneAndUpdate(
      {},
      { $set: updatePath },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "PlacementPage document not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
// ADD new item to an array section (e.g., sectionTwo.points OR sectionThree)
app.post("/placementpage/:sectionName",verifyToken, async (req, res) => {
  try {
    const { sectionName } = req.params;
    const data = req.body;

    // Handle special nested cases if you have any (like sectionTwo.points in AboutusPage)
    const updateField = sectionName === "points" 
      ? "sectionTwo.points" 
      : sectionName;

    const updated = await PlacementPage.findOneAndUpdate(
      {}, // assuming only one PlacementPage document
      { $push: { [updateField]: data } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "PlacementPage not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// EDIT one item inside an array section
app.patch("/placementpage/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { sectionName, itemId } = req.params;
    const data = req.body;

    const arrayPath = sectionName === "points" ? "sectionTwo.points" : sectionName;

    const updatePath = {};
    for (const key in data) {
      updatePath[`${arrayPath}.$.${key}`] = data[key];
    }

    const updated = await PlacementPage.findOneAndUpdate(
      { [`${arrayPath}._id`]: itemId },
      { $set: updatePath },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE one item inside an array section
app.delete("/placementpage/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { sectionName, itemId } = req.params;

    const arrayPath = sectionName === "points" ? "sectionTwo.points" : sectionName;

    const updated = await PlacementPage.findOneAndUpdate(
      {},
      { $pull: { [arrayPath]: { _id: itemId } } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET API - Fetch Placement Page (assuming only one document)
app.get("/placementpage", async (req, res) => {
  try {
    const page = await PlacementPage.findOne();
    if (!page) {
      return res.status(404).json({ error: "Placement Page not found" });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//----------------------------------------------Contact us Page--------------------------------------------------------------
// POST API - Create a new ContactUsPage document
app.post("/contactuspage", verifyToken, async (req, res) => {
  try {
    const newPage = new ContactUsPage(req.body);
    const savedPage = await newPage.save();
    res.status(201).json(savedPage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET API - Fetch the ContactUsPage document
app.get("/contactuspage",  async (req, res) => {
  try {
    const page = await ContactUsPage.findOne(); // only one document expected
    if (!page) {
      return res.status(404).json({ error: "ContactUsPage not found" });
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH API - Update specific section (bannerSection / sectionOne)
app.patch("/contactuspage", verifyToken, async (req, res) => {
  try {
    const { sectionName, data } = req.body;
    // Example request body:
    // { "sectionName": "bannerSection", "data": { "title": "Updated Banner Title" } }
    // { "sectionName": "sectionOne", "data": { "description": "Updated Description" } }

    if (!sectionName || !data) {
      return res
        .status(400)
        .json({ error: "sectionName and data are required" });
    }

    // Build dynamic update object
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    // Update the first ContactUsPage document
    const updated = await ContactUsPage.findOneAndUpdate(
      {},
      { $set: updatePath },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "ContactUsPage document not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/contactusform",async(req,res)=>{
    const{ name,email,phone,message,subject}=req.body;
    if(!name || !email || !phone || !message || !subject){
        return res.status(400).json({error:"Please fill all the fields"});
    }
    try{
        const mailOptions={
          from: process.env.EMAIL_USER,
          to: process.env.CONTACT_US_RECEIVER_EMAIL ,//where to send 
          subject:`New Contact Us Form Submission`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
              <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
                <div style="background: #4CAF50; color: white; padding: 15px 20px; text-align: center;">
                  <h2 style="margin: 0; margin-top:'-5px' font-weight: 600;">📩 New Contact Form Submission</h2>
                </div>
                <div style="padding: 20px;">
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
                  <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 8px 0;"><strong>Message:</strong><br/> ${message}</p>
                </div>
                <div style="background: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #777;">
                  <p style="margin: 0;">This email was sent from your website’s contact form.</p>
                </div>
              </div>
            </div>
          `
         }
        await transporter.sendMail(mailOptions);
        return res.status(200).json({message:"Form submitted successfully"});
    }catch(err){
       res.status(500).json({error:err.message});
    }
})

//-----------------------------------------------Company Details Page--------------------------------------------------------------
// POST API
app.post("/companydetails",verifyToken, async (req, res) => {
  try {
    const newCompanyDetails = new CompanyDetailsPage(req.body);
    await newCompanyDetails.save();
    res.status(201).json(newCompanyDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PATCH API
app.patch("/companydetails",verifyToken, async (req, res) => {
  try {
    const { sectionName, data } = req.body;
    // Example request body:
    // { "sectionName": "sectionOne", "data": { "companyName": "New Name", "phone1": "1234567890" } }
    // { "sectionName": "socialMediaLinks", "data": { "facebook": "https://facebook.com/mycompany" } }
    // { "sectionName": "digitalMarketingTags", "data": { "metaDescription": "Updated SEO desc" } }

    if (!sectionName || !data) {
      return res.status(400).json({ error: "sectionName and data are required" });
    }

    // Build dynamic update object
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    // Update the first CompanyDetailsPage document
    const updated = await CompanyDetailsPage.findOneAndUpdate(
      {},
      { $set: updatePath },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "CompanyDetailsPage document not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.patch("/companydetails/addresses", verifyToken, async (req, res) => {
  try {
    const { action, addressId, data } = req.body;

    let updated;

    switch (action) {
      case "add":
        updated = await CompanyDetailsPage.findOneAndUpdate(
          {},
          { $push: { addresses: data } },
          { new: true, runValidators: true }
        );
        break;

      case "edit":
        if (!addressId || !data) {
          return res.status(400).json({ error: "addressId and data required for edit" });
        }

        const updatePath = {};
        for (let key in data) {
          updatePath[`addresses.$.${key}`] = data[key];
        }

        updated = await CompanyDetailsPage.findOneAndUpdate(
          { "addresses._id": addressId },
          { $set: updatePath },
          { new: true, runValidators: true }
        );
        break;

      case "delete":
        if (!addressId) {
          return res.status(400).json({ error: "addressId required for delete" });
        }

        updated = await CompanyDetailsPage.findOneAndUpdate(
          {},
          { $pull: { addresses: { _id: addressId } } },
          { new: true }
        );
        break;

      // ✅ New case for default address
      case "setDefault":
        if (!addressId) {
          return res.status(400).json({ error: "addressId required for setDefault" });
        }

        // Step 1: Set all addresses default=false
        await CompanyDetailsPage.updateOne({}, { $set: { "addresses.$[].default": false } });

        // Step 2: Set the selected address default=true
        updated = await CompanyDetailsPage.findOneAndUpdate(
          { "addresses._id": addressId },
          { $set: { "addresses.$.default": data.default } },
          { new: true }
        );
        break;

      default:
        return res.status(400).json({ error: "Invalid action. Use add, edit, delete, or setDefault." });
    }

    if (!updated) {
      return res.status(404).json({ error: "CompanyDetailsPage not found or address not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET API
app.get("/companydetails", async (req, res) => {
  try {
    const companyDetails = await CompanyDetailsPage.findOne(); // usually only one document
    if (!companyDetails) {
      return res.status(404).json({ error: "CompanyDetailsPage not found" });
    }
    res.json(companyDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//---------------------------------------------Course Details Page-------------------------------------------------------------------------------------------------

/**
 * POST API - Add new course
 */
app.post("/coursedetails", async (req, res) => {
  try {
    const newCourse = new CourseDetail(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error("POST Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET API - Get all courses
 */
app.get("/coursedetails", async (req, res) => {
  try {
    const courses = await CourseDetail.find();
    res.json(courses);
  } catch (err) {
    console.error("GET Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
/**
 * GET API - Get specific course by id
 */
app.get("/coursedetails/:id", async (req, res) => {
  try {
    const course = await CourseDetail.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error("GET By ID Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
//delete the course by id
app.delete("/coursedetails/:id", async (req, res) => {
  try {
    const deletedCourse = await CourseDetail.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully", deletedCourse });
  } catch (err) {
    console.error("DELETE Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


/**
 * PATCH API - Update a specific section of a course
 * Example body:
 * {
 *   "sectionName": "bannerSection",
 *   "data": { "title": "Updated Banner Title" }
 * }
 */
app.patch("/coursedetails/:id",verifyToken, async (req, res) => {
  try {
    const { sectionName, data } = req.body;
    if (!sectionName || !data) {
      return res
        .status(400)
        .json({ error: "sectionName and data are required" });
    }

    // Build dynamic update object
    const updatePath = {};
    for (let key in data) {
      updatePath[`${sectionName}.${key}`] = data[key];
    }

    const updated = await CourseDetail.findByIdAndUpdate(
      req.params.id,
      { $set: updatePath },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ADD new item to an array section (e.g., curriculum.points OR toolsSection.tools)
app.post("/coursedetails/:id/:sectionName", verifyToken, async (req, res) => {
  try {
    const { id, sectionName } = req.params;
    const data = req.body;

    // Handle nested cases like curriculum.points or enrollSection.points
    let updateField = sectionName;
    if (sectionName === "points") {
      // Example: if you want to push into enrollSection.points
      // You can expand this switch based on your schema
      updateField = "enrollSection.points";
    }

    const updated = await CourseDetail.findByIdAndUpdate(
      id,
      { $push: { [updateField]: data } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Course not found" });

    res.json(updated);
  } catch (err) {
    console.error("ADD Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// EDIT one item inside an array section
app.patch("/coursedetails/:id/:sectionName/:itemId",verifyToken, async (req, res) => {
  try {
    const { id, sectionName, itemId } = req.params;
    const data = req.body;

    let arrayPath = sectionName;
    if (sectionName === "points") {
      arrayPath = "enrollSection.points"; // adjust as needed
    }

    const updatePath = {};
    for (const key in data) {
      updatePath[`${arrayPath}.$.${key}`] = data[key];
    }

    const updated = await CourseDetail.findOneAndUpdate(
      { _id: id, [`${arrayPath}._id`]: itemId },
      { $set: updatePath },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    console.error("EDIT Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// DELETE one item inside an array section
app.delete("/coursedetails/:id/:sectionName/:itemId", async (req, res) => {
  try {
    const { id, sectionName, itemId } = req.params;

    let arrayPath = sectionName;
    if (sectionName === "points") {
      arrayPath = "enrollSection.points"; // adjust as needed
    }

    const updated = await CourseDetail.findByIdAndUpdate(
      id,
      { $pull: { [arrayPath]: { _id: itemId } } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });

    res.json(updated);
  } catch (err) {
    console.error("DELETE Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/enquiryform", async (req, res) => {
  const { fullName, email, phone, qualification } = req.body;

  if (!fullName || !email || !phone || !qualification) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ENQUIRY_RECEIVER_EMAIL, // admin email for enquiries
      subject: "🎓 New Course Enquiry Submission",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: #007BFF; color: white; padding: 15px 20px; text-align: center;">
              <h2 style="margin: 0; font-weight: 600;">📋 New Course Enquiry Form</h2>
              <p style="margin: 0; font-size: 14px;">You have received a new enquiry from your website</p>
            </div>

            <!-- Body -->
            <div style="padding: 20px;">
              <p style="margin: 8px 0;"><strong>👤 Full Name:</strong> ${fullName}</p>
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>📞 Phone:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong>🎓 Qualification:</strong> ${qualification}</p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #777;">
              <p style="margin: 0;">This email was sent from your website’s <strong>Course Enquiry Form</strong>.</p>
            </div>

          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Enquiry form submitted successfully" });
  } catch (err) {
    console.error("Error sending enquiry email:", err);
    return res.status(500).json({ error: err.message });
  }
});
app.post("/courseenquiry", async (req, res) => {
  const { name, email, mobilenumber, courseName, modeoftraining } = req.body;

  // ✅ Basic validation
  if (!name || !email || !mobilenumber || !courseName || !modeoftraining) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ENQUIRY_RECEIVER_EMAIL, // admin email for course enquiries
      subject: "🎓 New Course Enquiry Received",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: #007BFF; color: white; padding: 15px 20px; text-align: center;">
              <h2 style="margin: 0; font-weight: 600;">📋 New Course Enquiry</h2>
              <p style="margin: 0; font-size: 14px;">A new enquiry has been submitted from your website</p>
            </div>

            <!-- Body -->
            <div style="padding: 20px;">
              <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>📞 Mobile Number:</strong> ${mobilenumber}</p>
              <p style="margin: 8px 0;"><strong>📚 Course Name:</strong> ${courseName}</p>
              <p style="margin: 8px 0;"><strong>💻 Mode of Training:</strong> ${modeoftraining}</p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #777;">
              <p style="margin: 0;">This email was sent from your website’s <strong>Course Enquiry Form</strong>.</p>
            </div>

          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Course enquiry submitted successfully" });
  } catch (err) {
    console.error("Error sending course enquiry email:", err);
    return res.status(500).json({ error: err.message });
  }
});


//----------------------------------------------------Training Program Banner-----------------------------------------------------

//---------------------------------------------Course Page-------------------------------------------------------------------------------------------------

// POST: Create initial training program
app.post("/training-programs", async (req, res) => {
  try {
    const { bannerSection } = req.body;
    const program = new TrainingProgram({ bannerSection });
    const savedProgram = await program.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create training program", error });
  }
});

// GET: Get the first training program
app.get("/training-programs", async (req, res) => {
  try {
    const programs = await TrainingProgram.find();
    if (programs.length === 0) {
      return res.status(404).json({ message: "No training programs found" });
    }
    res.status(200).json(programs[0]); // return first program
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch training programs", error });
  }
});


// PATCH: Update the single training program
app.patch("/training-programs", verifyToken, async (req, res) => {
  try {
    const { bannerSection } = req.body;

    if (!bannerSection || typeof bannerSection !== "object") {
      return res.status(400).json({ message: "bannerSection object is required" });
    }

    // Find the single document (assume only one exists)
    const program = await TrainingProgram.findOne();
    if (!program) {
      return res.status(404).json({ message: "Training program not found" });
    }

    // Update only the provided fields
    program.bannerSection.title = bannerSection.title ?? program.bannerSection.title;
    program.bannerSection.subTitle = bannerSection.subTitle ?? program.bannerSection.subTitle;
    program.bannerSection.backgroundImageUrl =
      bannerSection.backgroundImageUrl ?? program.bannerSection.backgroundImageUrl;

    // Save the updated program
    const updatedProgram = await program.save();

    res.status(200).json(updatedProgram);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update training program", error });
  }
});

//---------------------------------------------------image and video upload using multer---------------------------------------------------

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

makeDir(path.join(__dirname, 'uploads/images'));
makeDir(path.join(__dirname, 'uploads/videos'));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/');
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/');
    } else {
      cb(new Error('Only images and videos are allowed'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, //500MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, MP4, and MPEG are allowed.'));
    }
  },
});

// Error handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  next();
});

/* ================== ROUTES ================== */

// Upload Image
app.post('/upload/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  const imageUrl = `${BASE_URL}/uploads/images/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Upload Video
app.post('/upload/video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video uploaded' });
  }
  const videoUrl = `${BASE_URL}/uploads/videos/${req.file.filename}`;
  res.status(200).json({ videoUrl });
});

// ---------------------------------------------MongoDB connection------------------------------------------------------------------------------------------------
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

async function connectDB() {
  try {
    if (!mongoURI.startsWith('mongodb')) {
      throw new Error('Invalid MONGO_URI: must start with "mongodb://" or "mongodb+srv://"');
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // fail fast if cluster unreachable
      family: 4, // ✅ Force IPv4 (works on all systems & VPS)
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit so PM2/Docker/systemd can restart
  }
}

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});