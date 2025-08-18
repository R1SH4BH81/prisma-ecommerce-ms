const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);

const PORT = process.env.PRODUCT_PORT || 5002;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
