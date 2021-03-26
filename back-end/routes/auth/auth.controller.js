const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passwordValidator = require('password-validator');
const models = require('../../models');
const config = require('../config');

exports.signup = async (req, res) => {
    const { id, password, username } = req.body;
    const accountExist = await models.user
        .findAll({ attributes: ['account'], where: { account: id } })
        .then((response) => {
            return response[0];
        });
    const schema = new passwordValidator();
    schema.is().min(8).is().max(50).has().uppercase().has().lowercase().has().digits().has().not().spaces();
    if (!id || !password || !username) {
        res.status(400).json({
            message: '회원가입 실패(회원 정보 미기입)',
        });
    } else if (!schema.validate(password)) {
        res.status(400).json({
            message:
                '비밀번호 생성 규칙 \n\n최소 8자리에서 최대 50자리\n대문자, 소문자, 숫자 포함\n공백 사용할 수 없음',
        });
    } else if (accountExist) {
        res.status(400).json({
            message: '회원가입 실패(이미 존재하는 계정)',
        });
    } else {
        const encrypted = crypto.createHmac('sha1', config).update(password).digest('base64');
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
    if (!id || !password)
        res.status(400).json({
            message: '로그인 실패(정보 미기입)',
        });
    const encrypted = crypto.createHmac('sha1', config).update(password).digest('base64');
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
                    message: '로그인 실패(패스워드가 일치하지 않음)',
                });
            // 로그인 성공 시
            else if (response.dataValues.password === encrypted) {
                console.log('로그인 성공');
                const token = jwt.sign(
                    {
                        _id: id,
                        username: response.dataValues.username,
                    },
                    config,
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
