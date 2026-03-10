\# ⚙️ Sistema de Pagos – Backend (Spring Boot)



Backend desarrollado en \*\*Java 17 con Spring Boot\*\*, encargado de la gestión de estudiantes y pagos.  

Provee endpoints REST para autenticación, administración de usuarios, registro de pagos y consultas, con integración a base de datos relacional y documentación automática con \*\*Swagger\*\*.



---



\## 🚀 Tecnologías utilizadas

\- \*\*Java 17\*\*

\- \*\*Spring Boot 3\*\*

\- \*\*Spring Web / REST\*\*

\- \*\*Spring Data JPA\*\*

\- \*\*Hibernate\*\*

\- \*\*Maven\*\*

\- \*\*H2 / MySQL\*\* (según configuración)

\- \*\*Lombok\*\*

\- \*\*Swagger / Springdoc OpenAPI\*\* (documentación interactiva)



---



\## 📂 Estructura principal

\- `src/main/java/com/sistemapagos/`

&nbsp; - `controller/` → controladores REST (EstudiantesController, PagosController, AuthController)

&nbsp; - `service/` → lógica de negocio (EstudiantesService, PagosService, AuthService)

&nbsp; - `repository/` → interfaces JPA (EstudiantesRepository, PagosRepository, UserRepository)

&nbsp; - `model/` → entidades JPA (Estudiante, Pago, User, Role)

&nbsp; - `config/` → configuración de seguridad y CORS

\- `src/main/resources/`

&nbsp; - `application.properties` → configuración de base de datos y servidor

\- Archivos raíz:

&nbsp; - `pom.xml` → dependencias y configuración de Maven

&nbsp; - `mvnw`, `mvnw.cmd` → wrappers de Maven



---



\## 🔐 Autenticación y Roles

\- Autenticación básica con \*\*Spring Security\*\*.

\- Roles disponibles:

&nbsp; - `ADMIN` → gestión de estudiantes y pagos.

&nbsp; - `USER/ESTUDIANTE` → registro y consulta de pagos.

\- Tokens de sesión gestionados en el frontend, validados en endpoints protegidos.



---



\## 📌 Endpoints principales



\### 👤 Autenticación

\- `POST /login` → iniciar sesión.

\- `POST /logout` → cerrar sesión.



\### 👤 Estudiantes

\- `GET /estudiantes` → listar estudiantes.

\- `GET /estudiantes/{codigo}` → obtener detalle de estudiante.

\- `POST /estudiantes` → registrar nuevo estudiante.

\- `PUT /estudiantes/{codigo}` → actualizar estudiante.

\- `DELETE /estudiantes/{codigo}` → eliminar estudiante.



\### 💳 Pagos

\- `GET /pagos` → listar pagos.

\- `GET /pagos/{id}` → obtener detalle de pago.

\- `POST /pagos` → registrar nuevo pago.

\- `PUT /pagos/{id}` → actualizar estado de pago.

\- `GET /estudiantes/{codigo}/pagos` → listar pagos de un estudiante.



---



\## 📖 Documentación con Swagger

El backend expone documentación interactiva de la API mediante \*\*Swagger UI\*\*:



\- URL:  http://localhost:8080/swagger-ui/index.html



Código



\- Permite:

\- Visualizar todos los endpoints disponibles.

\- Probar las operaciones directamente desde el navegador.

\- Consultar modelos de datos y parámetros.



---



\## ⚙️ Configuración

\- \*\*application.properties\*\* define:

\- Puerto del servidor (`server.port=8080`)

\- Configuración de base de datos (`spring.datasource.url`, `username`, `password`)

\- Dialecto de Hibernate (`spring.jpa.properties.hibernate.dialect`)

\- Estrategia de creación de tablas (`spring.jpa.hibernate.ddl-auto`)



---



\## ▶️ Ejecución

```bash

\# Compilar y ejecutar con Maven

mvn spring-boot:run



\# Acceder en navegador o cliente REST

http://localhost:8080



---

✅ Estado del proyecto

API REST funcional para estudiantes y pagos.



Integración con base de datos relacional.



Seguridad básica con roles.



Endpoints documentados y probables vía Swagger.



Listo para integración con frontend.



