const mongoose = require("mongoose");

const TrainingProgramsSchema = new mongoose.Schema({
  bannerSection: {
    title: { type: String },
    subTitle: { type: String },
    backgroundImageUrl: { type: String }
  }
});

module.exports = new mongoose.model("TrainingProgram", TrainingProgramsSchema);