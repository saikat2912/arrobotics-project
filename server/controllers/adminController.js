const {
    adminLogin,
    createCandidate,
    getAllCandidates,
    deleteCandidate,
    getAdminProfile,
  } = require('../services/adminService');
  const dotenv = require('dotenv');
  dotenv.config();
  
  const JWT_SECRET = process.env.JWT_SECRET;
  
  exports.loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await adminLogin(email, password, JWT_SECRET);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  exports.createCandidateAccount = async (req, res) => {
    try {
      const result = await createCandidate(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  exports.getCandidates = async (req, res) => {
    try {
      const candidates = await getAllCandidates();
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.removeCandidate = async (req, res) => {
    try {
      const candidateId = req.params.id;
      const result = await deleteCandidate(candidateId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  exports.viewAdminProfile = async (req, res) => {
    try {
      const adminProfile = await getAdminProfile(req.user);
      res.json(adminProfile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  