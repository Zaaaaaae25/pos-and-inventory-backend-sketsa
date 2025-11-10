import PrismaSystemLogRepository from '../Repositories/PrismaSystemLogRepository.js';
import SystemLogService from '../../Applications/Logs/Services/SystemLogService.js';
import { ListSystemLogsUsecase, GetSystemLogUsecase, CreateSystemLogUsecase, DeleteSystemLogUsecase } from '../../Applications/Logs/UseCases/index.js';
import SystemLogPresenter from '../../Interfaces/Presenters/SystemLogPresenter.js';
import SystemLogController from '../../Interfaces/Controllers/SystemLogController.js';

export default function registerSystemLogContainer({ container, overrides = {}, prisma }) {
  const systemLogRepository = overrides.systemLogRepository ?? new PrismaSystemLogRepository({ prisma });
  const systemLogService = overrides.systemLogService ?? new SystemLogService({ systemLogRepository });
  const listSystemLogsUsecase = overrides.listSystemLogsUsecase ?? new ListSystemLogsUsecase({ systemLogService });
  const getSystemLogUsecase = overrides.getSystemLogUsecase ?? new GetSystemLogUsecase({ systemLogService });
  const createSystemLogUsecase = overrides.createSystemLogUsecase ?? new CreateSystemLogUsecase({ systemLogService });
  const deleteSystemLogUsecase = overrides.deleteSystemLogUsecase ?? new DeleteSystemLogUsecase({ systemLogService });
  const systemLogPresenter = overrides.systemLogPresenter ?? new SystemLogPresenter();
  const systemLogController = overrides.systemLogController ?? new SystemLogController({
    systemLogPresenter,
    listSystemLogsUsecase,
    getSystemLogUsecase,
    createSystemLogUsecase,
    deleteSystemLogUsecase,
  });

  container.set('systemLogRepository', systemLogRepository);
  container.set('systemLogService', systemLogService);
  container.set('listSystemLogsUsecase', listSystemLogsUsecase);
  container.set('getSystemLogUsecase', getSystemLogUsecase);
  container.set('createSystemLogUsecase', createSystemLogUsecase);
  container.set('deleteSystemLogUsecase', deleteSystemLogUsecase);
  container.set('systemLogPresenter', systemLogPresenter);
  container.set('systemLogController', systemLogController);
}

