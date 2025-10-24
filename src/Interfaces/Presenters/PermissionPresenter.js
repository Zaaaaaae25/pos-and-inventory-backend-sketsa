export default class PermissionPresenter {
  present(permission) {
    if (!permission) return null;
    return {
      id: permission.id,
      name: permission.name,
      description: permission.description,
    };
  }

  presentCollection(records) {
    return records.map((r) => this.present(r));
  }
}

