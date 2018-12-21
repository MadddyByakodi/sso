
module.exports = function EmailPreferenceModel(sequelize, DataTypes) {
  const EmailPreference = sequelize.define('EmailPreference', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    enabled: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
  }, {
    tableName: 'email_preferences',
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(db) {
        EmailPreference.belongsTo(db.EmailTemplate);
      },
    },
  });

  return EmailPreference;
};
