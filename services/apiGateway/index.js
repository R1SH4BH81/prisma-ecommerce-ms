const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 🔑 Middleware for parsing JSON
app.use(express.json());

// Map routes to microservices
app.use(
  "/auth",
  createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true })
);
app.use(
  "/products",
  createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true })
);
app.use(
  "/orders",
  createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true })
);
app.use(
  "/cart",
  createProxyMiddleware({ target: "http://localhost:5004", changeOrigin: true })
);
app.use(
  "/payment",
  createProxyMiddleware({ target: "http://localhost:5005", changeOrigin: true })
);

// Root check
app.get("/", (req, res) => {
  res.json({ message: "API Gateway is running 🚀" });
});

// Start Gateway
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
