import { getPrisma } from '../DatabaseConfig.js';
import registerUserContainer from './UserContainer.js';
import registerRoleContainer from './RoleContainer.js';
import registerAuthContainer from './AuthContainer.js';
import registerPermissionContainer from './PermissionContainer.js';
import registerPlaceContainer from './PlaceContainer.js';
import registerUnitContainer from './UnitContainer.js';
import registerTableContainer from './TableContainer.js';
import registerIngredientContainer from './IngredientContainer.js';
import registerPackageContainer from './PackageContainer.js';
import registerIngredientPackageContainer from './IngredientPackageContainer.js';
import registerSupplierContainer from './SupplierContainer.js';
import registerSupplierProductContainer from './SupplierProductContainer.js';

export default function createContainer(overrides = {}) {
  const shouldSkipPrisma =
    overrides.userRepository || overrides.roleRepository || overrides.placeRepository;

  const prismaClient = shouldSkipPrisma
    ? overrides.prisma ?? null
    : overrides.prisma ?? getPrisma();

  const values = new Map([
    ['prisma', prismaClient],
  ]);

  registerRoleContainer({ container: values, overrides, prisma: prismaClient });
  registerUserContainer({ container: values, overrides, prisma: prismaClient });
  registerPlaceContainer({ container: values, overrides, prisma: prismaClient });
  registerUnitContainer({ container: values, overrides, prisma: prismaClient });
  registerTableContainer({ container: values, overrides, prisma: prismaClient });
  registerIngredientContainer({ container: values, overrides, prisma: prismaClient });
  registerPackageContainer({ container: values, overrides, prisma: prismaClient });
  registerIngredientPackageContainer({ container: values, overrides, prisma: prismaClient });
  registerSupplierContainer({ container: values, overrides, prisma: prismaClient });
  registerSupplierProductContainer({ container: values, overrides, prisma: prismaClient });
  registerPermissionContainer({ container: values, overrides, prisma: prismaClient });
  registerAuthContainer({ container: values, overrides });

  return {
    resolve(token) {
      if (Object.prototype.hasOwnProperty.call(overrides, token)) {
        return overrides[token];
      }

      if (!values.has(token)) {
        throw new Error(`CONTAINER.UNREGISTERED_TOKEN: ${token}`);
      }

      return values.get(token);
    },
  };
}
