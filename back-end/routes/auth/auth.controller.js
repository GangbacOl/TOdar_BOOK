const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const models = require('../../models');
const config = require('../config');

exports.signup = (req, res) => {
    const { id, password, username } = req.body;
    if (!id || !password || !username) {
        res.status(400).json({
            message: '회원가입 실패(회원 정보 미기입)',
        });
    } else {
        const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');
        models.user
            .create({
                account: id,
                password: encrypted,
                username: username,
            })
            .then((response) => {
                res.status(200).json({
                    message: '회원가입 성공',
                });
            })
            .catch((err) => {
                res.status(401).json({
                    message: '회원가입 실패',
                });
            });
    }
};

exports.signin = (req, res) => {
    const { id, password } = req.body;

    const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');
    models.user
        .findOne({
            where: { account: id },
        })
        .then((response) => {
            // 로그인 실패 시
            if (response === null)
                res.status(401).json({
                    message: '로그인 실패(존재하지 않는 계정)',
                });
            // 패스워드 오류 시
            else if (response.dataValues.password !== encrypted)
                res.status(401).json({
                    message: '패스워드가 일치하지 않음',
                });
            // 로그인 성공 시
            else if (response.dataValues.password === encrypted) {
                console.log('로그인 성공');
                const token = jwt.sign(
                    {
                        _id: id,
                        username: response.dataValues.username,
                    },
                    config.secret,
                    {
                        expiresIn: '5d',
                        issuer: 'localhost',
                        subject: 'userInfo',
                    }
                );
                console.log(token);
                res.status(200)
                    .cookie('user', token, {
                        maxAge: 3 * 60 * 60 * 1000,
                    })
                    .json({
                        userData: {
                            username: response.dataValues.username,
                        },
                        message: '로그인 성공',
                    });
            }
        });
};
