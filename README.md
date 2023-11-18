# PLATAFORMA TRAINING

### Plataforma de Gestión de Ejercicios y Rutinas de Fitness

![image](https://i.postimg.cc/pdFLqHNF/Tablet-Registro.png)

## Despliegue 📦

[Figma URL Template](https://www.figma.com/file/iaDDH8T5tzj08DbPMtYxsG/Plataforma-Training?type=design&node-id=0-1&mode=design&t=hlSKGUCce4vFQVOP-0)
[Despligue URL]()

<hr>

## Requerimientos 📄

**Contexto:**
Eres un desarrollador/a trabajando para una empresa especializada en fitness. La empresa desea crear una aplicación web que permita a los usuarios planificar y seguir sus ejercicios y rutinas de fitness de manera efectiva.

**Requisitos:**

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
2. **Compartir Rutinas:**
    - Implementa la capacidad de compartir rutinas entre usuarios.

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
    

**Desafíos Adicionales:**

1. **Búsqueda de Ejercicios y Rutinas:** Implementa una funcionalidad de búsqueda en la lista de ejercicios y rutinas disponibles.
2. **Ranking de Rutinas Más Populares:** Crea un ranking de las rutinas más populares basado en la cantidad de usuarios que las han realizado y han dejado comentarios positivos.
3. **Diseño Responsive:** Asegúrate de que el diseño de la aplicación sea responsive para su uso en diferentes dispositivos.

**Consejos sobre el Código:**

1. **Estructura del Código:** Organiza el código de manera clara y modular para facilitar la lectura y el mantenimiento.
2. **Semántica HTML:** Utiliza HTML semántico para mejorar la accesibilidad.
3. **Pensando en Equipo:** Documenta tu proyecto de manera mínima pero efectiva. Añade comentarios donde sea necesario y organiza scripts en el **`package.json`**
4. **Formateo del Código:** Utiliza herramientas como Prettier para asegurarte de que el código esté formateado de manera consistente.
5. **Preparado para Producción:** Optimiza el código y asegúrate de que la aplicación esté lista para producción.

<hr>

## Construido con 🛠️

_Las herramientas con las que se construyo el proyecto son_

- [Visual Studio Code](https://code.visualstudio.com/) - IDE creacion
- [React](https://sass-lang.com/) - Framework
- [Material UI](https://mui.com/) - Experiencia de usuario
- [Tailwindc ss](https://tailwindcss.com/) - Estilos css


## Autor ✒️

- [Carolina Uribe Botero](https://github.com/caro1017)

<hr>

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
