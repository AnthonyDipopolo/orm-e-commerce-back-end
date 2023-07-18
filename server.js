// Import the express library
const express = require('express');

// Import the routes module
const routes = require('./routes');

// Import the sequelize connection from the config file
const sequelize = require('./config/connection');

// Create an Express app instance
const app = express();

// Define the port to be used for the server
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in the 'routes' module for handling API requests
app.use(routes);

// Sync sequelize models to the database and then start the server
// The force: false option prevents dropping and re-creating tables if they already exist
sequelize.sync({ force: false }).then(() => {
  // Start the server and listen on the defined port
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
