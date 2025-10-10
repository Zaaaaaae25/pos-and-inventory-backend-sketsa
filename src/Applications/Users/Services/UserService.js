import UserRepository from '../../../Domains/Users/Repositories/UserRepository.js';

export default class UserService {
  constructor({ userRepository } = {}) {
    if (!userRepository) {
      throw new Error('USER_SERVICE.MISSING_REPOSITORY');
    }

    if (!(userRepository instanceof UserRepository)) {
      // Allow duck-typed repositories in tests without requiring instanceof match.
      const requiredMethods = [
        'findAll',
        'findById',
        'findRoleByName',
        'findByEmail',
        'createUser',
        'updateUser',
      ];

      const missingMethod = requiredMethods.find(
        (method) => typeof userRepository[method] !== 'function'
      );

      if (missingMethod) {
        throw new Error(`USER_SERVICE.INVALID_REPOSITORY: missing ${missingMethod}`);
      }
    }

    this._userRepository = userRepository;
  }

  async listUsers() {
    return this._userRepository.findAll();
  }

  async getUser(id) {
    return this._userRepository.findById(id);
  }

  async findRoleByName(roleName) {
    return this._userRepository.findRoleByName(roleName);
  }

  async findByEmail(email) {
    return this._userRepository.findByEmail(email);
  }

  async createUser(payload) {
    return this._userRepository.createUser(payload);
  }

  async updateUser(payload) {
    return this._userRepository.updateUser(payload);
  }
}
