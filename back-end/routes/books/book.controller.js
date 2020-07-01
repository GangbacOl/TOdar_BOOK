const jwt = require('jsonwebtoken');
const axios = require('axios');
const models = require('../../models');
const authMiddleware = require('../../middlewares/auth/auth');
const searchBookByIsbn = (item) => {
    return axios
        .get(`https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${item.isbn}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Naver-Client-Id': 'iB8LdjGuHwSuDU_5ZR6Q',
                'X-Naver-Client-Secret': 'Bno7XltwqA',
            },
        })
        .then((res) => {
            res.data.items[0].amount_read = item.dataValues.amount_read;
            // res.data.items[0].tableOfContents =v
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.readBooks = async (req, res) => {
    authMiddleware(req, res);
    const { username } = req.body;
    try {
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
        console.log(booksInfo);
        res.status(200).json({
            booksInfo,
        });
    } catch (err) {
        console.log(err);
    }
    // let tableOfContents = await models.books_table_of_contents.findAll({
    //     where: { username },
    // });
};

exports.addBook = (req, res) => {
    authMiddleware(req, res);
    const { isbn, username, percentage, tableOfContents } = req.body;
    if (!isbn || !username) {
        res.status(403).json({
            message: '책 추가 실패',
        });
    }
    console.log(tableOfContents);
    models.users_books
        .create({
            isbn,
            amount_read: percentage,
            username,
        })
        .catch((err) => {
            console.log(err);
            res.status(403).json({
                message: '책 추가 실패',
            });
        });
    models.books_table_of_contents
        .create({
            isbn,
            username,
            table_of_contents: tableOfContents,
        })
        .then((response) => console.log(response))
        .catch((err) => {
            console.log(err);
        });
};
