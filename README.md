# Gunshot Detection & SOS Command Dashboard

An interactive command-center prototype for visualizing acoustic gunshot detection, source localization, and wearable SOS alerts.

The interface simulates a four-microphone acoustic array, live audio telemetry, event classification, location mapping, and responder dispatch.

> **Prototype only:** This project uses simulated data and must not be used as a real emergency-response, public-safety, or gunshot-detection system.

## Features

- Animated acoustic-array radar
- Simulated four-microphone input
- Gunshot confidence and threat status
- Bearing and distance estimation
- Live-style waveform visualization
- Gunshot and SOS map markers
- Timestamped incident event log
- Pause, resume, and replay controls
- Responsive desktop and mobile layout

## Run Locally

### Requirements

- Node.js 22 or later
- pnpm

### Setup

```bash
pnpm install
pnpm dev
```

Open the local URL shown in the terminal.

## Production Build

```bash
pnpm build
```

The production files are generated in `dist/`.

## Controls

- **Pause Feed** pauses the detection sequence.
- **Resume Feed** continues from the current point.
- **Replay Detection** restarts the full simulation.
- The bottom timeline shows sequence progress and elapsed simulated time.

## Detection Sequence

1. The system starts with four microphones online.
2. An acoustic impulse is detected.
3. The simulated classifier confirms a gunshot.
4. The source is localized to a bearing of 137° at 85 m.
5. A wearable SOS alert appears on the command map.
6. Responders are marked as dispatched.

## Project Structure

```text
.
├── src/
│   ├── App.tsx       # Dashboard interface and simulation
│   ├── index.css     # Visual system and responsive styles
│   └── main.tsx      # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- CSS and SVG animations

## License

Add a license before distributing or accepting external contributions.
