export default class PlacePresenter {
  present(place) {
    if (!place) {
      return null;
    }

    return {
      id: place.id,
      name: place.name,
      address: place.address,
      phone: place.phone,
      logoPath: place.logoPath,
      type: place.type,
      isActive: place.isActive,
    };
  }

  presentCollection(places) {
    return places.map((place) => this.present(place));
  }
}
