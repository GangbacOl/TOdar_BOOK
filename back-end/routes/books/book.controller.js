const jwt = require('jsonwebtoken');
const axios = require('axios');
const models = require('../../models/index');
const { authMiddleware, getDays } = require('../../middlewares/middlewares');
const config = require('../config');

const searchBookByIsbn = async (booksInfo) => {
    return await Promise.all(
        booksInfo.map(async (book) => {
            let isbn = book.dataValues.isbn.split(' ');
            return await axios
                .get(`https://dapi.kakao.com/v3/search/book?query=${isbn[0]}&target=isbn`, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        Authorization: `KakaoAK ${config.apiKey}`,
                    },
                })
                .then((response) => {
                    return response.data.documents[0];
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
        .then(async (booksInfo) => {
            let bookList = await searchBookByIsbn(booksInfo);
            bookList.map((book, index) => {
                book.percentage = booksInfo[index].dataValues.amount_read;
                book.tableOfContents = booksInfo[index].books_table_of_content.dataValues.table_of_contents;
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
    const { isbn, username, percentage, tableOfContents, daysInMonth } = req.body;
    const amountReadMonth = getDays(daysInMonth);

    if (!isbn || !username) {
        res.status(403).json({
            message: '책 추가 실패',
        });
    }
    models.books_table_of_contents
        .create({
            isbn,
            username,
            table_of_contents: tableOfContents,
        })
        .catch((err) => {
            console.log(err);
        });
    models.users_books
        .create({
            isbn,
            amount_read: percentage,
            amount_read_month: amountReadMonth,
            username,
        })
        .catch((err) => {
            console.log(err);
        });
    res.status(200).json({ message: '책 추가 성공' });
};

exports.updateBooksTableContents = async (req, res) => {
    authMiddleware(req, res);
    const { newTableOfContents, percentage, isbn, username } = req.body;
    console.log(percentage);
    if (percentage >= 100) {
        let startOfRead = await models.users_books
            .findAll({ attributes: ['createdAt'] }, { where: { username, isbn } })
            .then((bookInfo) => {
                console.log(bookInfo[0]);
                return bookInfo[0].dataValues.createdAt;
            });
        console.log(startOfRead);
        await models.users_books.destroy({ where: { isbn, username } });
        await models.books_table_of_contents.destroy({ where: { isbn, username } });
        await models.record_books_you_read
            .create({ isbn, username, date_start_read: startOfRead })
            .catch((err) => console.log(err));
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
        let bookList = await searchBookByIsbn(booksInfo);
        bookList.map((book, index) => {
            book.startOfRead = booksInfo[index].dataValues.date_start_read;
            book.finishOfRead = booksInfo[index].dataValues.createdAt;
        });
        return bookList;
    });
    res.status(200).json({ message: '조회 성공', booksRead: response });
};
