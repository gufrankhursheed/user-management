import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    deadline: Date,
}, { timestamps: true })

export const Task = mongoose.model("Task", taskSchema)