import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors())

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import userRoutes from "./routes/user.routes.js"

app.use("/auth", authRoutes);
app.use("/", taskRoutes); 
app.use("/", userRoutes); 

app.get("/", (req, res) => {
    res.send("User Management System API is running...");
});


export default app