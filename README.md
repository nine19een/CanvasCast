[中文](README.zh-CN.md) / **ENG**

# CanvasCast

Create a whiteboard explanation, arrange it into slides, and record it in your desktop browser. CanvasCast combines editable drawings, text and images with recording backgrounds, an optional camera overlay, microphone selection and a teleprompter.

It is a personal learning and portfolio project for short lessons, algorithm and technical explanations, visual notes, and project or product walkthroughs.

[Try the online demo](https://canvascast.nine19een.com) · [Watch the Bilibili demo](https://www.bilibili.com/video/BV1EwRMBxEY7/) · [GitHub repository](https://github.com/nine19een/CanvasCast)

## See the result

### Whiteboard workspace

![CanvasCast whiteboard workspace with drawing tools and slide thumbnails](https://raw.githubusercontent.com/nine19een/CanvasCast/6c490ad5286250137ea3156b7b186c26b01f802c/docs/images/1.png)

See the existing [multi-slide workspace screenshot](https://raw.githubusercontent.com/nine19een/CanvasCast/6c490ad5286250137ea3156b7b186c26b01f802c/docs/images/2.png) and [recording settings screenshot](https://raw.githubusercontent.com/nine19een/CanvasCast/6c490ad5286250137ea3156b7b186c26b01f802c/docs/images/3.png).

### Recording output example

![Existing CanvasCast recording output example with a framed, ruled whiteboard](https://raw.githubusercontent.com/nine19een/CanvasCast/6c490ad5286250137ea3156b7b186c26b01f802c/docs/images/4.png)

These images come from the repository. Recording format depends on the browser: the app tries supported MP4 types first, then WebM, and downloads the video when recording stops.

## Create and record

1. Open the demo in a desktop browser, or start it locally using the instructions below.
2. Use the pen, rectangles, ellipses, arrows, lines, text and local images to build your explanation. Select and transform objects, use the object eraser, and undo or redo edits.
3. Arrange the explanation into slides. Use thumbnails to navigate, and duplicate, rename, delete or drag slides into order before recording.
4. Open recording settings. Choose a canvas ratio, color, pattern, padding and corner radius, plus a built-in frame background or a random background.
5. Optionally enable the camera overlay, select a microphone independently, and paste a script into the floating teleprompter. Adjust its scroll speed and opacity.
6. Enter recording preparation, start, and present your slides. You can pause, resume and move between slides; the left and right arrow keys also navigate slides during presentation.
7. Stop recording to download the video. Make a short trial recording first to check framing, sound and browser format support.

| Part of the workflow | Available controls |
| --- | --- |
| Whiteboard editing | Pan and zoom; freehand SVG paths; shapes, text and images; object and multi-object transforms |
| Slide structure | Thumbnails, duplication, deletion, renaming and drag ordering |
| Recording composition | 16:9, 4:3, 3:4, 9:16 and 1:1 ratios; plain, ruled, grid or dot canvas; frame backgrounds; cursor effects |
| Presentation | Optional camera overlay and microphone input, floating teleprompter, pause/resume and slide navigation |
| Output | Browser-generated MP4 or WebM download, according to supported recording types |

## Run locally

Use Node.js satisfying `^20.19.0 || >=22.12.0`, as required by the Vite version in the lockfile, and npm.

```bash
git clone https://github.com/nine19een/CanvasCast.git
cd CanvasCast
npm install
npm run dev
```

Open the local address printed by Vite. No backend service or API key is configured in this repository. Camera and microphone access is requested only when you enable the camera or select an audio input.

### Check and build

```bash
# Check the application TypeScript project
npx tsc --noEmit -p tsconfig.app.json --pretty false

# Run the configured ESLint checks
npm run lint

# Check both TypeScript projects and build the app
npm run build

# Preview the build locally
npm run preview
```

The build produces static assets in `dist`. The repository has no `test` script or automated test suite; linting and type checking are separate checks.

For the reviewed source snapshot, application type checking and the production build passed in an isolated copy. The configured lint check reported **13 existing errors and 3 warnings**. A headless browser loaded the built desktop interface and its narrow-screen notice; recording, media devices and output codecs were not exercised.

## How it works

React and TypeScript manage editable whiteboard objects and slide state. The editor renders objects with SVG; the recording path draws the presentation, background, cursor and optional camera onto a canvas. It captures that canvas stream, adds the selected microphone track, and uses the browser's `MediaRecorder` API to create the download. Vite provides development and production builds.

The recording settings preview and output share composition helpers for canvas padding, sizing and camera geometry. This is not a guarantee of identical output across browsers.

## Current limits and direction

- **Desktop browsers:** the app shows a desktop-only notice below a 900px viewport width. Mobile editing and recording are not currently supported by that interface.
- **Browser recording support:** the existing project guidance recommends modern Chrome or Edge. `MediaRecorder`, canvas capture and available MP4/WebM codecs vary by browser; there is no universal MP4 guarantee.
- **Session-based whiteboards:** the current implementation keeps board and slide content in page memory, with no project save/import workflow. Reloading or closing the page loses that content. Teleprompter text and settings are saved separately in browser local storage.
- **Lightweight recording:** large or complex boards can be affected by device performance. There is no full video post-production workflow.
- **Media permissions:** camera and microphone availability depends on browser permission and the selected device. Check audio before an important recording.

The original project describes this as an MVP. Its stated roadmap includes more export options, more advanced image editing, pressure-like pen rendering, more presentation transitions, large-board performance work, and better mobile/tablet support. These are future directions, with no release schedule stated.

## License and project context

Copyright © 2026 nine19een. All rights reserved.

This project is published for learning, demonstration, and portfolio purposes only.
No permission is granted to copy, modify, redistribute, sublicense, or use this project or its source code for commercial purposes without explicit written permission from the author.

The project takes inspiration from modern screen recording and digital whiteboard tools, and explores product interaction, browser media APIs and whiteboard editing workflows.
