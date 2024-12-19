const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 4000;

// Middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sanchir2007", //password
  database: "e_commerse",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

app.get("/orders", (req, res) => {
  const query = "SELECT * FROM orders";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

app.get("/reviews", (req, res) => {
  const query = "SELECT * FROM reviews";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

// Create a new user
app.post("/createUsers", (req, res) => {
  const { name, description, price, stock } = req.body;
  const query =
    "INSERT INTO users (username, description, price, stock) VALUES (?, ?, ?)";
  db.query(query, [name, description, price, stock], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, name, email });
    }
  });
});
app.post("/createProducts", (req, res) => {
  const { product_name, description, price, stock } = req.body;
  const query =
    "INSERT INTO products (product_name, description, price, stock) VALUES (?, ?, ?, ?)";
  db.query(query, [product_name, description, price, stock], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, product_name, description, price, stock });
    }
  });
});

app.post("/createOrders", (req, res) => {
  const { id, amount, status } = req.body;
  const query =
    "INSERT INTO users (id, amount, status) VALUES (?, ?, ?)";
  db.query(query, [id, amount, status], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, id, amount, status });
    }
  });
});
app.post("/createOrders", (req, res) => {
  const { order_id, amount, status } = req.body;
  const query =
    "INSERT INTO orders (order_id, description, price, stock) VALUES (?, ?, ?)";
  db.query(query, [order_id, amount, status], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, id, amount, status });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
