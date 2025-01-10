const express = require("express");
const userRoutes = require("./Routes/user");
const productRoutes = require("./Routes/product");
const cartRoutes = require("./Routes/cart");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB 
mongoose
  .connect(
    process.env.DB_URL
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Connection error", error));

// CORS options
const corsOptions = {
  exposedHeaders: ["auth_token"], // Allow the client to access the auth_token
  origin: "http://localhost:3000", // React app origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization", "auth_token"], // Allow custom headers like auth_token
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/",productRoutes)
app.use("/api/user", userRoutes);
app.use("/api/cart",cartRoutes)

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
