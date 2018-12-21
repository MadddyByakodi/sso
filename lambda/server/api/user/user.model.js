
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email_id: DataTypes.STRING(64),
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  return User;
};

