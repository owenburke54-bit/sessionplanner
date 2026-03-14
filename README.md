# SessionPlanner

> Build smarter soccer training sessions for individuals and small groups.

A mobile-first soccer training session builder designed for trainers running 1-on-1 and small group sessions, and players planning their own solo or small group training.

![SessionPlanner](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Features

- **Session Builder** — customise age group, skill level, player count, field size, session length, training focus, and available equipment
- **AI-Style Session Generation** — structured training plans with warm-up, technical, main drill, applied game, and cooldown sections
- **Drill Library** — 35+ realistic drills across 8 categories, searchable and filterable
- **Field Diagrams** — clean top-down SVG pitch diagrams for every drill
- **Swap & Edit** — swap out any drill with alternatives, remove drills, and see live time recalculation
- **Mobile-First** — designed for iPhone-sized screens, works beautifully on desktop too

## Training Focus Areas

Possession · Finishing · First Touch · Close Control · Dribbling · Long Passing · Small Sided · Fitness

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Data**: Mock/local data — no backend or auth required
- **Deployment**: Vercel-ready

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Import this repository at [vercel.com/new](https://vercel.com/new). Zero configuration required.

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals)
├── components/       # All React components
│   ├── BottomNav.tsx
│   ├── DrillLibrary.tsx
│   ├── FieldDiagram.tsx
│   ├── HomeScreen.tsx
│   ├── SessionBuilder.tsx
│   ├── SessionView.tsx
│   └── SwapDrillSheet.tsx
├── data/             # Mock drill data (35+ drills)
├── lib/              # Session generation logic
└── types/            # Shared TypeScript types
```
