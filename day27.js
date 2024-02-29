const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'yourSecretKey';

function authenticateAndAuthorize(requiredRole) {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);

            if (decoded.role !== requiredRole) {
                return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
    };
}

// Example route that requires admin authentication
app.get('/admin-only', authenticateAndAuthorize('admin'), (req, res) => {
    res.json({ message: 'Admin route accessed successfully' });
});

// Example route that requires regular user authentication
app.get('/user-only', authenticateAndAuthorize('user'), (req, res) => {
    res.json({ message: 'User route accessed successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
