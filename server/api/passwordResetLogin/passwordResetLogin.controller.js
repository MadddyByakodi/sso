import moment from 'moment';
import crypto from 'crypto';

import { User, PasswordResetLogin } from '../../sqldb';

const hookshot = require('./passwordResetLogin.hookshot');


export async function getUser(req, res, next) {
  if (!req.query.token) return next();

  try {
    const data = await PasswordResetLogin.findOne({
      attributes: ['id', 'expires', 'user_id'],
      where: { token: req.query.token },
      order: [['id', 'DESC']],
      raw: true,
    });

    if (!data || moment(data.expires).isBefore() || data.user_id !== +req.params.id) {
      return res.status(401).json({ error: 'link_expired', error_description: 'Link Expired' });
    }

    const user = await User.findOne({
      attributes: ['email_id'],
      where: { id: req.params.id },
    });

    return res.json(user);
  } catch (ex) {
    return next(ex);
  }
}

export async function create(req, res, next) {
  try {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email_id'],
      where: { email_id: req.body.email_id },
    });

    if (!user) {
      return res.status(401).json({
        error: 'unknown_email',
        error_description: 'No email address found',
      });
    }

    const token = crypto
      .createHash('md5')
      .update(moment() + req.body.email_id)
      .digest('hex');

    await PasswordResetLogin.destroy({
      where: { user_id: user.id },
    });

    const data = await PasswordResetLogin.create({
      user_id: user.id,
      token,
    });

    hookshot.create({ user, token });

    return res.json({ data });
  } catch (ex) {
    return next(ex);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const validTill = moment().add(3, 'months');

    await User.updateAttributes({ password: req.body.password, password_valid_till: validTill });

    return res.json(User);
  } catch (ex) {
    return next(ex);
  }
}
