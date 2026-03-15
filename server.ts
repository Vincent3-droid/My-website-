import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("restaurant.db");
const JWT_SECRET = process.env.JWT_SECRET || "perrys-secret-key-123";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sent_emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER,
    recipient TEXT,
    subject TEXT,
    content TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(booking_id) REFERENCES bookings(id)
  );
`);

// Create default admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", hashedPassword);
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // --- Auth Middleware ---
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // --- API Routes ---

  // Public: Submit Contact Form
  app.post("/api/contact", async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    try {
      const result = db.prepare("INSERT INTO bookings (first_name, last_name, email, message) VALUES (?, ?, ?, ?)").run(firstName, lastName, email, message);
      const bookingId = result.lastInsertRowid;

      // Automated Confirmation Email (Mocked)
      const subject = "Booking Confirmation - Perry's Steakhouse";
      const content = `Dear ${firstName},\n\nThank you for contacting Perry's Steakhouse. We have received your message and our team will get back to you shortly.\n\nMessage: ${message}\n\nRare and Well Done®`;
      
      db.prepare("INSERT INTO sent_emails (booking_id, recipient, subject, content) VALUES (?, ?, ?, ?)").run(bookingId, email, subject, content);

      console.log(`[EMAIL SENT TO ${email}]: ${subject}`);

      res.status(201).json({ success: true, message: "Booking received and confirmation email sent." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process booking." });
    }
  });

  // Admin: Login
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Admin: Get Bookings
  app.get("/api/bookings", authenticateToken, (req, res) => {
    const bookings = db.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all();
    res.json(bookings);
  });

  // Admin: Update Booking Status
  app.patch("/api/bookings/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(status, id);
    res.json({ success: true });
  });

  // Admin: Send Manual Confirmation
  app.post("/api/bookings/:id/send-confirmation", authenticateToken, (req, res) => {
    const { id } = req.params;
    const booking: any = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const subject = `Update on your Booking - Perry's Steakhouse`;
    const content = `Dear ${booking.first_name},\n\nYour booking status has been updated to: ${booking.status.toUpperCase()}.\n\nThank you for choosing Perry's.`;
    
    db.prepare("INSERT INTO sent_emails (booking_id, recipient, subject, content) VALUES (?, ?, ?, ?)").run(id, booking.email, subject, content);
    console.log(`[MANUAL EMAIL SENT TO ${booking.email}]: ${subject}`);

    res.json({ success: true, message: "Confirmation email sent." });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
