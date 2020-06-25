const jwt = require('jsonwebtoken');

const authMiddleware = (req, res) => {
    const token = req.cookies.user;
    const secret = req.app.get('jwt-secret');
    console.log('awefewf');

    if (!token) {
        res.status(401).json({
            message: '로그인을 하세요.',
        });
    }
};

module.exports = authMiddleware;
