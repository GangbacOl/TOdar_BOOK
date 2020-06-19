const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const models = require('./models/index');

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', require('./routes/auth/index'));
app.use('/books', require('./routes/books/index'));

models.sequelize
    .sync()
    .then(() => {
        console.log(' DB 연결 성공');
    })
    .catch((err) => {
        console.log('연결 실패');
        console.log(err);
    });

app.listen(5000, (req, res) => {
    console.log('start');
});
