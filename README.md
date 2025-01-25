# tecnical_test

Prueba tecnica para la empresa Nespra Digital Solution

# Proyecto de Gestión de Tareas

## Configuración de la API
1. Clonar el repositorio

2. Navegar a la carpeta del back del proyecto:
   - `cd tecnical_test_project`

3. Configurar PostgreSQL:
   - Debes tener instalado PostgreSQL y creada una base de datos
   - Configurar las siguientes variables de entorno o crear un archivo `.env`:
     ```
     DB_NAME=nombre_de_tu_base_de_datos
     DB_USER=tu_usuario_postgres
     DB_PASSWORD=tu_contraseña
     DB_HOST=localhost
     DB_PORT=5432
     ```
   

4. Instalar dependencias:
   - `pip install -r requirements.txt`

5. Crear y ejecutar las migraciones:
   - `python manage.py makemigrations`
   - `python manage.py migrate`

6. Iniciar el servidor:
   - `python manage.py runserver`

## Configuración del Frontend
1. Navegar a la carpeta del front del proyecto:
   - `cd tecnical_test_front`

2. Instalar dependencias:
   - `npm install`

3. Iniciar la aplicación:
   - `npm start`

La aplicación estará disponible en `http://localhost:3000`

## Documentación de la API

### Autenticación
La API utiliza autenticación JWT (JSON Web Token). Para los endpoints que requieran autentiación, incluir el token en el header de la siguiente manera:
- `Authorization: Bearer <token_generado_en_el_login>`

### Endpoints

#### Usuarios

##### Registro de Usuario
- **URL**: `POST /api/users/register/`
- **Body**:
  ```json
  {
      "username": "test_user",
      "email": "test@example.com",
      "password": "your_password",
      "password_confirm": "your_password",
      "first_name": "Test",
      "last_name": "User"
  }
  ```

##### Login
- **URL**: `POST /api/users/login/`
- **Body**:
  ```json
  {
      "username": "test_user",
      "password": "your_password"
  }
  ```

##### Perfil de Usuario
- **URL**: `GET /api/users/profile/`
- **Auth**: Requerida
- **URL Actualización**: `PUT /api/users/profile/`
- **Body Actualización**:
  ```json
  {
      "first_name": "Updated",
      "last_name": "Name",
      "email": "updated@example.com"
  }
  ```

#### Tareas

##### Listar y Crear Tareas
- **Listar**: `GET /api/tasks/`
- **Crear**: `POST /api/tasks/`
- **Auth**: Requerida
- **Body Creación**:
  ```json
  {
      "title": "Nueva Tarea",
      "description": "Descripción de la tarea",
      "completed": false
  }
  ```

##### Operaciones con Tareas Específicas
- **Ver**: `GET /api/tasks/{id}/`
- **Actualizar**: `PUT /api/tasks/{id}/`
- **Eliminar**: `DELETE /api/tasks/{id}/`
- **Auth**: Requerida
- **Body Actualización**:
  ```json
  {
      "title": "Tarea Actualizada",
      "description": "Nueva descripción",
      "completed": true
  }
  ```

## Ejemplos de Uso

### Flujo típico:
1. Registrar un usuario nuevo
2. Hacer login y obtener el token
3. Usar el token para crear/listar tareas
4. Actualizar o eliminar tareas específicas

## Tecnologías Utilizadas
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL

