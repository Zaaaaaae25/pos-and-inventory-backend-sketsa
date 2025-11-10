export default class UserPresenter {
  present(user) {
    const role = user.role
      ? {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description,
        }
      : null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role,
      placeId: user.placeId,
      authenticationMethod: user.authenticationMethod,
    };
  }

  presentCollection(users) {
    return users.map((user) => this.present(user));
  }
}
