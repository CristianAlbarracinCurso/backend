# E-Commerce 1.0

Esta es una APP de Chat & E-Commerce simple desarrollada con Node.js y Express, que permite gestionar usuarios, productos y carritos de compras de forma visual.
En esta version se mejoro el aspecto visual, se modifico el chat para que obtenga los datos del login y usarlo como nombre de usuario, eliminando el modal que solicitaba ese dato. Tambien se adapto mejor a los requerimientos de la entrega 2 y se agrego una vista de usuarios en linea. Esta ultima funcionaria mejor con la opcion de escribir en el Json el usuario que esta Online, pero esto reinicia el servidor y borra la session por lo que se dejo para poder manejarlo mejor en mongoDB. 


## Caracteristicas
- Gestión de usuarios
- Gestión de productos
- APIS de Gestión de carritos de compras y agregar productos a carritos con cantidades personalizadas, falta la parte visual
- Se agregaron vistas con handlebars
- Persistencia de datos en archivos JSON

## Estructura de Archivos

```
├──public
│  ├── img
│  ├── imgProducts
│  ├── scripts
│  ├── css
│  └── imgUser
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
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   ├── pathHandler.js
│   │   └── validateHandler.js
│   ├── routes
│   │   ├── api
│   │   │   ├── carts.routes.js
│   │   │   ├── index.routes.js
│   │   │   ├── products.routes.js
│   │   │   └── users.routes.js
│   │   ├──views
│   │   │   ├── carts.view.js
│   │   │   ├── chats.view.js
│   │   │   ├── index.view.js
│   │   │   ├── login.view.js
│   │   │   ├── products.view.js
│   │   │   ├── register.view.js
│   │   │   └── users.view.js
│   │   ├── index.router.js
│   │   └── index.socket.js
│   └── views
│       ├── layouts
│       │   └── main.handlebars
│       ├── chats.handlebars
│       ├── index.handlebars
│       ├── login.handlebars
│       ├── products.handlebars
│       ├── register.handlebars
│       └── user.router.js
├── server.js
├── utils.js
└── README.md
```
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

## Managers
- UsersManager: Administra los usuarios, permitiendo la creación, eliminación y búsqueda de usuarios.
- ProductsManager: Administra los productos, permitiendo la creación, actualización, eliminación y consulta de productos.
- CartsManager: Administra los carritos de compra, permitiendo agregar productos y consultar el estado del carrito.


## Tecnologias Utilizadas
- Node.js
- Express
- Sistema de archivos (File System)
- JSON para persistencia de datos

## Capturas

### Productos

Crear Producto: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/createProduct.png "Crear Producto")

Actualizar Un Producto: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/updateProduct.png "Actualizar Producto")

Obtener un Producto: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/getOneProduct.png "Obtener Un Producto")

Obtener Todos Los Producto: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/getAllProducts.png "Obtener Todos los Producto")

Eliminar Un Producto: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/deleteProduct.png "Eliminar Un Producto")


### Usuarios

Crear Usuario: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/createUser.png "Crear Usuario")

Actualizar Un Usuario: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/updateUser.png "Actualizar Usuario")

Obtener un Usuario: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/getOneUser.png "Obtener Un Usuario")

Obtener Todos Los Usuario: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/getAllUsers.png "Obtener Todos los Usuario")

Eliminar Un Usuario: 
![alt text](https://github.com/CristianAlbarracinCurso/backend/raw/main/common/img/deleteUser.png "Eliminar Un Usuario")


## Proximamente
- Integración de una base de datos real (MongoDB)
- Validación más robusta de las entradas de datos