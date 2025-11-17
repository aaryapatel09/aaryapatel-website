# Image Setup Instructions

## Quick Setup

1. **Add your F1 car image:**
   - Save your Formula One car illustration as `f1-car.png` or `f1-car.jpg`
   - Place it in: `public/images/f1-car.png`

2. **Add your custom cursor image:**
   - Save your yellow circle cursor as `cursor.png`
   - Place it in: `public/images/cursor.png`

3. **Update the components:**

### Update CarLanding.tsx
In `components/home/CarLanding.tsx`, find this section (around line 90):
```tsx
{/* F1 Car Image - you'll replace this with your actual image */}
<div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center border-4 border-white">
  <div className="text-white text-4xl font-bold">F1 CAR</div>
```

Replace it with:
```tsx
<Image
  src="/images/f1-car.png"
  alt="Formula One Car"
  fill
  className="object-contain"
  priority
/>
```

### Update CustomCursor.tsx
In `components/ui/CustomCursor.tsx`, find this section (around line 40):
```tsx
{/* Yellow circle cursor - you'll replace this with your actual image */}
<div className="w-full h-full rounded-full bg-yellow-400 border-2 border-black" />
```

Replace it with:
```tsx
<Image
  src="/images/cursor.png"
  alt="cursor"
  width={40}
  height={40}
  className="object-contain"
/>
```

## Image Recommendations

- **F1 Car**: 800x500px or larger, PNG with transparency preferred
- **Cursor**: 40x40px, PNG with transparency

That's it! Your images will be automatically optimized by Next.js.

