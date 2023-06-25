const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  notionId: { type: String },
  email: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});


const User = mongoose.model('User', userSchema);
module.exports = User;