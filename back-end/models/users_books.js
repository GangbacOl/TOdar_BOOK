module.exports = (sequelize, DataType) => {
    return sequelize.define(
        'users_books',
        {
            isbn: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            amount_read: {
                type: DataType.INTEGER(45),
                allowNull: false,
            },
            amount_read_month: {
                type: DataType.JSON,
                allowNull: false,
            },
            username: {
                type: DataType.STRING(100),
                allowNull: false,
            },
        },
        {
            classMethods: {},
            tableName: 'users_books',
            underscored: true,
        }
    );
};
