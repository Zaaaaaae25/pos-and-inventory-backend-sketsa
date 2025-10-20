import PrismaPlaceRepository from '../Repositories/PrismaPlaceRepository.js';
import PlaceService from '../../Applications/Places/Services/PlaceService.js';
import {
  ListPlacesUsecase,
  GetPlaceUsecase,
  CreatePlaceUsecase,
  UpdatePlaceUsecase,
  DeletePlaceUsecase,
} from '../../Applications/Places/UseCases/index.js';
import PlacePresenter from '../../Interfaces/Presenters/PlacePresenter.js';
import PlaceController from '../../Interfaces/Controllers/PlaceController.js';


export default function registerPlaceContainer({ container, overrides = {}, prisma }) {
  const placeRepository =
    overrides.placeRepository ?? new PrismaPlaceRepository({ prisma });
  const placeService =
    overrides.placeService ?? new PlaceService({ placeRepository });
  const listPlacesUsecase =
    overrides.listPlacesUsecase ?? new ListPlacesUsecase({ placeService });
  const getPlaceUsecase =
    overrides.getPlaceUsecase ?? new GetPlaceUsecase({ placeService });
  const createPlaceUsecase =
    overrides.createPlaceUsecase ?? new CreatePlaceUsecase({ placeService });
  const updatePlaceUsecase =
    overrides.updatePlaceUsecase ?? new UpdatePlaceUsecase({ placeService });
  const deletePlaceUsecase =
    overrides.deletePlaceUsecase ?? new DeletePlaceUsecase({ placeService });

  const placePresenter = overrides.placePresenter ?? new PlacePresenter();
  const placeController =
    overrides.placeController ??
    new PlaceController({
      placePresenter,
      listPlacesUsecase,
      getPlaceUsecase,
      createPlaceUsecase,
      updatePlaceUsecase,
      deletePlaceUsecase,
    });

  container.set('placeRepository', placeRepository);
  container.set('placeService', placeService);
  container.set('listPlacesUsecase', listPlacesUsecase);
  container.set('getPlaceUsecase', getPlaceUsecase);
  container.set('createPlaceUsecase', createPlaceUsecase);
  container.set('updatePlaceUsecase', updatePlaceUsecase);
  container.set('deletePlaceUsecase', deletePlaceUsecase);
  container.set('placePresenter', placePresenter);
  container.set('placeController', placeController);
}
