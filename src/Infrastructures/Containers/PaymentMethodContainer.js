import PrismaPaymentMethodRepository from '../Repositories/PrismaPaymentMethodRepository.js';
import PaymentMethodService from '../../Applications/PaymentMethods/Services/PaymentMethodService.js';
import { ListPaymentMethodsUsecase, GetPaymentMethodUsecase, CreatePaymentMethodUsecase, UpdatePaymentMethodUsecase, DeletePaymentMethodUsecase } from '../../Applications/PaymentMethods/UseCases/index.js';
import PaymentMethodPresenter from '../../Interfaces/Presenters/PaymentMethodPresenter.js';
import PaymentMethodController from '../../Interfaces/Controllers/PaymentMethodController.js';

export default function registerPaymentMethodContainer({ container, overrides = {}, prisma }) {
  const paymentMethodRepository = overrides.paymentMethodRepository ?? new PrismaPaymentMethodRepository({ prisma });
  const paymentMethodService = overrides.paymentMethodService ?? new PaymentMethodService({ paymentMethodRepository });
  const listPaymentMethodsUsecase = overrides.listPaymentMethodsUsecase ?? new ListPaymentMethodsUsecase({ paymentMethodService });
  const getPaymentMethodUsecase = overrides.getPaymentMethodUsecase ?? new GetPaymentMethodUsecase({ paymentMethodService });
  const createPaymentMethodUsecase = overrides.createPaymentMethodUsecase ?? new CreatePaymentMethodUsecase({ paymentMethodService });
  const updatePaymentMethodUsecase = overrides.updatePaymentMethodUsecase ?? new UpdatePaymentMethodUsecase({ paymentMethodService });
  const deletePaymentMethodUsecase = overrides.deletePaymentMethodUsecase ?? new DeletePaymentMethodUsecase({ paymentMethodService });
  const paymentMethodPresenter = overrides.paymentMethodPresenter ?? new PaymentMethodPresenter();
  const paymentMethodController = overrides.paymentMethodController ?? new PaymentMethodController({
    paymentMethodPresenter,
    listPaymentMethodsUsecase,
    getPaymentMethodUsecase,
    createPaymentMethodUsecase,
    updatePaymentMethodUsecase,
    deletePaymentMethodUsecase,
  });

  container.set('paymentMethodRepository', paymentMethodRepository);
  container.set('paymentMethodService', paymentMethodService);
  container.set('listPaymentMethodsUsecase', listPaymentMethodsUsecase);
  container.set('getPaymentMethodUsecase', getPaymentMethodUsecase);
  container.set('createPaymentMethodUsecase', createPaymentMethodUsecase);
  container.set('updatePaymentMethodUsecase', updatePaymentMethodUsecase);
  container.set('deletePaymentMethodUsecase', deletePaymentMethodUsecase);
  container.set('paymentMethodPresenter', paymentMethodPresenter);
  container.set('paymentMethodController', paymentMethodController);
}

