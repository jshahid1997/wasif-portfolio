# Wasif Shahid - Video Editor Portfolio

A clean, minimalistic portfolio website showcasing video editing work, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Hero Section**: Auto-playing background video with elegant text overlay
- **About Section**: Bio and skills showcase with smooth animations
- **Projects Section**: Embedded YouTube players for long-form and short-form content
- **Contact Section**: Social media links and email integration
- **Responsive Design**: Mobile-first approach with seamless transitions
- **Smooth Animations**: Framer Motion for engaging scroll-based animations
- **Clean Minimalist UI**: Light theme with generous white space

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment Ready**: Optimized for production

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wasif-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
wasif-portfolio/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main home page
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Hero section with video background
│   ├── About.tsx        # About section with skills
│   ├── Projects.tsx     # Projects showcase
│   └── Contact.tsx      # Contact section
├── lib/
│   └── data.ts          # Project data and content
├── public/              # Static assets
└── PROJECTS.md          # Source project data
```

## Customization

### Update Personal Information

Edit `/lib/data.ts` to update:
- Social media links
- Email address
- Skills list
- Project videos

### Modify Content

- **Hero Section**: Edit `heroVideo` in `data.ts`
- **Projects**: Update `longFormProjects` and `shortFormProjects` arrays
- **About Bio**: Modify text in `components/About.tsx`
- **Skills**: Update `skills` array in `data.ts`

### Styling

All styling is done with Tailwind CSS. Modify classes in component files or extend the theme in `tailwind.config.ts`.

## Design Inspiration

- Clean, minimalistic aesthetic
- Inspired by modern portfolio sites
- Focus on content presentation
- Smooth, non-intrusive animations

## Performance

- Optimized static generation
- Lazy loading for videos
- Responsive images
- Minimal bundle size
- Fast page loads

## Deployment

The site is ready to deploy on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Wasif Shahid. All rights reserved.

## Contact

For inquiries or collaboration, reach out via the contact section on the website.

