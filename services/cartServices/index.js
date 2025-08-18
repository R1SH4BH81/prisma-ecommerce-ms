require("dotenv").config();
const express = require("express");
const cartRoutes = require("./routes/cart.routes");

const app = express();
app.use(express.json());

app.use("/cart", cartRoutes);

const PORT = process.env.CART_PORT || 5004;
app.listen(PORT, () => {
  console.log(`Cart service running on port ${PORT}`);
});
