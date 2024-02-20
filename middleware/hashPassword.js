const bcrypt = require("bcrypt");

const hashPasswordMiddleware = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword; 
        }
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).json({ message: "Internal Server Error while hashing" });
    }
};

module.exports = hashPasswordMiddleware;
