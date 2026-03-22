# Mark Quach — Portfolio Website

A terminal-themed personal portfolio website showcasing my work experience, projects, and technical skills. Built with a retro CLI aesthetic featuring interactive elements like a 3D rotating tech sphere, git-commit-styled experience timeline, and GitHub-inspired project cards.

## Screenshots

>

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Technologies Used


| Category       | Technologies                      |
| -------------- | --------------------------------- |
| **Frontend**   | React 19, Tailwind CSS v4, Vite 8 |
| **Icons**      | Lucide React, Devicon CDN         |
| **Font**       | JetBrains Mono (Google Fonts)     |
| **Deployment** | Vercel                            |


## Installation

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone the repository
git clone https://github.com/MarkQuach12/portfolio-website.git

# Navigate to the project directory
cd portfolio-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`.

## Usage

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

### Key Features

- **Interactive 3D Tech Sphere** — Canvas-based rotating sphere displaying 30+ technologies with drag interaction
- **Git Commit Timeline** — Work experience styled as git commits with hash IDs
- **GitHub-style Project Cards** — Featured repositories with language indicators, tech tags, and demo links
- **Terminal UI** — Window chrome, command-line formatting, and JSON-styled contact info
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Fixed navigation with mobile menu
│   ├── About.jsx         # Landing section with system info cards
│   ├── Skills.jsx        # 3D rotating tech sphere
│   ├── Experience.jsx    # Work experience + extracurricular sections
│   ├── Projects.jsx      # GitHub-style project cards
│   ├── Contact.jsx       # JSON contact info + contact form
│   └── Footer.jsx        # Site footer
├── App.jsx               # Main app layout with grid overlay
├── index.css             # Tailwind theme configuration
└── main.jsx              # App entry point
```

## License

© 2026 Mark Quach. All rights reserved.