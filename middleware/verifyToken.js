const jwt = require('jsonwebtoken');

const verifyToken = async (request, response, next) => {
    const token = request.header('Authorization');

    if (!token) {
        return response.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request._id = decoded.id;
        next();
    } catch (error) {
        
        return response.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
