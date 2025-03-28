import { User } from "../models/user.model";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new Error("Error generating access and refresh tokens");
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if ([name, email, password, role].some(field => !field || (typeof field === "string" && field.trim() === ""))) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({
            $or: [{ name }, { email }]
        })

        if (userExists) {
            return res.status(409).json({ message: "User with name or email already exists" })
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(500).json({ message: "user registration failed, please try again" })
        }

        return res.status(201).json({ message: "User Registered", user });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: "User not found" });

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select(" -password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ 
            message: "User logged in successfully !!!.",
            user: loggedInUser, accessToken, refreshToken
        }
        );


    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export {
    signup,
    login
}