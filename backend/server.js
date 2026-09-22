const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

const allowedOrigins = [
"https://elysia-ecommerce-five.vercel.app",
"http://localhost:5173",
"http://localhost:5174",
];

app.use(
cors({
origin: function (origin, callback) {
if (!origin || allowedOrigins.includes(origin)) {
callback(null, true);
} else {
callback(new Error("Not allowed by CORS"));
}
},
methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
})
);

app.use(express.json());

app.get("/", (req, res) => {
res.json({
message: "ELYSIA API is running",
});
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
try {
await connectDB();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


} catch (error) {
console.error("Server startup failed:", error.message);
process.exit(1);
}
}

startServer();
