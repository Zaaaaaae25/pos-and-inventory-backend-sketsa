import PrismaReportFileRepository from '../Repositories/PrismaReportFileRepository.js';
import ReportFileService from '../../Applications/ReportFiles/Services/ReportFileService.js';
import { ListReportFilesUsecase, GetReportFileUsecase, CreateReportFileUsecase, UpdateReportFileUsecase, DeleteReportFileUsecase } from '../../Applications/ReportFiles/UseCases/index.js';
import ReportFilePresenter from '../../Interfaces/Presenters/ReportFilePresenter.js';
import ReportFileController from '../../Interfaces/Controllers/ReportFileController.js';

export default function registerReportFileContainer({ container, overrides = {}, prisma }) {
  const reportFileRepository = overrides.reportFileRepository ?? new PrismaReportFileRepository({ prisma });
  const reportFileService = overrides.reportFileService ?? new ReportFileService({ reportFileRepository });
  const listReportFilesUsecase = overrides.listReportFilesUsecase ?? new ListReportFilesUsecase({ reportFileService });
  const getReportFileUsecase = overrides.getReportFileUsecase ?? new GetReportFileUsecase({ reportFileService });
  const createReportFileUsecase = overrides.createReportFileUsecase ?? new CreateReportFileUsecase({ reportFileService });
  const updateReportFileUsecase = overrides.updateReportFileUsecase ?? new UpdateReportFileUsecase({ reportFileService });
  const deleteReportFileUsecase = overrides.deleteReportFileUsecase ?? new DeleteReportFileUsecase({ reportFileService });
  const reportFilePresenter = overrides.reportFilePresenter ?? new ReportFilePresenter();
  const reportFileController = overrides.reportFileController ?? new ReportFileController({
    reportFilePresenter,
    listReportFilesUsecase,
    getReportFileUsecase,
    createReportFileUsecase,
    updateReportFileUsecase,
    deleteReportFileUsecase,
  });

  container.set('reportFileRepository', reportFileRepository);
  container.set('reportFileService', reportFileService);
  container.set('listReportFilesUsecase', listReportFilesUsecase);
  container.set('getReportFileUsecase', getReportFileUsecase);
  container.set('createReportFileUsecase', createReportFileUsecase);
  container.set('updateReportFileUsecase', updateReportFileUsecase);
  container.set('deleteReportFileUsecase', deleteReportFileUsecase);
  container.set('reportFilePresenter', reportFilePresenter);
  container.set('reportFileController', reportFileController);
}

