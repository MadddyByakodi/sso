module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING,
    html: DataTypes.TEXT,
  }, {
    tableName: 'ads',
    timestamps: true,
    underscored: true,

    classMethods: {
      associate(db) {
        Ad.hasMany(db.EmailTemplateAd);
      },
    },
  });

  return Ad;
};
