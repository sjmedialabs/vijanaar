const mongoose=require('mongoose');
const UserPageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date
});

module.exports =new mongoose.model('Login', UserPageSchema);