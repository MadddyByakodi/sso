const { User } = require('../../conn/sqldb');

const checkDuplicate = email => User.find({
  attributes: ['id'],
  where: { email },
  raw: true,
});

// - this method currently called from quarc only
exports.signup = async ({ body }) => {
  try {
    const {
      title,
      first_name: firstName,
      last_name: lastName,
      email_id: e,
    } = body;

    const email = e.trim();
    // - Todo: Email Validation
    const found = await checkDuplicate(email);

    if (found) {
      return {
        code: 409,
        id: found.id,
        message: 'Duplicate',
      };
    }

    const user = {
      title,
      first_name: firstName,
      last_name: lastName,
      email,
    };

    // - Saving User Details
    // Todo: known issue hooks for password
    const saved = await User
      .create(user);

    return { code: 201, id: saved.id };
  } catch (err) {
    return err;
  }
};
