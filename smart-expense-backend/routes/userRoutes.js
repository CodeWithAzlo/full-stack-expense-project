const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Admin routes
router.get('/', protect, authorize('admin', 'superadmin'), getAllUsers);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteUser);

module.exports = router;
