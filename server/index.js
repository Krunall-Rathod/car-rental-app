require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const colors = require("colors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB'.bgBlue);
    startServer();
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`.red);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/users', userRoutes);

app.use('/api/cars', carRoutes);
app.use('/api/booking', bookingRoutes);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '../build')));

// Serve the React app for any other routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Start the server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgBlue);
  });
}
