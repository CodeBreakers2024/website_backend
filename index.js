const express = require("express");
const connectToMongo = require("./database/DB");
const dotenv = require("dotenv");
const cors = require("cors")
// Load environment variables from .env file
dotenv.config();

const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";

// Connect to MongoDB
connectToMongo();

app.use("/user",require("./routes/UserOperations"))
app.use("/admin",require("./routes/AdminOperations"))

app.listen(PORT, () => {
  const baseUrl = `${PROTOCOL}://${HOST}:${PORT}`;
  console.log(`Server is running at ${baseUrl}`);
});
