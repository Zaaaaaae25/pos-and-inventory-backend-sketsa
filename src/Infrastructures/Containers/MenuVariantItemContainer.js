import PrismaMenuVariantItemRepository from '../Repositories/PrismaMenuVariantItemRepository.js';
import MenuVariantItemService from '../../Applications/MenuVariantItems/Services/MenuVariantItemService.js';
import { ListMenuVariantItemsUsecase, GetMenuVariantItemUsecase, CreateMenuVariantItemUsecase, UpdateMenuVariantItemUsecase, DeleteMenuVariantItemUsecase } from '../../Applications/MenuVariantItems/UseCases/index.js';
import MenuVariantItemPresenter from '../../Interfaces/Presenters/MenuVariantItemPresenter.js';
import MenuVariantItemController from '../../Interfaces/Controllers/MenuVariantItemController.js';

export default function registerMenuVariantItemContainer({ container, overrides = {}, prisma }) {
  const menuVariantItemRepository = overrides.menuVariantItemRepository ?? new PrismaMenuVariantItemRepository({ prisma });
  const menuVariantItemService = overrides.menuVariantItemService ?? new MenuVariantItemService({ menuVariantItemRepository });
  const listMenuVariantItemsUsecase = overrides.listMenuVariantItemsUsecase ?? new ListMenuVariantItemsUsecase({ menuVariantItemService });
  const getMenuVariantItemUsecase = overrides.getMenuVariantItemUsecase ?? new GetMenuVariantItemUsecase({ menuVariantItemService });
  const createMenuVariantItemUsecase = overrides.createMenuVariantItemUsecase ?? new CreateMenuVariantItemUsecase({ menuVariantItemService });
  const updateMenuVariantItemUsecase = overrides.updateMenuVariantItemUsecase ?? new UpdateMenuVariantItemUsecase({ menuVariantItemService });
  const deleteMenuVariantItemUsecase = overrides.deleteMenuVariantItemUsecase ?? new DeleteMenuVariantItemUsecase({ menuVariantItemService });
  const menuVariantItemPresenter = overrides.menuVariantItemPresenter ?? new MenuVariantItemPresenter();
  const menuVariantItemController = overrides.menuVariantItemController ?? new MenuVariantItemController({
    menuVariantItemPresenter,
    listMenuVariantItemsUsecase,
    getMenuVariantItemUsecase,
    createMenuVariantItemUsecase,
    updateMenuVariantItemUsecase,
    deleteMenuVariantItemUsecase,
  });

  container.set('menuVariantItemRepository', menuVariantItemRepository);
  container.set('menuVariantItemService', menuVariantItemService);
  container.set('listMenuVariantItemsUsecase', listMenuVariantItemsUsecase);
  container.set('getMenuVariantItemUsecase', getMenuVariantItemUsecase);
  container.set('createMenuVariantItemUsecase', createMenuVariantItemUsecase);
  container.set('updateMenuVariantItemUsecase', updateMenuVariantItemUsecase);
  container.set('deleteMenuVariantItemUsecase', deleteMenuVariantItemUsecase);
  container.set('menuVariantItemPresenter', menuVariantItemPresenter);
  container.set('menuVariantItemController', menuVariantItemController);
}

