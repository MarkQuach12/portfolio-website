# Mark Quach - Portfolio Website

A calm, document-style personal portfolio inspired by note-taking workspaces: a collapsible sidebar, a cover with an emoji page icon, callouts, toggles, a gallery of projects and table views of experience, in light and dark themes. Blog posts can be pulled in from a Notion database.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Writing from Notion](#writing-from-notion)
- [Project Structure](#project-structure)

## Technologies Used


| Category       | Technologies                      |
| -------------- | --------------------------------- |
| **Frontend**   | React 19, Vite 8, plain CSS with design tokens |
| **Font**       | Inter (Google Fonts)              |
| **Content**    | JSON data files, Notion API for writing |
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

# Pull writing from Notion (see below)
npm run sync:writing
```

### Key Features

- **Workspace layout** - Collapsible sidebar that tracks the current section, with a slide-out menu on mobile
- **Projects gallery** - Cards with drawn thumbnails, tech tags and links
- **Table views** - Experience and leadership as tables, with toggles for highlights
- **Light and dark themes** - Follow the system setting and remember the visitor's choice
- **Writing from Notion** - Posts synced from a Notion database and rendered as Notion-style blocks

## Writing from Notion

The Writing section is filled from a Notion database by `scripts/sync-notion.mjs`, which saves posts to `src/content/writing.json` and downloads their images to `public/writing/` (Notion's image links expire). Until a sync has run, the section shows a "coming soon" callout.

### One-time setup

1. Create an internal integration at <https://www.notion.so/profile/integrations> and copy its secret.
2. Create a Notion database for your posts. The script recognises these properties (only the title is required):

   | Property | Type | Purpose |
   | --- | --- | --- |
   | Name | Title | Post title |
   | Published | Checkbox (or a `Status` status/select with a "Published" option) | Only published pages are synced; without it, every page is |
   | Date | Date | Post date (falls back to the page's created time) |
   | Summary | Text | One-line summary shown in the list |
   | Tags | Multi-select | Tags, in their Notion colours |
   | Slug | Text | URL slug (defaults to the title) |

   The page's emoji icon is used as the post icon. Write the post itself in the page body.
3. In the database's `···` menu → **Connections**, add your integration.
4. Copy the database ID from its URL (the 32-character ID before `?v=`).

### Syncing

Put the credentials in `.env.local` at the repo root (ignored by git):

```bash
NOTION_TOKEN=secret_xxx
NOTION_WRITING_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then run `npm run sync:writing` and commit the updated `src/content/writing.json` and `public/writing/`.

The sync also runs before every `npm run build`. Add the same two variables in Vercel (Project Settings → Environment Variables) and each deploy pulls the latest published posts. Without them, the build keeps the committed `writing.json`.

Supported blocks: paragraphs, headings (including toggle headings), bulleted, numbered and to-do lists, toggles, quotes, callouts, code, dividers, images, bookmarks/embeds (as links), tables and columns. Posts are served at `#/writing/<slug>`.

## Project Structure

```
scripts/
├── sync-notion.mjs         # Pulls Notion posts into src/content/writing.json
└── notion-transform.mjs    # Converts Notion API objects to compact JSON
src/
├── components/             # Sidebar, top bar, cover, blocks, Notion renderer
├── content/writing.json    # Synced posts (generated)
├── data/                   # Profile, experience, leadership, projects, tech stack
├── hooks/                  # Theme, hash routing, active section
├── pages/                  # Home page and post page
├── styles/
│   ├── tokens.css          # Colour, spacing and size tokens (light + dark)
│   └── blocks.css          # Layout and block styles
├── App.jsx                 # App shell
└── main.jsx                # App entry point
```

## License

© 2026 Mark Quach. All rights reserved.
