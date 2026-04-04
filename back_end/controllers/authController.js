import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const normalized = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalized }).select("+password");
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.role !== "admin" && user.role !== "viewer") {
            return res.status(403).json({ message: "Account has no login role" });
        }

        const token = jwt.sign(
            {
                sub: user._id.toString(),
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            token,
            role: user.role,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

export default login;
