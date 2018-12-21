module.exports = (sequelize, DataTypes) => {
  const EmailTemplateAd = sequelize.define('EmailTemplateAd', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'template_ads',
    timestamps: true,
    underscored: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        EmailTemplateAd.belongsTo(db.Ad);
        EmailTemplateAd.belongsTo(db.EmailTemplate);
      },
    },
  });

  return EmailTemplateAd;
};
