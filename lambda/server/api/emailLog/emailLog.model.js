
module.exports = function EmailLogModel(sequelize, DataTypes) {
  const EmailLog = sequelize.define('EmailLog', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    message_id: DataTypes.STRING,
    to: DataTypes.STRING,
    cc: DataTypes.STRING,
    bcc: DataTypes.STRING,
    terminated_ids: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    tableName: 'email_logs',
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(db) {
        EmailLog.belongsTo(db.EmailTemplate);
        EmailLog.belongsTo(db.Ad);
      },
    },
  });

  return EmailLog;
};
