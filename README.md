# Valentine's Website for Melody 💕

A romantic, interactive Valentine's Day website with a playful "No" button that runs away from the cursor.

## Features

- ✨ Clean, Apple-inspired design with soft romantic colors
- 🎯 Interactive "No" button that flees from cursor/touch
- 💖 Beautiful floating hearts animation
- 🎉 Celebration page with confetti when "Yes" is clicked
- 📱 Fully responsive and mobile-friendly
- 🎨 Uses Plus Jakarta Sans font (Spotify-inspired)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Vercel** (deployment)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project or create a new one.

Alternatively, you can:
- Push to GitHub and import the repository in Vercel dashboard
- Use the Vercel GitHub integration for automatic deployments

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with font and metadata
│   ├── page.tsx         # Main Valentine question page
│   ├── yes/
│   │   └── page.tsx     # Celebration page
│   └── globals.css      # Global styles and Tailwind
├── components/
│   ├── RunawayButton.tsx   # The fleeing "No" button
│   ├── FloatingHearts.tsx  # Background heart animation
│   └── Confetti.tsx        # Success page confetti
└── public/              # Static assets
```

## How It Works

The "No" button uses physics-based movement:
- **Cursor approaching**: Button flees in opposite direction, speed increases as cursor gets closer
- **Cursor idle**: Button gently drifts around the screen
- **Mobile touch**: Button responds to touch events and moves away

The "Yes" button is stationary and leads to a celebration page with confetti and hearts.

## Customization

- Edit colors in `tailwind.config.ts`
- Modify text in `app/page.tsx` and `app/yes/page.tsx`
- Adjust button physics in `components/RunawayButton.tsx`

---

Made with ❤️ for Melody
