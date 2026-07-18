````md
# 🍕 PizzaItalia - Sistema de Gestión de Pedidos + API NoSQL 👨‍🍳

Proyecto de integración desarrollado con **React 19**, **Vite** y **CSS Nativo** para la asignatura de **Programación Front End** (Evaluación 4). Esta versión evoluciona la aplicación original incorporando una arquitectura cliente-servidor mediante el consumo de una **API REST NoSQL**, permitiendo administrar pedidos de forma persistente y en tiempo real.

---

# 🚀 Características del Proyecto (Evaluación 4)

- 🌐 **Integración con API NoSQL:** Consumo de la API `apiclases.inacode.cl` para almacenar y administrar pedidos mediante operaciones CRUD.
- 🛒 **Carrito Inteligente:** Permite crear pedidos reales enviando la información directamente a la API.
- 🚚 **Modal de Compra Dinámico:** Selección entre **Retiro en Local** o **Delivery**, mostrando formularios condicionales con validación en tiempo real.
- 🔄 **Persistencia de Datos:** Los pedidos dejan de almacenarse localmente y pasan a mantenerse en una base de datos NoSQL mediante servicios REST.
- 👨‍🍳 **Panel Administrativo Oculto:** Ruta administrativa `/adm` destinada a visualizar y administrar todas las comandas registradas.
- 🔍 **Buscador de Pedidos:** Filtrado dinámico por nombre del cliente, ID de MongoDB o ID corto de la comanda.
- ✨ **Interfaz Glassmorphism:** Diseño moderno utilizando efectos de desenfoque (`backdrop-filter`) para mejorar la experiencia visual del panel administrativo.
- 📱 **Diseño 100% Responsivo:** Compatible con dispositivos móviles, tablets y escritorio.

---

# 👥 División del Trabajo (CRUD)

El desarrollo del proyecto fue dividido según las operaciones del ciclo CRUD.

## 👤 Angelo Zamora

### ✅ Create (Crear)

- Desarrollo completo del envío de pedidos desde `CartModal.jsx`.
- Construcción del objeto JSON compatible con el esquema NoSQL.
- Integración con el servicio `crearPedido`.
- Limpieza automática del carrito y cierre del modal después de registrar una orden.

### ✅ Read (Leer)

- Desarrollo de la vista administrativa `/adm`.
- Consumo del endpoint **GET** para recuperar pedidos.
- Implementación del estado de carga (*Loading State*).
- Desarrollo del buscador dinámico por nombre, ID de MongoDB e ID corto.

---

## 👤 Alexander Cortés

### ✏️ Update (Actualizar)

- Desarrollo de `EditarPedido.jsx`.
- Integración del método **PUT**.
- Edición de datos del cliente.
- Actualización del estado de las órdenes (*En Cocina*, *En Reparto* y *Entregado*).

### 🗑️ Delete (Eliminar)

- Eliminación permanente de pedidos mediante **DELETE**.
- Confirmación previa antes del borrado.
- Actualización inmediata de la interfaz sin recargar la página.

---

# 🛠️ Instalación y Uso Local

## 📋 Requisitos Previos

Antes de ejecutar el proyecto es necesario tener instalado:

- **Node.js LTS** (incluye npm)
- **pnpm**

### 1. Instalar Node.js (solo si no está instalado)

En Windows:

```bash
winget install OpenJS.NodeJS.LTS
```

Verificar la instalación:

```bash
node --version
npm --version
```

### 2. Instalar pnpm

```bash
npm install -g pnpm
```

Verificar la instalación:

```bash
pnpm --version
```

---

# ⚙️ Ejecutar el Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/sicosis3dfx/EVA4-Proyecto8-ReactApi-AlexanderCortes-AngeloZamora.git
```

### 2. Ingresar al directorio del proyecto

```bash
cd React_Api
```

### 3. Instalar las dependencias

```bash
pnpm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
pnpm dev
```

Una vez iniciado, Vite mostrará una dirección similar a:

```text
http://localhost:5173
```

---

# 👨‍💻 Detalles de la Entrega

- **Integrantes:**
  - Angelo Zamora 
  - Alexander Cortés
- **Docente:** Paulo Taipe
- **Asignatura:** Programación Front End
- **Sede:** INACAP Renca
- **Fecha:** 23 de julio de 2026

---

# 🧰 Tecnologías Utilizadas

- React 19
- React Router DOM
- JavaScript (ES6+)
- Vite
- CSS Nativo
- Fetch API
- API REST NoSQL (`apiclases.inacode.cl`)
- Node.js
- npm
- pnpm

---

# 📄 Licencia

Este proyecto fue desarrollado con fines académicos como parte de la **Evaluación 4** de la asignatura **Programación Front End** de **INACAP Sede Renca**.
````
