const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


exports.adminLogin = async (email, password, secret) => {
  const adminUser = await User.findOne({ email });
  if (!adminUser) {
    throw new Error('Invalid email or password');
  }

  if (adminUser.role !== 'admin') {
    throw new Error('Access denied. Not an admin.');
  }


  const isMatch = await bcrypt.compare(password, adminUser.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }


  const token = jwt.sign({ id: adminUser._id }, secret, { expiresIn: '1d' });

  return { message: 'Admin logged in', token };
};

exports.createCandidate = async (candidateData) => {
  const { name, mobile, address, email, password } = candidateData;


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  const newCandidate = new User({
    name,
    mobile,
    address,
    email,
    password,
    role: 'candidate',
  });

  await newCandidate.save();
  return { message: 'Candidate created', candidate: newCandidate };
};


exports.getAllCandidates = async () => {
  const candidates = await User.find({ role: 'candidate' });
  return candidates;
};


exports.deleteCandidate = async (candidateId) => {
  const candidate = await User.findById(candidateId);
  if (!candidate || candidate.role !== 'candidate') {
    throw new Error('Candidate not found');
  }

  await candidate.remove();
  return { message: 'Candidate deleted' };
};


exports.getAdminProfile = async (adminUser) => {

  return {
    name: adminUser.name,
    email: adminUser.email,
    mobile: adminUser.mobile,
    address: adminUser.address,
    role: adminUser.role,
  };
};
