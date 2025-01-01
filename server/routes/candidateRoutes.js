const express = require('express');
const router = express.Router();

const {
  loginCandidate,
  viewCandidateProfile,
} = require('../controllers/candidateController');

const { protect } = require('../middleware/authMiddleware');


router.post('/login', loginCandidate);

router.get('/profile', protect, viewCandidateProfile);

module.exports = router;
