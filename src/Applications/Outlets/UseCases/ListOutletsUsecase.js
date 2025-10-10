import BaseOutletUsecase from './BaseOutletUsecase.js';
import Outlet from '../../../Domains/Outlets/Entities/Outlet.js';

export default class ListOutletsUsecase extends BaseOutletUsecase {
  async execute() {
    const records = await this.outletService.listOutlets();
    return records.map((record) => Outlet.fromPersistence(record));
  }
}
