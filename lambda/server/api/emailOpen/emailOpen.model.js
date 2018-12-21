module.exports = function EmailOpenModel(sequelize, DataTypes) {
  const EmailOpen = sequelize.define('EmailOpen', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    message_id: DataTypes.STRING,
    email_id: DataTypes.STRING,
    open_timestamp: DataTypes.DATE,
  }, {
    tableName: 'email_opens',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  return EmailOpen;
};
