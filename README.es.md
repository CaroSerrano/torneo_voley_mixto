# Torneo Voley Mixto 🏐

**Torneo Voley Mixto** es una aplicación web fullstack diseñada para visualizar y administrar información de un torneo competitivo de vóley mixto. La plataforma permite consultar el fixture, la tabla de posiciones, los campeones anteriores y el mejor equipo del año.

## ✨ ¿Por qué esta app?

La idea surgió de una necesidad concreta: mi pareja juega en un equipo de vóley que no tenía ningún tipo de registro online de su torneo, a diferencia de otros equipos y competiciones. Decidí desarrollar esta aplicación pensando en él como administrador, brindándole una interfaz sencilla desde la cual pueda actualizar la información del torneo.

---

## ⚙️ Tecnologías utilizadas

- **Frontend & Backend**: [Next.js](https://nextjs.org/) (App Router)
- **Lenguaje principal**: TypeScript
- **Base de datos**: MongoDB
- **ORM**: Mongoose
- **Componentes UI**: Material UI (MUI)
- **Manejo de formularios**: React Hook Form
- **Validaciones backend**: Zod
- **Autenticación**: NextAuth (con `CredentialsProvider`)

---

## 🔐 Autenticación

- Las rutas `GET` son **de acceso público**: cualquier usuario puede ver la tabla de posiciones, el fixture, los campeones y el mejor equipo del año.
- Las rutas `POST`, `PATCH` y `DELETE` están **protegidas con NextAuth**, permitiendo solo a usuarios autenticados (en este caso, el administrador del torneo) realizar modificaciones en la información.

---

## 🖥️ Funcionalidades

- 📊 **Tabla de posiciones** actualizada automáticamente según los resultados cargados.
- 📅 **Fixture** por fecha y por equipos.
- 🏆 **Tabla de campeones** con los ganadores históricos del torneo.
- ⭐ **Mejor equipo del año** según estadísticas.
- 🔐 **Autenticación** para permitir que el administrador edite:
  - Equipos
  - Partidos
  - Resultados y puntajes
  - Campeones

---

## 🚀 Despliegue

Esta aplicación está diseñada para ser desplegada en [Vercel](https://vercel.com/) y funciona como una app fullstack en un mismo repositorio. Las cookies de sesión y la configuración de autenticación funcionan correctamente sin necesidad de configuración extra de CORS.

---

## 👩‍💻 Sobre mí

Soy desarrolladora de aplicaciones web con formación autodidacta y esta app forma parte de mis proyectos personales donde aplico buenas prácticas de desarrollo, validación de datos, autenticación segura y manejo completo de una aplicación de principio a fin.

---

## 📬 Contacto

Si te interesa saber más sobre el proyecto o sobre mí, podés contactarme a través de mi [LinkedIn](https://www.linkedin.com/in/paula-carolina-serrano/) o revisar otros proyectos en mi [GitHub](https://github.com/CaroSerrano).

