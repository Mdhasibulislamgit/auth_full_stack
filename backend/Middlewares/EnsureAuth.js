const jwt = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        console.log("No authorization header present");
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Error verifying token:", err);
        return res.status(403).json({ message: "Unauthorized access" });
    }
};
module.exports = ensureAuthentication;