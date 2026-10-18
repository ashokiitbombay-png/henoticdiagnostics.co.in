# henoticdiagnostics.co.in

> Official web platform and Programmatic SEO (PSEO) engine for **Henotic Diagnostics** ([`https://henoticdiagnostics.co.in`](https://henoticdiagnostics.co.in)).

---

## 🏥 Overview

Henotic Diagnostics is a premier NABL-accredited diagnostic imaging and pathology network operating across India. This repository powers the high-performance Next.js web application and programmatic SEO infrastructure.

- **Production Domain**: [https://henoticdiagnostics.co.in](https://henoticdiagnostics.co.in)
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Payload CMS 3.0 / Headless WordPress GraphQL
- **Database / Cache**: MongoDB & Redis
- **Testing**: Vitest & Playwright

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ / 24+
- MongoDB (running locally or cloud connection)
- Redis (optional, fallback cache enabled)

### Installation
```bash
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local` and set required keys:
```bash
cp .env.example .env.local
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Scripts

- `npm run dev` — Start Next.js development server
- `npm run build` — Build production application
- `npm run start` — Run production server
- `npm run test` — Run unit and regression test suites with Vitest
- `npm run test:pseo` — Run Playwright regression test suite
- `npm run payload:preflight` — Validate Payload CMS connectivity and MongoDB
- `npm run payload:indexes` — Build MongoDB search and collection indexes
