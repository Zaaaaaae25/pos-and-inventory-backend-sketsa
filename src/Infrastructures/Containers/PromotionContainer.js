import PrismaPromotionRepository from '../Repositories/PrismaPromotionRepository.js';
import PromotionService from '../../Applications/Promotions/Services/PromotionService.js';
import { ListPromotionsUsecase, GetPromotionUsecase, CreatePromotionUsecase, UpdatePromotionUsecase, DeletePromotionUsecase } from '../../Applications/Promotions/UseCases/index.js';
import PromotionPresenter from '../../Interfaces/Presenters/PromotionPresenter.js';
import PromotionController from '../../Interfaces/Controllers/PromotionController.js';

export default function registerPromotionContainer({ container, overrides = {}, prisma }) {
  const promotionRepository = overrides.promotionRepository ?? new PrismaPromotionRepository({ prisma });
  const promotionService = overrides.promotionService ?? new PromotionService({ promotionRepository });
  const listPromotionsUsecase = overrides.listPromotionsUsecase ?? new ListPromotionsUsecase({ promotionService });
  const getPromotionUsecase = overrides.getPromotionUsecase ?? new GetPromotionUsecase({ promotionService });
  const createPromotionUsecase = overrides.createPromotionUsecase ?? new CreatePromotionUsecase({ promotionService });
  const updatePromotionUsecase = overrides.updatePromotionUsecase ?? new UpdatePromotionUsecase({ promotionService });
  const deletePromotionUsecase = overrides.deletePromotionUsecase ?? new DeletePromotionUsecase({ promotionService });
  const promotionPresenter = overrides.promotionPresenter ?? new PromotionPresenter();
  const promotionController = overrides.promotionController ?? new PromotionController({ presenter: promotionPresenter, listUsecase: listPromotionsUsecase, getUsecase: getPromotionUsecase, createUsecase: createPromotionUsecase, updateUsecase: updatePromotionUsecase, deleteUsecase: deletePromotionUsecase });

  container.set('promotionRepository', promotionRepository);
  container.set('promotionService', promotionService);
  container.set('listPromotionsUsecase', listPromotionsUsecase);
  container.set('getPromotionUsecase', getPromotionUsecase);
  container.set('createPromotionUsecase', createPromotionUsecase);
  container.set('updatePromotionUsecase', updatePromotionUsecase);
  container.set('deletePromotionUsecase', deletePromotionUsecase);
  container.set('promotionPresenter', promotionPresenter);
  container.set('promotionController', promotionController);
}

