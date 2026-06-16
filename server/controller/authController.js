import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {

        const { name, email, phone, password, role } = req.body;

        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(400).json({ message: "User Already Exist " });
        }

        // Validate role
        if (!["owner", "customer"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role selected"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword,
            role
        })

        return res.status(201).json({ message: "user Registered succefully " })

    } catch (error) {
        return res.status(500).json({ message: "Server error, failed user registration" })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist please resgister user" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "User Crediential dosen't Match recheck the email or password" });
        }


        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Login sucessfully", token });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}