import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        static associate(models) {
            RefreshToken.belongsTo(models.User, {
                foreignKey: 'userId'
            });
        }
    }

    RefreshToken.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'RefreshToken',
        underscored: false
    });

    return RefreshToken;
};
