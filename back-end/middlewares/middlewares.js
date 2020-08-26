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

const subDays = (date) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const anotherDay = new Date(date);
    const today = new Date();
    return parseInt((today.getTime() - anotherDay.getTime()) / oneDay);
};

module.exports = { authMiddleware, getDays, subDays };
