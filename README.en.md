# Torneo Voley Mixto 🏐

**Torneo Voley Mixto** is a fullstack web application designed to display and manage information about a mixed volleyball tournament. The platform allows users to view standings, match schedules (fixture), previous champions, and the best team of the year.

## ✨ Project Motivation

This app was born from a real need: my partner plays on a volleyball team whose tournament didn’t have an online presence—unlike many other teams and leagues. I decided to create this platform with him in mind, allowing him to log in as the admin and easily update the tournament's data.

---

## ⚙️ Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/) (App Router)
- **Main language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **UI Components**: Material UI (MUI)
- **Form handling**: React Hook Form
- **Backend validation**: Zod
- **Authentication**: NextAuth (with `CredentialsProvider`)

---

## 🔐 Authentication

- All `GET` routes are **public**: anyone can view team standings, match schedules, champions, and best teams.
- `POST`, `PATCH`, and `DELETE` routes are **protected using NextAuth**, allowing only authenticated users (in this case, the admin) to edit or delete content.

---

## 🖥️ Features

- 📊 **Live standings table**, automatically updated based on match results.
- 📅 **Fixture by date and team**.
- 🏆 **Champions list** with historical winners.
- 🔐 **Admin access** to manage:
  - Teams
  - Matches
  - Scores and results
  - Tournament champions

---

## 🚀 Deployment

This app is designed to be deployed on [Vercel](https://vercel.com/) and works as a fullstack project in a single repository. Session cookies and authentication work seamlessly without needing additional CORS configuration.

---


## 📬 Contact

If you'd like to know more about this project or about me, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/paula-carolina-serrano) or check out more of my work on [GitHub](https://github.com/CaroSerrano).

---

This project is licensed under CC BY-NC 4.0. See [LICENSE.md](./LICENSE.md) for more details.
