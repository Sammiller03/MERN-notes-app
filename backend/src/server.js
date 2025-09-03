import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js"; 
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

// middleware
// allows requests from all urls
app.use(cors({
        origin: "http://localhost:5173",
    })
); 
app.use(express.json()); // used to parse json request bodies
app.use(rateLimiter);
// Simple custom middleware, just before we send a response back... we call our middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//     next();
// });

// Routes
app.use("/api/notes/", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: 5001");
    });
});