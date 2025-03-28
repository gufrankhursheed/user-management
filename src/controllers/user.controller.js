import { User } from "../models/user.model.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")

        if (!users.length) {
            return res.status(404).json({ message: "No users found" })
        }

        return res.status(201).json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error fetching users" })
    }
}

const getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" })
        }

        const user = await User.findById(req.user._id).select("-password -refreshToken")

        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error fetching user details" })
    }
}
export {
    getAllUsers,
    getUser
}