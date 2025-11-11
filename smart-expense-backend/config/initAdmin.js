const User = require('../models/User');
const bcrypt = require('bcryptjs');

const initAdmin = async () => {
  try {
    const email = 'admin_email_goes_here';
    const password = 'admin_code_here';

    // Check if superadmin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Superadmin already exists');
      return;
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating superadmin
    const superadmin = await User.create({
      name: 'Super Admin',
      email,
      password: hashedPassword,
      role: 'superadmin',
    });

    console.log('Superadmin created:', superadmin.email);
  } catch (err) {
    console.error('Error creating superadmin:', err.message);
  }
};

module.exports = initAdmin;
