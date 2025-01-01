
const {
    candidateLogin,
    getCandidateProfile,
  } = require('../services/candidateService');
  const dotenv = require('dotenv');
  dotenv.config();
  
  const JWT_SECRET = process.env.JWT_SECRET;

  exports.loginCandidate = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await candidateLogin(email, password, JWT_SECRET);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  exports.viewCandidateProfile = async (req, res) => {
    try {
      const candidateProfile = await getCandidateProfile(req.user);
      res.json(candidateProfile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  