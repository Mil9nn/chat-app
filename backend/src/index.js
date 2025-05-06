import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("server is running...");
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
