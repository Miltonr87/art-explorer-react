# 🖼️ Art Collection

[✓] Desktop version  
[✓] Mobile version  

## 📖 About the Project

**Art Collection** is a responsive Single Page Application (SPA) built with **React** and **TypeScript**, designed to showcase artwork collections from the [Metropolitan Museum of Art's public API](https://metmuseum.github.io/). It leverages **React Hooks** with **Context API** for state management, and **Context API** for logic encapsulation. Built with scalability in mind, the project follows best practices of **component-driven architecture** and **SOLID principles**.

---
## 🧩 Tech Stack

- **React 19**
- **React Router v7** (Routing)
- **TypeScript**
- **Vite** (Build tool)
- **Docker** (Deployment environment)
- **Framer Motion** (Animation)
- **Axios** (HTTP requests)
- **SASS (SCSS Modules)** (Styling)
- **Met Museum Public API** (Data source)
---
## 🗒️ Code Quality & Testing Infrastructure

- **Jest** + **React Testing Library** (Testing with 75% of coverage)
- **SonarQube** (Analyzes JavaScript/TypeScript source and test coverage reports on localhost)
- **Eslint** (Enforces consistent coding standards and detects problematic patterns)
- **Prettier** (Auto-formats your codebase for clean, readable style)
---
## 🔧 Additional Packages

- `axios` — For API calls to the Met Museum
- `framer-motion` — Used for component transitions and few UI animations
- `sass` — For organizing global and modular styles
- `@testing-library/react` — Used for all unit and component tests
- `react-router-dom` — Page navigation and dynamic routing
---
## 📁 Folder Architecture

```
art-explorer-react/
│
├── public/                    # Static files
├── src/
│   ├── api/                   # API abstraction and helpers
│   ├── assets/                # Icons and logos
│   ├── components/            # Reusable components (ArtworkCard, Header, Modal, etc.)
│   ├── hooks/                 # Custom hooks (e.g., useSearch)
│   ├── pages/                 # Page-level views (Home, Artwork details)
│   ├── store/                 # React Contexts for global state (Favorites, Artworks)
│   ├── styles/                # SCSS modules and global styles
│   ├── types/                 # TypeScript interfaces and models
│   ├── utils/                 # Utility functions (validation, URL builders)
│   └── main.tsx / App.tsx     # Root setup
├── .eslintrc / prettier       # Code quality tools
├── jest.config.ts             # Testing configuration
├── vite.config.ts             # Build configuration
└── README.md                  
```
---
## ✨ Key Features
- 🔍 **Search Artworks** by artist name
- ❤️ **Favorite System** using local storage and React Context
- 🔄 **Pagination** with artwork previews
- 🧠 **Optimized Performance** via lazy-loading and Vite
- 🧪 **Unit & Integration Tests** with Jest and Testing Library
- 📱 **Fully Responsive Design** for mobile and desktop

---
## 🚀 Getting Started

### 📦 Clone the Repo

```bash
git clone https://github.com/your-username/art-explorer-react.git
cd art-explorer-react
```

### 📥 Install Dependencies

Make sure you have **Node.js (>=20)** installed. Then run:

```bash
npm install
```

Or with Yarn:

```bash
yarn install
```

---
### 🧪 Run Tests

```bash
npm run test
```

---
### 🧨 Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---
## 🌐 Live Demo

HERE [Vercel](https://art-explorer-react-mu.vercel.app/)*