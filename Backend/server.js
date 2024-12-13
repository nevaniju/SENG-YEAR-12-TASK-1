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
db.run(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    due_date TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL
  );`
);

// API Routes

// Get all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get a single task by ID
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { name, due_date, category, priority } = req.body;
  if (!name || !due_date || !category || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.run(
    "INSERT INTO tasks (name, due_date, category, priority) VALUES (?, ?, ?, ?)",
    [name, due_date, category, priority],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, due_date, category, priority } = req.body;

  if (!name || !due_date || !category || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.run(
    "UPDATE tasks SET name = ?, due_date = ?, category = ?, priority = ? WHERE id = ?",
    [name, due_date, category, priority, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ changes: this.changes });
      }
    }
  );
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
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