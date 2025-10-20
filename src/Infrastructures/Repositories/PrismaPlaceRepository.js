import PlaceRepository from '../../Domains/Places/Repositories/PlaceRepository.js';

export default class PrismaPlaceRepository extends PlaceRepository {
  constructor({ prisma } = {}) {
    super();

    if (!prisma) {
      throw new Error('PRISMA_PLACE_REPOSITORY.MISSING_CLIENT');
    }

    this._prisma = prisma;
  }

  async findAll() {
    return this._prisma.place.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findById(id) {
    return this._prisma.place.findUnique({
      where: { id },
    });
  }

  async createPlace({ placeData }) {
    return this._prisma.place.create({
      data: placeData,
    });
  }

  async updatePlace({ id, placeData }) {
    try {
      return await this._prisma.place.update({
        where: { id },
        data: placeData,
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        return null;
      }

      throw error;
    }
  }

  async deletePlace(id) {
    try {
      await this._prisma.place.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') {
        return false;
      }

      throw error;
    }
  }
}
