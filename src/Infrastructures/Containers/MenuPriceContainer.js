import PrismaMenuPriceRepository from '../Repositories/PrismaMenuPriceRepository.js';
import MenuPriceService from '../../Applications/MenuPrices/Services/MenuPriceService.js';
import { ListMenuPricesUsecase, GetMenuPriceUsecase, CreateMenuPriceUsecase, UpdateMenuPriceUsecase, DeleteMenuPriceUsecase } from '../../Applications/MenuPrices/UseCases/index.js';
import MenuPricePresenter from '../../Interfaces/Presenters/MenuPricePresenter.js';
import MenuPriceController from '../../Interfaces/Controllers/MenuPriceController.js';

export default function registerMenuPriceContainer({ container, overrides = {}, prisma }) {
  const menuPriceRepository = overrides.menuPriceRepository ?? new PrismaMenuPriceRepository({ prisma });
  const menuPriceService = overrides.menuPriceService ?? new MenuPriceService({ menuPriceRepository });
  const listMenuPricesUsecase = overrides.listMenuPricesUsecase ?? new ListMenuPricesUsecase({ menuPriceService });
  const getMenuPriceUsecase = overrides.getMenuPriceUsecase ?? new GetMenuPriceUsecase({ menuPriceService });
  const createMenuPriceUsecase = overrides.createMenuPriceUsecase ?? new CreateMenuPriceUsecase({ menuPriceService });
  const updateMenuPriceUsecase = overrides.updateMenuPriceUsecase ?? new UpdateMenuPriceUsecase({ menuPriceService });
  const deleteMenuPriceUsecase = overrides.deleteMenuPriceUsecase ?? new DeleteMenuPriceUsecase({ menuPriceService });
  const menuPricePresenter = overrides.menuPricePresenter ?? new MenuPricePresenter();
  const menuPriceController = overrides.menuPriceController ?? new MenuPriceController({
    menuPricePresenter,
    listMenuPricesUsecase,
    getMenuPriceUsecase,
    createMenuPriceUsecase,
    updateMenuPriceUsecase,
    deleteMenuPriceUsecase,
  });

  container.set('menuPriceRepository', menuPriceRepository);
  container.set('menuPriceService', menuPriceService);
  container.set('listMenuPricesUsecase', listMenuPricesUsecase);
  container.set('getMenuPriceUsecase', getMenuPriceUsecase);
  container.set('createMenuPriceUsecase', createMenuPriceUsecase);
  container.set('updateMenuPriceUsecase', updateMenuPriceUsecase);
  container.set('deleteMenuPriceUsecase', deleteMenuPriceUsecase);
  container.set('menuPricePresenter', menuPricePresenter);
  container.set('menuPriceController', menuPriceController);
}

