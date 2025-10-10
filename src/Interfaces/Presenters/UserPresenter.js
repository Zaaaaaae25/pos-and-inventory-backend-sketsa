export default class UserPresenter {
  present(user) {
    const role = user.role
      ? {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description,
          permissions: user.role.permissions,
        }
      : null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role,
      outletId: user.outletId,
      authenticationMethod: user.authenticationMethod,
    };
  }

  presentCollection(users) {
    return users.map((user) => this.present(user));
  }
}
