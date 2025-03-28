import { Task } from "../models/task.model"

const assignTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
        return res.status(201).json(task)
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id });
        return res.status(201).json(tasks);
      } catch (error) {
        return res.status(500).json({ message: "Server Error" });
      }
}

export {
    assignTask,
    getAllTasks
}