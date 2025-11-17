import PrismaPromotionRuleRepository from '../Repositories/PrismaPromotionRuleRepository.js';
import PromotionRuleService from '../../Applications/Promotions/Services/PromotionRuleService.js';
import { ListPromotionRulesUsecase, GetPromotionRuleUsecase, CreatePromotionRuleUsecase, DeletePromotionRuleUsecase } from '../../Applications/Promotions/UseCases/index.js';
import PromotionRulePresenter from '../../Interfaces/Presenters/PromotionRulePresenter.js';
import PromotionRuleController from '../../Interfaces/Controllers/PromotionRuleController.js';

export default function registerPromotionRuleContainer({ container, overrides = {}, prisma }) {
  const promotionRuleRepository = overrides.promotionRuleRepository ?? new PrismaPromotionRuleRepository({ prisma });
  const promotionRuleService = overrides.promotionRuleService ?? new PromotionRuleService({ promotionRuleRepository });
  const listUsecase = overrides.listPromotionRulesUsecase ?? new ListPromotionRulesUsecase({ promotionRuleService });
  const getUsecase = overrides.getPromotionRuleUsecase ?? new GetPromotionRuleUsecase({ promotionRuleService });
  const createUsecase = overrides.createPromotionRuleUsecase ?? new CreatePromotionRuleUsecase({ promotionRuleService });
  const deleteUsecase = overrides.deletePromotionRuleUsecase ?? new DeletePromotionRuleUsecase({ promotionRuleService });
  const presenter = overrides.promotionRulePresenter ?? new PromotionRulePresenter();
  const controller = overrides.promotionRuleController ?? new PromotionRuleController({ presenter, listUsecase, getUsecase, createUsecase, deleteUsecase });

  container.set('promotionRuleRepository', promotionRuleRepository);
  container.set('promotionRuleService', promotionRuleService);
  container.set('listPromotionRulesUsecase', listUsecase);
  container.set('getPromotionRuleUsecase', getUsecase);
  container.set('createPromotionRuleUsecase', createUsecase);
  container.set('deletePromotionRuleUsecase', deleteUsecase);
  container.set('promotionRulePresenter', presenter);
  container.set('promotionRuleController', controller);
}

