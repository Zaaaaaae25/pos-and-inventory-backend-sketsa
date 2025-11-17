export function createOpenApiDocument({ serverUrl = "http://localhost:3000" } = {}) {
  return {
    openapi: "3.0.3",
    info: {
      title: "POS Backend API",
      version: "1.0.0",
      description: "Dokumentasi OpenAPI untuk layanan POS Backend. Gunakan spesifikasi ini untuk melakukan integrasi dan mencoba endpoint secara cepat.",
    },
    servers: [
      {
        url: serverUrl,
        description: "POS Backend server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "Endpoint untuk manajemen pengguna",
      },
      {
        name: "Roles",
        description: "Endpoint untuk manajemen role dan permission",
      },
      {
        name: "Places",
        description: "Endpoint untuk manajemen tempat (outlet, warehouse, dan lainnya)",
      },
      {
        name: "Auth",
        description: "Endpoint untuk autentikasi pengguna",
      },
      {
        name: "Units",
        description: "Endpoint untuk manajemen satuan (unit) bahan/produk",
      },
      {
        name: "Tables",
        description: "Endpoint untuk manajemen meja (dining tables)",
      },
      {
        name: "Ingredients",
        description: "Endpoint untuk manajemen bahan baku",
      },
      {
        name: "Packages",
        description: "Endpoint untuk manajemen kemasan/paket bahan",
      },
      {
        name: "Categories",
        description: "Endpoint untuk manajemen kategori menu",
      },
      {
        name: "Menus",
        description: "Endpoint untuk manajemen menu",
      },
      {
        name: "MenuPrices",
        description: "Endpoint untuk harga menu",
      },
      {
        name: "MenuVariants",
        description: "Endpoint untuk varian menu",
      },
      {
        name: "MenuVariantItems",
        description: "Endpoint untuk item varian menu",
      },
      {
        name: "Recipes",
        description: "Endpoint untuk resep (komposisi menu)",
      },
      {
        name: "PaymentMethods",
        description: "Endpoint untuk metode pembayaran",
      },
      {
        name: "DeliveryIntegrations",
        description: "Endpoint untuk integrasi delivery platform",
      },
      {
        name: "ReportFiles",
        description: "Endpoint untuk file laporan yang dihasilkan",
      },
      {
        name: "ActivityLogs",
        description: "Endpoint untuk activity logs",
      },
      {
        name: "SystemLogs",
        description: "Endpoint untuk system logs",
      },
      {
        name: "IngredientPackages",
        description: "Relasi bahan ke paket kemasan",
      },
      {
        name: "Suppliers",
        description: "Endpoint untuk manajemen pemasok",
      },
      {
        name: "SupplierProducts",
        description: "Endpoint untuk manajemen produk pemasok",
      },
      {
        name: "Permissions",
        description: "Endpoint untuk daftar permission",
      },
      { name: "Transactions", description: "Endpoint transaksi penjualan" },
      { name: "TransactionItems", description: "Item pada transaksi" },
      { name: "TransactionItemVariants", description: "Varian item transaksi" },
      { name: "KitchenOrders", description: "Antrian produksi dapur" },
      { name: "PlaceStocks", description: "Stok bahan per tempat" },
      { name: "Transactions", description: "Endpoint transaksi penjualan" },
      { name: "TransactionItems", description: "Item pada transaksi" },
      { name: "TransactionItemVariants", description: "Varian item transaksi" },
      { name: "KitchenOrders", description: "Antrian produksi dapur" },
    ],
    paths: {
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login pengguna",
          operationId: "loginUser",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login berhasil",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LoginResponse",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            401: {
              $ref: "#/components/responses/Unauthorized",
            },
            403: {
              $ref: "#/components/responses/Forbidden",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout pengguna",
          operationId: "logoutUser",
          responses: {
            204: {
              description: "Logout berhasil",
            },
            401: {
              $ref: "#/components/responses/Unauthorized",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Daftar semua pengguna",
          operationId: "listUsers",
          responses: {
            200: {
              description: "Daftar pengguna berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        post: {
          tags: ["Users"],
          summary: "Buat pengguna baru",
          operationId: "createUser",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateUserRequest",
                },
              },
            },
            description: "Jika role adalah cashier maka gunakan PIN (tanpa email & password). Untuk role lain gunakan email & password (tanpa PIN).",
          },
          responses: {
            201: {
              description: "Pengguna berhasil dibuat",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/users/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID pengguna",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        get: {
          tags: ["Users"],
          summary: "Ambil detail pengguna",
          operationId: "getUser",
          responses: {
            200: {
              description: "Detail pengguna ditemukan",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        patch: {
          tags: ["Users"],
          summary: "Perbarui data pengguna",
          operationId: "updateUser",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateUserRequest",
                },
              },
            },
            description: "Isi hanya properti yang ingin diubah. Validasi berbeda untuk role cashier dan non-cashier.",
          },
          responses: {
            200: {
              description: "Pengguna berhasil diperbarui",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/roles": {
        get: {
          tags: ["Roles"],
          summary: "Daftar semua role",
          operationId: "listRoles",
          responses: {
            200: {
              description: "Daftar role berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Role",
                    },
                  },
                },
              },
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        post: {
          tags: ["Roles"],
          summary: "Buat role baru",
          operationId: "createRole",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateRoleRequest",
                },
              },
            },
            description: "Buat role baru dengan daftar permission. Nama permission harus sudah terdaftar.",
          },
          responses: {
            201: {
              description: "Role berhasil dibuat",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Role",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/roles/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID role",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        get: {
          tags: ["Roles"],
          summary: "Ambil detail role",
          operationId: "getRole",
          responses: {
            200: {
              description: "Detail role ditemukan",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Role",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        put: {
          tags: ["Roles"],
          summary: "Perbarui role",
          operationId: "updateRole",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateRoleRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Role berhasil diperbarui",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Role",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        delete: {
          tags: ["Roles"],
          summary: "Hapus role",
          operationId: "deleteRole",
          responses: {
            204: {
              description: "Role berhasil dihapus",
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/places": {
        get: {
          tags: ["Places"],
          summary: "Daftar semua tempat",
          operationId: "listPlaces",
          responses: {
            200: {
              description: "Daftar tempat berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Place",
                    },
                  },
                },
              },
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        post: {
          tags: ["Places"],
          summary: "Buat tempat baru",
          operationId: "createPlace",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreatePlaceRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Tempat berhasil dibuat",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Place",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/places/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID tempat",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        get: {
          tags: ["Places"],
          summary: "Ambil detail tempat",
          operationId: "getPlace",
          responses: {
            200: {
              description: "Detail tempat ditemukan",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Place",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        put: {
          tags: ["Places"],
          summary: "Perbarui data tempat",
          operationId: "updatePlace",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdatePlaceRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Tempat berhasil diperbarui",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Place",
                  },
                },
              },
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
        delete: {
          tags: ["Places"],
          summary: "Hapus tempat",
          operationId: "deletePlace",
          responses: {
            204: {
              description: "Tempat berhasil dihapus",
            },
            400: {
              $ref: "#/components/responses/BadRequest",
            },
            404: {
              $ref: "#/components/responses/NotFound",
            },
            500: {
              $ref: "#/components/responses/InternalServerError",
            },
          },
        },
      },
      "/api/units": {
        get: {
          tags: ["Units"],
          summary: "Daftar semua unit",
          operationId: "listUnits",
          responses: {
            200: {
              description: "Daftar unit berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Unit" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Units"],
          summary: "Buat unit baru",
          operationId: "createUnit",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateUnitRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "Unit berhasil dibuat",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Unit" },
                },
              },
            },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/units/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID unit",
            schema: { type: "integer", minimum: 1 },
          },
        ],
        get: {
          tags: ["Units"],
          summary: "Ambil detail unit",
          operationId: "getUnit",
          responses: {
            200: {
              description: "Detail unit",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Unit" },
                },
              },
            },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        put: {
          tags: ["Units"],
          summary: "Perbarui unit",
          operationId: "updateUnit",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateUnitRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Unit diperbarui",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Unit" },
                },
              },
            },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        delete: {
          tags: ["Units"],
          summary: "Hapus unit",
          operationId: "deleteUnit",
          responses: {
            204: { description: "Unit dihapus" },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/tables": {
        get: {
          tags: ["Tables"],
          summary: "Daftar semua meja",
          operationId: "listTables",
          responses: {
            200: {
              description: "Daftar meja berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Table" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Tables"],
          summary: "Buat meja baru",
          operationId: "createTable",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateTableRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "Meja berhasil dibuat",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Table" },
                },
              },
            },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/tables/{id}": {
        parameters: [
          { name: "id", in: "path", required: true, description: "ID meja", schema: { type: "integer", minimum: 1 } },
        ],
        get: {
          tags: ["Tables"],
          summary: "Ambil detail meja",
          operationId: "getTable",
          responses: {
            200: { description: "Detail meja", content: { "application/json": { schema: { $ref: "#/components/schemas/Table" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        put: {
          tags: ["Tables"],
          summary: "Perbarui meja",
          operationId: "updateTable",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateTableRequest" } } } },
          responses: {
            200: { description: "Meja diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Table" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        delete: {
          tags: ["Tables"],
          summary: "Hapus meja",
          operationId: "deleteTable",
          responses: {
            204: { description: "Meja dihapus" },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/ingredients": {
        get: {
          tags: ["Ingredients"],
          summary: "Daftar semua bahan",
          operationId: "listIngredients",
          responses: {
            200: {
              description: "Daftar bahan berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Ingredient" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Ingredients"],
          summary: "Buat bahan baru",
          operationId: "createIngredient",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateIngredientRequest" } } } },
          responses: {
            201: { description: "Bahan berhasil dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Ingredient" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/ingredients/{id}": {
        parameters: [ { name: "id", in: "path", required: true, description: "ID bahan", schema: { type: "integer", minimum: 1 } } ],
        get: {
          tags: ["Ingredients"],
          summary: "Ambil detail bahan",
          operationId: "getIngredient",
          responses: {
            200: { description: "Detail bahan", content: { "application/json": { schema: { $ref: "#/components/schemas/Ingredient" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        put: {
          tags: ["Ingredients"],
          summary: "Perbarui bahan",
          operationId: "updateIngredient",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateIngredientRequest" } } } },
          responses: {
            200: { description: "Bahan diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Ingredient" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        delete: {
          tags: ["Ingredients"],
          summary: "Hapus bahan",
          operationId: "deleteIngredient",
          responses: {
            204: { description: "Bahan dihapus" },
            400: { $ref: "#/components/responses/BadRequest" },
            404: { $ref: "#/components/responses/NotFound" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/packages": {
        get: {
          tags: ["Packages"],
          summary: "Daftar semua paket/kemasan",
          operationId: "listPackages",
          responses: {
            200: {
              description: "Daftar paket berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Package" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Packages"],
          summary: "Buat paket/kemasan baru",
          operationId: "createPackage",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePackageRequest" } } } },
          responses: {
            201: { description: "Paket berhasil dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Package" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/categories": {
        get: {
          tags: ["Categories"],
          summary: "Daftar semua kategori",
          operationId: "listCategories",
          responses: {
            200: { description: "Daftar kategori", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Category" } } } } },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Categories"],
          summary: "Buat kategori",
          operationId: "createCategory",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateCategoryRequest" } } } },
          responses: {
            201: { description: "Kategori dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/categories/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Categories"], summary: "Detail kategori", operationId: "getCategory", responses: { 200: { description: "Detail kategori", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Categories"], summary: "Perbarui kategori", operationId: "updateCategory", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateCategoryRequest" } } } }, responses: { 200: { description: "Kategori diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Categories"], summary: "Hapus kategori", operationId: "deleteCategory", responses: { 204: { description: "Kategori dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menus": {
        get: { tags: ["Menus"], summary: "Daftar menu", operationId: "listMenus", responses: { 200: { description: "Daftar menu", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Menu" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["Menus"], summary: "Buat menu", operationId: "createMenu", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateMenuRequest" } } } }, responses: { 201: { description: "Menu dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Menu" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menus/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Menus"], summary: "Detail menu", operationId: "getMenu", responses: { 200: { description: "Detail menu", content: { "application/json": { schema: { $ref: "#/components/schemas/Menu" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Menus"], summary: "Perbarui menu", operationId: "updateMenu", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateMenuRequest" } } } }, responses: { 200: { description: "Menu diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Menu" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Menus"], summary: "Hapus menu", operationId: "deleteMenu", responses: { 204: { description: "Menu dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menu-prices": {
        get: { tags: ["MenuPrices"], summary: "Daftar harga menu", operationId: "listMenuPrices", responses: { 200: { description: "Daftar harga", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/MenuPrice" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["MenuPrices"], summary: "Buat harga menu", operationId: "createMenuPrice", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateMenuPriceRequest" } } } }, responses: { 201: { description: "Harga dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuPrice" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menu-prices/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["MenuPrices"], summary: "Detail harga menu", operationId: "getMenuPrice", responses: { 200: { description: "Detail harga", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuPrice" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["MenuPrices"], summary: "Perbarui harga menu", operationId: "updateMenuPrice", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateMenuPriceRequest" } } } }, responses: { 200: { description: "Harga diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuPrice" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["MenuPrices"], summary: "Hapus harga menu", operationId: "deleteMenuPrice", responses: { 204: { description: "Harga dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menu-variants": {
        get: { tags: ["MenuVariants"], summary: "Daftar varian menu", operationId: "listMenuVariants", responses: { 200: { description: "Daftar varian", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/MenuVariant" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["MenuVariants"], summary: "Buat varian menu", operationId: "createMenuVariant", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateMenuVariantRequest" } } } }, responses: { 201: { description: "Varian dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuVariant" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menu-variants/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["MenuVariants"], summary: "Detail varian", operationId: "getMenuVariant", responses: { 200: { description: "Detail varian", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuVariant" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["MenuVariants"], summary: "Perbarui varian", operationId: "updateMenuVariant", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateMenuVariantRequest" } } } }, responses: { 200: { description: "Varian diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuVariant" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["MenuVariants"], summary: "Hapus varian", operationId: "deleteMenuVariant", responses: { 204: { description: "Varian dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menu-variant-items": {
        get: { tags: ["MenuVariantItems"], summary: "Daftar item varian", operationId: "listMenuVariantItems", responses: { 200: { description: "Daftar item varian", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/MenuVariantItem" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["MenuVariantItems"], summary: "Buat item varian", operationId: "createMenuVariantItem", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateMenuVariantItemRequest" } } } }, responses: { 201: { description: "Item varian dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuVariantItem" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/menu-variant-items/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["MenuVariantItems"], summary: "Detail item varian", operationId: "getMenuVariantItem", responses: { 200: { description: "Detail item", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuVariantItem" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["MenuVariantItems"], summary: "Perbarui item varian", operationId: "updateMenuVariantItem", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateMenuVariantItemRequest" } } } }, responses: { 200: { description: "Item varian diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/MenuVariantItem" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["MenuVariantItems"], summary: "Hapus item varian", operationId: "deleteMenuVariantItem", responses: { 204: { description: "Item varian dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/recipes": {
        get: { tags: ["Recipes"], summary: "Daftar resep", operationId: "listRecipes", responses: { 200: { description: "Daftar resep", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Recipe" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["Recipes"], summary: "Buat resep", operationId: "createRecipe", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateRecipeRequest" } } } }, responses: { 201: { description: "Resep dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Recipe" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/recipes/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Recipes"], summary: "Detail resep", operationId: "getRecipe", responses: { 200: { description: "Detail resep", content: { "application/json": { schema: { $ref: "#/components/schemas/Recipe" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Recipes"], summary: "Perbarui resep", operationId: "updateRecipe", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateRecipeRequest" } } } }, responses: { 200: { description: "Resep diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Recipe" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Recipes"], summary: "Hapus resep", operationId: "deleteRecipe", responses: { 204: { description: "Resep dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/payment-methods": {
        get: { tags: ["PaymentMethods"], summary: "Daftar metode pembayaran", operationId: "listPaymentMethods", responses: { 200: { description: "Daftar metode", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/PaymentMethod" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["PaymentMethods"], summary: "Buat metode pembayaran", operationId: "createPaymentMethod", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePaymentMethodRequest" } } } }, responses: { 201: { description: "Metode dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentMethod" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/payment-methods/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["PaymentMethods"], summary: "Detail metode pembayaran", operationId: "getPaymentMethod", responses: { 200: { description: "Detail metode", content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentMethod" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["PaymentMethods"], summary: "Perbarui metode pembayaran", operationId: "updatePaymentMethod", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdatePaymentMethodRequest" } } } }, responses: { 200: { description: "Metode diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentMethod" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["PaymentMethods"], summary: "Hapus metode pembayaran", operationId: "deletePaymentMethod", responses: { 204: { description: "Metode dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/delivery-integrations": {
        get: { tags: ["DeliveryIntegrations"], summary: "Daftar integrasi delivery", operationId: "listDeliveryIntegrations", responses: { 200: { description: "Daftar integrasi", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/DeliveryIntegration" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["DeliveryIntegrations"], summary: "Buat integrasi delivery", operationId: "createDeliveryIntegration", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateDeliveryIntegrationRequest" } } } }, responses: { 201: { description: "Integrasi dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/DeliveryIntegration" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/delivery-integrations/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["DeliveryIntegrations"], summary: "Detail integrasi", operationId: "getDeliveryIntegration", responses: { 200: { description: "Detail integrasi", content: { "application/json": { schema: { $ref: "#/components/schemas/DeliveryIntegration" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["DeliveryIntegrations"], summary: "Perbarui integrasi", operationId: "updateDeliveryIntegration", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateDeliveryIntegrationRequest" } } } }, responses: { 200: { description: "Integrasi diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/DeliveryIntegration" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["DeliveryIntegrations"], summary: "Hapus integrasi", operationId: "deleteDeliveryIntegration", responses: { 204: { description: "Integrasi dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/report-files": {
        get: { tags: ["ReportFiles"], summary: "Daftar report files", operationId: "listReportFiles", responses: { 200: { description: "Daftar report files", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/ReportFile" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["ReportFiles"], summary: "Buat record report file", operationId: "createReportFile", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateReportFileRequest" } } } }, responses: { 201: { description: "Record dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/ReportFile" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/report-files/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["ReportFiles"], summary: "Detail report file", operationId: "getReportFile", responses: { 200: { description: "Detail report file", content: { "application/json": { schema: { $ref: "#/components/schemas/ReportFile" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["ReportFiles"], summary: "Perbarui report file", operationId: "updateReportFile", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateReportFileRequest" } } } }, responses: { 200: { description: "Record diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/ReportFile" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["ReportFiles"], summary: "Hapus report file", operationId: "deleteReportFile", responses: { 204: { description: "Record dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/activity-logs": {
        get: { tags: ["ActivityLogs"], summary: "Daftar activity logs", operationId: "listActivityLogs", responses: { 200: { description: "Daftar logs", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/ActivityLog" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["ActivityLogs"], summary: "Catat activity log", operationId: "createActivityLog", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateActivityLogRequest" } } } }, responses: { 201: { description: "Log dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/ActivityLog" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/activity-logs/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["ActivityLogs"], summary: "Detail activity log", operationId: "getActivityLog", responses: { 200: { description: "Detail log", content: { "application/json": { schema: { $ref: "#/components/schemas/ActivityLog" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["ActivityLogs"], summary: "Hapus activity log", operationId: "deleteActivityLog", responses: { 204: { description: "Log dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/system-logs": {
        get: { tags: ["SystemLogs"], summary: "Daftar system logs", operationId: "listSystemLogs", responses: { 200: { description: "Daftar logs", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/SystemLog" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["SystemLogs"], summary: "Catat system log", operationId: "createSystemLog", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateSystemLogRequest" } } } }, responses: { 201: { description: "Log dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/SystemLog" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/system-logs/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["SystemLogs"], summary: "Detail system log", operationId: "getSystemLog", responses: { 200: { description: "Detail log", content: { "application/json": { schema: { $ref: "#/components/schemas/SystemLog" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["SystemLogs"], summary: "Hapus system log", operationId: "deleteSystemLog", responses: { 204: { description: "Log dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/packages/{id}": {
        parameters: [ { name: "id", in: "path", required: true, description: "ID paket", schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Packages"], summary: "Ambil detail paket", operationId: "getPackage", responses: { 200: { description: "Detail paket", content: { "application/json": { schema: { $ref: "#/components/schemas/Package" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Packages"], summary: "Perbarui paket", operationId: "updatePackage", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdatePackageRequest" } } } }, responses: { 200: { description: "Paket diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Package" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Packages"], summary: "Hapus paket", operationId: "deletePackage", responses: { 204: { description: "Paket dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/ingredient-packages": {
        get: {
          tags: ["IngredientPackages"],
          summary: "Daftar relasi bahan-kemasan",
          operationId: "listIngredientPackages",
          responses: {
            200: {
              description: "Daftar relasi berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/IngredientPackage" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["IngredientPackages"],
          summary: "Buat relasi bahan-kemasan",
          operationId: "createIngredientPackage",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateIngredientPackageRequest" } } } },
          responses: {
            201: { description: "Relasi dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/IngredientPackage" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/ingredient-packages/{id}": {
        parameters: [ { name: "id", in: "path", required: true, description: "ID relasi", schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["IngredientPackages"], summary: "Detail relasi", operationId: "getIngredientPackage", responses: { 200: { description: "Detail relasi", content: { "application/json": { schema: { $ref: "#/components/schemas/IngredientPackage" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["IngredientPackages"], summary: "Perbarui relasi", operationId: "updateIngredientPackage", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateIngredientPackageRequest" } } } }, responses: { 200: { description: "Relasi diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/IngredientPackage" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["IngredientPackages"], summary: "Hapus relasi", operationId: "deleteIngredientPackage", responses: { 204: { description: "Relasi dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/suppliers": {
        get: {
          tags: ["Suppliers"],
          summary: "Daftar semua pemasok",
          operationId: "listSuppliers",
          responses: {
            200: {
              description: "Daftar pemasok berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Supplier" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Suppliers"],
          summary: "Buat pemasok baru",
          operationId: "createSupplier",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateSupplierRequest" } } } },
          responses: {
            201: { description: "Pemasok dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Supplier" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/suppliers/{id}": {
        parameters: [ { name: "id", in: "path", required: true, description: "ID pemasok", schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Suppliers"], summary: "Detail pemasok", operationId: "getSupplier", responses: { 200: { description: "Detail pemasok", content: { "application/json": { schema: { $ref: "#/components/schemas/Supplier" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Suppliers"], summary: "Perbarui pemasok", operationId: "updateSupplier", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateSupplierRequest" } } } }, responses: { 200: { description: "Pemasok diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Supplier" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Suppliers"], summary: "Hapus pemasok", operationId: "deleteSupplier", responses: { 204: { description: "Pemasok dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/supplier-products": {
        get: {
          tags: ["SupplierProducts"],
          summary: "Daftar semua produk pemasok",
          operationId: "listSupplierProducts",
          responses: {
            200: {
              description: "Daftar produk pemasok berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/SupplierProduct" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["SupplierProducts"],
          summary: "Buat produk pemasok",
          operationId: "createSupplierProduct",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateSupplierProductRequest" } } } },
          responses: {
            201: { description: "Produk pemasok dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/SupplierProduct" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/supplier-products/{id}": {
        parameters: [ { name: "id", in: "path", required: true, description: "ID produk pemasok", schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["SupplierProducts"], summary: "Detail produk pemasok", operationId: "getSupplierProduct", responses: { 200: { description: "Detail produk pemasok", content: { "application/json": { schema: { $ref: "#/components/schemas/SupplierProduct" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["SupplierProducts"], summary: "Perbarui produk pemasok", operationId: "updateSupplierProduct", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateSupplierProductRequest" } } } }, responses: { 200: { description: "Produk pemasok diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/SupplierProduct" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["SupplierProducts"], summary: "Hapus produk pemasok", operationId: "deleteSupplierProduct", responses: { 204: { description: "Produk pemasok dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/place-stocks": {
        get: { tags: ["PlaceStocks"], summary: "Daftar place stocks", operationId: "listPlaceStocks", responses: { 200: { description: "Daftar place stocks", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/PlaceStock" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["PlaceStocks"], summary: "Buat place stock", operationId: "createPlaceStock", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePlaceStockRequest" } } } }, responses: { 201: { description: "Place stock dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/PlaceStock" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/place-stocks/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["PlaceStocks"], summary: "Detail place stock", operationId: "getPlaceStock", responses: { 200: { description: "Detail place stock", content: { "application/json": { schema: { $ref: "#/components/schemas/PlaceStock" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["PlaceStocks"], summary: "Perbarui place stock", operationId: "updatePlaceStock", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdatePlaceStockRequest" } } } }, responses: { 200: { description: "Place stock diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/PlaceStock" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["PlaceStocks"], summary: "Hapus place stock", operationId: "deletePlaceStock", responses: { 204: { description: "Place stock dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/inventory-stock-daily": {
        get: { tags: ["InventoryStockDaily"], summary: "Daftar stok harian", operationId: "listInventoryStockDaily", responses: { 200: { description: "Daftar stok harian", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/InventoryStockDaily" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["InventoryStockDaily"], summary: "Buat stok harian", operationId: "createInventoryStockDaily", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateInventoryStockDailyRequest" } } } }, responses: { 201: { description: "Stok harian dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/InventoryStockDaily" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/inventory-stock-daily/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["InventoryStockDaily"], summary: "Detail stok harian", operationId: "getInventoryStockDaily", responses: { 200: { description: "Detail stok harian", content: { "application/json": { schema: { $ref: "#/components/schemas/InventoryStockDaily" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["InventoryStockDaily"], summary: "Perbarui stok harian", operationId: "updateInventoryStockDaily", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateInventoryStockDailyRequest" } } } }, responses: { 200: { description: "Stok harian diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/InventoryStockDaily" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["InventoryStockDaily"], summary: "Hapus stok harian", operationId: "deleteInventoryStockDaily", responses: { 204: { description: "Stok harian dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/stock-transfers": {
        get: { tags: ["StockTransfers"], summary: "Daftar transfer stok", operationId: "listStockTransfers", responses: { 200: { description: "Daftar transfer stok", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/StockTransfer" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["StockTransfers"], summary: "Buat transfer stok", operationId: "createStockTransfer", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateStockTransferRequest" } } } }, responses: { 201: { description: "Transfer dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/StockTransfer" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/stock-transfers/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["StockTransfers"], summary: "Detail transfer stok", operationId: "getStockTransfer", responses: { 200: { description: "Detail transfer", content: { "application/json": { schema: { $ref: "#/components/schemas/StockTransfer" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["StockTransfers"], summary: "Hapus transfer stok", operationId: "deleteStockTransfer", responses: { 204: { description: "Transfer dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/wastes": {
        get: { tags: ["Wastes"], summary: "Daftar waste", operationId: "listWastes", responses: { 200: { description: "Daftar waste", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Waste" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["Wastes"], summary: "Buat waste", operationId: "createWaste", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateWasteRequest" } } } }, responses: { 201: { description: "Waste dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Waste" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/wastes/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Wastes"], summary: "Detail waste", operationId: "getWaste", responses: { 200: { description: "Detail waste", content: { "application/json": { schema: { $ref: "#/components/schemas/Waste" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Wastes"], summary: "Perbarui waste", operationId: "updateWaste", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateWasteRequest" } } } }, responses: { 200: { description: "Waste diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Waste" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Wastes"], summary: "Hapus waste", operationId: "deleteWaste", responses: { 204: { description: "Waste dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/cashier-shifts": {
        get: { tags: ["CashierShifts"], summary: "Daftar shift kasir", operationId: "listCashierShifts", responses: { 200: { description: "Daftar shift kasir", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CashierShift" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["CashierShifts"], summary: "Buka shift kasir", operationId: "createCashierShift", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateCashierShiftRequest" } } } }, responses: { 201: { description: "Shift dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/CashierShift" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/cashier-shifts/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["CashierShifts"], summary: "Detail shift kasir", operationId: "getCashierShift", responses: { 200: { description: "Detail shift", content: { "application/json": { schema: { $ref: "#/components/schemas/CashierShift" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["CashierShifts"], summary: "Update shift kasir", operationId: "updateCashierShift", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateCashierShiftRequest" } } } }, responses: { 200: { description: "Shift diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/CashierShift" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["CashierShifts"], summary: "Hapus shift kasir", operationId: "deleteCashierShift", responses: { 204: { description: "Shift dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/promotions": {
        get: { tags: ["Promotions"], summary: "Daftar promosi", operationId: "listPromotions", responses: { 200: { description: "Daftar promosi", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Promotion" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["Promotions"], summary: "Buat promosi", operationId: "createPromotion", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePromotionRequest" } } } }, responses: { 201: { description: "Promosi dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Promotion" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/promotions/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Promotions"], summary: "Detail promosi", operationId: "getPromotion", responses: { 200: { description: "Detail promosi", content: { "application/json": { schema: { $ref: "#/components/schemas/Promotion" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Promotions"], summary: "Perbarui promosi", operationId: "updatePromotion", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdatePromotionRequest" } } } }, responses: { 200: { description: "Promosi diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Promotion" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Promotions"], summary: "Hapus promosi", operationId: "deletePromotion", responses: { 204: { description: "Promosi dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/promotion-rules": {
        get: { tags: ["PromotionRules"], summary: "Daftar aturan promosi", operationId: "listPromotionRules", responses: { 200: { description: "Daftar aturan promosi", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/PromotionRule" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["PromotionRules"], summary: "Buat aturan promosi", operationId: "createPromotionRule", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePromotionRuleRequest" } } } }, responses: { 201: { description: "Aturan dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/PromotionRule" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/promotion-rules/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["PromotionRules"], summary: "Detail aturan promosi", operationId: "getPromotionRule", responses: { 200: { description: "Detail aturan promosi", content: { "application/json": { schema: { $ref: "#/components/schemas/PromotionRule" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["PromotionRules"], summary: "Hapus aturan promosi", operationId: "deletePromotionRule", responses: { 204: { description: "Aturan dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/transactions": {
        get: { tags: ["Transactions"], summary: "Daftar transaksi", operationId: "listTransactions", responses: { 200: { description: "Daftar transaksi", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Transaction" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["Transactions"], summary: "Buat transaksi", operationId: "createTransaction", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateTransactionRequest" } } } }, responses: { 201: { description: "Transaksi dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Transaction" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/transactions/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Transactions"], summary: "Detail transaksi", operationId: "getTransaction", responses: { 200: { description: "Detail transaksi", content: { "application/json": { schema: { $ref: "#/components/schemas/Transaction" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Transactions"], summary: "Perbarui transaksi", operationId: "updateTransaction", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateTransactionRequest" } } } }, responses: { 200: { description: "Transaksi diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Transaction" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Transactions"], summary: "Hapus transaksi", operationId: "deleteTransaction", responses: { 204: { description: "Transaksi dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/transaction-items": {
        get: { tags: ["TransactionItems"], summary: "Daftar item transaksi", operationId: "listTransactionItems", responses: { 200: { description: "Daftar item transaksi", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/TransactionItem" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["TransactionItems"], summary: "Buat item transaksi", operationId: "createTransactionItem", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateTransactionItemRequest" } } } }, responses: { 201: { description: "Item dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionItem" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/transaction-items/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["TransactionItems"], summary: "Detail item transaksi", operationId: "getTransactionItem", responses: { 200: { description: "Detail item", content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionItem" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["TransactionItems"], summary: "Perbarui item transaksi", operationId: "updateTransactionItem", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateTransactionItemRequest" } } } }, responses: { 200: { description: "Item diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionItem" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["TransactionItems"], summary: "Hapus item transaksi", operationId: "deleteTransactionItem", responses: { 204: { description: "Item dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/transaction-item-variants": {
        get: { tags: ["TransactionItemVariants"], summary: "Daftar varian item", operationId: "listTransactionItemVariants", responses: { 200: { description: "Daftar varian", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/TransactionItemVariant" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["TransactionItemVariants"], summary: "Buat varian item", operationId: "createTransactionItemVariant", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateTransactionItemVariantRequest" } } } }, responses: { 201: { description: "Varian dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionItemVariant" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/transaction-item-variants/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["TransactionItemVariants"], summary: "Detail varian item", operationId: "getTransactionItemVariant", responses: { 200: { description: "Detail varian", content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionItemVariant" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["TransactionItemVariants"], summary: "Hapus varian item", operationId: "deleteTransactionItemVariant", responses: { 204: { description: "Varian dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/kitchen-orders": {
        get: { tags: ["KitchenOrders"], summary: "Daftar kitchen order", operationId: "listKitchenOrders", responses: { 200: { description: "Daftar KO", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/KitchenOrder" } } } } }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        post: { tags: ["KitchenOrders"], summary: "Buat kitchen order", operationId: "createKitchenOrder", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateKitchenOrderRequest" } } } }, responses: { 201: { description: "Kitchen order dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/KitchenOrder" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/kitchen-orders/{id}": {
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["KitchenOrders"], summary: "Detail kitchen order", operationId: "getKitchenOrder", responses: { 200: { description: "Detail KO", content: { "application/json": { schema: { $ref: "#/components/schemas/KitchenOrder" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["KitchenOrders"], summary: "Perbarui kitchen order", operationId: "updateKitchenOrder", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateKitchenOrderRequest" } } } }, responses: { 200: { description: "KO diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/KitchenOrder" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["KitchenOrders"], summary: "Hapus kitchen order", operationId: "deleteKitchenOrder", responses: { 204: { description: "KO dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
      "/api/permissions": {
        get: {
          tags: ["Permissions"],
          summary: "Daftar semua permission",
          operationId: "listPermissions",
          responses: {
            200: {
              description: "Daftar permission berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Permission" },
                  },
                },
              },
            },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
        post: {
          tags: ["Permissions"],
          summary: "Buat permission",
          operationId: "createPermission",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePermissionRequest" } } } },
          responses: {
            201: { description: "Permission dibuat", content: { "application/json": { schema: { $ref: "#/components/schemas/Permission" } } } },
            400: { $ref: "#/components/responses/BadRequest" },
            500: { $ref: "#/components/responses/InternalServerError" },
          },
        },
      },
      "/api/permissions/{id}": {
        parameters: [ { name: "id", in: "path", required: true, description: "ID permission", schema: { type: "integer", minimum: 1 } } ],
        get: { tags: ["Permissions"], summary: "Detail permission", operationId: "getPermission", responses: { 200: { description: "Detail permission", content: { "application/json": { schema: { $ref: "#/components/schemas/Permission" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        put: { tags: ["Permissions"], summary: "Perbarui permission", operationId: "updatePermission", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdatePermissionRequest" } } } }, responses: { 200: { description: "Permission diperbarui", content: { "application/json": { schema: { $ref: "#/components/schemas/Permission" } } } }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
        delete: { tags: ["Permissions"], summary: "Hapus permission", operationId: "deletePermission", responses: { 204: { description: "Permission dihapus" }, 400: { $ref: "#/components/responses/BadRequest" }, 404: { $ref: "#/components/responses/NotFound" }, 500: { $ref: "#/components/responses/InternalServerError" } } },
      },
    },
    components: {
      schemas: {
        PlaceStock: { type: "object", required: ["id","placeId","ingredientId","qty","unitId"], properties: { id: { type: "integer", example: 1 }, placeId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, qty: { type: "number", example: 100 }, unitId: { type: "integer", example: 1 } } },
        CreatePlaceStockRequest: { type: "object", required: ["placeId","ingredientId","qty","unitId"], properties: { placeId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, qty: { type: "number", example: 100 }, unitId: { type: "integer", example: 1 } } },
        UpdatePlaceStockRequest: { type: "object", minProperties: 1, properties: { placeId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, qty: { type: "number", example: 120 }, unitId: { type: "integer", example: 1 } } },
        InventoryStockDaily: { type: "object", required: ["id","placeId","ingredientId","date","openingQty","closingQty"], properties: { id: { type: "integer", example: 1 }, placeId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, date: { type: "string", format: "date", example: "2025-01-01" }, openingQty: { type: "number", example: 100 }, closingQty: { type: "number", example: 90 }, diffQty: { type: "number", nullable: true, example: -10 } } },
        CreateInventoryStockDailyRequest: { type: "object", required: ["placeId","ingredientId","date","openingQty","closingQty"], properties: { placeId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, date: { type: "string", format: "date", example: "2025-01-01" }, openingQty: { type: "number", example: 100 }, closingQty: { type: "number", example: 90 }, diffQty: { type: "number", nullable: true, example: -10 } } },
        UpdateInventoryStockDailyRequest: { type: "object", minProperties: 1, properties: { placeId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, date: { type: "string", format: "date", example: "2025-01-02" }, openingQty: { type: "number", example: 110 }, closingQty: { type: "number", example: 95 }, diffQty: { type: "number", nullable: true, example: -15 } } },
        StockTransfer: { type: "object", required: ["id","ingredientId","qty"], properties: { id: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 2 }, fromPlaceId: { type: "integer", nullable: true, example: 1 }, toPlaceId: { type: "integer", nullable: true, example: 2 }, qty: { type: "number", example: 5 }, createdAt: { type: "string", format: "date-time" } } },
        CreateStockTransferRequest: { type: "object", required: ["ingredientId","qty"], properties: { ingredientId: { type: "integer", example: 2 }, fromPlaceId: { type: "integer", nullable: true, example: 1 }, toPlaceId: { type: "integer", nullable: true, example: 2 }, qty: { type: "number", example: 5 } } },
        Waste: { type: "object", required: ["id","ingredientId","qty"], properties: { id: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 3 }, placeId: { type: "integer", nullable: true, example: 1 }, qty: { type: "number", example: 2 }, reason: { type: "string", nullable: true, example: "Expired" }, createdAt: { type: "string", format: "date-time" } } },
        CreateWasteRequest: { type: "object", required: ["ingredientId","qty"], properties: { ingredientId: { type: "integer", example: 3 }, placeId: { type: "integer", nullable: true, example: 1 }, qty: { type: "number", example: 2 }, reason: { type: "string", nullable: true, example: "Expired" } } },
        UpdateWasteRequest: { type: "object", minProperties: 1, properties: { ingredientId: { type: "integer", example: 3 }, placeId: { type: "integer", nullable: true, example: 1 }, qty: { type: "number", example: 1 }, reason: { type: "string", nullable: true, example: "Broken" } } },
        CashierShift: { type: "object", required: ["id","placeId","cashierId","openedAt","status"], properties: { id: { type: "integer", example: 1 }, placeId: { type: "integer", example: 1 }, cashierId: { type: "integer", example: 2 }, openedAt: { type: "string", format: "date-time" }, closedAt: { type: "string", format: "date-time", nullable: true }, openingBalance: { type: "number", example: 0 }, closingBalance: { type: "number", nullable: true }, systemBalance: { type: "number", nullable: true }, ipAddress: { type: "string", example: "127.0.0.1" }, status: { type: "string", example: "open" } } },
        CreateCashierShiftRequest: { type: "object", required: ["placeId","cashierId","ipAddress"], properties: { placeId: { type: "integer", example: 1 }, cashierId: { type: "integer", example: 2 }, ipAddress: { type: "string", example: "127.0.0.1" }, openingBalance: { type: "number", example: 0 }, status: { type: "string", example: "open" } } },
        UpdateCashierShiftRequest: { type: "object", minProperties: 1, properties: { closedAt: { type: "string", format: "date-time", nullable: true }, closingBalance: { type: "number", nullable: true }, systemBalance: { type: "number", nullable: true }, status: { type: "string", example: "closed" } } },
        Promotion: { type: "object", required: ["id","name"], properties: { id: { type: "integer", example: 1 }, placeId: { type: "integer", nullable: true, example: 1 }, name: { type: "string", example: "Happy Hour" }, startAt: { type: "string", format: "date-time", nullable: true }, endAt: { type: "string", format: "date-time", nullable: true } } },
        CreatePromotionRequest: { type: "object", required: ["name"], properties: { placeId: { type: "integer", nullable: true, example: 1 }, name: { type: "string", example: "Happy Hour" }, startAt: { type: "string", format: "date-time", nullable: true }, endAt: { type: "string", format: "date-time", nullable: true } } },
        UpdatePromotionRequest: { type: "object", minProperties: 1, properties: { placeId: { type: "integer", nullable: true, example: 1 }, name: { type: "string", example: "Weekend Deal" }, startAt: { type: "string", format: "date-time", nullable: true }, endAt: { type: "string", format: "date-time", nullable: true } } },
        PromotionRule: { type: "object", required: ["id","promotionId"], properties: { id: { type: "integer", example: 1 }, promotionId: { type: "integer", example: 1 }, ruleType: { type: "string", nullable: true, example: "percentage_discount" }, value: { type: "string", nullable: true, example: "10" } } },
        CreatePromotionRuleRequest: { type: "object", required: ["promotionId"], properties: { promotionId: { type: "integer", example: 1 }, ruleType: { type: "string", nullable: true, example: "percentage_discount" }, value: { type: "string", nullable: true, example: "10" } } },
        UpdatePromotionRuleRequest: { type: "object", minProperties: 1, properties: { promotionId: { type: "integer", example: 1 }, ruleType: { type: "string", nullable: true, example: "amount_discount" }, value: { type: "string", nullable: true, example: "5000" } } },
        Transaction: { type: "object", required: ["id", "cashierId", "total"], properties: { id: { type: "integer", example: 1 }, cashierId: { type: "integer", example: 2 }, placeId: { type: "integer", nullable: true, example: 1 }, tableId: { type: "integer", nullable: true, example: 3 }, orderType: { type: "string", nullable: true, example: "dine_in" }, total: { type: "number", example: 50000 }, tax: { type: "number", nullable: true, example: 5000 }, discount: { type: "number", nullable: true, example: 0 }, paymentMethodId: { type: "integer", nullable: true, example: 1 }, createdAt: { type: "string", format: "date-time" } } },
        CreateTransactionRequest: { type: "object", required: ["cashierId", "total"], properties: { cashierId: { type: "integer", example: 2 }, placeId: { type: "integer", nullable: true, example: 1 }, tableId: { type: "integer", nullable: true, example: 3 }, orderType: { type: "string", nullable: true, example: "dine_in" }, total: { type: "number", example: 50000 }, tax: { type: "number", nullable: true, example: 5000 }, discount: { type: "number", nullable: true, example: 0 }, paymentMethodId: { type: "integer", nullable: true, example: 1 } } },
        UpdateTransactionRequest: { type: "object", minProperties: 1, properties: { cashierId: { type: "integer", example: 2 }, placeId: { type: "integer", nullable: true, example: 1 }, tableId: { type: "integer", nullable: true, example: 4 }, orderType: { type: "string", nullable: true, example: "takeaway" }, total: { type: "number", example: 75000 }, tax: { type: "number", nullable: true, example: 7500 }, discount: { type: "number", nullable: true, example: 5000 }, paymentMethodId: { type: "integer", nullable: true, example: 2 } } },
        TransactionItem: { type: "object", required: ["id","transactionId","menuId","qty","price"], properties: { id: { type: "integer", example: 10 }, transactionId: { type: "integer", example: 1 }, menuId: { type: "integer", example: 5 }, qty: { type: "integer", example: 2 }, price: { type: "number", example: 25000 }, discount: { type: "number", nullable: true, example: 0 } } },
        CreateTransactionItemRequest: { type: "object", required: ["transactionId","menuId","qty","price"], properties: { transactionId: { type: "integer", example: 1 }, menuId: { type: "integer", example: 5 }, qty: { type: "integer", example: 2 }, price: { type: "number", example: 25000 }, discount: { type: "number", nullable: true, example: 0 } } },
        UpdateTransactionItemRequest: { type: "object", minProperties: 1, properties: { transactionId: { type: "integer", example: 1 }, menuId: { type: "integer", example: 5 }, qty: { type: "integer", example: 3 }, price: { type: "number", example: 30000 }, discount: { type: "number", nullable: true, example: 1000 } } },
        TransactionItemVariant: { type: "object", required: ["id","transactionItemId","menuVariantId"], properties: { id: { type: "integer", example: 100 }, transactionItemId: { type: "integer", example: 10 }, menuVariantId: { type: "integer", example: 7 }, extraPrice: { type: "number", example: 3000 } } },
        CreateTransactionItemVariantRequest: { type: "object", required: ["transactionItemId","menuVariantId"], properties: { transactionItemId: { type: "integer", example: 10 }, menuVariantId: { type: "integer", example: 7 }, extraPrice: { type: "number", example: 3000 } } },
        KitchenOrder: { type: "object", required: ["id","transactionItemId","status"], properties: { id: { type: "integer", example: 1 }, transactionItemId: { type: "integer", example: 10 }, status: { type: "string", example: "waiting" }, startedAt: { type: "string", format: "date-time", nullable: true }, finishedAt: { type: "string", format: "date-time", nullable: true }, note: { type: "string", nullable: true } } },
        CreateKitchenOrderRequest: { type: "object", required: ["transactionItemId"], properties: { transactionItemId: { type: "integer", example: 10 }, status: { type: "string", nullable: true, example: "waiting" }, startedAt: { type: "string", format: "date-time", nullable: true }, finishedAt: { type: "string", format: "date-time", nullable: true }, note: { type: "string", nullable: true } } },
        UpdateKitchenOrderRequest: { type: "object", minProperties: 1, properties: { transactionItemId: { type: "integer", example: 10 }, status: { type: "string", nullable: true, example: "processing" }, startedAt: { type: "string", format: "date-time", nullable: true }, finishedAt: { type: "string", format: "date-time", nullable: true }, note: { type: "string", nullable: true } } },
        ActivityLog: { type: "object", required: ["id","action","createdAt"], properties: { id: { type: "integer", example: 1 }, userId: { type: "integer", nullable: true }, action: { type: "string", example: "create_order" }, entityType: { type: "string", nullable: true, example: "order" }, entityId: { type: "integer", nullable: true, example: 101 }, contextJson: { type: "object", nullable: true }, createdAt: { type: "string", format: "date-time" } } },
        CreateActivityLogRequest: { type: "object", required: ["action"], properties: { userId: { type: "integer", nullable: true }, action: { type: "string" }, entityType: { type: "string", nullable: true }, entityId: { type: "integer", nullable: true }, contextJson: { type: "object", nullable: true } } },
        SystemLog: { type: "object", required: ["id","message","createdAt"], properties: { id: { type: "integer", example: 1 }, level: { type: "string", nullable: true, example: "error" }, message: { type: "string", example: "Unhandled exception" }, contextJson: { type: "object", nullable: true }, createdAt: { type: "string", format: "date-time" } } },
        CreateSystemLogRequest: { type: "object", required: ["message"], properties: { level: { type: "string", nullable: true }, message: { type: "string" }, contextJson: { type: "object", nullable: true } } },
        ReportFile: { type: "object", required: ["id","reportType","reportScope","fileName","filePath","createdAt"], properties: { id: { type: "integer", example: 1 }, reportType: { type: "string", example: "sales" }, reportScope: { type: "string", example: "daily" }, reportDate: { type: "string", format: "date-time", nullable: true }, placeId: { type: "integer", nullable: true }, fileName: { type: "string", example: "sales-2025-01-01.csv" }, filePath: { type: "string", example: "/reports/sales-2025-01-01.csv" }, createdAt: { type: "string", format: "date-time" } } },
        CreateReportFileRequest: { type: "object", required: ["reportType","reportScope","fileName","filePath"], properties: { reportType: { type: "string" }, reportScope: { type: "string" }, reportDate: { type: "string", format: "date-time", nullable: true }, placeId: { type: "integer", nullable: true }, fileName: { type: "string" }, filePath: { type: "string" } } },
        UpdateReportFileRequest: { type: "object", minProperties: 1, properties: { reportType: { type: "string" }, reportScope: { type: "string" }, reportDate: { type: "string", format: "date-time", nullable: true }, placeId: { type: "integer", nullable: true }, fileName: { type: "string" }, filePath: { type: "string" } } },
        DeliveryIntegration: { type: "object", required: ["id","placeId","platformName"], properties: { id: { type: "integer", example: 1 }, placeId: { type: "integer", example: 1 }, platformName: { type: "string", example: "GoFood" }, apiKey: { type: "string", nullable: true, example: "secret" }, settingsJson: { type: "object", nullable: true, example: { region: "ID" } } } },
        CreateDeliveryIntegrationRequest: { type: "object", required: ["placeId","platformName"], properties: { placeId: { type: "integer", example: 1 }, platformName: { type: "string", example: "GrabFood" }, apiKey: { type: "string", nullable: true }, settingsJson: { type: "object", nullable: true } } },
        UpdateDeliveryIntegrationRequest: { type: "object", minProperties: 1, properties: { placeId: { type: "integer", example: 1 }, platformName: { type: "string", example: "ShopeeFood" }, apiKey: { type: "string", nullable: true }, settingsJson: { type: "object", nullable: true } } },
        PaymentMethod: { type: "object", required: ["id","name","isActive"], properties: { id: { type: "integer", example: 1 }, name: { type: "string", example: "cash" }, description: { type: "string", nullable: true, example: "Tunai" }, isActive: { type: "boolean", example: true } } },
        CreatePaymentMethodRequest: { type: "object", required: ["name"], properties: { name: { type: "string", example: "cash" }, description: { type: "string", nullable: true, example: "Tunai" }, isActive: { type: "boolean", example: true } } },
        UpdatePaymentMethodRequest: { type: "object", minProperties: 1, properties: { name: { type: "string", example: "qris" }, description: { type: "string", nullable: true, example: "QRIS" }, isActive: { type: "boolean", example: true } } },
        MenuVariant: { type: "object", required: ["id","menuId","name"], properties: { id: { type: "integer", example: 1 }, menuId: { type: "integer", example: 1 }, name: { type: "string", example: "Size" } } },
        CreateMenuVariantRequest: { type: "object", required: ["menuId","name"], properties: { menuId: { type: "integer", example: 1 }, name: { type: "string", example: "Size" } } },
        UpdateMenuVariantRequest: { type: "object", minProperties: 1, properties: { menuId: { type: "integer", example: 1 }, name: { type: "string", example: "Tingkat Pedas" } } },
        MenuVariantItem: { type: "object", required: ["id","menuVariantId","name","additionalPrice"], properties: { id: { type: "integer", example: 1 }, menuVariantId: { type: "integer", example: 1 }, name: { type: "string", example: "Large" }, additionalPrice: { type: "number", example: 5000 } } },
        CreateMenuVariantItemRequest: { type: "object", required: ["menuVariantId","name"], properties: { menuVariantId: { type: "integer", example: 1 }, name: { type: "string", example: "Large" }, additionalPrice: { type: "number", example: 5000 } } },
        UpdateMenuVariantItemRequest: { type: "object", minProperties: 1, properties: { menuVariantId: { type: "integer", example: 1 }, name: { type: "string", example: "Small" }, additionalPrice: { type: "number", example: 0 } } },
        Recipe: { type: "object", required: ["id","menuId","ingredientId","qty"], properties: { id: { type: "integer", example: 1 }, menuId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 10 }, qty: { type: "number", example: 2 } } },
        CreateRecipeRequest: { type: "object", required: ["menuId","ingredientId","qty"], properties: { menuId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 10 }, qty: { type: "number", example: 2 } } },
        UpdateRecipeRequest: { type: "object", minProperties: 1, properties: { menuId: { type: "integer", example: 1 }, ingredientId: { type: "integer", example: 10 }, qty: { type: "number", example: 3 } } },
        Menu: {
          type: "object",
          required: ["id", "name", "isActive"],
          properties: {
            id: { type: "integer", example: 1 },
            placeId: { type: "integer", nullable: true, example: 1 },
            name: { type: "string", example: "Nasi Goreng" },
            categoryId: { type: "integer", nullable: true, example: 2 },
            description: { type: "string", nullable: true, example: "Menu favorit" },
            isActive: { type: "boolean", example: true },
          },
        },
        CreateMenuRequest: {
          type: "object",
          required: ["name"],
          properties: {
            placeId: { type: "integer", nullable: true, example: 1 },
            name: { type: "string", example: "Nasi Goreng" },
            categoryId: { type: "integer", nullable: true, example: 2 },
            description: { type: "string", nullable: true, example: "Menu favorit" },
            isActive: { type: "boolean", example: true },
          },
        },
        UpdateMenuRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            placeId: { type: "integer", nullable: true, example: 1 },
            name: { type: "string", example: "Nasi Goreng Spesial" },
            categoryId: { type: "integer", nullable: true, example: 2 },
            description: { type: "string", nullable: true, example: "Pedas" },
            isActive: { type: "boolean", example: true },
          },
        },
        MenuPrice: {
          type: "object",
          required: ["id", "menuId", "price", "effectiveDate"],
          properties: {
            id: { type: "integer", example: 1 },
            menuId: { type: "integer", example: 1 },
            price: { type: "number", example: 25000 },
            effectiveDate: { type: "string", format: "date", example: "2025-01-01" },
          },
        },
        CreateMenuPriceRequest: {
          type: "object",
          required: ["menuId", "price", "effectiveDate"],
          properties: {
            menuId: { type: "integer", example: 1 },
            price: { type: "number", example: 25000 },
            effectiveDate: { type: "string", format: "date", example: "2025-01-01" },
          },
        },
        UpdateMenuPriceRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            menuId: { type: "integer", example: 1 },
            price: { type: "number", example: 30000 },
            effectiveDate: { type: "string", format: "date", example: "2025-06-01" },
          },
        },
        Category: {
          type: "object",
          required: ["id", "name"],
          properties: { id: { type: "integer", example: 1 }, name: { type: "string", example: "beverages" } },
        },
        CreateCategoryRequest: {
          type: "object",
          required: ["name"],
          properties: { name: { type: "string", example: "beverages" } },
        },
        UpdateCategoryRequest: {
          type: "object",
          minProperties: 1,
          properties: { name: { type: "string", example: "food" } },
        },
        CreateUnitRequest: {
          type: "object",
          required: ["name", "abbreviation"],
          properties: {
            name: { type: "string", example: "gram", description: "Nama unit dalam huruf kecil" },
            abbreviation: { type: "string", example: "g" },
          },
        },
        UpdateUnitRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string", example: "kilogram" },
            abbreviation: { type: "string", example: "kg" },
          },
        },
        CreateTableRequest: {
          type: "object",
          required: ["placeId", "name"],
          properties: {
            placeId: { type: "integer", example: 1 },
            name: { type: "string", example: "T-01" },
            status: { type: "string", nullable: true, example: "available" },
          },
        },
        UpdateTableRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            placeId: { type: "integer", example: 2 },
            name: { type: "string", example: "T-02" },
            status: { type: "string", nullable: true, example: "occupied" },
          },
        },
        CreateIngredientRequest: {
          type: "object",
          required: ["name", "unitId"],
          properties: {
            name: { type: "string", example: "Gula" },
            unitId: { type: "integer", example: 1 },
          },
        },
        UpdateIngredientRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string", example: "Gula Pasir" },
            unitId: { type: "integer", example: 2 },
          },
        },
        CreatePackageRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "sachet", description: "Nama paket/kemasan dalam huruf kecil" },
            description: { type: "string", nullable: true, example: "Kemasan kecil 10g" },
          },
        },
        UpdatePackageRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string", example: "pack" },
            description: { type: "string", nullable: true, example: "Isi 1kg" },
          },
        },
        CreateIngredientPackageRequest: {
          type: "object",
          required: ["ingredientId", "packageId", "qty"],
          properties: {
            ingredientId: { type: "integer", example: 10 },
            packageId: { type: "integer", example: 3 },
            qty: { type: "number", example: 10 },
          },
        },
        UpdateIngredientPackageRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            ingredientId: { type: "integer", example: 10 },
            packageId: { type: "integer", example: 3 },
            qty: { type: "number", example: 12 },
          },
        },
        CreateSupplierRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "PT Sumber Rejeki" },
            contactName: { type: "string", nullable: true, example: "Budi" },
            phone: { type: "string", nullable: true, example: "+62-812-1111-2222" },
            email: { type: "string", nullable: true, example: "sales@supplier.co.id" },
            address: { type: "string", nullable: true, example: "Jl. Sudirman No. 10" },
          },
        },
        UpdateSupplierRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string", example: "PT Rejeki Abadi" },
            contactName: { type: "string", nullable: true, example: "Andi" },
            phone: { type: "string", nullable: true, example: "+62-811-0000-9999" },
            email: { type: "string", nullable: true, example: "contact@rejeki.co.id" },
            address: { type: "string", nullable: true, example: "Jl. Merdeka No. 1" },
          },
        },
        CreateSupplierProductRequest: {
          type: "object",
          required: ["supplierId", "ingredientId", "packageId", "qty", "price"],
          properties: {
            supplierId: { type: "integer", example: 4 },
            ingredientId: { type: "integer", example: 10 },
            packageId: { type: "integer", example: 3 },
            qty: { type: "number", example: 12 },
            price: { type: "number", example: 25000 },
            leadTime: { type: "integer", nullable: true, example: 3, description: "Hari" },
            isActive: { type: "boolean", example: true },
          },
        },
        UpdateSupplierProductRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            supplierId: { type: "integer", example: 4 },
            ingredientId: { type: "integer", example: 10 },
            packageId: { type: "integer", example: 3 },
            qty: { type: "number", example: 10 },
            price: { type: "number", example: 20000 },
            leadTime: { type: "integer", nullable: true, example: 5 },
            isActive: { type: "boolean", example: false },
          },
        },
        CreatePermissionRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "user.write", description: "Nama permission huruf kecil" },
            description: { type: "string", nullable: true, example: "Boleh membuat atau mengubah user" },
          },
        },
        UpdatePermissionRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string", example: "user.manage" },
            description: { type: "string", nullable: true, example: "Full akses user" },
          },
        },
        User: {
          type: "object",
          required: ["id", "name", "status", "authenticationMethod"],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              nullable: true,
              example: "john.doe@example.com",
            },
            status: {
              type: "string",
              example: "active",
            },
            authenticationMethod: {
              type: "string",
              description: "Metode autentikasi yang digunakan pengguna",
              enum: ["password", "pin"],
            },
            placeId: {
              type: "integer",
              nullable: true,
              example: 10,
              description: "ID tempat tempat pengguna ditugaskan",
            },
            role: {
              nullable: true,
              $ref: "#/components/schemas/Role",
            },
          },
        },
        Role: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: {
              type: "integer",
              example: 2,
            },
            name: {
              type: "string",
              example: "store_manager",
            },
            description: {
              type: "string",
              nullable: true,
              example: "Mengelola operasional harian outlet",
            },
            permissions: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["user.read", "user.write"],
            },
          },
        },
        Place: {
          type: "object",
          required: ["id", "name", "isActive"],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Outlet Utama",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Jl. Merdeka No. 1, Jakarta",
            },
            phone: {
              type: "string",
              nullable: true,
              example: "+62-812-3456-7890",
            },
            logoPath: {
              type: "string",
              nullable: true,
              example: "/uploads/logos/main.png",
            },
            type: {
              type: "string",
              nullable: true,
              example: "outlet",
              description: "Jenis tempat (outlet, warehouse, dsb)",
            },
            isActive: {
              type: "boolean",
              example: true,
            },
          },
        },
        CreateRoleRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "admin",
              description: "Nama role unik dan akan disimpan dalam huruf kecil",
            },
            description: {
              type: "string",
              nullable: true,
              example: "Mengawasi operasional harian",
            },
            permissions: {
              type: "array",
              nullable: true,
              items: {
                type: "string",
              },
              example: ["manage_orders", "view_reports"],
              description: "Daftar nama permission yang sudah terdaftar",
            },
          },
        },
        UpdateRoleRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "store_manager",
            },
            description: {
              type: "string",
              nullable: true,
              example: "Mengelola outlet dan laporan",
            },
            permissions: {
              type: "array",
              nullable: true,
              items: {
                type: "string",
              },
              example: ["manage_orders", "view_reports"],
            },
          },
        },
        CreatePlaceRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Outlet Baru",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Jl. Soekarno No. 12, Bandung",
            },
            phone: {
              type: "string",
              nullable: true,
              example: "+62-811-0000-1111",
            },
            logoPath: {
              type: "string",
              nullable: true,
              example: "/uploads/logos/outlet.png",
            },
            type: {
              type: "string",
              nullable: true,
              example: "warehouse",
            },
            isActive: {
              type: "boolean",
              default: true,
              description: "Status aktif tempat",
            },
          },
        },
        UpdatePlaceRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: {
              type: "string",
              example: "Outlet Cabang Selatan",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Jl. Pahlawan No. 8, Surabaya",
            },
            phone: {
              type: "string",
              nullable: true,
              example: "+62-813-2222-3333",
            },
            logoPath: {
              type: "string",
              nullable: true,
              example: "/uploads/logos/updated.png",
            },
            type: {
              type: "string",
              nullable: true,
              example: "cold_storage",
            },
            isActive: {
              type: "boolean",
              description: "Ubah status aktif tempat",
            },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["name", "roleName"],
          properties: {
            name: {
              type: "string",
              example: "Jane Doe",
            },
            roleName: {
              type: "string",
              example: "cashier",
              description:
                "Nama role yang terdaftar (brand_owner, location_owner, admin, store_manager, cashier, chef, purchaising, waiters)",
            },
            email: {
              type: "string",
              nullable: true,
              example: "jane.doe@example.com",
              description: "Wajib untuk role non-cashier",
            },
            password: {
              type: "string",
              nullable: true,
              example: "SuperSecret123",
              description: "Minimal 8 karakter, hanya untuk role non-cashier",
            },
            pin: {
              type: "string",
              nullable: true,
              example: "1234",
              description: "4-6 digit numerik, hanya untuk role cashier",
            },
            status: {
              type: "string",
              nullable: true,
              example: "active",
            },
            placeId: {
              type: "integer",
              nullable: true,
              example: 5,
            },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Jane Smith",
            },
            status: {
              type: "string",
              example: "inactive",
            },
            roleName: {
              type: "string",
              example: "store_manager",
            },
            email: {
              type: "string",
              nullable: true,
              example: "jane.smith@example.com",
            },
            password: {
              type: "string",
              nullable: true,
              example: "NewSecret123",
            },
            pin: {
              type: "string",
              nullable: true,
              example: "9876",
            },
            placeId: {
              type: "integer",
              nullable: true,
              example: 8,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string",
              example: "Validation error",
            },
            details: {
              nullable: true,
              description: "Detail tambahan terkait kesalahan (jika ada)",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              example: "alice@example.com",
              description: "Email akun yang digunakan untuk login",
            },
            password: {
              type: "string",
              example: "SuperSecret123",
              description: "Password atau PIN tergantung role pengguna",
            },
          },
        },
        LoginResponse: {
          type: "object",
          required: ["token", "tokenType", "user"],
          properties: {
            token: {
              type: "string",
              description: "JWT token yang harus digunakan pada Authorization header",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            tokenType: {
              type: "string",
              example: "Bearer",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        Unit: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Gram" },
            abbreviation: { type: "string", nullable: true, example: "g" },
          },
        },
        Table: {
          type: "object",
          required: ["id", "placeId", "name", "status"],
          properties: {
            id: { type: "integer", example: 5 },
            placeId: { type: "integer", example: 1 },
            name: { type: "string", example: "T-01" },
            status: { type: "string", example: "available" },
          },
        },
        Ingredient: {
          type: "object",
          required: ["id", "name", "unitId"],
          properties: {
            id: { type: "integer", example: 10 },
            name: { type: "string", example: "Gula" },
            unitId: { type: "integer", example: 1 },
          },
        },
        Package: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: { type: "integer", example: 3 },
            name: { type: "string", example: "Sachet" },
            description: { type: "string", nullable: true, example: "Kemasan kecil 10g" },
          },
        },
        IngredientPackage: {
          type: "object",
          required: ["id", "ingredientId", "packageId", "qty"],
          properties: {
            id: { type: "integer", example: 7 },
            ingredientId: { type: "integer", example: 10 },
            packageId: { type: "integer", example: 3 },
            qty: { type: "number", example: 10 },
          },
        },
        Supplier: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: { type: "integer", example: 4 },
            name: { type: "string", example: "PT Sumber Rejeki" },
            contactName: { type: "string", nullable: true, example: "Budi" },
            phone: { type: "string", nullable: true, example: "+62-812-1111-2222" },
            email: { type: "string", nullable: true, example: "sales@supplier.co.id" },
            address: { type: "string", nullable: true, example: "Jl. Sudirman No. 10" },
          },
        },
        SupplierProduct: {
          type: "object",
          required: ["id", "supplierId", "ingredientId", "packageId", "qty", "price"],
          properties: {
            id: { type: "integer", example: 12 },
            supplierId: { type: "integer", example: 4 },
            ingredientId: { type: "integer", example: 10 },
            packageId: { type: "integer", example: 3 },
            qty: { type: "number", example: 12 },
            price: { type: "number", example: 25000 },
            leadTime: { type: "integer", nullable: true, example: 3, description: "Hari" },
            isActive: { type: "boolean", example: true },
          },
        },
        Permission: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "user.read" },
            description: { type: "string", nullable: true, example: "Boleh melihat daftar user" },
          },
        },
      },
      responses: {
        BadRequest: {
          description: "Permintaan tidak valid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Unauthorized: {
          description: "Autentikasi gagal",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Forbidden: {
          description: "Akses ditolak",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        NotFound: {
          description: "Sumber daya tidak ditemukan",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        InternalServerError: {
          description: "Terjadi kesalahan pada server",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  };
}

export function createSwaggerHtml({ title = "POS Backend API Docs", specUrl = "/api/docs.json" } = {}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      body { margin: 0; background: #fafafa; }
      #swagger-ui { box-sizing: border-box; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        SwaggerUIBundle({
          url: '${specUrl}',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout',
        });
      };
    </script>
  </body>
</html>`;
}
