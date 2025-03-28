import { Task } from "../models/task.model.js"

const assignTask = async (req, res) => {
    try {
        const { title, description, assignedTo, deadline } = req.body

        if (!title || !assignedTo) {
            return res.status(400).json({ message: "Title and assignedTo are required" })
        }

        const task = await Task.create({ title, description, assignedTo, deadline })

        return res.status(201).json(task)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error assigning task" })
    }
}

const getAssignedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id });

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks assigned" })
        }

        return res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error fetching tasks" })
    }
}

export {
    assignTask,
    getAssignedTasks
}