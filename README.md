# GlucoTwin — Digital Twin for Diabetes Risk Management

> Personalized Digital Twin for Predictive Diabetes Risk Management

A competition-grade Digital Twin healthcare prototype for the **Digital Twin Challenge 2026**.

## What It Does

GlucoTwin creates a living virtual representation of a diabetic patient by combining:

- **Historical Patient Data** (EHR, diagnosis, baseline metrics)
- **Real-time Physiological State** (glucose, heart rate, HRV, activity, sleep)
- **AI Prediction** (2-hour glucose spike risk with explainability)
- **What-If Simulation** (explore intervention scenarios before committing)

## Architecture

```
Historical Patient Data
        ↓
Personal Baseline
        ↓
Real-time Physiological State
        ↓
Digital Twin (virtual patient model)
        ↓
AI Prediction Engine
        ↓
Future Glucose Trajectory
        ↓
What-If Simulation
```

## Features

| Feature | Description |
|---------|-------------|
| **Login & Patient Selector** | Professional authentication flow with searchable patient list |
| **Dashboard** | Real-time metrics, risk gauge, trajectory chart, AI explanations |
| **Digital Twin Visualization** | Animated state orb with live physiological signals |
| **Live Monitoring** | Continuous glucose and heart rate streaming with sparklines |
| **Predictions** | 2-hour risk assessment with uncertainty bands |
| **What-If Simulation** | Compare 5 intervention scenarios side-by-side |
| **Patient History** | Timeline of significant events and state changes |
| **Model Insights** | Technical metrics, features, data provenance |

## Tech Stack

- **React 19** + TypeScript
- **Tailwind CSS v4** for styling
- **Recharts** for data visualization
- **React Router v7** for navigation
- **Vite** for build tooling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Standalone Version

A self-contained `dashboard.html` file is included — zero dependencies, works by opening directly in any browser.

## Design Principles

- **Clinical-grade UI** — clean, spacious, professional healthcare aesthetic
- **WCAG accessible** — proper contrast, keyboard navigation, ARIA labels
- **Responsive** — works on desktop, tablet, and mobile
- **No fake data** — all predictions clearly labeled as simulation/model-based
- **Privacy-first** — synthetic/anonymized data only

## Project Structure

```
src/
├── components/
│   ├── layout/       # Sidebar, TopBar, Layout
│   └── ui/           # Reusable components
├── data/             # Mock data and types
├── pages/            # Route pages
├── App.tsx           # Main app with auth flow
└── main.tsx          # Entry point
```

## License

Research prototype for the Digital Twin Challenge 2026. Not for clinical use.