import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { buildPermissionCatalog } from '../src/Commons/Constants/PermissionMatrix.js';
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

const permissionCatalog = buildPermissionCatalog();

const roleDefinitions = [
  {
    name: 'brand_owner',
    description: 'Brand owner with complete system access.',
    permissions: permissionCatalog.map((permission) => permission.name),
  },
  {
    name: 'location_owner',
    description: 'Location owner overseeing outlet performance and configuration.',
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
      'manage_reports',
      'manage_kitchen_operations',
      'manage_customer_data',
      'manage_roles_permissions',
    ],
  },
  {
    name: 'admin',
    description: 'Administrator managing staff access and master data.',
    permissions: [
      'manage_places',
      'manage_staff',
      'manage_menus',
      'manage_inventory',
      'manage_suppliers',
      'manage_promotions',
      'manage_reports',
      'manage_roles_permissions',
      'manage_customer_data',
    ],
  },
  {
    name: 'store_manager',
    description: 'Store manager handling daily operations.',
    permissions: [
      'manage_orders',
      'manage_payments',
      'manage_tables',
      'manage_kitchen_operations',
      'manage_menus',
      'manage_inventory',
      'manage_suppliers',
      'manage_customer_data',
      'manage_reports',
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
    name: 'purchaising',
    description: 'Staff responsible for procurement and stock replenishment.',
    permissions: [
      'manage_inventory',
      'manage_suppliers',
      'manage_promotions',
      'manage_reports',
    ],
  },
  {
    name: 'waiters',
    description: 'Front-of-house staff managing tables and customer service.',
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
    name: envOrDefault(
      'SEED_BRAND_OWNER_NAME',
      envOrDefault('SEED_OWNER_NAME', 'Brand Owner')
    ),
    role: 'brand_owner',
    email: envOrDefault(
      'SEED_BRAND_OWNER_EMAIL',
      envOrDefault('SEED_OWNER_EMAIL', 'brand.owner@example.com')
    ),
    password: envOrDefault(
      'SEED_BRAND_OWNER_PASSWORD',
      envOrDefault('SEED_OWNER_PASSWORD', 'BrandOwnerPass123!')
    ),
  }),
  normalizeAccountSeed({
    name: envOrDefault(
      'SEED_LOCATION_OWNER_NAME',
      envOrDefault('SEED_MANAGER_NAME', 'Location Owner')
    ),
    role: 'location_owner',
    email: envOrDefault(
      'SEED_LOCATION_OWNER_EMAIL',
      envOrDefault('SEED_MANAGER_EMAIL', 'location.owner@example.com')
    ),
    password: envOrDefault(
      'SEED_LOCATION_OWNER_PASSWORD',
      envOrDefault('SEED_MANAGER_PASSWORD', 'LocationOwnerPass123!')
    ),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_ADMIN_NAME', 'Administrator'),
    role: 'admin',
    email: envOrDefault('SEED_ADMIN_EMAIL', 'admin@example.com'),
    password: envOrDefault('SEED_ADMIN_PASSWORD', 'AdminPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_STORE_MANAGER_NAME', 'Store Manager'),
    role: 'store_manager',
    email: envOrDefault('SEED_STORE_MANAGER_EMAIL', 'store.manager@example.com'),
    password: envOrDefault('SEED_STORE_MANAGER_PASSWORD', 'StoreManagerPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_CASHIER_NAME', 'Cashier A'),
    role: 'cashier',
    pin: envOrDefault('SEED_CASHIER_PIN', '123456'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_CHEF_NAME', 'Kitchen Chef'),
    role: 'chef',
    email: envOrDefault('SEED_CHEF_EMAIL', 'chef@example.com'),
    password: envOrDefault('SEED_CHEF_PASSWORD', 'ChefPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_PURCHAISING_NAME', 'Purchaising Staff'),
    role: 'purchaising',
    email: envOrDefault('SEED_PURCHAISING_EMAIL', 'purchaising@example.com'),
    password: envOrDefault('SEED_PURCHAISING_PASSWORD', 'PurchaisingPass123!'),
  }),
  normalizeAccountSeed({
    name: envOrDefault('SEED_WAITERS_NAME', 'Head Waiter'),
    role: 'waiters',
    email: envOrDefault('SEED_WAITERS_EMAIL', 'waiters@example.com'),
    password: envOrDefault('SEED_WAITERS_PASSWORD', 'WaitersPass123!'),
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

  // ==== Domain seeds for Units, Ingredients, Packages, IngredientPackages, Suppliers, SupplierProducts, Tables ====
  // Units
  const unitDefs = [
    { name: 'gram', abbreviation: 'g' },
    { name: 'kilogram', abbreviation: 'kg' },
    { name: 'liter', abbreviation: 'l' },
    { name: 'piece', abbreviation: 'pc' },
  ];

  const unitRecords = {};
  for (const u of unitDefs) {
    const rec = await prisma.unit.upsert({
      where: { name: u.name },
      update: { abbreviation: u.abbreviation },
      create: u,
    });
    unitRecords[u.name] = rec;
  }

  // Ingredients
  const ingredientDefs = [
    { name: 'Gula', unitName: 'gram' },
    { name: 'Tepung', unitName: 'gram' },
    { name: 'Minyak', unitName: 'liter' },
    { name: 'Telur', unitName: 'piece' },
  ];

  const ingredientRecords = {};
  for (const ing of ingredientDefs) {
    const unit = unitRecords[ing.unitName];
    if (!unit) continue; // safety

    const existing = await prisma.ingredient.findFirst({ where: { name: ing.name } });
    let rec;
    if (existing) {
      rec = await prisma.ingredient.update({ where: { id: existing.id }, data: { unitId: unit.id } });
    } else {
      rec = await prisma.ingredient.create({ data: { name: ing.name, unitId: unit.id } });
    }
    ingredientRecords[ing.name] = rec;
  }

  // Packages
  const packageDefs = [
    { name: 'sachet', description: 'Kemasan kecil 10g' },
    { name: 'pack', description: 'Isi 1kg' },
    { name: 'bottle', description: 'Botol 1L' },
  ];

  const packageRecords = {};
  for (const p of packageDefs) {
    const rec = await prisma.package.upsert({
      where: { name: p.name },
      update: { description: p.description ?? null },
      create: p,
    });
    packageRecords[p.name] = rec;
  }

  // IngredientPackages (quantities per package)
  const ingredientPackageDefs = [
    { ingredientName: 'Gula', packageName: 'sachet', qty: 10 },
    { ingredientName: 'Gula', packageName: 'pack', qty: 1000 },
    { ingredientName: 'Minyak', packageName: 'bottle', qty: 1 },
  ];

  for (const ip of ingredientPackageDefs) {
    const ingredient = ingredientRecords[ip.ingredientName];
    const pkg = packageRecords[ip.packageName];
    if (!ingredient || !pkg) continue;

    const existing = await prisma.ingredientPackage.findFirst({
      where: { ingredientId: ingredient.id, packageId: pkg.id },
    });

    if (existing) {
      await prisma.ingredientPackage.update({
        where: { id: existing.id },
        data: { qty: ip.qty },
      });
    } else {
      await prisma.ingredientPackage.create({
        data: { ingredientId: ingredient.id, packageId: pkg.id, qty: ip.qty },
      });
    }
  }

  // Suppliers
  const supplierDefs = [
    { name: 'PT Sumber Rejeki', contactName: 'Budi', phone: '+62-812-1111-2222' },
    { name: 'CV Maju Bersama', contactName: 'Siti', phone: '+62-813-3333-4444' },
  ];

  const supplierRecords = {};
  for (const s of supplierDefs) {
    const existing = await prisma.supplier.findFirst({ where: { name: s.name } });
    let rec;
    if (existing) {
      rec = await prisma.supplier.update({ where: { id: existing.id }, data: s });
    } else {
      rec = await prisma.supplier.create({ data: s });
    }
    supplierRecords[s.name] = rec;
  }

  // SupplierProducts
  const supplierProductDefs = [
    { supplierName: 'PT Sumber Rejeki', ingredientName: 'Gula', packageName: 'pack', qty: 1, price: 25000, leadTime: 3 },
    { supplierName: 'CV Maju Bersama', ingredientName: 'Minyak', packageName: 'bottle', qty: 1, price: 32000, leadTime: 2 },
  ];

  for (const sp of supplierProductDefs) {
    const supplier = supplierRecords[sp.supplierName];
    const ingredient = ingredientRecords[sp.ingredientName];
    const pkg = packageRecords[sp.packageName];
    if (!supplier || !ingredient || !pkg) continue;

    const existing = await prisma.supplierProduct.findFirst({
      where: {
        supplierId: supplier.id,
        ingredientId: ingredient.id,
        packageId: pkg.id,
      },
    });

    const payload = {
      supplierId: supplier.id,
      ingredientId: ingredient.id,
      packageId: pkg.id,
      qty: sp.qty,
      price: sp.price,
      leadTime: sp.leadTime,
      isActive: true,
    };

    if (existing) {
      await prisma.supplierProduct.update({ where: { id: existing.id }, data: payload });
    } else {
      await prisma.supplierProduct.create({ data: payload });
    }
  }

  // Tables (need a place)
  const mainPlace = await prisma.place.findFirst({ orderBy: { id: 'asc' } });
  if (mainPlace) {
    const tableDefs = [
      { placeId: mainPlace.id, name: 'T-01', status: 'available' },
      { placeId: mainPlace.id, name: 'T-02', status: 'available' },
      { placeId: mainPlace.id, name: 'T-03', status: 'available' },
    ];

    for (const t of tableDefs) {
      const existing = await prisma.table.findFirst({ where: { placeId: t.placeId, name: t.name } });
      if (existing) {
        await prisma.table.update({ where: { id: existing.id }, data: { status: t.status } });
      } else {
        await prisma.table.create({ data: t });
      }
    }
  }

  // ==== Menu master seeds (Categories, Menus, MenuPrices, MenuVariants, MenuVariantItems, Recipes)
  // Categories
  const categoryDefs = [
    { name: 'beverages' },
    { name: 'food' },
  ];

  const categoryRecords = {};
  for (const c of categoryDefs) {
    const rec = await prisma.category.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
    categoryRecords[c.name] = rec;
  }

  // Menus
  const menuDefs = [
    { name: 'Es Teh', placeId: mainPlace?.id ?? null, categoryName: 'beverages', description: 'Teh manis dingin', isActive: true },
    { name: 'Nasi Goreng', placeId: mainPlace?.id ?? null, categoryName: 'food', description: 'Nasi goreng spesial', isActive: true },
  ];

  const menuRecords = {};
  for (const m of menuDefs) {
    const category = m.categoryName ? categoryRecords[m.categoryName] : null;
    const data = {
      name: m.name,
      placeId: m.placeId ?? null,
      categoryId: category ? category.id : null,
      description: m.description ?? null,
      isActive: m.isActive !== false,
    };

    const existing = await prisma.menu.findFirst({ where: { name: m.name } });
    let rec;
    if (existing) {
      rec = await prisma.menu.update({ where: { id: existing.id }, data });
    } else {
      rec = await prisma.menu.create({ data });
    }
    menuRecords[m.name] = rec;
  }

  // MenuPrices (today's date)
  const todayStr = new Date().toISOString().slice(0, 10);
  const priceDefs = [
    { menuName: 'Es Teh', price: 8000, effectiveDate: todayStr },
    { menuName: 'Nasi Goreng', price: 25000, effectiveDate: todayStr },
  ];
  for (const p of priceDefs) {
    const menu = menuRecords[p.menuName];
    if (!menu) continue;
    // Upsert by (menuId, effectiveDate) uniqueness not defined, so insert if not exists by same pair
    const exist = await prisma.menuPrice.findFirst({ where: { menuId: menu.id, effectiveDate: new Date(p.effectiveDate) } });
    if (exist) {
      await prisma.menuPrice.update({ where: { id: exist.id }, data: { price: p.price } });
    } else {
      await prisma.menuPrice.create({ data: { menuId: menu.id, price: p.price, effectiveDate: new Date(p.effectiveDate) } });
    }
  }

  // MenuVariants and Items
  const variantDefs = [
    { menuName: 'Es Teh', name: 'Sugar' },
    { menuName: 'Nasi Goreng', name: 'Spicy' },
  ];

  const variantRecords = {};
  for (const v of variantDefs) {
    const menu = menuRecords[v.menuName];
    if (!menu) continue;
    const exist = await prisma.menuVariant.findFirst({ where: { menuId: menu.id, name: v.name } });
    let rec;
    if (exist) {
      rec = exist;
    } else {
      rec = await prisma.menuVariant.create({ data: { menuId: menu.id, name: v.name } });
    }
    variantRecords[`${v.menuName}:${v.name}`] = rec;
  }

  const variantItemDefs = [
    { variantKey: 'Es Teh:Sugar', name: 'Normal', additionalPrice: 0 },
    { variantKey: 'Es Teh:Sugar', name: 'Less', additionalPrice: 0 },
    { variantKey: 'Es Teh:Sugar', name: 'No Sugar', additionalPrice: 0 },
    { variantKey: 'Nasi Goreng:Spicy', name: 'Normal', additionalPrice: 0 },
    { variantKey: 'Nasi Goreng:Spicy', name: 'Hot', additionalPrice: 3000 },
  ];

  for (const vi of variantItemDefs) {
    const variant = variantRecords[vi.variantKey];
    if (!variant) continue;
    const exist = await prisma.menuVariantItem.findFirst({ where: { menuVariantId: variant.id, name: vi.name } });
    if (exist) {
      await prisma.menuVariantItem.update({ where: { id: exist.id }, data: { additionalPrice: vi.additionalPrice } });
    } else {
      await prisma.menuVariantItem.create({ data: { menuVariantId: variant.id, name: vi.name, additionalPrice: vi.additionalPrice } });
    }
  }

  // Recipes
  const recipes = [
    { menuName: 'Es Teh', ingredientName: 'Gula', qty: 10 }, // 10 gram gula
    { menuName: 'Nasi Goreng', ingredientName: 'Minyak', qty: 0.1 }, // 0.1 liter
    { menuName: 'Nasi Goreng', ingredientName: 'Telur', qty: 1 },
  ];

  for (const r of recipes) {
    const menu = menuRecords[r.menuName];
    const ingredient = ingredientRecords[r.ingredientName];
    if (!menu || !ingredient) continue;
    const exist = await prisma.recipe.findFirst({ where: { menuId: menu.id, ingredientId: ingredient.id } });
    if (exist) {
      await prisma.recipe.update({ where: { id: exist.id }, data: { qty: r.qty } });
    } else {
      await prisma.recipe.create({ data: { menuId: menu.id, ingredientId: ingredient.id, qty: r.qty } });
    }
  }

  // ==== Payment methods and Delivery integrations ====
  const pmDefs = [
    { name: 'cash', description: 'Tunai', isActive: true },
    { name: 'qris', description: 'QRIS', isActive: true },
  ];
  for (const pm of pmDefs) {
    await prisma.paymentMethod.upsert({ where: { name: pm.name }, update: { description: pm.description, isActive: pm.isActive }, create: pm });
  }

  if (mainPlace) {
    const diDefs = [
      { placeId: mainPlace.id, platformName: 'GoFood', apiKey: 'secret', settingsJson: { region: 'ID' } },
    ];
    for (const di of diDefs) {
      const exist = await prisma.deliveryIntegration.findFirst({ where: { placeId: di.placeId, platformName: di.platformName } });
      if (exist) {
        await prisma.deliveryIntegration.update({ where: { id: exist.id }, data: di });
      } else {
        await prisma.deliveryIntegration.create({ data: di });
      }
    }
  }

  // ==== Report files (dummy) ====
  // Seed a couple of generated report entries if table is empty
  const reportFileCount = await prisma.reportFile.count();
  if (reportFileCount === 0) {
    const baseDate = new Date();
    const rfSeeds = [
      {
        reportType: 'sales_summary',
        reportScope: 'daily',
        reportDate: new Date(baseDate.toISOString().slice(0, 10)),
        placeId: mainPlace?.id ?? null,
        fileName: 'sales-summary-today.csv',
        filePath: '/reports/sales/sales-summary-today.csv',
      },
      {
        reportType: 'inventory_snapshot',
        reportScope: 'daily',
        reportDate: new Date(baseDate.toISOString().slice(0, 10)),
        placeId: mainPlace?.id ?? null,
        fileName: 'inventory-snapshot-today.csv',
        filePath: '/reports/inventory/inventory-snapshot-today.csv',
      },
    ];

    for (const rf of rfSeeds) {
      const exist = await prisma.reportFile.findFirst({ where: { filePath: rf.filePath } });
      if (exist) {
        await prisma.reportFile.update({ where: { id: exist.id }, data: rf });
      } else {
        await prisma.reportFile.create({ data: rf });
      }
    }
  }

  // ==== Activity logs (dummy) ====
  // Only insert sample logs when table is empty to keep the seed idempotent
  const activityLogCount = await prisma.activityLog.count();
  if (activityLogCount === 0) {
    // Try to attach to an existing seeded user (brand owner)
    const brandOwnerEmail = envOrDefault(
      'SEED_BRAND_OWNER_EMAIL',
      envOrDefault('SEED_OWNER_EMAIL', 'brand.owner@example.com')
    )?.toLowerCase();
    const ownerUser = await prisma.user.findFirst({ where: { email: brandOwnerEmail } });
    const uid = ownerUser?.id ?? null;

    const alSeeds = [
      { userId: uid, action: 'login', entityType: 'auth', entityId: null, contextJson: { ip: '127.0.0.1' } },
      { userId: uid, action: 'create_menu', entityType: 'menu', entityId: null, contextJson: { name: 'Es Teh' } },
      { userId: uid, action: 'update_price', entityType: 'menu_price', entityId: null, contextJson: { menu: 'Nasi Goreng', price: 25000 } },
    ];

    await prisma.activityLog.createMany({ data: alSeeds });
  }

  // ==== System logs (dummy) ====
  const systemLogCount = await prisma.systemLog.count();
  if (systemLogCount === 0) {
    const slSeeds = [
      { level: 'info', message: 'Server started', contextJson: { env: process.env.NODE_ENV ?? 'development' } },
      { level: 'warn', message: 'Low disk space threshold reached', contextJson: { path: '/', percent: 85 } },
      { level: 'error', message: 'Third-party API timeout', contextJson: { service: 'DeliveryPlatform', timeoutMs: 5000 } },
    ];

    await prisma.systemLog.createMany({ data: slSeeds });
  }

  // ==== Transactions seed (transactions, transaction_items, transaction_item_variants, kitchen_orders)
  const trxCount = await prisma.transaction.count();
  if (trxCount === 0) {
    const anyUser = await prisma.user.findFirst({ orderBy: { id: 'asc' } });
    const table = mainPlace ? await prisma.table.findFirst({ where: { placeId: mainPlace.id }, orderBy: { id: 'asc' } }) : null;
    const pmCash = await prisma.paymentMethod.findFirst({ where: { name: 'cash' } });

    if (anyUser) {
      // Transaction #1 (dine-in)
      const trx1 = await prisma.transaction.create({
        data: {
          cashierId: anyUser.id,
          placeId: mainPlace?.id ?? null,
          tableId: table?.id ?? null,
          orderType: 'dine_in',
          total: 33000,
          tax: 3000,
          discount: 0,
          paymentMethodId: pmCash?.id ?? null,
        },
      });

      // Items for trx1
      const esTeh = menuRecords?.['Es Teh'];
      const nasiGoreng = menuRecords?.['Nasi Goreng'];

      const item1 = esTeh
        ? await prisma.transactionItem.create({ data: { transactionId: trx1.id, menuId: esTeh.id, qty: 1, price: 8000, discount: 0 } })
        : null;
      const item2 = nasiGoreng
        ? await prisma.transactionItem.create({ data: { transactionId: trx1.id, menuId: nasiGoreng.id, qty: 1, price: 22000, discount: 0 } })
        : null;

      // Variants (link to MenuVariant)
      if (item1 && typeof variantRecords !== 'undefined') {
        const sugarVariant = variantRecords['Es Teh:Sugar'];
        if (sugarVariant) {
          await prisma.transactionItemVariant.create({ data: { transactionItemId: item1.id, menuVariantId: sugarVariant.id, extraPrice: 0 } });
        }
      }
      if (item2 && typeof variantRecords !== 'undefined') {
        const spicyVariant = variantRecords['Nasi Goreng:Spicy'];
        if (spicyVariant) {
          await prisma.transactionItemVariant.create({ data: { transactionItemId: item2.id, menuVariantId: spicyVariant.id, extraPrice: 3000 } });
        }
      }

      // Kitchen orders for each item
      if (item1) {
        await prisma.kitchenOrder.create({ data: { transactionItemId: item1.id, status: 'waiting', note: 'Ice please' } });
      }
      if (item2) {
        await prisma.kitchenOrder.create({ data: { transactionItemId: item2.id, status: 'waiting', note: 'Less oil' } });
      }

      // Transaction #2 (takeaway)
      const trx2 = await prisma.transaction.create({
        data: {
          cashierId: anyUser.id,
          placeId: mainPlace?.id ?? null,
          tableId: null,
          orderType: 'takeaway',
          total: 8000,
          tax: 0,
          discount: 0,
          paymentMethodId: pmCash?.id ?? null,
        },
      });

      if (esTeh) {
        await prisma.transactionItem.create({ data: { transactionId: trx2.id, menuId: esTeh.id, qty: 1, price: 8000, discount: 0 } });
      }
    }
  }

  // ==== Place Stocks ====
  const placeStockCount = await prisma.placeStock.count();
  if (placeStockCount === 0 && mainPlace) {
    const targetIngredients = ['Gula', 'Minyak', 'Telur'].map((n) => ingredientRecords[n]).filter(Boolean);
    for (const ing of targetIngredients) {
      const unitId = ing.unitId;
      const existing = await prisma.placeStock.findFirst({ where: { placeId: mainPlace.id, ingredientId: ing.id, unitId } });
      const data = { placeId: mainPlace.id, ingredientId: ing.id, unitId, qty: 100 };
      if (existing) {
        await prisma.placeStock.update({ where: { id: existing.id }, data });
      } else {
        await prisma.placeStock.create({ data });
      }
    }
  }

  // ==== Inventory stock daily ====
  const isdCount = await prisma.inventoryStockDaily.count();
  if (isdCount === 0 && mainPlace) {
    const today = new Date();
    const dateOnly = new Date(today.toISOString().slice(0, 10));
    const ing = ingredientRecords['Gula'] ?? null;
    if (ing) {
      const existing = await prisma.inventoryStockDaily.findFirst({ where: { placeId: mainPlace.id, ingredientId: ing.id, date: dateOnly } });
      const payload = { placeId: mainPlace.id, ingredientId: ing.id, date: dateOnly, openingQty: 100, closingQty: 90, diffQty: -10 };
      if (existing) {
        await prisma.inventoryStockDaily.update({ where: { id: existing.id }, data: payload });
      } else {
        await prisma.inventoryStockDaily.create({ data: payload });
      }
    }
  }

  // ==== Stock transfers ====
  const stCount = await prisma.stockTransfer.count();
  if (stCount === 0) {
    const places = await prisma.place.findMany({ orderBy: { id: 'asc' } });
    if (places.length >= 2) {
      const ing = ingredientRecords['Minyak'] ?? null;
      if (ing) {
        await prisma.stockTransfer.create({ data: { ingredientId: ing.id, fromPlaceId: places[0].id, toPlaceId: places[1].id, qty: 5 } });
      }
    }
  }

  // ==== Wastes ====
  const wasteCount = await prisma.waste.count();
  if (wasteCount === 0 && mainPlace) {
    const ing = ingredientRecords['Telur'] ?? null;
    if (ing) {
      await prisma.waste.create({ data: { ingredientId: ing.id, placeId: mainPlace.id, qty: 2, reason: 'Expired' } });
    }
  }

  // ==== Cashier shifts ====
  const csCount = await prisma.cashierShift.count();
  if (csCount === 0 && mainPlace) {
    const cashier = await prisma.user.findFirst({ orderBy: { id: 'asc' } });
    if (cashier) {
      await prisma.cashierShift.create({ data: { placeId: mainPlace.id, cashierId: cashier.id, ipAddress: '127.0.0.1', openingBalance: 0, status: 'open' } });
    }
  }

  // ==== Promotions & rules ====
  const promoCount = await prisma.promotion.count();
  if (promoCount === 0) {
    const promo = await prisma.promotion.create({ data: { placeId: mainPlace?.id ?? null, name: 'Happy Hour', startAt: new Date(), endAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) } });
    await prisma.promotionRule.createMany({ data: [
      { promotionId: promo.id, ruleType: 'percentage_discount', value: '10' },
    ] });
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
