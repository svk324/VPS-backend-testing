import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./src/routes/taskRoutes";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "4000", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Task Manager API is running" });
});

// Test database connection and start server
async function startServer(): Promise<void> {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(dbUrl);
    console.log("✅ Database connection established successfully");
    console.log("📊 Connected to database: task-manager");

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Local access: http://localhost:${PORT}`);
      console.log(`📝 API endpoints: http://localhost:${PORT}/api/tasks`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:");
    console.error(error);
    process.exit(1);
  }

  // Disconnect Mongoose when process is terminated
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  });
}

// Run the server
startServer();
