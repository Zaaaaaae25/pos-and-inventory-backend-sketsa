import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class PlaceController {
  constructor({
    placePresenter,
    listPlacesUsecase,
    getPlaceUsecase,
    createPlaceUsecase,
    updatePlaceUsecase,
    deletePlaceUsecase,
  }) {
    if (!placePresenter) {
      throw new Error('PlaceController requires a presenter');
    }

    const requiredUsecases = [
      ['listPlacesUsecase', listPlacesUsecase],
      ['getPlaceUsecase', getPlaceUsecase],
      ['createPlaceUsecase', createPlaceUsecase],
      ['updatePlaceUsecase', updatePlaceUsecase],
      ['deletePlaceUsecase', deletePlaceUsecase],
    ];

    const missing = requiredUsecases.find(([, usecase]) => !usecase);
    if (missing) {
      throw new Error(`PlaceController requires ${missing[0]}`);
    }

    this.placePresenter = placePresenter;
    this.listPlacesUsecase = listPlacesUsecase;
    this.getPlaceUsecase = getPlaceUsecase;
    this.createPlaceUsecase = createPlaceUsecase;
    this.updatePlaceUsecase = updatePlaceUsecase;
    this.deletePlaceUsecase = deletePlaceUsecase;
  }

  async listPlaces() {
    const places = await this.listPlacesUsecase.execute();
    return {
      status: HttpStatus.OK,
      data: this.placePresenter.presentCollection(places),
    };
  }

  async getPlace({ params }) {
    const place = await this.getPlaceUsecase.execute(params.id);
    return {
      status: HttpStatus.OK,
      data: this.placePresenter.present(place),
    };
  }

  async createPlace({ body }) {
    const place = await this.createPlaceUsecase.execute(body);
    return {
      status: HttpStatus.CREATED,
      data: this.placePresenter.present(place),
    };
  }

  async updatePlace({ params, body }) {
    const place = await this.updatePlaceUsecase.execute(params.id, body);
    return {
      status: HttpStatus.OK,
      data: this.placePresenter.present(place),
    };
  }

  async deletePlace({ params }) {
    await this.deletePlaceUsecase.execute(params.id);
    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
