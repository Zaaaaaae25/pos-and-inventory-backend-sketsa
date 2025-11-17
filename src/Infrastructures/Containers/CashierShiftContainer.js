import PrismaCashierShiftRepository from '../Repositories/PrismaCashierShiftRepository.js';
import CashierShiftService from '../../Applications/Stocks/Services/CashierShiftService.js';
import ListCashierShiftsUsecase from '../../Applications/Stocks/UseCases/cashierShifts/ListCashierShiftsUsecase.js';
import GetCashierShiftUsecase from '../../Applications/Stocks/UseCases/cashierShifts/GetCashierShiftUsecase.js';
import CreateCashierShiftUsecase from '../../Applications/Stocks/UseCases/cashierShifts/CreateCashierShiftUsecase.js';
import UpdateCashierShiftUsecase from '../../Applications/Stocks/UseCases/cashierShifts/UpdateCashierShiftUsecase.js';
import DeleteCashierShiftUsecase from '../../Applications/Stocks/UseCases/cashierShifts/DeleteCashierShiftUsecase.js';
import CashierShiftPresenter from '../../Interfaces/Presenters/CashierShiftPresenter.js';
import CashierShiftController from '../../Interfaces/Controllers/CashierShiftController.js';

export default function registerCashierShiftContainer({ container, overrides = {}, prisma }) {
  const repository = overrides.cashierShiftRepository ?? new PrismaCashierShiftRepository({ prisma });
  const service = overrides.cashierShiftService ?? new CashierShiftService({ cashierShiftRepository: repository });
  const listUsecase = overrides.listCashierShiftsUsecase ?? new ListCashierShiftsUsecase({ cashierShiftService: service });
  const getUsecase = overrides.getCashierShiftUsecase ?? new GetCashierShiftUsecase({ cashierShiftService: service });
  const createUsecase = overrides.createCashierShiftUsecase ?? new CreateCashierShiftUsecase({ cashierShiftService: service });
  const updateUsecase = overrides.updateCashierShiftUsecase ?? new UpdateCashierShiftUsecase({ cashierShiftService: service });
  const deleteUsecase = overrides.deleteCashierShiftUsecase ?? new DeleteCashierShiftUsecase({ cashierShiftService: service });
  const presenter = overrides.cashierShiftPresenter ?? new CashierShiftPresenter();
  const controller = overrides.cashierShiftController ?? new CashierShiftController({ presenter, listUsecase, getUsecase, createUsecase, updateUsecase, deleteUsecase });

  container.set('cashierShiftRepository', repository);
  container.set('cashierShiftService', service);
  container.set('listCashierShiftsUsecase', listUsecase);
  container.set('getCashierShiftUsecase', getUsecase);
  container.set('createCashierShiftUsecase', createUsecase);
  container.set('updateCashierShiftUsecase', updateUsecase);
  container.set('deleteCashierShiftUsecase', deleteUsecase);
  container.set('cashierShiftPresenter', presenter);
  container.set('cashierShiftController', controller);
}

