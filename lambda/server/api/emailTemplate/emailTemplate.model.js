
module.exports = function Model(sequelize, DataTypes) {
  const EmailTemplate = sequelize.define('EmailTemplate', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    subject: DataTypes.STRING,
    body: DataTypes.TEXT,
    to: DataTypes.STRING,
    cc: DataTypes.STRING,
    bcc: DataTypes.STRING,
    comments: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    gronit_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'email_templates',
    timestamps: false,
    underscored: true,
    classMethods: {
      associate(db) {
        EmailTemplate.hasMany(db.EmailTemplateAd);
      },
    },
  });

  return EmailTemplate;
};
