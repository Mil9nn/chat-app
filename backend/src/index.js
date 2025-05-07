import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'

import { app, server } from "./lib/socket.js";

import path from 'path'

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === "development"
    ? "http://localhost:5173"  // Your Vite dev server
    : true,                    // Allow current origin in production
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../frontend/dist");
  app.use(express.static(frontendPath));

  // Update this line in backend/src/index.js
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.get('/', (req, res) => {
  res.send("server is running...");
})

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
