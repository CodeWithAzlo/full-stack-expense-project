const Expense = require('../models/Expense');
const { expenseValidation } = require('../utils/validate');
/*
@desc   Create new expense
@route  POST /api/expenses
@access User
*/
const createExpense = async (req, res) => {
  const { error } = expenseValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const expense = await Expense.create({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json({ message: 'Expense created', expense });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
/*
@desc   Get all expenses of logged-in user
@route  GET /api/expenses
@access User
*/
const getExpenses = async (req, res) => {
  try {
    let expenses;
    if (req.user.role === 'user') {
      expenses = await Expense.find({ user: req.user._id }).sort('-date');
    } else {
      // Admin or superadmin
      expenses = await Expense.find().populate('user', 'name email').sort('-date');
    }
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
/*
@desc   Get single expense by ID (only owner or admin)
@route  GET /api/expenses/:id
@access User/Admin
*/
const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (req.user.role === 'user' && expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this expense' });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/*
@desc   Update expense
@route  PUT /api/expenses/:id
@access User/Admin
*/
const updateExpense = async (req, res) => {
  const { error } = expenseValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (req.user.role === 'user' && expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this expense' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Expense updated', expense: updatedExpense });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/*
@desc   Delete expense
@route  DELETE /api/expenses/:id
@access User/Admin
*/

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (req.user.role === 'user' && expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await expense.remove();
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createExpense, getExpenses, getExpense, updateExpense, deleteExpense };
