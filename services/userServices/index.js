// services/user-service/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.USER_PORT || 5001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
