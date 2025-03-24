const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const os = require("os"); // For getting network interfaces
const mongoose = require("mongoose");
const taskRoutes = require("./src/routes/taskRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

// Function to get network interfaces
const getNetworkInfo = () => {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (!iface.internal && iface.family === "IPv4") {
        addresses.push({
          interface: name,
          address: iface.address,
        });
      }
    }
  }

  return addresses;
};

// Test database connection and start server
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connection established successfully");
    console.log("📊 Connected to database: task-manager");

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);

      // Display network information
      const networkInfo = getNetworkInfo();

      if (networkInfo.length > 0) {
        console.log("📡 Server accessible at:");
        networkInfo.forEach((info) => {
          console.log(`   http://${info.address}:${PORT} (${info.interface})`);
        });
      } else {
        console.log("📡 No external network interfaces found");
      }

      console.log("🔗 Local access: http://localhost:" + PORT);
      console.log("📝 API endpoints: http://localhost:" + PORT + "/api/tasks");
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:");
    console.error(error);
    process.exit(1);
  } finally {
    // Disconnect Mongoose when process is terminated
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Database connection closed");
      process.exit(0);
    });
  }
}

// Run the server
startServer();
