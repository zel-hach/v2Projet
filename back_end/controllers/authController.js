import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const admin = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
}

const login = (req, res) => {
    const {email, password} = req.body;
    if (email === admin.email && password === admin.password) {
        const token = jwt.sign(
            { email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
};

export default login;