const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Routes
const authRoutes = require("./routes/user/authentication");
const profileRoutes = require("./routes/user/profile");
const imageRoutes = require("./routes/image");
const competRoutes = require("./routes/competition/comp");
const ticketRoutes = require("./routes/competition/ticket");
const winnerRoutes = require("./routes/competition/winner");
const paymentProcessRoutes = require("./routes/payment/process");

// Database
const sequelize = require("./config/database");

// Initialie express
const app = express();
    
// Load environment variables from .env file
dotenv.config();

// Allow cross-origin requests
app.use(
    cors({
      origin: [process.env.CLIENT_URL],
      credentials: true,
    })
);

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/competitions", competRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/winners", winnerRoutes);

app.use("/api/paymentProcess", paymentProcessRoutes);

app.use("/api/image", imageRoutes);

// An api endpoint that returns a short list of items
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    }
);

// Connect to Db
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection to database has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
    
// Handles any requests that don't match the ones above
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

