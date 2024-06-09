if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const expressLayouts = require('express-ejs-layouts');
  const mongoose = require('mongoose');
  
  const app = express();
  
  const indexRouter = require('./routes/index');
  
  // Set up view engine and layouts
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('layout', 'layouts/layout');
  app.use(expressLayouts);
  app.use(express.static('public'));
  
  // Connect to MongoDB
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
  });
  
  // Set up routes
  app.use('/', indexRouter);
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  