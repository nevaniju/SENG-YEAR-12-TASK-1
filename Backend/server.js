const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = new sqlite3.Database("./database/task_log.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create the tasks table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    due_date TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL
);
`;
db.run(createTableQuery, (err) => {
  if (err) console.error("Error creating table:", err.message);
});

// API Routes

// Get all tasks
app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { name, due_date, category, priority } = req.body;

  // Input validation
  if (!name || !due_date || !category || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const insertQuery = "INSERT INTO tasks (name, due_date, category, priority) VALUES (?, ?, ?, ?)";
  db.run(insertQuery, [name, due_date, category, priority], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// Update an existing task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, due_date, category, priority } = req.body;

  // Input validation
  if (!name || !due_date || !category || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const updateQuery = `
    UPDATE tasks 
    SET name = ?, due_date = ?, category = ?, priority = ?
    WHERE id = ?
  `;
  db.run(updateQuery, [name, due_date, category, priority, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM tasks WHERE id = ?";
  db.run(deleteQuery, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
