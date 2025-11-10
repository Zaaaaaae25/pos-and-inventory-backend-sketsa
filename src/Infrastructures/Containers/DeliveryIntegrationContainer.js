import PrismaDeliveryIntegrationRepository from '../Repositories/PrismaDeliveryIntegrationRepository.js';
import DeliveryIntegrationService from '../../Applications/DeliveryIntegrations/Services/DeliveryIntegrationService.js';
import { ListDeliveryIntegrationsUsecase, GetDeliveryIntegrationUsecase, CreateDeliveryIntegrationUsecase, UpdateDeliveryIntegrationUsecase, DeleteDeliveryIntegrationUsecase } from '../../Applications/DeliveryIntegrations/UseCases/index.js';
import DeliveryIntegrationPresenter from '../../Interfaces/Presenters/DeliveryIntegrationPresenter.js';
import DeliveryIntegrationController from '../../Interfaces/Controllers/DeliveryIntegrationController.js';

export default function registerDeliveryIntegrationContainer({ container, overrides = {}, prisma }) {
  const deliveryIntegrationRepository = overrides.deliveryIntegrationRepository ?? new PrismaDeliveryIntegrationRepository({ prisma });
  const deliveryIntegrationService = overrides.deliveryIntegrationService ?? new DeliveryIntegrationService({ deliveryIntegrationRepository });
  const listDeliveryIntegrationsUsecase = overrides.listDeliveryIntegrationsUsecase ?? new ListDeliveryIntegrationsUsecase({ deliveryIntegrationService });
  const getDeliveryIntegrationUsecase = overrides.getDeliveryIntegrationUsecase ?? new GetDeliveryIntegrationUsecase({ deliveryIntegrationService });
  const createDeliveryIntegrationUsecase = overrides.createDeliveryIntegrationUsecase ?? new CreateDeliveryIntegrationUsecase({ deliveryIntegrationService });
  const updateDeliveryIntegrationUsecase = overrides.updateDeliveryIntegrationUsecase ?? new UpdateDeliveryIntegrationUsecase({ deliveryIntegrationService });
  const deleteDeliveryIntegrationUsecase = overrides.deleteDeliveryIntegrationUsecase ?? new DeleteDeliveryIntegrationUsecase({ deliveryIntegrationService });
  const deliveryIntegrationPresenter = overrides.deliveryIntegrationPresenter ?? new DeliveryIntegrationPresenter();
  const deliveryIntegrationController = overrides.deliveryIntegrationController ?? new DeliveryIntegrationController({
    deliveryIntegrationPresenter,
    listDeliveryIntegrationsUsecase,
    getDeliveryIntegrationUsecase,
    createDeliveryIntegrationUsecase,
    updateDeliveryIntegrationUsecase,
    deleteDeliveryIntegrationUsecase,
  });

  container.set('deliveryIntegrationRepository', deliveryIntegrationRepository);
  container.set('deliveryIntegrationService', deliveryIntegrationService);
  container.set('listDeliveryIntegrationsUsecase', listDeliveryIntegrationsUsecase);
  container.set('getDeliveryIntegrationUsecase', getDeliveryIntegrationUsecase);
  container.set('createDeliveryIntegrationUsecase', createDeliveryIntegrationUsecase);
  container.set('updateDeliveryIntegrationUsecase', updateDeliveryIntegrationUsecase);
  container.set('deleteDeliveryIntegrationUsecase', deleteDeliveryIntegrationUsecase);
  container.set('deliveryIntegrationPresenter', deliveryIntegrationPresenter);
  container.set('deliveryIntegrationController', deliveryIntegrationController);
}

