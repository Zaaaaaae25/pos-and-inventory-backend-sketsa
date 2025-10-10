import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class LoginUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, password } = payload;

    this.username = username.trim();
    this.password = password;
  }

  _verifyPayload(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new ValidationError('LOGIN_USER.PAYLOAD_NOT_OBJECT');
    }

    const { username, password } = payload;

    if (!username || !password) {
      throw new ValidationError('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new ValidationError('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!username.trim()) {
      throw new ValidationError('LOGIN_USER.USERNAME_EMPTY');
    }
  }
}
