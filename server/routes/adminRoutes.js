const express = require('express');
const router = express.Router();

const {
  loginAdmin,
  createCandidateAccount,
  getCandidates,
  removeCandidate,
  viewAdminProfile,
} = require('../controllers/adminController');

const { protect, authorizeRole } = require('../middleware/authMiddleware');


router.post('/login', loginAdmin);


router.post(
  '/create-candidate',
  protect,
  authorizeRole('admin'),
  createCandidateAccount
);

router.get('/candidates', protect, authorizeRole('admin'), getCandidates);

router.delete(
  '/candidate/:id',
  protect,
  authorizeRole('admin'),
  removeCandidate
);

router.get('/profile', protect, authorizeRole('admin'), viewAdminProfile);

module.exports = router;
