const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/:id', getExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
