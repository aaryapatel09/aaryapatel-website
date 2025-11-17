# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Overview

### 🏁 Interactive Landing Screen
- Click "CLICK TO START" to enter the main site
- Hover over engine parts to see labels
- Animated telemetry data display

### 🎛️ Engine Widget
- Click "OPEN ENGINE WIDGET" on the home page
- Adjust RPM, fuel mix, DRS, and boost sliders
- Watch the 3D engine model react in real-time
- View live telemetry calculations

### 📁 Portfolio Page
- Drag project cards to interact
- Filter by category (all, software, engineering)
- Click cards to view details

### 📝 Blog Page
- Sort posts by date or title
- Click posts to read full articles
- Sanity CMS integration (configure in `.env.local`)

### 🖼️ Gallery Page
- Filter by: All, Fastest Lap, ML Project, Engineering
- Sort by date or fastest lap time
- Click items to view in modal

## Sanity CMS Setup (Optional)

1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Create a new project
3. Copy your project ID and dataset name
4. Create `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. Use the schema in `sanity/schema.ts` to configure your content types

**Note:** The site works without Sanity - it uses mock data for development.

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- `f1-red`: Primary accent (#E10600)
- `dashboard-text`: Telemetry green (#00FF88)
- `f1-gray`: Secondary gray (#38383F)

### Content
- **Portfolio projects**: Edit `app/portfolio/page.tsx`
- **About section**: Edit `app/about/page.tsx`
- **Home stats**: Edit `components/home/HomeContent.tsx`

### 3D Engine
Customize the 3D model in `components/3d/EngineModel.tsx`

## Troubleshooting

**3D model not showing?**
- Ensure Three.js dependencies are installed
- Check browser console for errors
- Try a different browser (Chrome/Firefox recommended)

**Animations not working?**
- Clear browser cache
- Check that Framer Motion is installed
- Verify JavaScript is enabled

**Sanity connection issues?**
- Verify environment variables are set
- Check project ID and dataset name
- Ensure Sanity project is public or you have API access

## Next Steps

1. Customize content to match your background
2. Add your own projects and blog posts
3. Configure Sanity CMS for content management
4. Deploy to Vercel or your preferred platform
5. Add your own images and media

Enjoy building your F1-themed portfolio! 🏎️

