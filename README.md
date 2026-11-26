# React Quiz

A quiz app built with Vite + React 19.

## Features
- Fetches questions from OpenTDB with category, difficulty, amount.
- Categories loaded from API; HTML entities decoded safely.
- Timer (15s per question), auto-advance at 0.
- Score tracking, high score persisted via localStorage.
- Keyboard support (1-4 answers, Enter next).
- Accessible buttons with aria-pressed and live region.

## Screenshots
<!-- add screenshots here -->

## What I learned about hooks
- useReducer for complex state transitions; derived values avoid sync bugs.
- useEffect for data fetching with AbortController cleanup.
- Custom useLocalStorageState for persistence.
- Strict Mode runs effects twice in dev to catch missing cleanups.

## Deploy
Push to GitHub, import on vercel.com, Vite auto-detected, Deploy.

## dist folder
Contains the production build: index.html plus hashed JS/CSS assets in assets/. Served statically.
