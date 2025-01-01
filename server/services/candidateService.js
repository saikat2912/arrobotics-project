const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


exports.candidateLogin = async (email, password, secret) => {
  const candidateUser = await User.findOne({ email });
  if (!candidateUser) {
    throw new Error('Invalid email or password');
  }

  if (candidateUser.role !== 'candidate') {
    throw new Error('Access denied. Not a candidate.');
  }


  const isMatch = await bcrypt.compare(password, candidateUser.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: candidateUser._id }, secret, { expiresIn: '1d' });
  return { message: 'Candidate logged in', token };
};


exports.getCandidateProfile = async (candidateUser) => {
  return {
    name: candidateUser.name,
    email: candidateUser.email,
    mobile: candidateUser.mobile,
    address: candidateUser.address,
    role: candidateUser.role,
  };
};
