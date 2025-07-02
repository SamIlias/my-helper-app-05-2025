# Helper App

A modern and lightweight web application built with **React 19**, **TypeScript**, and **Vite**, designed to give you a productive start to your day.

This app provides a clean and responsive interface with multiple features:
- **AI Chat** — converse with an intelligent assistant
-  **Weather Page** — check real-time weather updates
- **News Page** — stay informed with the latest news
- **Todo Page** — manage your daily tasks efficiently

---

## Tech Stack

| Category     | Technologies |
|--------------|--------------|
| Frontend     | React 19, Vite, TypeScript |
| Styling      | Tailwind CSS, @tailwindcss/typography |
| State Mgmt   | Redux Toolkit, React |
| Forms        | React Hook Form |
| Localization | i18next, react-i18next |
| Auth & DB    | Firebase, react-firebase-hooks |
| Networking   | Axios |
| AI/ML        | Azure AI Inference |
| Utilities    | Lodash, Highlight.js, react-markdown |
| Lint & Format| ESLint, Prettier |

---

## Scripts

| Script       | Description |
|--------------|-------------|
| `npm run dev`     | Start development server with Vite |
| `npm run build`   | Build the app using TypeScript and Vite |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint for code quality |
| `npm run interface` | Generate i18next TypeScript resource typings |

---

##  Features

### AI Assistant
Chat with an intelligent assistant using Azure AI services.

###  Weather Page
Fetch real-time weather data from **Open-Meteo API** and display it with translated descriptions and icons.

### News Page
Browse top news headlines in a clean and responsive layout.

### Todo Page
Create, edit, delete, and manage your tasks using Firebase backend.

---

## 🌐 Localization

- Default language: `English`
- Translation files located at: `src/shared/i18n/locales/*`
- Auto-generated typings: `src/i18n/@types/resources.d.ts`

---

## Environment Configuration

Before running the project, create a `.env` file in the root directory based on `.env.example`, and fill in the required API keys:

```env
VITE_CURRENT_CITY=your-current-city
VITE_FIREBASE_API_KEY=your-firebase-key
VITE_NEWS_API_KEY=your-newsapi-key
VITE_GITHUB_TOKEN=your-github-token
VITE_QUOTES_API_KEY=your-quotesapi-key
```

## License
This project is private and not licensed for public use.
Contact the author for access or licensing inquiries.