# Aarya Patel - F1 Engineering Portfolio Website

An interactive, highly engaging personal website themed around Formula 1 engineering, cars, and powertrains. Built with Next.js, React Three Fiber, Sanity CMS, and Tailwind CSS.

## Features

- **Interactive Landing Screen**: Click-to-start experience with animated engine schematic
- **3D Engine Widget**: Real-time interactive engine parameter controls (RPM, fuel mix, DRS, boost) with Three.js visualization
- **Portfolio Page**: Drag-to-navigate project cards with category filtering
- **Blog**: Sanity CMS integration with sorting and filtering
- **Gallery**: Interactive sorting by date, fastest lap, ML projects, and engineering work
- **F1-Themed UI**: Custom SVG illustrations, dashboard-style components, and racing-inspired animations
- **Microinteractions**: Hover effects, click animations, and smooth transitions throughout

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React Three Fiber / Drei** - 3D visualizations
- **Zustand** - State management
- **Sanity CMS** - Headless content management
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aaryapatel-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Sanity project credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Sanity CMS Setup

1. Install Sanity CLI globally:
```bash
npm install -g @sanity/cli
```

2. Navigate to the sanity directory and initialize:
```bash
cd sanity
sanity init
```

3. Configure your Sanity project using the schema in `sanity/schema.ts`

4. Run Sanity Studio:
```bash
npm run sanity
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/               # Blog listing and detail pages
│   ├── gallery/            # Gallery page
│   ├── portfolio/          # Portfolio page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── 3d/                 # Three.js components
│   │   ├── Engine3D.tsx
│   │   └── EngineModel.tsx
│   ├── home/               # Home page components
│   ├── layout/             # Header, Footer
│   ├── ui/                 # Reusable UI components
│   └── widgets/            # Interactive widgets
├── lib/                    # Utilities
│   └── sanity.ts           # Sanity client configuration
├── store/                  # Zustand store
│   └── useStore.ts
└── sanity/                 # Sanity schema
    └── schema.ts
```

## Key Components

### Engine Widget
Interactive 3D engine visualization with real-time parameter controls. Adjust RPM, fuel mix, DRS, and boost to see live updates in the 3D model.

### Interactive Landing
Animated engine schematic with hover effects. Click "CLICK TO START" to enter the main site.

### Portfolio Cards
Drag-to-navigate project cards with category filtering. Each card shows project details, technologies, and featured status.

### Gallery
Interactive gallery with sorting by date, fastest lap times, ML projects, and engineering work. Click items to view in modal.

## Customization

### Colors
Edit `tailwind.config.ts` to customize the F1-themed color palette:
- `f1-red`: Primary accent color
- `f1-dark`: Dark background
- `dashboard-text`: Telemetry green
- `dashboard-bg`: Dashboard background

### Animations
Framer Motion animations can be customized in individual components. Check `components/ui/DashboardCard.tsx` for examples.

### 3D Models
Modify `components/3d/EngineModel.tsx` to customize the 3D engine visualization.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:
```bash
npm run build
npm start
```

## Future Enhancements

- [ ] Add sound effects for interactive elements
- [ ] Implement more complex 3D car models
- [ ] Add real-time telemetry data visualization
- [ ] Create more interactive widgets (lap time simulator, strategy calculator)
- [ ] Add dark/light theme toggle
- [ ] Implement search functionality
- [ ] Add RSS feed for blog

## License

MIT License - feel free to use this as a template for your own portfolio!
