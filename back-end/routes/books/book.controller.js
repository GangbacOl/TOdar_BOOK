const jwt = require('jsonwebtoken');
const axios = require('axios');
const models = require('../../models/index');
const authMiddleware = require('../../middlewares/auth/auth');

const searchBookByIsbn = async (booksInfo) => {
    return await Promise.all(
        booksInfo.map(async (book) => {
            return await axios
                .get(`https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${book.dataValues.isbn}`, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-Naver-Client-Id': 'iB8LdjGuHwSuDU_5ZR6Q',
                        'X-Naver-Client-Secret': 'Bno7XltwqA',
                    },
                })
                .then((response) => {
                    return response.data.items[0];
                })
                .catch((err) => console.log(err));
        })
    );
};

exports.readBooks = async (req, res) => {
    authMiddleware(req, res);
    const { username } = req.query;
    const response = await models.users_books
        .findAll({
            where: { username },
            include: [
                {
                    model: models.books_table_of_contents,
                    required: false,
                    where: { username },
                },
            ],
        })
        .then(async (response) => {
            let bookList = await searchBookByIsbn(response);
            bookList.map((book, index) => {
                book.percentage = response[index].dataValues.amount_read;
                book.tableOfContents = response[index].books_table_of_content.dataValues.table_of_contents;
            });
            return bookList;
        });
    console.log(response);
    res.status(200).json({
        booksRead: response,
    });
};

exports.addBook = (req, res) => {
    authMiddleware(req, res);
    const { isbn, username, percentage, tableOfContents } = req.body;
    if (!isbn || !username) {
        res.status(403).json({
            message: '책 추가 실패',
        });
    }
    models.users_books
        .create({
            isbn,
            amount_read: percentage,
            username,
        })
        .catch((err) => {
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
        .catch((err) => {
            console.log(err);
        });
};

exports.updateBooksTableContents = async (req, res) => {
    authMiddleware(req, res);
    const { newTableOfContents, percentage, isbn, username } = req.body;
    console.log(percentage);
    if (percentage >= 100) {
        await models.users_books.destroy({ where: { isbn, username } });
        await models.books_table_of_contents.destroy({ where: { isbn, username } });
        await models.record_books_you_read.create({ isbn, username }).catch((err) => console.log(err));
    } else {
        await models.books_table_of_contents.update(
            { table_of_contents: newTableOfContents },
            { where: { isbn, username } }
        );
        await models.users_books.update({ amount_read: percentage }, { where: { isbn, username } });
    }
    res.status(200).json({ message: '업데이트 성공' });
};

exports.deleteBook = async (req, res) => {
    authMiddleware(req, res);
    const { isbn, username } = req.body;
    await models.users_books.destroy({ where: { isbn, username } });
    await models.books_table_of_contents.destroy({ where: { isbn, username } });
    res.status(200).json({ message: '삭제 성공' });
};

exports.loadBooksRead = async (req, res) => {
    authMiddleware(req, res);
    const username = req.query.username;
    const response = await models.record_books_you_read.findAll({ where: { username } }).then(async (booksInfo) => {
        return await searchBookByIsbn(booksInfo);
    });
    res.status(200).json({ message: '조회 성공', booksRead: response });
};
