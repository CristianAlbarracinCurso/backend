
# E-Commerce

Esta es una API simple de e-commerce desarrollada con Node.js y Express, que permite gestionar usuarios, productos y carritos de compras.


## Caracteristicas
- Gestión de usuarios
- Gestión de productos
- Gestión de carritos de compras
- Agregar productos a carritos con cantidades personalizadas
- Persistencia de datos en archivos JSON
## Estructura de Archivos

├──public
│  ├── img
│  └── imgProducts
├── src 
│   ├── controllers
│   │   ├── carts.controllers.js
│   │   ├── products.controllers.js
│   │   └── users.controllers.js
│   ├── data
│   │   ├── files
│   │   │   ├── carts.json
│   │   │   ├── products.json
│   │   │   └── users.json
│   │   └── managers
│   │       ├── carts.fs.js
│   │       ├── products.fs.js
│   │       └── users.fs.js
│   ├── routes
│   │   ├── api
│   │   │   ├── carts.routes.js
│   │   │   ├── products.routes.js
│   │   │   └── users.routes.js
│   │   └── index.router.js
├── server.js
├── utils.js
└── README.md
## Instalacion

- Clona este repositorio:
Copiar código
```http
git clone https://github.com/CristianAlbarracinCurso/backend.git
```
- Instala las dependencias:
Copiar código
```http
npm install
```
- Inicia el servidor:
Copiar código
```http
npm run dev
```
El servidor estará corriendo en http://localhost:8080.
## Endpoints

- Users
POST /api/users =>"Crear un nuevo usuario."

GET /api/users =>"Obtener los detalles de un usuario por ID."

- Products
POST /api/products =>"Crear un nuevo producto."

GET /api/products =>"Obtener los detalles de todos los productos."

GET /api/products/:pid =>"Obtener los detalles de un producto por ID."


PUT /api/products/:pid =>"Actualiza un producto por ID."


DELETE /api/products/:pid =>"Borraun producto por ID."

- Carts
POST /api/carts =>"Crear un nuevo carrito."

POST /api/carts/:cid/:pid/:quantity =>"Agregar un producto a un carrito por ID con una cantidad personalizada."

GET /api/carts/:cid =>"Obtener los productos de un carrito por ID."
## Tecnologias Utilizadas
Node.js
Express
Sistema de archivos (File System)
JSON para persistencia de datos
## Proximamente
Integración de una base de datos real (MongoDB)
Autenticación y autorización para usuarios
Validación más robusta de las entradas de datos