require("dotenv").config();
const express = require("express");
const paymentRoutes = require("./routes/payment.routes");

const app = express();
app.use(express.json());

app.use("/payment", paymentRoutes);

const PORT = process.env.PAYMENT_PORT || 5005;
app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
