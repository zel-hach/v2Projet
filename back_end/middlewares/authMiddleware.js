import jwt from "jsonwebtoken";

/** Liste visiteurs : admin ou viewer. */
export function requireAdminOrViewer(req, res, next) {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (token.startsWith("Bearer ")) token = token.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin" && decoded.role !== "viewer") {
            return res.status(403).json({ message: "access denied" });
        }
        req.auth = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

/** Any valid JWT. Attaches req.auth = payload. */
export function authenticate(req, res, next) {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (token.startsWith("Bearer ")) token = token.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

/** Dashboard API: admin only (gestion utilisateurs, etc.). */
export function requireAdmin(req, res, next) {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (token.startsWith("Bearer ")) token = token.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin")
            return res.status(403).json({ message: "admin access only" });

        req.auth = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default requireAdmin;