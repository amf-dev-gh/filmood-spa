# 🎬 Filmood
![Filmood Logo](public/images/logo.jpg)

Filmood es una aplicación web desarrollada con **Angular** que permite a los usuarios explorar películas utilizando la API de [TMDb](https://www.themoviedb.org/). Diseñada para los amantes del cine, ofrece una visual atractiva e intuitiva para descubrir, buscar y guardar películas favoritas.


## 🚀 Funcionalidades a desarrollar

- [✅] Explora películas populares, por estrenar y en cartelera.
- [✅] Búsqueda de películas por nombre y por categoría.
- [✅] Detalles de cada película: título, sinopsis, fecha de estreno, puntuación y más.
- [✅] Interfaz moderna y responsive desarrollada con **Angular 19** y **Tailwind CSS 4**.
- [✅] Guardar películas favoritas y crear listas personalizadas.

## 🛠️ Tecnologías usadas

- **Frontend:** Angular 19, Tailwind CSS
- **API Externa:** [The Movie Database (TMDb)](https://www.themoviedb.org/)
- **Estado:** En desarrollo continuo


## Instalación

```bash
git clone https://github.com/amf-dev-gh/filmood-spa.git
cd filmood
npm install
ng serve
```

Accede a la app en: http://localhost:4200

## ⚠️ A tener en cuenta

Para que la app funcione deberan obtener su API key desde la web de TMDB (Se crea una cuenta gratuita)

Luego crear un archivo en la base del proyecto y llamado "enviroment.ts" con su token.

```
export const ENVIROMENT = {
  "TMDB_API_KEY": "ey...." <--- Su clave aquí
}
```

## Créditos
- API proporcionada por TMDb

- Branch DEMO

- Desarrollado con ❤️ (y sin saber de diseño) por **Andres Mariano Fernández**
