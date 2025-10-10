export default class RolePresenter {
  present(role) {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    };
  }

  presentCollection(roles) {
    return roles.map((role) => this.present(role));
  }
}
