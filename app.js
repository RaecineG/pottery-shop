// Set up a basic Express server
const express = require('express');
const app = express();
const path = require('path');

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set static folder for CSS and images
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to render home page
app.get('/', (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.send("Error loading products.");
    } else {
      res.render('index', { title: 'Pottery Shop' , products: rows });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});

// Import the sqlite3 library
const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./database/shop.db');

// Create a table for pottery products
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, image TEXT)");
});

app.get('/', (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
          console.error(err.message);
          res.send("Error loading products.");
      } else {
          res.render('index', { title: 'Pottery Shop', products: rows });
      }
  });
});
