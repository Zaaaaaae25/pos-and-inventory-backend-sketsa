import PrismaMenuVariantRepository from '../Repositories/PrismaMenuVariantRepository.js';
import MenuVariantService from '../../Applications/MenuVariants/Services/MenuVariantService.js';
import { ListMenuVariantsUsecase, GetMenuVariantUsecase, CreateMenuVariantUsecase, UpdateMenuVariantUsecase, DeleteMenuVariantUsecase } from '../../Applications/MenuVariants/UseCases/index.js';
import MenuVariantPresenter from '../../Interfaces/Presenters/MenuVariantPresenter.js';
import MenuVariantController from '../../Interfaces/Controllers/MenuVariantController.js';

export default function registerMenuVariantContainer({ container, overrides = {}, prisma }) {
  const menuVariantRepository = overrides.menuVariantRepository ?? new PrismaMenuVariantRepository({ prisma });
  const menuVariantService = overrides.menuVariantService ?? new MenuVariantService({ menuVariantRepository });
  const listMenuVariantsUsecase = overrides.listMenuVariantsUsecase ?? new ListMenuVariantsUsecase({ menuVariantService });
  const getMenuVariantUsecase = overrides.getMenuVariantUsecase ?? new GetMenuVariantUsecase({ menuVariantService });
  const createMenuVariantUsecase = overrides.createMenuVariantUsecase ?? new CreateMenuVariantUsecase({ menuVariantService });
  const updateMenuVariantUsecase = overrides.updateMenuVariantUsecase ?? new UpdateMenuVariantUsecase({ menuVariantService });
  const deleteMenuVariantUsecase = overrides.deleteMenuVariantUsecase ?? new DeleteMenuVariantUsecase({ menuVariantService });
  const menuVariantPresenter = overrides.menuVariantPresenter ?? new MenuVariantPresenter();
  const menuVariantController = overrides.menuVariantController ?? new MenuVariantController({
    menuVariantPresenter,
    listMenuVariantsUsecase,
    getMenuVariantUsecase,
    createMenuVariantUsecase,
    updateMenuVariantUsecase,
    deleteMenuVariantUsecase,
  });

  container.set('menuVariantRepository', menuVariantRepository);
  container.set('menuVariantService', menuVariantService);
  container.set('listMenuVariantsUsecase', listMenuVariantsUsecase);
  container.set('getMenuVariantUsecase', getMenuVariantUsecase);
  container.set('createMenuVariantUsecase', createMenuVariantUsecase);
  container.set('updateMenuVariantUsecase', updateMenuVariantUsecase);
  container.set('deleteMenuVariantUsecase', deleteMenuVariantUsecase);
  container.set('menuVariantPresenter', menuVariantPresenter);
  container.set('menuVariantController', menuVariantController);
}

