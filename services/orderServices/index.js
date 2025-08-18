require("dotenv").config();
const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/order.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);

const PORT = process.env.ORDER_PORT || 5003;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
