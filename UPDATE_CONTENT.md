# How to Update Your Content

## Fixed Issues ✅
1. **Black box around car** - Removed the container that was creating the black rectangle. The car now sits directly on the background.

## Update Your About Page

Edit `app/about/page.tsx`:

1. **Skills Section** (around line 16):
   - Update the `skills` array with your actual skills from LinkedIn
   - Adjust the `level` percentages (0-100) based on your proficiency

2. **Experiences Section** (around line 25):
   - Replace the placeholder experiences with your actual work history
   - Update:
     - `title`: Your job title
     - `period`: Start and end dates (e.g., '2022 - Present')
     - `description`: What you did/achieved in that role

3. **About Text** (around line 51):
   - Update the description to match your actual background and interests

## Update Your Portfolio Page

Edit `app/portfolio/page.tsx`:

1. **Projects Array** (around line 27):
   - Replace placeholder projects with your actual projects
   - For each project, update:
     - `title`: Project name
     - `category`: 'software' or 'engineering'
     - `description`: What the project does
     - `technologies`: Array of tech used (e.g., ['React', 'Python', 'AWS'])
     - `featured`: true/false (for projects you want to highlight)

2. **Add More Projects**:
   - Copy the project object structure and add more entries to the array

## Quick Tips

- Look at your LinkedIn profile for:
  - Work experience dates and descriptions
  - Skills and technologies you've used
  - Projects you've worked on
  - Your professional summary/bio

- Check your GitHub for:
  - Project names and descriptions
  - Technologies used in each project
  - Featured projects you're proud of

## Example Structure

```typescript
{
  id: '1',
  title: 'My Awesome Project',
  category: 'software',
  description: 'A web app that does X, Y, and Z. Built to solve problem A.',
  technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  featured: true,
}
```

Once you update these files with your real information, your portfolio will be personalized and ready to share!

