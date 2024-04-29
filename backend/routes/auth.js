const express = require('express');
const {register, login, getMe, logout, getAllUser, updateReviewFilter} = require('../controllers/auth');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.route('/users').get(protect, authorize('admin'), getAllUser);
router.route('/users/:id/reviewFilter').put(protect, updateReviewFilter);
module.exports = router;