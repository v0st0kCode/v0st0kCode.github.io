# Ivan Thomas - Portfolio

A modern, interactive portfolio website showcasing digital product design work.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server on localhost:8081
npm start
# or
npm run dev:8081
```

**Access your site at: http://localhost:8081**

### Alternative: Use the development script

```bash
# Make the script executable (first time only)
chmod +x dev.sh

# Run the development helper
./dev.sh
```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on localhost:8081 (recommended) |
| `npm run dev` | Start dev server on default port |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Features

- **Interactive Particle Animation**: Engaging home page with interactive dots
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Tech Stack**: React, TypeScript, Vite
- **Fast Development**: Hot module replacement and instant updates
- **Clean Codebase**: Optimized and cleaned of unused dependencies

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation
│   ├── ParticleHeader.tsx # Particle animation
│   └── ui/             # UI components
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Work.tsx        # Portfolio
│   ├── CaseStudy.tsx   # Case studies
│   └── NotFound.tsx    # 404 page
├── data/               # Project data
└── hooks/              # Custom hooks
```

## 🔧 Development Workflow

1. **Start Development**: `npm start`
2. **Make Changes**: Edit files in `src/` directory
3. **See Changes**: Browser updates automatically
4. **Test Production**: `npm run build && npm run preview`
5. **Deploy**: Push to GitHub for automatic deployment

## 📖 Detailed Documentation

See [DEVELOPMENT.md](./DEVELOPMENT.md) for comprehensive development guide.

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **P5.js** - Particle animation
- **React Router** - Navigation
- **shadcn/ui** - UI components

## 🚀 Deployment

This project is configured for GitHub Pages deployment:

1. **Build**: `npm run build`
2. **Deploy**: Push changes to GitHub
3. **Access**: Your site will be available at your GitHub Pages URL

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
