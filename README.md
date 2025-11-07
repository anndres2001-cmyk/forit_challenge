# ForIT Tasks - Aplicación de Gestión de Tareas
Challenge de Ingreso a la Academia ForIT 2025
Este proyecto es una aplicación Full-Stack para la gestión de tareas (To-Do List) desarrollada para cumplir con los requisitos del Challenge de Ingreso 2025.
## Características Principales
| Característica | Estado | Requisito | Descripción |
|----------------|---------|------------|--------------|
| CRUD Completo | Completado | Obligatorio | Crear, Leer, Actualizar y Eliminar tareas. |
| API RESTful | Completado | Obligatorio | Servidor Express con endpoints dedicados. |
| Autenticación Abierta | Implementado | Bonus / Mejora | Permite el registro automático con cualquier credencial nueva. |
| Control de Tareas | Implementado | Bonus Opcional | Funcionalidad de marcar tareas como Completadas / Pendientes. |
| Almacenamiento | Completado | Obligatorio | Uso de un array en memoria (variable tasks en server.js). |
| Estilos | Implementado | Obligatorio | Uso de Bootstrap y CSS básico. |
## Tecnologías Utilizadas
| Componente | Tecnología |
|-------------|-------------|
| Backend (API) | Node.js |
| Framework Web | Express |
| Frontend (UI) | React + Vite |
| Estilos | Bootstrap 5.3 + Icons |
| Entorno | Git / GitHub | 
## Instrucciones de Ejecución Local
Para correr la aplicación en tu entorno local, debés ejecutar el Backend y el Frontend en terminales separadas, ya que son dos aplicaciones independientes.
### 1. Configuración Inicial
Clonar el Repositorio:
git clone https://github.com/anndres2001-cmyk/forit_challenge.git
cd forit_challenge
Estructura del Proyecto:
forit_challenge/
├── backend/      # Contiene server.js (Node/Express)
├── frontend/     # Contiene App.jsx, componentes y package.json (React/Vite)
└── assets/       # Contiene las capturas de pantalla para este README
### 2. Iniciar el Backend (API REST)
Navegar a la carpeta del backend:
cd backend
Instalar las dependencias (solo la primera vez):
npm install
Iniciar el servidor:
node server.js
Verificación: Deberías ver en la terminal:
Servidor corriendo en http://localhost:5000
### 3. Iniciar el Frontend (React App)
Abrir una segunda terminal separada y ejecutar:
cd ../frontend
npm install
npm run dev
Verificación: La aplicación se abrirá en tu navegador, normalmente en:
http://localhost:5173
## Capturas de Pantalla de la Aplicación

[Inicio](https://github.com/user-attachments/assets/039af8dc-7e9b-42cc-b20c-c08e0da2d5fa)


[Principal](https://github.com/user-attachments/assets/44e164e1-c965-458c-897e-72ae7fd6e356)

## Puntos Extra y Mejoras Implementadas
Además de los requisitos obligatorios, se añadieron las siguientes funcionalidades y mejoras:  
- Autenticación Dinámica: El endpoint /api/auth en server.js maneja el registro y login. Permite que cualquier nuevo par (usuario, contraseña) sea registrado si el usuario no existe.  
- Funcionalidad Done: Se agregó el campo done en el backend y la lógica de toggle en el frontend, incluyendo:  
  - Tachado visual en TaskList.jsx.  
  - Deshabilitación del botón Editar para tareas completadas.  
- Mejoras de Diseño (Bootstrap):  
  - Diseño responsivo de tres columnas en App.jsx.  
  - Integración de un calendario mensual básico en el sidebar.  
  - Uso de clases CSS personalizadas y un icono como logo de ForIT.  
- Validación Básica: El formulario de login y el formulario de tareas incluyen validación básica de campos vacíos.
Proyecto realizado como parte del Challenge de Ingreso a la Academia ForIT 2025.
