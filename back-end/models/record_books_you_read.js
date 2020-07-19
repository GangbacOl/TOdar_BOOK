module.exports = (sequelize, DataType) => {
    return sequelize.define(
        'record_books_you_read',
        {
            isbn: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            username: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            date_start_read: {
                type: DataType.DATE,
                allowNull: false,
            },
        },
        {
            classMethods: {},
            tableName: 'record_books_you_read',
            underscored: true,
        }
    );
};
