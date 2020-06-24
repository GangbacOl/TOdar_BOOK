const jwt = require('jsonwebtoken');
const axios = require('axios');
const models = require('../../models');
const authMiddleware = require('../../middlewares/auth/auth');

const searchBookByIsbn = (item) => {
    return axios.get(`https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${item.isbn}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Naver-Client-Id': 'iB8LdjGuHwSuDU_5ZR6Q',
            'X-Naver-Client-Secret': 'Bno7XltwqA',
        },
    });
};

exports.readBooks = async (req, res) => {
    const { username } = req.body;
    let response = await models.users_books.findAll({
        where: { username },
    });
    const booksInfo = await new Promise(async (resolve, reject) => {
        let booksInfo = { items: [] };
        let data = await Promise.all(
            response.map((item) => {
                return searchBookByIsbn(item);
            })
        );
        data.forEach((book) => {
            booksInfo.items.push(book.data.items[0]);
        });
        resolve(booksInfo);
    });
    res.json({
        booksInfo,
    });
};

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
