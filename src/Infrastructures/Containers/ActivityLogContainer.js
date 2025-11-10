import PrismaActivityLogRepository from '../Repositories/PrismaActivityLogRepository.js';
import ActivityLogService from '../../Applications/Logs/Services/ActivityLogService.js';
import { ListActivityLogsUsecase, GetActivityLogUsecase, CreateActivityLogUsecase, DeleteActivityLogUsecase } from '../../Applications/Logs/UseCases/index.js';
import ActivityLogPresenter from '../../Interfaces/Presenters/ActivityLogPresenter.js';
import ActivityLogController from '../../Interfaces/Controllers/ActivityLogController.js';

export default function registerActivityLogContainer({ container, overrides = {}, prisma }) {
  const activityLogRepository = overrides.activityLogRepository ?? new PrismaActivityLogRepository({ prisma });
  const activityLogService = overrides.activityLogService ?? new ActivityLogService({ activityLogRepository });
  const listActivityLogsUsecase = overrides.listActivityLogsUsecase ?? new ListActivityLogsUsecase({ activityLogService });
  const getActivityLogUsecase = overrides.getActivityLogUsecase ?? new GetActivityLogUsecase({ activityLogService });
  const createActivityLogUsecase = overrides.createActivityLogUsecase ?? new CreateActivityLogUsecase({ activityLogService });
  const deleteActivityLogUsecase = overrides.deleteActivityLogUsecase ?? new DeleteActivityLogUsecase({ activityLogService });
  const activityLogPresenter = overrides.activityLogPresenter ?? new ActivityLogPresenter();
  const activityLogController = overrides.activityLogController ?? new ActivityLogController({
    activityLogPresenter,
    listActivityLogsUsecase,
    getActivityLogUsecase,
    createActivityLogUsecase,
    deleteActivityLogUsecase,
  });

  container.set('activityLogRepository', activityLogRepository);
  container.set('activityLogService', activityLogService);
  container.set('listActivityLogsUsecase', listActivityLogsUsecase);
  container.set('getActivityLogUsecase', getActivityLogUsecase);
  container.set('createActivityLogUsecase', createActivityLogUsecase);
  container.set('deleteActivityLogUsecase', deleteActivityLogUsecase);
  container.set('activityLogPresenter', activityLogPresenter);
  container.set('activityLogController', activityLogController);
}

