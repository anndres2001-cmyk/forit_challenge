ForIT Tasks - Aplicación de Gestión de Tareas

Challenge de Ingreso a la Academia ForIT 2025

Este proyecto es una aplicación Full-Stack para la gestión de tareas (To-Do List) desarrollada para cumplir con los requisitos del Challenge de Ingreso 2025.

Características Principales

Característica

Estado

Requisito

Descripción

CRUD Completo

Completado

Obligatorio

Crear, Leer, Actualizar y Eliminar tareas.

API RESTful

Completado

Obligatorio

Servidor Express con endpoints dedicados.

Autenticación Abierta

Implementado

Bonus/Mejora

Permite el registro automático con cualquier credencial nueva.

Control de Tareas

Implementado

Bonus Opcional

Funcionalidad de marcar tareas como Completadas/Pendientes.

Almacenamiento

Completado

Obligatorio

Uso de un array en memoria (variable tasks en server.js).

Estilos

Implementado

Obligatorio

Uso de Bootstrap y CSS básico.

Tecnologías Utilizadas

Componente

Tecnología

Versión

Backend (API)

Node.js

v18+

Framework Web

Express

-

Frontend (UI)

React

Vite

Estilos

Bootstrap 5.3 & Bootstrap Icons

-

Entorno

Git / GitHub

-

Instrucciones de Ejecución Local

Para correr la aplicación en tu entorno local, debes ejecutar el Backend y el Frontend en terminales separadas, ya que son dos aplicaciones independientes.

1. Configuración Inicial

Clonar el Repositorio:

git clone [https://github.com/anndres2001-cmyk](https://github.com/anndres2001-cmyk)
cd forit_challenge


Estructura del Proyecto: El proyecto sigue la estructura recomendada:

forit_challenge/
├── backend/      # Contiene server.js (Node/Express)
├── frontend/     # Contiene App.jsx, componentes y package.json (React/Vite)
└── assets/       # Contiene las capturas de pantalla para este README


2. Iniciar el Backend (API REST)

Navega a la carpeta del backend:

cd backend


Instala las dependencias (solo la primera vez):

npm install


Inicia el servidor:

node server.js
# Verificación: Deberías ver en la terminal: Servidor corriendo en http://localhost:5000


3. Iniciar el Frontend (React App)

Abre una SEGUNDA TERMINAL separada.

Navega a la carpeta del frontend:

cd ../frontend


Instala las dependencias (solo la primera vez):

npm install


Inicia la aplicación React:

npm run dev
# Verificación: La aplicación se abrirá en tu navegador (normalmente en http://localhost:5173).


Capturas de Pantalla de la Aplicación

1. Pantalla de Ingreso / Registro

La aplicación inicia con una pantalla de autenticación. Si el usuario no existe, se registra automáticamente.

2. Panel Principal (Dashboard)

Vista del panel principal con el diseño de tres columnas, el nuevo calendario mensual y la información del usuario. La funcionalidad de Tarea Completada está activa en esta vista.

Puntos Extra y Mejoras Implementadas

Además de los requisitos obligatorios, se añadieron las siguientes funcionalidades y mejoras para optimizar la experiencia del usuario y cumplir con los requisitos de Bonus:

Autenticación Dinámica: El endpoint /api/auth en server.js maneja el registro y login. Permite que cualquier nuevo par (usuario, contraseña) sea registrado si el usuario no existe.

Funcionalidad Done: Se agregó el campo done en el backend y la lógica de toggle en el frontend, incluyendo:

Tachado visual en TaskList.jsx.

Deshabilitación del botón "Editar" para tareas completadas.

Mejoras de Diseño (Bootstrap):

Diseño responsivo de tres columnas en App.jsx.

Integración de un Calendario Mensual Básico en el sidebar.

Uso de clases CSS para hacer la fecha principal en mayúsculas y usar un icono de cohete como "logo" de ForIT.

Validación Básica: El formulario de login y el formulario de tareas incluyen validación básica de campos vacíos.