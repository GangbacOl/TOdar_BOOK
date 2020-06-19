const jwt = require('jsonwebtoken');
const models = require('../../models');
const authMiddleware = require('../../middlewares/auth/auth');

exports.addBook = (req, res) => {
    const { isbn, username, percentage } = req.body;
    console.log(percentage);
    if (!isbn || !username) {
        res.json({
            message: '책 추가 실패(책 정보 미기입)',
        });
    } else {
        if (authMiddleware(req, res)) {
            models.users_books
                .create({
                    isbn,
                    amount_read: percentage,
                    username,
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        message: '책 추가 실패',
                        err,
                    });
                });
        }
    }
};
