import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {
      Itinerary.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }

  Itinerary.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    waypoints: DataTypes.JSON,
    details: DataTypes.JSON,
    privateItinerary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Itinerary',
  });

  return Itinerary;
};