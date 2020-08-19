const jwt = require('jsonwebtoken');

const authMiddleware = (req, res) => {
    const token = req.cookies.user;
    console.log('token:' + token);
    if (!token) {
        res.status(401).json({
            message: '로그인을 하세요.',
        });
    }
};

const getDays = (days) => {
    let daysData = [];
    for (let i = 0; i < days; i++) {
        daysData.push({ readCount: 0 });
    }
    return daysData;
};

module.exports = { authMiddleware, getDays };
