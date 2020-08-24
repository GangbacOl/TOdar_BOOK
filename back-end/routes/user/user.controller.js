const models = require('../../models/index');
const { authMiddleware, subDays } = require('../../middlewares/middlewares');

exports.countNmbrJoinDays = async (req, res) => {
    authMiddleware(req, res);
    const { username } = req.body;
    const nmbrJoinDays = await models.user.findOne({ where: { username } }).then((userInfo) => {
        return subDays(userInfo.dataValues.createdAt);
    });
    res.status(200).json({ nmbrJoinDays });
};
