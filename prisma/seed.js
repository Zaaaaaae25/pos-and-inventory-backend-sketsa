import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashSecret } from '../src/Commons/Utils/HashPassword.js';

const prisma = new PrismaClient();

function envOrDefault(key, fallback) {
  const raw = process.env[key];
  if (typeof raw === 'undefined' || raw === null) {
    return fallback;
  }

  const trimmed = raw.trim();
  return trimmed === '' ? fallback : trimmed;
}

function normalizeAccountSeed(account) {
  if (!account || typeof account !== 'object') {
    return null;
  }

  const normalized = {
    name: account.name,
    role: account.role ? String(account.role).trim().toLowerCase() : undefined,
  };

  if (!normalized.name || !normalized.role) {
    return null;
  }

  if (account.email) {
    normalized.email = String(account.email).trim().toLowerCase();
  }

  if (account.password) {
    normalized.password = String(account.password);
  }

  if (account.pin) {
    normalized.pin = String(account.pin);
  }

  return normalized;
}

function normalizeNullableString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function normalizePlaceSeed(place) {
  if (!place || typeof place !== 'object') {
    return null;
  }

  const normalizedName = normalizeNullableString(place.name ?? '');
  if (!normalizedName) {
    return null;
  }

  const normalized = {
    name: normalizedName,
    isActive:
      typeof place.isActive === 'boolean' ? place.isActive : place.isActive !== false,
  };

  const address = normalizeNullableString(place.address ?? '');
  const phone = normalizeNullableString(place.phone ?? '');
  const logoPath = normalizeNullableString(place.logoPath ?? '');
  const type = normalizeNullableString(place.type ?? '');

  if (address !== null) {
    normalized.address = address;
  }

  if (phone !== null) {
    normalized.phone = phone;
  }

  if (logoPath !== null) {
    normalized.logoPath = logoPath;
  }

  if (type !== null) {
    normalized.type = type;
  }

  return normalized;
}

function buildPlacePersistenceData(place) {
  const data = {
    name: place.name,
    isActive: typeof place.isActive === 'boolean' ? place.isActive : true,
  };

  if (Object.prototype.hasOwnProperty.call(place, 'address')) {
    data.address = place.address ?? null;
  }

  if (Object.prototype.hasOwnProperty.call(place, 'phone')) {
    data.phone = place.phone ?? null;
  }

  if (Object.prototype.hasOwnProperty.call(place, 'logoPath')) {
    data.logoPath = place.logoPath ?? null;
  }

  if (Object.prototype.hasOwnProperty.call(place, 'type')) {
    data.type = place.type ?? null;
  }

  return data;
}

function parseAdditionalAccountSeeds() {
  const raw = envOrDefault('SEED_ADDITIONAL_ACCOUNTS');

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      // eslint-disable-next-line no-console
      console.warn('SEED_ADDITIONAL_ACCOUNTS must be a JSON array of account objects');
      return [];
    }

    return parsed.map(normalizeAccountSeed).filter(Boolean);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to parse SEED_ADDITIONAL_ACCOUNTS JSON:', error.message);
    return [];
  }
}

function parseAdditionalPlaceSeeds() {
  const raw = envOrDefault('SEED_ADDITIONAL_PLACES', envOrDefault('SEED_ADDITIONAL_OUTLETS'));

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      // eslint-disable-next-line no-console
      console.warn('SEED_ADDITIONAL_PLACES must be a JSON array of place objects');
      return [];
    }

    return parsed.map(normalizePlaceSeed).filter(Boolean);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to parse SEED_ADDITIONAL_PLACES JSON:', error.message);
    return [];
  }
}

const permissionCatalog = [
  {
    name: 'manage_company_profile',
    description: 'Manage company profile, subscription, and billing settings.',
  },
  {
    name: 'manage_places',
    description: 'Create and update place information and operating hours.',
  },
  {
    name: 'manage_staff',
    description: 'Invite employees and manage their assignments.',
  },
  {
    name: 'manage_roles_permissions',
    description: 'Configure roles and permission assignments.',
  },
  {
    name: 'manage_menus',
    description: 'Create, edit, and archive menu items and categories.',
  },
  {
    name: 'manage_inventory',
    description: 'Track stock levels, perform stock counts, and adjust inventory.',
  },
  {
    name: 'manage_suppliers',
    description: 'Maintain supplier records and purchasing agreements.',
  },
  {
    name: 'manage_promotions',
    description: 'Create and control promotions, vouchers, and discounts.',
  },
  {
    name: 'manage_orders',
    description: 'Handle dine-in, takeaway, and delivery orders.',
  },
  {
    name: 'manage_payments',
    description: 'Process payments, refunds, and cash reconciliation.',
  },
  {
    name: 'manage_tables',
    description: 'Manage dining table layout and reservations.',
  },
  {
    name: 'manage_delivery_channels',
    description: 'Configure delivery partners and online ordering channels.',
  },
  {
    name: 'view_reports',
    description: 'Access sales, operational, and financial reports.',
  },
  {
    name: 'manage_kitchen_operations',
    description: 'Control kitchen display systems and production queues.',
  },
  {
    name: 'manage_customer_data',
    description: 'Maintain customer database and loyalty programs.',
  },
];

const roleDefinitions = [
  {
    name: 'owner',
    description: 'Business owner with complete access.',
    permissions: permissionCatalog.map((permission) => permission.name),
  },
  {
    name: 'manager',
    description: 'Outlet manager responsible for day-to-day operations.',
    permissions: [
      'manage_company_profile',
      'manage_places',
      'manage_staff',
      'manage_menus',
      'manage_inventory',
      'manage_suppliers',
      'manage_promotions',
      'manage_orders',
      'manage_payments',
      'manage_tables',
      'manage_delivery_channels',
      'view_reports',
      'manage_kitchen_operations',
      'manage_customer_data',
    ],
  },
  {
    name: 'supervisor',
    description: 'Shift supervisor overseeing service and reporting.',
    permissions: [
      'manage_orders',
      'manage_payments',
      'manage_tables',
      'view_reports',
      'manage_customer_data',
      'manage_kitchen_operations',
    ],
  },
  {
    name: 'cashier',
    description: 'Point of sale operator using PIN authentication.',
    permissions: [
      'manage_orders',
      'manage_payments',
      'manage_customer_data',
    ],
  },
  {
    name: 'chef',
    description: 'Kitchen staff focused on production queue.',
    permissions: [
      'manage_kitchen_operations',
      'manage_orders',
    ],
  },
  {
    name: 'waiter',
    description: 'Front-of-house staff managing tables and orders.',
    permissions: [
      'manage_orders',
      'manage_tables',
      'manage_customer_data',
    ],
  },
];

const defaultPlaceSeeds = [
  normalizePlaceSeed({
    name: envOrDefault(
      'SEED_PLACE_NAME',
      envOrDefault('SEED_OUTLET_NAME', 'Main Outlet')
    ),
    address: envOrDefault(
      'SEED_PLACE_ADDRESS',
      envOrDefault('SEED_OUTLET_ADDRESS', '')
    ),
    phone: envOrDefault(
      'SEED_PLACE_PHONE',
      envOrDefault('SEED_OUTLET_PHONE', '')
    ),
    logoPath: envOrDefault('SEED_PLACE_LOGO', ''),
    type: envOrDefault('SEED_PLACE_TYPE', 'outlet'),
    isActive: true,
  }),
].filter(Boolean);

const placeSeeds = [...defaultPlaceSeeds, ...parseAdditionalPlaceSeeds()];

const defaultAccountSeeds = [
  normalizeAccountSeed({
    name: envOrDefault('SEED_OWNER_NAME', 'F&B Owner'),
    role: 'owner',
    email: envOrDefault('SEED_OWNER_EMAIL', 'owner@example.com'),
    password: envOrDefault('SEED_OWNER_PASSWORD', 'OwnerPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_MANAGER_NAME', 'Outlet Manager'),
    role: 'manager',
    email: envOrDefault('SEED_MANAGER_EMAIL', 'manager@example.com'),
    password: envOrDefault('SEED_MANAGER_PASSWORD', 'ManagerPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_SUPERVISOR_NAME', 'Shift Supervisor'),
    role: 'supervisor',
    email: envOrDefault('SEED_SUPERVISOR_EMAIL', 'supervisor@example.com'),
    password: envOrDefault('SEED_SUPERVISOR_PASSWORD', 'SupervisorPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_CASHIER_NAME', 'Cashier A'),
    role: 'cashier',
    pin: envOrDefault('SEED_CASHIER_PIN', '123456'),
  }),
].filter(Boolean);

const accountSeeds = [...defaultAccountSeeds, ...parseAdditionalAccountSeeds()];

async function main() {
  for (const place of placeSeeds) {
    const existing = await prisma.place.findFirst({
      where: { name: place.name },
    });

    if (existing) {
      const updateData = buildPlacePersistenceData({ ...existing, ...place });
      await prisma.place.update({
        where: { id: existing.id },
        data: updateData,
      });
    } else {
      const createData = buildPlacePersistenceData(place);
      await prisma.place.create({ data: createData });
    }
  }

  const permissionRecords = {};

  for (const permission of permissionCatalog) {
    const record = await prisma.permission.upsert({
      where: { name: permission.name },
      update: { description: permission.description },
      create: permission,
    });
    permissionRecords[permission.name] = record;
  }

  const roleRecords = {};
  for (const roleDefinition of roleDefinitions) {
    const record = await prisma.role.upsert({
      where: { name: roleDefinition.name },
      update: { description: roleDefinition.description },
      create: {
        name: roleDefinition.name,
        description: roleDefinition.description,
      },
    });

    roleRecords[roleDefinition.name] = record;

    await prisma.rolePermission.deleteMany({ where: { roleId: record.id } });
    if (roleDefinition.permissions.length > 0) {
      await prisma.rolePermission.createMany({
        data: roleDefinition.permissions.map((permissionName) => ({
          roleId: record.id,
          permissionId: permissionRecords[permissionName].id,
        })),
        skipDuplicates: true,
      });
    }
  }

  for (const account of accountSeeds) {
    const role = roleRecords[account.role];
    if (!role) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const userData = {
      name: account.name,
      status: 'active',
      email: account.email ? account.email.toLowerCase() : null,
      passwordHash: account.password ? await hashSecret(account.password) : null,
      pinCodeHash: account.pin ? await hashSecret(account.pin) : null,
    };

    let user;
    if (userData.email) {
      user = await prisma.user.upsert({
        where: { email: userData.email },
        update: userData,
        create: userData,
      });
    } else {
      const existingCashier = await prisma.user.findFirst({
        where: {
          name: userData.name,
          email: null,
        },
      });

      if (existingCashier) {
        user = await prisma.user.update({
          where: { id: existingCashier.id },
          data: userData,
        });
      } else {
        user = await prisma.user.create({ data: userData });
      }
    }

    const existingUserRole = await prisma.userRole.findFirst({
      where: {
        userId: user.id,
        roleId: role.id,
        placeId: null,
      },
    });

    if (!existingUserRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: role.id,
          placeId: null,
        },
      });
    }
  }

  // eslint-disable-next-line no-console
  console.log('Database seeding completed successfully.');
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Seeding failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
