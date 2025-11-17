# Images Setup

To complete the setup, add your images to this folder:

## Required Images

1. **F1 Car Image** (`f1-car.png` or `f1-car.jpg`)
   - Place your Formula One car illustration here
   - Recommended size: 800x500px or larger
   - Format: PNG (with transparency) or JPG

2. **Custom Cursor Image** (`cursor.png`)
   - Place your yellow circle cursor image here
   - Recommended size: 40x40px
   - Format: PNG with transparency

## After Adding Images

1. **Update CarLanding.tsx:**
   - Uncomment the Image component in `components/home/CarLanding.tsx`
   - Comment out or remove the placeholder div

2. **Update CustomCursor.tsx:**
   - Uncomment the Image component in `components/ui/CustomCursor.tsx`
   - Comment out or remove the placeholder div

## Example File Structure

```
public/
  images/
    f1-car.png
    cursor.png
```

The images will be automatically optimized by Next.js when you use the `Image` component.

