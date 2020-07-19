const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passwordValidator = require('password-validator');
const models = require('../../models');
const config = require('../config');

const schema = new passwordValidator();
schema.is().min(8).is().max(50).has().uppercase().has().lowercase().has().digits().has().not().spaces();

exports.signup = (req, res) => {
    const { id, password, username } = req.body;
    if (!id || !password || !username) {
        res.status(400).json({
            message: '회원가입 실패(회원 정보 미기입)',
        });
    } else if (schema.validate(password)) {
        res.status(400).json({
            message:
                '비밀번호는 최소 8자리, 최대 50자리이며 대문자와 소문자, 숫자가 포함되어야 하며 공백은 허용되지 않음',
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
