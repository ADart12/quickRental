import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./Routes/itemsRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/bookings", bookingRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/messages", messageRoutes);

export default app;