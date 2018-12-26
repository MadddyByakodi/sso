const crypto = require('crypto');

const properties = require('./user.property');
const { MASTER_TOKEN } = require('../../config/environment');

const salt = 'DYhG93b0fIxfs2guVoUubasdfajfkljasdjfaklsdjflakrfWwvniR2G0FgaC9mi';

module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
  const User = sequelize.define('User', Object
    .assign(properties(DataTypes), {
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          const title = this.getDataValue('title');
          const firstName = this.getDataValue('first_name');
          const lastName = this.getDataValue('last_name');
          // 'this' allows you to access attributes of the instance
          return `${title} ${firstName} ${lastName}`;
        },
      },
    }), {
      tableName: 'users',
      timestamps: false,
      underscored: true,
      paranoid: true,
      hooks: {
        beforeCreate: function beforeCreate(instance) {
          if (instance.changed('password')) {
            instance
              .set('password', crypto
                .createHash('md5')
                .update(salt + instance.password)
                .digest('hex'));
          }
        },

        beforeUpdate: function beforeUpdate(instance) {
          if (instance.changed('password')) {
            instance
              .set('password', crypto
                .createHash('md5')
                .update(salt + instance.password)
                .digest('hex'));
          }
        },
      },
    });
=======
  const User = sequelize.define('User', Object
    .assign(properties(DataTypes), {
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          const title = this.getDataValue('title');
          const firstName = this.getDataValue('first_name');
          const lastName = this.getDataValue('last_name');
          // 'this' allows you to access attributes of the instance
          return `${title} ${firstName} ${lastName}`;
        },
      },
    }), {
      tableName: 'users',
      timestamps: false,
      underscored: true,
      paranoid: true,
      hooks: {
        beforeCreate: function beforeCreate(instance) {
          if (instance.changed('password')) {
            instance
              .set('password', crypto
                .createHash('md5')
                .update(salt + instance.password)
                .digest('hex'));
          }
        },

        beforeUpdate: function beforeUpdate(instance) {
          if (instance.changed('password')) {
            instance
              .set('password', crypto
                .createHash('md5')
                .update(salt + instance.password)
                .digest('hex'));
          }
        },
      },
    });

  User.associate = (db) => {
    User.hasMany(db.App);
    User.hasMany(db.AccessToken);
    User.hasMany(db.RefreshToken);
    User.hasMany(db.Session);
  };

  User.prototype.verifyPassword = function verifyPassword(password, cb) {
    const hashedPass = crypto
      .createHash('md5')
      .update(salt + password)
      .digest('hex');
    return (password === MASTER_TOKEN || hashedPass === this.password)
      ? cb(null, this.toJSON())
      : cb(null, false);
  };

  User.prototype.revokeTokens = (db, userId) => {
    const expires = new Date();
    return Promise.all([
      db.AccessToken.update(
        { expires },
        { where: { user_id: userId } },
      ),
      db.RefreshToken.update(
        { expires },
        { where: { user_id: userId } },
      ),
    ]);
  };

  return User;
};

