const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Word extends Model {}

Word.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    wrong_word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fail_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'word',
  }
);

module.exports = Word;