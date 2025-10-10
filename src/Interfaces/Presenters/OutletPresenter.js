export default class OutletPresenter {
  present(outlet) {
    if (!outlet) {
      return null;
    }

    return {
      id: outlet.id,
      name: outlet.name,
      address: outlet.address,
      phone: outlet.phone,
      isActive: outlet.isActive,
    };
  }

  presentCollection(outlets) {
    return outlets.map((outlet) => this.present(outlet));
  }
}
