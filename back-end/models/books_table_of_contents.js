module.exports = (sequelize, DataType) => {
    return sequelize.define(
        'books_table_of_contents',
        {
            isbn: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            username: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            table_of_contents: {
                type: DataType.JSON,
                allowNull: false,
            },
        },
        {
            classMethods: {},
            tableName: 'books_table_of_contents',
            underscored: true,
        }
    );
};
