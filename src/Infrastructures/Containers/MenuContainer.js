import PrismaMenuRepository from '../Repositories/PrismaMenuRepository.js';
import MenuService from '../../Applications/Menus/Services/MenuService.js';
import { ListMenusUsecase, GetMenuUsecase, CreateMenuUsecase, UpdateMenuUsecase, DeleteMenuUsecase } from '../../Applications/Menus/UseCases/index.js';
import MenuPresenter from '../../Interfaces/Presenters/MenuPresenter.js';
import MenuController from '../../Interfaces/Controllers/MenuController.js';

export default function registerMenuContainer({ container, overrides = {}, prisma }) {
  const menuRepository = overrides.menuRepository ?? new PrismaMenuRepository({ prisma });
  const menuService = overrides.menuService ?? new MenuService({ menuRepository });
  const listMenusUsecase = overrides.listMenusUsecase ?? new ListMenusUsecase({ menuService });
  const getMenuUsecase = overrides.getMenuUsecase ?? new GetMenuUsecase({ menuService });
  const createMenuUsecase = overrides.createMenuUsecase ?? new CreateMenuUsecase({ menuService });
  const updateMenuUsecase = overrides.updateMenuUsecase ?? new UpdateMenuUsecase({ menuService });
  const deleteMenuUsecase = overrides.deleteMenuUsecase ?? new DeleteMenuUsecase({ menuService });
  const menuPresenter = overrides.menuPresenter ?? new MenuPresenter();
  const menuController = overrides.menuController ?? new MenuController({
    menuPresenter,
    listMenusUsecase,
    getMenuUsecase,
    createMenuUsecase,
    updateMenuUsecase,
    deleteMenuUsecase,
  });

  container.set('menuRepository', menuRepository);
  container.set('menuService', menuService);
  container.set('listMenusUsecase', listMenusUsecase);
  container.set('getMenuUsecase', getMenuUsecase);
  container.set('createMenuUsecase', createMenuUsecase);
  container.set('updateMenuUsecase', updateMenuUsecase);
  container.set('deleteMenuUsecase', deleteMenuUsecase);
  container.set('menuPresenter', menuPresenter);
  container.set('menuController', menuController);
}

