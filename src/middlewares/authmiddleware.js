import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken");

        if (!user) return res.status(401).json({ message: "Invalid access token" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error?.message || "Invalid access token" });
    }
}

export const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};