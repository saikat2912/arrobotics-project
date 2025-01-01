
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  mobile: {
   type:String,
    required: [true, 'Mobile number is required'],
  },
  address: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'candidate'],
    default: 'candidate',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  const crypt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, crypt);
  next();
});

module.exports = mongoose.model('User', userSchema);
