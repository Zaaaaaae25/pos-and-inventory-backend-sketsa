import PrismaPlaceStockRepository from '../Repositories/PrismaPlaceStockRepository.js';
import PlaceStockService from '../../Applications/Stocks/Services/PlaceStockService.js';
import { ListPlaceStocksUsecase, GetPlaceStockUsecase, CreatePlaceStockUsecase, UpdatePlaceStockUsecase, DeletePlaceStockUsecase } from '../../Applications/Stocks/UseCases/index.js';
import PlaceStockPresenter from '../../Interfaces/Presenters/PlaceStockPresenter.js';
import PlaceStockController from '../../Interfaces/Controllers/PlaceStockController.js';

export default function registerPlaceStockContainer({ container, overrides = {}, prisma }){
  const placeStockRepository = overrides.placeStockRepository ?? new PrismaPlaceStockRepository({ prisma });
  const placeStockService = overrides.placeStockService ?? new PlaceStockService({ placeStockRepository });
  const listPlaceStocksUsecase = overrides.listPlaceStocksUsecase ?? new ListPlaceStocksUsecase({ placeStockService });
  const getPlaceStockUsecase = overrides.getPlaceStockUsecase ?? new GetPlaceStockUsecase({ placeStockService });
  const createPlaceStockUsecase = overrides.createPlaceStockUsecase ?? new CreatePlaceStockUsecase({ placeStockService });
  const updatePlaceStockUsecase = overrides.updatePlaceStockUsecase ?? new UpdatePlaceStockUsecase({ placeStockService });
  const deletePlaceStockUsecase = overrides.deletePlaceStockUsecase ?? new DeletePlaceStockUsecase({ placeStockService });
  const placeStockPresenter = overrides.placeStockPresenter ?? new PlaceStockPresenter();
  const placeStockController = overrides.placeStockController ?? new PlaceStockController({ placeStockPresenter, listPlaceStocksUsecase, getPlaceStockUsecase, createPlaceStockUsecase, updatePlaceStockUsecase, deletePlaceStockUsecase });

  container.set('placeStockRepository', placeStockRepository);
  container.set('placeStockService', placeStockService);
  container.set('listPlaceStocksUsecase', listPlaceStocksUsecase);
  container.set('getPlaceStockUsecase', getPlaceStockUsecase);
  container.set('createPlaceStockUsecase', createPlaceStockUsecase);
  container.set('updatePlaceStockUsecase', updatePlaceStockUsecase);
  container.set('deletePlaceStockUsecase', deletePlaceStockUsecase);
  container.set('placeStockPresenter', placeStockPresenter);
  container.set('placeStockController', placeStockController);
}

