
# Tempo Air — Quoting App (React + Vite + TypeScript)

This is a fully working MVP of the Amazon-style 6-tier HVAC replacement quoting tool.

## Features
- Build options from a few inputs (tonnage, heat source, member).
- Display **6 tiers** (Good → Better → Best → Elite → Signature → Ultimate).
- Real-time pricing engine with promos and financing.
- Export the comparison view as a **PDF** (client-side).

## Quick Start
```bash
npm i
npm run dev
# open the URL shown (usually http://localhost:5173)
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- Pricing logic lives in `src/utils/pricing.ts`
- Add/modify systems in `src/data.ts`
- PDF export uses `html2canvas` + `jsPDF` to capture the options section
- This MVP keeps premium tiers' bundles included in the displayed features; you can extend to auto-add bundled item costs if desired.
