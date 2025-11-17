const PERMISSION_GROUPS = [
  {
    domain: 'menus',
    manage: {
      name: 'manage_menus',
      description: 'Create, edit, and archive menu items and categories.',
    },
    actions: [
      { key: 'view', name: 'view_menus', description: 'View menu items and categories.' },
      { key: 'add', name: 'add_menus', description: 'Create new menu items and categories.' },
      { key: 'edit', name: 'edit_menus', description: 'Update existing menu items and categories.' },
      { key: 'delete', name: 'delete_menus', description: 'Remove menu items and categories.' },
    ],
  },
  {
    domain: 'inventory',
    manage: {
      name: 'manage_inventory',
      description: 'Track stock levels, perform stock counts, and adjust inventory.',
    },
    actions: [
      { key: 'view', name: 'view_inventory', description: 'View inventory levels and stock movements.' },
      { key: 'add', name: 'add_inventory', description: 'Record new inventory items or adjustments.' },
      { key: 'edit', name: 'edit_inventory', description: 'Modify inventory details and stock counts.' },
      { key: 'delete', name: 'delete_inventory', description: 'Remove inventory items or adjustments.' },
    ],
  },
  {
    domain: 'suppliers',
    manage: {
      name: 'manage_suppliers',
      description: 'Maintain supplier records and purchasing agreements.',
    },
    actions: [
      { key: 'view', name: 'view_suppliers', description: 'View supplier profiles and products.' },
      { key: 'add', name: 'add_suppliers', description: 'Create new supplier records or products.' },
      { key: 'edit', name: 'edit_suppliers', description: 'Update supplier information and offerings.' },
      { key: 'delete', name: 'delete_suppliers', description: 'Remove suppliers or supplier products.' },
    ],
  },
  {
    domain: 'promotions',
    manage: {
      name: 'manage_promotions',
      description: 'Create and control promotions, vouchers, and discounts.',
    },
    actions: [
      { key: 'view', name: 'view_promotions', description: 'View promotions and voucher configurations.' },
      { key: 'add', name: 'add_promotions', description: 'Create new promotions or voucher rules.' },
      { key: 'edit', name: 'edit_promotions', description: 'Update promotion settings and eligibility.' },
      { key: 'delete', name: 'delete_promotions', description: 'Archive or remove promotions and voucher rules.' },
    ],
  },
  {
    domain: 'orders',
    manage: {
      name: 'manage_orders',
      description: 'Handle dine-in, takeaway, and delivery orders.',
    },
    actions: [
      { key: 'view', name: 'view_orders', description: 'View orders and their fulfillment status.' },
      { key: 'add', name: 'add_orders', description: 'Create new dine-in, takeaway, or delivery orders.' },
      { key: 'edit', name: 'edit_orders', description: 'Modify existing orders and their details.' },
      { key: 'delete', name: 'delete_orders', description: 'Cancel or remove orders and order items.' },
    ],
  },
  {
    domain: 'payments',
    manage: {
      name: 'manage_payments',
      description: 'Process payments, refunds, and cash reconciliation.',
    },
    actions: [
      { key: 'view', name: 'view_payments', description: 'View payment configurations and shift logs.' },
      { key: 'add', name: 'add_payments', description: 'Record new payment methods or cashier shifts.' },
      { key: 'edit', name: 'edit_payments', description: 'Update payment method settings or shift records.' },
      { key: 'delete', name: 'delete_payments', description: 'Remove payment methods or cashier shift entries.' },
    ],
  },
  {
    domain: 'places',
    manage: {
      name: 'manage_places',
      description: 'Create and update place information and operating hours.',
    },
    actions: [
      { key: 'view', name: 'view_places', description: 'View outlet or place configurations.' },
      { key: 'add', name: 'add_places', description: 'Create new places or outlet profiles.' },
      { key: 'edit', name: 'edit_places', description: 'Update place information and operating details.' },
      { key: 'delete', name: 'delete_places', description: 'Deactivate or remove place records.' },
    ],
  },
  {
    domain: 'tables',
    manage: {
      name: 'manage_tables',
      description: 'Manage dining table layout and reservations.',
    },
    actions: [
      { key: 'view', name: 'view_tables', description: 'View table layouts and assignments.' },
      { key: 'add', name: 'add_tables', description: 'Create new tables or seating areas.' },
      { key: 'edit', name: 'edit_tables', description: 'Modify table details, layout, or assignments.' },
      { key: 'delete', name: 'delete_tables', description: 'Remove tables or seating configurations.' },
    ],
  },
  {
    domain: 'delivery_channels',
    manage: {
      name: 'manage_delivery_channels',
      description: 'Configure delivery partners and online ordering channels.',
    },
    actions: [
      { key: 'view', name: 'view_delivery_channels', description: 'View delivery channel integrations.' },
      { key: 'add', name: 'add_delivery_channels', description: 'Create new delivery channel integrations.' },
      { key: 'edit', name: 'edit_delivery_channels', description: 'Update delivery channel settings.' },
      { key: 'delete', name: 'delete_delivery_channels', description: 'Remove delivery channel integrations.' },
    ],
  },
  {
    domain: 'kitchen_operations',
    manage: {
      name: 'manage_kitchen_operations',
      description: 'Control kitchen display systems and production queues.',
    },
    actions: [
      { key: 'view', name: 'view_kitchen_operations', description: 'View kitchen orders and production queues.' },
      { key: 'add', name: 'add_kitchen_operations', description: 'Create new kitchen orders or tickets.' },
      { key: 'edit', name: 'edit_kitchen_operations', description: 'Update kitchen order progress or routing.' },
      { key: 'delete', name: 'delete_kitchen_operations', description: 'Remove kitchen orders from the queue.' },
    ],
  },
  {
    domain: 'staff',
    manage: {
      name: 'manage_staff',
      description: 'Invite employees and manage their assignments.',
    },
    actions: [
      { key: 'view', name: 'view_staff', description: 'View employee lists and assignments.' },
      { key: 'add', name: 'add_staff', description: 'Create employee accounts or invitations.' },
      { key: 'edit', name: 'edit_staff', description: 'Update staff details or assignments.' },
      { key: 'delete', name: 'delete_staff', description: 'Deactivate or remove staff accounts.' },
    ],
  },
  {
    domain: 'roles',
    manage: {
      name: 'manage_roles_permissions',
      description: 'Configure roles and permission assignments.',
    },
    actions: [
      { key: 'view', name: 'view_roles', description: 'View available roles and their permissions.' },
      { key: 'add', name: 'add_roles', description: 'Create new roles with permission sets.' },
      { key: 'edit', name: 'edit_roles', description: 'Update role details and assigned permissions.' },
      { key: 'delete', name: 'delete_roles', description: 'Remove roles and revoke assignments.' },
    ],
  },
  {
    domain: 'permissions',
    manage: {
      name: 'manage_roles_permissions',
      description: 'Configure roles and permission assignments.',
    },
    actions: [
      { key: 'view', name: 'view_permissions', description: 'View registered permissions.' },
      { key: 'add', name: 'add_permissions', description: 'Register new permissions.' },
      { key: 'edit', name: 'edit_permissions', description: 'Update permission descriptions.' },
      { key: 'delete', name: 'delete_permissions', description: 'Remove permissions from the catalog.' },
    ],
  },
  {
    domain: 'reports',
    manage: {
      name: 'manage_reports',
      description: 'Manage generated reports, logs, and exports.',
    },
    actions: [
      {
        key: 'view',
        name: 'view_reports',
        description: 'Access sales, operational, and financial reports.',
      },
      { key: 'add', name: 'add_reports', description: 'Generate new reports or log entries.' },
      { key: 'edit', name: 'edit_reports', description: 'Update generated report metadata or status.' },
      { key: 'delete', name: 'delete_reports', description: 'Delete reports or associated logs.' },
    ],
  },
];

const STANDALONE_PERMISSIONS = [
  {
    name: 'manage_company_profile',
    description: 'Manage company profile, subscription, and billing settings.',
  },
  {
    name: 'manage_customer_data',
    description: 'Maintain customer database and loyalty programs.',
  },
];

function buildPermissionAliasMap() {
  const map = new Map();

  for (const group of PERMISSION_GROUPS) {
    const manageName = group.manage?.name;

    if (Array.isArray(group.actions)) {
      for (const action of group.actions) {
        if (!action?.name) continue;

        const impliedBy = [];
        if (manageName) {
          impliedBy.push(manageName);
        }

        map.set(action.name, impliedBy);
      }
    }
  }

  return map;
}

const PERMISSION_ALIAS_MAP = buildPermissionAliasMap();

function expandPermissionsWithAliases(permissions) {
  const normalized = (permissions ?? [])
    .map((permission) => (typeof permission === 'string' ? permission.trim().toLowerCase() : null))
    .filter((permission) => permission);

  const expanded = new Set(normalized);
  let changed = true;

  while (changed) {
    changed = false;

    for (const [permission, impliedBy] of PERMISSION_ALIAS_MAP.entries()) {
      if (expanded.has(permission)) {
        continue;
      }

      if (impliedBy.some((alias) => expanded.has(alias))) {
        expanded.add(permission);
        changed = true;
      }
    }
  }

  return expanded;
}

function buildPermissionCatalog() {
  const catalog = [];
  const seen = new Set();

  for (const group of PERMISSION_GROUPS) {
    if (group.manage && group.manage.name && !seen.has(group.manage.name)) {
      catalog.push({
        name: group.manage.name,
        description: group.manage.description,
      });
      seen.add(group.manage.name);
    }

    if (Array.isArray(group.actions)) {
      for (const action of group.actions) {
        if (!action?.name || seen.has(action.name)) {
          continue;
        }

        catalog.push({ name: action.name, description: action.description });
        seen.add(action.name);
      }
    }
  }

  for (const permission of STANDALONE_PERMISSIONS) {
    if (permission?.name && !seen.has(permission.name)) {
      catalog.push({ name: permission.name, description: permission.description });
      seen.add(permission.name);
    }
  }

  return catalog;
}

export {
  PERMISSION_GROUPS,
  STANDALONE_PERMISSIONS,
  buildPermissionAliasMap,
  buildPermissionCatalog,
  expandPermissionsWithAliases,
};
