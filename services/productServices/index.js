const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/categories", categoryRoutes);
// Routes
app.use("/products", productRoutes);

const PORT = process.env.PRODUCT_PORT || 5002;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
