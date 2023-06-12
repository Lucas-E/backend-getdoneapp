'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey:'userId'})
    }
  }
  Task.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:'Waiting'
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};