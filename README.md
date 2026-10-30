# Studio° — Creative Digital Studio

A premium, interactive studio website built to showcase creative direction, digital experiences, and web design for modern businesses.

**Live Website:** [https://studio-nu-ruddy.vercel.app/](https://studio-nu-ruddy.vercel.app/)

---

## Overview

**Studio°** is a creative studio website designed around a simple idea: *a business deserves more than an ordinary website.*

The experience combines an editorial visual direction, immersive 3D elements, carefully designed interactions, and responsive layouts to present the studio's work, capabilities, and approach. The project is built as a real, deployable website rather than a static design concept.

---

## Highlights

- **Immersive 3D Hero** — Interactive 3D visuals integrated into the landing experience.
- **Featured Work** — Project showcase with custom previews and video demonstrations.
- **Creative Direction** — Dark editorial aesthetic with a restrained visual identity.
- **Expertise & Process** — Dedicated sections explaining the studio's capabilities and workflow.
- **Interactive Motion** — Smooth transitions, scroll-based interactions, and carefully timed animations.
- **Client Concierge** — Guided enquiry experience for prospective clients.
- **Contact Integration** — Enquiry submissions powered by Web3Forms.
- **Responsive Experience** — Layouts and interactions adapted for desktop and mobile devices.

---

## Technology Stack

### Core & Animation (Active in Source)
| Technology | Package | Purpose |
| :--- | :--- | :--- |
| **React 19** | `react`, `react-dom` | UI component architecture and state management |
| **Vite** | `vite` | Next-generation frontend tooling and production bundler |
| **Framer Motion** | `framer-motion` | 3D perspective hero transforms, layout animations, and spring physics |
| **GSAP** | `gsap` | High-performance timeline animations and showcase gallery interactions |
| **Lenis** | `lenis` | Inertial smooth scrolling engine |
| **React Router** | `react-router-dom` | Client-side routing across showroom projects |
| **Tailwind CSS** | `tailwindcss`, `postcss` | Utility-first styling framework |
| **Lucide React** | `lucide-react` | Minimalist interface icons |

### 3D Graphics Suite (Installed in `package.json`)
| Technology | Package | Purpose |
| :--- | :--- | :--- |
| **Three.js** | `three` | WebGL 3D rendering library |
| **React Three Fiber** | `@react-three/fiber` | Declarative Three.js scene renderer for React |
| **Drei** | `@react-three/drei` | Functional helpers and abstractions for React Three Fiber |
| **Spline** | `@splinetool/react-spline`, `@splinetool/runtime` | Interactive 3D scene runtime integration |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- `npm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanskar9081/Studio.git
   cd Studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

> [!NOTE]
> The access key is used for contact form submissions. Obtain your own key from [Web3Forms](https://web3forms.com/).
> Never commit your actual environment variables or private credentials.

### Run Locally

```bash
npm run dev
```

Vite will provide a local development URL (typically `http://localhost:5173/`).

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```text
Studio/
├── public/
│   ├── assets/
│   │   ├── hero-projects/
│   │   └── projects/
│   ├── images/
│   └── museum/
├── src/
│   ├── components/
│   │   ├── Contact.jsx
│   │   ├── Expertise.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navigation.jsx
│   │   ├── Philosophy.jsx
│   │   ├── Process.jsx
│   │   ├── ScrollManager.jsx
│   │   ├── Showroom.jsx
│   │   └── StudioConcierge.jsx
│   ├── projects/
│   │   ├── Agency/
│   │   ├── CakeRoom/
│   │   ├── Halo/
│   │   ├── Museum/
│   │   ├── Neo/
│   │   ├── Portfolio/
│   │   ├── VeloraSalon/
│   │   ├── CakeRoom.jsx
│   │   └── VeloraSalon.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
└── tailwind.config.js
```

> *The structure above is illustrative; refer to the actual repository for the complete source layout.*

---

## Deployment

The website is deployed on **Vercel**.

- **Live URL:** [https://studio-nu-ruddy.vercel.app/](https://studio-nu-ruddy.vercel.app/)

For your own deployment, import the repository into Vercel, configure the required environment variables (`VITE_WEB3FORMS_ACCESS_KEY`), and deploy the production build.

---

## License

All rights reserved unless otherwise specified.
