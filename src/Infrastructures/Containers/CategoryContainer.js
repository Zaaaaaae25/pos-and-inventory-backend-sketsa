import PrismaCategoryRepository from '../Repositories/PrismaCategoryRepository.js';
import CategoryService from '../../Applications/Categories/Services/CategoryService.js';
import {
  ListCategoriesUsecase,
  GetCategoryUsecase,
  CreateCategoryUsecase,
  UpdateCategoryUsecase,
  DeleteCategoryUsecase,
} from '../../Applications/Categories/UseCases/index.js';
import CategoryPresenter from '../../Interfaces/Presenters/CategoryPresenter.js';
import CategoryController from '../../Interfaces/Controllers/CategoryController.js';

export default function registerCategoryContainer({ container, overrides = {}, prisma }) {
  const categoryRepository = overrides.categoryRepository ?? new PrismaCategoryRepository({ prisma });
  const categoryService = overrides.categoryService ?? new CategoryService({ categoryRepository });
  const listCategoriesUsecase = overrides.listCategoriesUsecase ?? new ListCategoriesUsecase({ categoryService });
  const getCategoryUsecase = overrides.getCategoryUsecase ?? new GetCategoryUsecase({ categoryService });
  const createCategoryUsecase = overrides.createCategoryUsecase ?? new CreateCategoryUsecase({ categoryService });
  const updateCategoryUsecase = overrides.updateCategoryUsecase ?? new UpdateCategoryUsecase({ categoryService });
  const deleteCategoryUsecase = overrides.deleteCategoryUsecase ?? new DeleteCategoryUsecase({ categoryService });
  const categoryPresenter = overrides.categoryPresenter ?? new CategoryPresenter();
  const categoryController = overrides.categoryController ?? new CategoryController({
    categoryPresenter,
    listCategoriesUsecase,
    getCategoryUsecase,
    createCategoryUsecase,
    updateCategoryUsecase,
    deleteCategoryUsecase,
  });

  container.set('categoryRepository', categoryRepository);
  container.set('categoryService', categoryService);
  container.set('listCategoriesUsecase', listCategoriesUsecase);
  container.set('getCategoryUsecase', getCategoryUsecase);
  container.set('createCategoryUsecase', createCategoryUsecase);
  container.set('updateCategoryUsecase', updateCategoryUsecase);
  container.set('deleteCategoryUsecase', deleteCategoryUsecase);
  container.set('categoryPresenter', categoryPresenter);
  container.set('categoryController', categoryController);
}

