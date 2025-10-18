# Hayden's Corg-folio 🐕

A cutting-edge Next.js portfolio featuring a TRON-style floppy disk carousel and interactive Corg-verse Console. Built with React Three Fiber, Framer Motion, and Tailwind CSS.

## 🚀 Live Demo

Visit the live portfolio at: [Your Domain Here]

## ✨ Features

- **3D Floppy Disk Carousel**: 20 vintage floppy disks with scroll-scrubbed navigation
- **TRON Grid Floor**: Neon cyan grid underneath the carousel for authentic atmosphere
- **Corg-verse Console**: Interactive footer with corgi-puter illustration and disk insertion
- **Neon Cyberpunk Branding**: VR corgi theme with liquid glass effects
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: pnpm

## 🎮 Interactive Elements

### Floppy Disk Carousel
- Scroll through 20 project disks
- Center disk highlights with project details
- Coverflow effect with realistic 3.5" floppy proportions
- TRON grid floor for authentic atmosphere

### Corg-verse Console
- Click disks to "insert" into corgi computer
- Slot glow animation on insertion
- Project preview modal with spring animations
- Horizontal scroll-snap disk shelf

## 🎨 Design System

### Brand Colors
- **Background**: `#0a0c12` (Dark cyberpunk)
- **Accent**: `#22d3ee` (Neon cyan)
- **Accent 2**: `#ff3ea5` (Hot pink)
- **Warm**: `#ff9f1c` (Corgi orange)

### Components
- `HeroHeader` - Sticky header with glass morphism
- `FloppyCarousel` - 3D carousel with TRON floor
- `FloppyDisk` - SVG disk button with animations
- `DiskShelf` - Horizontal scrolling container
- `CorgVerseConsole` - Interactive project viewer

## 🔒 Proprietary Protection

This repository contains proprietary intellectual property including:
- Custom 3D animations and interactions
- Brand assets and design systems
- Project implementations and configurations

**All rights reserved.** See [LICENSE](LICENSE) for full terms.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/bohselecta/corgfolio.git
cd corgfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3001
```

## 📁 Project Structure

```
corgfolio-next/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CorgVerseConsole.tsx
│   ├── DiskShelf.tsx
│   ├── FloppyCarousel.tsx
│   ├── FloppyDisk.tsx
│   ├── HeroHeader.tsx
│   └── TronFloor.tsx
├── styles/
│   └── brand.css
├── public/
│   └── illustrations/
└── README.md
```

## 🎯 Development Notes

- Uses React Three Fiber for 3D graphics
- ScrollControls for scroll-scrubbed animations
- Tailwind CSS for styling
- TypeScript for type safety
- Next.js App Router for routing

## 🔮 Future Enhancements

- Dashboard integration for content management
- Real project data migration
- Post-processing effects (bloom)
- Reduced motion support
- Drag-to-slot interactions
- Sound effects (floppy chirp)

## 📄 License

Proprietary Software License - All rights reserved to Hayden Lindley.

See [LICENSE](LICENSE) for complete terms and restrictions.

---

**Built with ❤️ by Hayden Lindley**

*Designer • Builder • Arcade-grade pixels*