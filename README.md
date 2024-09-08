# Next.js Movie App 🎬

Una aplicación de películas creada con Next.js que permite a los usuarios explorar películas populares, ver detalles, y marcar sus favoritas.

## 📋 Características

- 🔍 **Exploración de Películas Populares:** Busca y explora películas populares.
- 📑 **Detalles de Películas:** Consulta información detallada de cada película, como descripción, géneros, fecha de lanzamiento, etc.
- ⭐ **Favoritos:** Marca películas como favoritas.
- 📄 **Filtros y Paginación:** Filtra películas por género y navega entre páginas.
- 🔧 **Integración con API Externa:** Utiliza la API de películas para obtener datos actualizados.

## 🛠 Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicaciones web.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado.
- [Redux Toolkit](https://redux-toolkit.js.org/) - Manejo del estado global de la aplicación.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilos.
- [Axios](https://axios-http.com/) - Cliente HTTP para llamadas a la API.

## 🚀 Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu máquina local.

### Prerrequisitos

- **Node.js**: Requiere Node.js versión 14 o superior.
- **NPM o Yarn**: Gestor de paquetes de Node.js.

### Pasos de Instalación

1. **Clona este repositorio:**

    ```bash
    git clone https://github.com/Juan-rojas75/front_app_movie_Quickbetdmovies
    ```

2. **Instala las dependencias:**

    Usando npm:

    ```bash
    npm install
    ```

    O usando yarn:

    ```bash
    yarn install
    ```

3. **Configura las Variables de Entorno:**

    Crea un archivo `.development.env` en la raíz del proyecto y añade las siguientes variables de entorno:

    ```bash
    NEXT_PUBLIC_API_KEY=tu_api_key_aqui
    ```

    Asegúrate de reemplazar `tu_api_key_aqui` con tu clave de API obtenida de [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).

4. **Inicia el Servidor de Desarrollo:**

    Usando npm:

    ```bash
    npm run dev
    ```

    O usando yarn:

    ```bash
    yarn dev
    ```

    Abre tu navegador y ve a `http://localhost:3000` para ver la aplicación en acción.

## 📂 Estructura del Proyecto

Una breve descripción de la estructura del proyecto:

```plaintext
.
├── components       # Componentes reutilizables
├── pages            # Páginas del proyecto
├── lib              # Lógica de negocio y funciones auxiliares
├── public           # Archivos públicos estáticos (imágenes, iconos, etc.)
├── styles           # Archivos CSS
├── store            # Configuración de Redux
├── utils            # Utilidades y funciones auxiliares
└── README.md        # Documentación del proyecto
