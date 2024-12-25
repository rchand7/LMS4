import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath for ES modules

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({});

// Call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// APIs
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Serve the static files from the frontend build
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all route to serve the frontend's index.html file for any unmatched route
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
