export function createOpenApiDocument({ serverUrl = 'http://localhost:3000' } = {}) {
  return {
    openapi: '3.0.3',
    info: {
      title: 'POS Backend API',
      version: '1.0.0',
      description:
        'Dokumentasi OpenAPI untuk layanan POS Backend. Gunakan spesifikasi ini untuk melakukan integrasi dan mencoba endpoint secara cepat.',
    },
    servers: [
      {
        url: serverUrl,
        description: 'POS Backend server',
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'Endpoint untuk manajemen pengguna',
      },
      {
        name: 'Roles',
        description: 'Endpoint untuk manajemen role dan permission',
      },
      {
        name: 'Places',
        description: 'Endpoint untuk manajemen tempat (outlet, warehouse, dan lainnya)',
      },
      {
        name: 'Auth',
        description: 'Endpoint untuk autentikasi pengguna',
      },
    ],
    paths: {
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login pengguna',
          operationId: 'loginUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginRequest',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Login berhasil',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/LoginResponse',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '401': {
              $ref: '#/components/responses/Unauthorized',
            },
            '403': {
              $ref: '#/components/responses/Forbidden',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout pengguna',
          operationId: 'logoutUser',
          responses: {
            '204': {
              description: 'Logout berhasil',
            },
            '401': {
              $ref: '#/components/responses/Unauthorized',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Daftar semua pengguna',
          operationId: 'listUsers',
          responses: {
            '200': {
              description: 'Daftar pengguna berhasil diambil',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        post: {
          tags: ['Users'],
          summary: 'Buat pengguna baru',
          operationId: 'createUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateUserRequest',
                },
              },
            },
            description:
              'Jika role adalah cashier maka gunakan PIN (tanpa email & password). Untuk role lain gunakan email & password (tanpa PIN).',
          },
          responses: {
            '201': {
              description: 'Pengguna berhasil dibuat',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/users/{id}': {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID pengguna',
            schema: {
              type: 'integer',
              minimum: 1,
            },
          },
        ],
        get: {
          tags: ['Users'],
          summary: 'Ambil detail pengguna',
          operationId: 'getUser',
          responses: {
            '200': {
              description: 'Detail pengguna ditemukan',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        patch: {
          tags: ['Users'],
          summary: 'Perbarui data pengguna',
          operationId: 'updateUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateUserRequest',
                },
              },
            },
            description:
              'Isi hanya properti yang ingin diubah. Validasi berbeda untuk role cashier dan non-cashier.',
          },
          responses: {
            '200': {
              description: 'Pengguna berhasil diperbarui',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/roles': {
        get: {
          tags: ['Roles'],
          summary: 'Daftar semua role',
          operationId: 'listRoles',
          responses: {
            '200': {
              description: 'Daftar role berhasil diambil',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Role',
                    },
                  },
                },
              },
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        post: {
          tags: ['Roles'],
          summary: 'Buat role baru',
          operationId: 'createRole',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateRoleRequest',
                },
              },
            },
            description:
              'Buat role baru dengan daftar permission. Nama permission harus sudah terdaftar.',
          },
          responses: {
            '201': {
              description: 'Role berhasil dibuat',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Role',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/roles/{id}': {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID role',
            schema: {
              type: 'integer',
              minimum: 1,
            },
          },
        ],
        get: {
          tags: ['Roles'],
          summary: 'Ambil detail role',
          operationId: 'getRole',
          responses: {
            '200': {
              description: 'Detail role ditemukan',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Role',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        put: {
          tags: ['Roles'],
          summary: 'Perbarui role',
          operationId: 'updateRole',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateRoleRequest',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Role berhasil diperbarui',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Role',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        delete: {
          tags: ['Roles'],
          summary: 'Hapus role',
          operationId: 'deleteRole',
          responses: {
            '204': {
              description: 'Role berhasil dihapus',
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/places': {
        get: {
          tags: ['Places'],
          summary: 'Daftar semua tempat',
          operationId: 'listPlaces',
          responses: {
            '200': {
              description: 'Daftar tempat berhasil diambil',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Place',
                    },
                  },
                },
              },
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        post: {
          tags: ['Places'],
          summary: 'Buat tempat baru',
          operationId: 'createPlace',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreatePlaceRequest',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Tempat berhasil dibuat',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Place',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/api/places/{id}': {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID tempat',
            schema: {
              type: 'integer',
              minimum: 1,
            },
          },
        ],
        get: {
          tags: ['Places'],
          summary: 'Ambil detail tempat',
          operationId: 'getPlace',
          responses: {
            '200': {
              description: 'Detail tempat ditemukan',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Place',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        put: {
          tags: ['Places'],
          summary: 'Perbarui data tempat',
          operationId: 'updatePlace',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdatePlaceRequest',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Tempat berhasil diperbarui',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Place',
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        delete: {
          tags: ['Places'],
          summary: 'Hapus tempat',
          operationId: 'deletePlace',
          responses: {
            '204': {
              description: 'Tempat berhasil dihapus',
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'name', 'status', 'authenticationMethod'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              nullable: true,
              example: 'john.doe@example.com',
            },
            status: {
              type: 'string',
              example: 'active',
            },
            authenticationMethod: {
              type: 'string',
              description: 'Metode autentikasi yang digunakan pengguna',
              enum: ['password', 'pin'],
            },
            placeId: {
              type: 'integer',
              nullable: true,
              example: 10,
              description: 'ID tempat tempat pengguna ditugaskan',
            },
            role: {
              nullable: true,
              $ref: '#/components/schemas/Role',
            },
          },
        },
        Role: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'integer',
              example: 2,
            },
            name: {
              type: 'string',
              example: 'manager',
            },
            description: {
              type: 'string',
              nullable: true,
              example: 'Memiliki akses penuh untuk mengelola outlet',
            },
            permissions: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['user.read', 'user.write'],
            },
          },
        },
        Place: {
          type: 'object',
          required: ['id', 'name', 'isActive'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Outlet Utama',
            },
            address: {
              type: 'string',
              nullable: true,
              example: 'Jl. Merdeka No. 1, Jakarta',
            },
            phone: {
              type: 'string',
              nullable: true,
              example: '+62-812-3456-7890',
            },
            logoPath: {
              type: 'string',
              nullable: true,
              example: '/uploads/logos/main.png',
            },
            type: {
              type: 'string',
              nullable: true,
              example: 'outlet',
              description: 'Jenis tempat (outlet, warehouse, dsb)',
            },
            isActive: {
              type: 'boolean',
              example: true,
            },
          },
        },
        CreateRoleRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'supervisor',
              description: 'Nama role unik dan akan disimpan dalam huruf kecil',
            },
            description: {
              type: 'string',
              nullable: true,
              example: 'Mengawasi operasional harian',
            },
            permissions: {
              type: 'array',
              nullable: true,
              items: {
                type: 'string',
              },
              example: ['manage_orders', 'view_reports'],
              description: 'Daftar nama permission yang sudah terdaftar',
            },
          },
        },
        UpdateRoleRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'manager',
            },
            description: {
              type: 'string',
              nullable: true,
              example: 'Mengelola outlet dan laporan',
            },
            permissions: {
              type: 'array',
              nullable: true,
              items: {
                type: 'string',
              },
              example: ['manage_orders', 'view_reports'],
            },
          },
        },
        CreatePlaceRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'Outlet Baru',
            },
            address: {
              type: 'string',
              nullable: true,
              example: 'Jl. Soekarno No. 12, Bandung',
            },
            phone: {
              type: 'string',
              nullable: true,
              example: '+62-811-0000-1111',
            },
            logoPath: {
              type: 'string',
              nullable: true,
              example: '/uploads/logos/outlet.png',
            },
            type: {
              type: 'string',
              nullable: true,
              example: 'warehouse',
            },
            isActive: {
              type: 'boolean',
              default: true,
              description: 'Status aktif tempat',
            },
          },
        },
        UpdatePlaceRequest: {
          type: 'object',
          minProperties: 1,
          properties: {
            name: {
              type: 'string',
              example: 'Outlet Cabang Selatan',
            },
            address: {
              type: 'string',
              nullable: true,
              example: 'Jl. Pahlawan No. 8, Surabaya',
            },
            phone: {
              type: 'string',
              nullable: true,
              example: '+62-813-2222-3333',
            },
            logoPath: {
              type: 'string',
              nullable: true,
              example: '/uploads/logos/updated.png',
            },
            type: {
              type: 'string',
              nullable: true,
              example: 'cold_storage',
            },
            isActive: {
              type: 'boolean',
              description: 'Ubah status aktif tempat',
            },
          },
        },
        CreateUserRequest: {
          type: 'object',
          required: ['name', 'roleName'],
          properties: {
            name: {
              type: 'string',
              example: 'Jane Doe',
            },
            roleName: {
              type: 'string',
              example: 'cashier',
              description: 'Nama role yang terdaftar (misal: cashier, manager)',
            },
            email: {
              type: 'string',
              nullable: true,
              example: 'jane.doe@example.com',
              description: 'Wajib untuk role non-cashier',
            },
            password: {
              type: 'string',
              nullable: true,
              example: 'SuperSecret123',
              description: 'Minimal 8 karakter, hanya untuk role non-cashier',
            },
            pin: {
              type: 'string',
              nullable: true,
              example: '1234',
              description: '4-6 digit numerik, hanya untuk role cashier',
            },
            status: {
              type: 'string',
              nullable: true,
              example: 'active',
            },
            placeId: {
              type: 'integer',
              nullable: true,
              example: 5,
            },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Jane Smith',
            },
            status: {
              type: 'string',
              example: 'inactive',
            },
            roleName: {
              type: 'string',
              example: 'manager',
            },
            email: {
              type: 'string',
              nullable: true,
              example: 'jane.smith@example.com',
            },
            password: {
              type: 'string',
              nullable: true,
              example: 'NewSecret123',
            },
            pin: {
              type: 'string',
              nullable: true,
              example: '9876',
            },
            placeId: {
              type: 'integer',
              nullable: true,
              example: 8,
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          required: ['message'],
          properties: {
            message: {
              type: 'string',
              example: 'Validation error',
            },
            details: {
              nullable: true,
              description: 'Detail tambahan terkait kesalahan (jika ada)',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'alice@example.com',
              description: 'Email akun yang digunakan untuk login',
            },
            password: {
              type: 'string',
              example: 'SuperSecret123',
              description: 'Password atau PIN tergantung role pengguna',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          required: ['token', 'tokenType', 'user'],
          properties: {
            token: {
              type: 'string',
              description: 'JWT token yang harus digunakan pada Authorization header',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            tokenType: {
              type: 'string',
              example: 'Bearer',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Permintaan tidak valid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        Unauthorized: {
          description: 'Autentikasi gagal',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        Forbidden: {
          description: 'Akses ditolak',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        NotFound: {
          description: 'Sumber daya tidak ditemukan',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        InternalServerError: {
          description: 'Terjadi kesalahan pada server',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
  };
}

export function createSwaggerHtml({
  title = 'POS Backend API Docs',
  specUrl = '/api/docs.json',
} = {}) {
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
