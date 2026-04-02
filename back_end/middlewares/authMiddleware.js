import jwt from "jsonwebtoken";


const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (token.startsWith("Bearer ")) token = token.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin")
            return res.status(403).json({ message: "admin access only" });

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default auth;