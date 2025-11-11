require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const initAdmin = require('./config/initAdmin'); 

//  Database connection
connectDB().then(() => {
  initAdmin();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
