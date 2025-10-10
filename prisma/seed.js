import { PrismaClient } from '@prisma/client';
import { hashSecret } from '../src/Commons/Utils/HashPassword.js';

const prisma = new PrismaClient();

const permissionCatalog = [
  {
    name: 'manage_company_profile',
    description: 'Manage company profile, subscription, and billing settings.',
  },
  {
    name: 'manage_outlets',
    description: 'Create and update outlet information and operating hours.',
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
      'manage_outlets',
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

const accountSeeds = [
  {
    name: 'F&B Owner',
    role: 'owner',
    email: 'owner@example.com',
    password: 'OwnerPass123!',
  },
  {
    name: 'Outlet Manager',
    role: 'manager',
    email: 'manager@example.com',
    password: 'ManagerPass123!',
  },
  {
    name: 'Shift Supervisor',
    role: 'supervisor',
    email: 'supervisor@example.com',
    password: 'SupervisorPass123!',
  },
  {
    name: 'Cashier A',
    role: 'cashier',
    pin: '123456',
  },
];

async function main() {
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

    await prisma.userRole.upsert({
      where: {
        userId_roleId_outletId: {
          userId: user.id,
          roleId: role.id,
          outletId: null,
        },
      },
      update: {},
      create: {
        userId: user.id,
        roleId: role.id,
      },
    });
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
