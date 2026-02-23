# 🎮 Ray Portfolio — Interactive Game World CV

> A unique developer portfolio built as a **2D side-scrolling pixel-art game world** using Next.js 14. Walk your character through different zones to explore skills, projects, and work experience — or switch to the Classic CV view anytime.

## ✨ Features

- **Game World Navigation** — Control a pixel character that walks through themed zones
- **Parallax Background** — Multi-layer scrolling background for depth effect
- **Interactive Zones**:
  - 🏠 **Hero Station** — Introduction & contact info
  - 🌲 **Skills Forest** — Skill trees grouped by category (Frontend, Backend, DevOps...)
  - 🏙️ **Projects City** — Browse real projects as buildings; press `E` to enter & read details
  - 📅 **Experience Timeline** — Work history displayed as a side-scrolling timeline
- **Project Modal** — Detailed overlay for each project with tech stack & description
- **Classic CV View** — Toggle a traditional, printable CV overlay with `C` or the HUD button
- **HUD Overlay** — Mini-map, current zone name, and world progress bar
- **Mobile Support** — On-screen joystick for touch devices
- **Smooth Animations** — Framer Motion powered transitions and effects

## 🕹️ Controls

| Key / Action | Function |
|---|---|
| `←` / `→` Arrow Keys | Move character left / right |
| `C` | Toggle Classic CV view |
| `E` | Interact with nearby project building |
| Mobile joystick | Move on touch screens |

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Rendering | Client-side canvas-style DOM rendering |

## 🗂️ Project Structure

```
ray_portfolio/
├── app/
│   ├── layout.tsx        # Root layout & metadata
│   ├── page.tsx          # Entry point (lazy-loads GameCanvas)
│   └── globals.css       # Global styles
├── components/
│   ├── GameCanvas.tsx     # Main game loop & world composition
│   ├── Character.tsx      # Animated pixel character sprite
│   ├── ParallaxBackground.tsx  # Multi-layer scrolling background
│   ├── HUD.tsx            # Heads-up display overlay
│   ├── ProjectModal.tsx   # Project detail modal
│   ├── ClassicView.tsx    # Traditional CV overlay
│   ├── MobileJoystick.tsx # Touch joystick control
│   └── sections/
│       ├── HeroStation.tsx       # Zone 1: intro
│       ├── SkillsForest.tsx      # Zone 2: skills
│       ├── ProjectsCity.tsx      # Zone 3: projects
│       └── ExperienceTimeline.tsx # Zone 4: experience
├── data/
│   └── portfolioData.ts   # All CV data (personal info, skills, projects, experience)
└── hooks/
    └── useGameController.ts  # Keyboard & joystick input → world offset state
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/ray_portfolio.git
cd ray_portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 👤 About

Portfolio of **Nguyen Van Phuong** — Front-End Developer with 3+ years of experience in ReactJS, Redux, TypeScript, and modern web technologies.

- 📧 vanphuong131401@gmail.com
- 📍 Hoa Vang, Da Nang, Vietnam
- 🏆 Employee of the Year 2021 – NiftyJS Technology

## 📄 License

This project is for personal portfolio use. Feel free to use it as inspiration for your own creative portfolio!
