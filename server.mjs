import express from "express";
import cors from "cors";
import db from "./db.js";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Error fetching users", err: err.message });
    } else {
      res.json({ users: result.rows });
    }
  });
});

app.post("/user", (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error inserting user" });
      } else {
        res.status(201).send({ message: "User inserted successfully" });
      }
    }
  );
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error fetching user" });
    } else {
      res.json({ user: result.rows[0] });
    }
  });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  db.query(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
    [name, email, password, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating user" });
      } else {
        res.send({ message: "User updated successfully" });
      }
    }
  );
});
app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting user" });
    } else {
      res.send({ message: "User deleted successfully" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
