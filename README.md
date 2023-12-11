# PLATAFORMA TRAINING

### Plataforma de Gestión de Ejercicios y Rutinas de Fitness

![image](https://i.postimg.cc/3xn7Z3Ws/Registro.png)

**First Mobile y Responsive Web** 
_La plataforma se realizo primero para moviles, pero tiene un diseño responsive para mejor navegacion_

<hr>

## Despliegue 📦

- [Figma](https://www.figma.com/proto/iaDDH8T5tzj08DbPMtYxsG/Plataforma-Training?type=design&node-id=338-1155&t=GCQLXaVLSbw75053-0&scaling=scale-down&page-id=136%3A1501&starting-point-node-id=338%3A1155) - Diseño UX UI
- [Despligue URL](https://platform-training.vercel.app/) - Despliegue Web site

## Construido con 🛠️

_Las herramientas con las que se construyo el proyecto son_

- [Visual Studio Code](https://code.visualstudio.com/) - IDE creacion
- [React](https://sass-lang.com/) - Framework
- [Material UI](https://mui.com/) - Experiencia de usuario
- [Tailwindc ss](https://tailwindcss.com/) - Estilos css
- [Boxicons](https://boxicons.com/) - Iconos
- [Gym Visul](https://gymvisual.com/) - Imagenes y Gift
- [Json Exercise DB](https://github.com/yuhonas/free-exercise-db) - Json Ejercicios

## Autor ✒️

- [Carolina Uribe Botero](https://github.com/caro1017)

<hr>

## Requerimientos 📄

**Funcionalidad:**

1. **Visualización de Ejercicios y Rutinas:**
   - La aplicación debe mostrar una lista de ejercicios y rutinas disponibles para que los usuarios puedan explorar.
   - Cada ejercicio o rutina debe tener información clave como nombre, categoría (aeróbico, fuerza, flexibilidad), descripción y duración estimada.
2. **Creación y Edición de Rutinas:**
   - Los usuarios deben ser capaces de crear nuevas rutinas especificando el nombre, los ejercicios incluidos, la duración total y la categoría.
   - Debe ser posible editar la información de una rutina existente.
3. **Instrucciones Detalladas:**
   - Implementa la opción de proporcionar instrucciones detalladas para cada ejercicio, incluyendo imágenes o videos explicativos.
4. **Seguimiento de Progreso:**
   - Permite a los usuarios registrar y seguir su progreso para cada rutina, incluyendo el peso utilizado, la distancia recorrida, o cualquier otra métrica relevante.

**Interacción Social:**

1. **Comentarios en Ejercicios y Rutinas:**
   - Los usuarios deben poder dejar comentarios en los ejercicios y rutinas de otros usuarios.

**Filtrado de Ejercicios y Rutinas:**

1. **Filtrado por Categoría:**
   - Permite a los usuarios filtrar los ejercicios y rutinas por categoría (aeróbico, fuerza, flexibilidad).
2. **Filtrado por Duración:**
   - Implementa la capacidad de filtrar las rutinas por duración estimada.

**Sincronización de Estado:**

1. **Estado Global:**
   - Debe haber una sincronización del estado global que refleje el número total de ejercicios, el número de rutinas creadas y el número de rutinas compartidas.
2. **Persistencia de Datos:**
   - La aplicación debe persistir los datos de ejercicios, rutinas, comentarios y registros de progreso en el almacenamiento local del navegador. Al recargar la página, la información debe mantenerse.

<hr>

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
