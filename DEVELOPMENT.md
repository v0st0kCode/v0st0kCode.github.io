# Local Development Guide

This guide will help you set up and run the portfolio project locally for development and testing.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server on localhost:8081
npm start
# or
npm run dev:8081
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on localhost:8081 (recommended) |
| `npm run dev` | Start dev server on default port (8080) |
| `npm run dev:8081` | Start dev server on port 8081 |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run preview:8081` | Preview production build on port 8081 |
| `npm run lint` | Run ESLint |

## 🌐 Access URLs

- **Development**: http://localhost:8081
- **Production Preview**: http://localhost:8081 (after running `npm run preview:8081`)

## 🔧 Development Workflow

### 1. Start Development Server
```bash
npm start
```
This will:
- Start the Vite development server on localhost:8081
- Automatically open your browser
- Enable hot module replacement (HMR) for instant updates
- Enable CORS for development

### 2. Make Changes
- Edit files in the `src/` directory
- Changes will be automatically reflected in the browser
- The server will reload automatically when you save files

### 3. Test Production Build
```bash
# Build the project
npm run build

# Preview the production build
npm run preview:8081
```

### 4. Deploy to GitHub Pages
```bash
# Build for production
npm run build

# The dist/ folder will contain the built files
# Commit and push to your GitHub repository
git add .
git commit -m "Update portfolio"
git push origin main
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation component
│   ├── ParticleHeader.tsx # Particle animation component
│   └── ui/             # UI components (shadcn/ui)
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Work.tsx        # Portfolio page
│   ├── CaseStudy.tsx   # Case study page
│   └── NotFound.tsx    # 404 page
├── data/               # Data files
│   └── projects.ts     # Project data
├── hooks/              # Custom hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🎨 Key Features

- **Particle Animation**: Interactive particle system on the home page
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety
- **Hot Reload**: Instant updates during development
- **Modern Build**: Vite for fast builds and development

## 🐛 Troubleshooting

### Port Already in Use
If port 8081 is already in use:
```bash
# Use a different port
npm run dev -- --port 8082
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Check for TypeScript errors
npm run lint

# Build with verbose output
npm run build -- --debug
```

## 📦 Production Deployment

The project is configured for GitHub Pages deployment:

1. **Build**: `npm run build`
2. **Deploy**: Push the `dist/` folder to your GitHub repository
3. **Configure**: Set GitHub Pages to serve from the `dist/` folder

## 🔗 Useful Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Happy coding! 🎉
