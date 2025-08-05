# JZ-1 • Wisekat  
### One-stop AI PD platform for K-12 teachers

A mono-repo with two siblings working hand-in-hand:

| Folder | What lives here | Key Tech |
| ------ | --------------- | -------- |
| **`backend/`** | FastAPI micro-service wrapping OpenAI Vision / Chat / Whisper behind clean REST routes | Python 3.11 · FastAPI · Uvicorn |
| **`frontend/`** | Teacher-first web app built with Next.js App Router, Tailwind and shadcn/ui | Next.js 14 · TypeScript · Tailwind |

Made with ❤️ by the JZ-1 team for the **MCI Project 2025**.

<br/>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-purple.svg" alt="MIT Licence">
  </a>
  <img src="https://img.shields.io/badge/python-3.11%2B-blue.svg" alt="Python 3.11+">
  <img src="https://img.shields.io/badge/FastAPI-0.111-green.svg" alt="FastAPI 0.111">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TS 5">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss" alt="Tailwind 3.4">
</p>

---

## 📑 Table of Contents

1. [Architecture Glance](#-architecture-glance)  
2. [Tech Stack](#-tech-stack)  
3. [Quick Start](#-quick-start)  
4. [Environment Vars](#-environment-vars)  
5. [API Reference](#-api-reference)  
6. [Dev Scripts & Tests](#-dev-scripts--tests)  
7. [Deployment](#-deployment)  
8. [Licence](#-licence)

---

## Architecture Glance

```text
monorepo
├─ backend/ # FastAPI app (Python 3.11)
│ └─ app/
│ ├─ api/ # REST blue-prints
│ └─ core/ # config, routers, deps
└─ frontend/ # Next.js App Router (TypeScript + Tailwind)
├─ app/ # RSC pages / routes
└─ components/
```

The React client calls the FastAPI service at **`/image/generate`**, **`/audio/transcribe`**, **`/chatgpt/chat`**, etc., all secured via Bearer key (or school SSO in prod).

---

## Tech Stack

| Layer | Backend | Front-end |
| ----- | ------- | --------- |
| **Lang** | Python 3.11 | TypeScript 5 |
| **Framework** | FastAPI / Starlette | Next.js 14 (App Router) |
| **LLM / AI** | OpenAI SDK 1.14<br/>• GPT-4-o<br/>• DALL·E 3<br/>• Whisper-1 | React Server Components fetch from backend |
| **Styling / UI** | — | Tailwind CSS, shadcn/ui, lucide-react |
| **Auth** | `python-dotenv` (local) → JWT / SSO (prod) | NextAuth |
| **Tests** | Pytest (todo) | Jest + Playwright |
| **CI / CD** | GitHub Actions → Docker | GitHub Actions → Vercel |

---

## Quick Start

> **Two terminals, two commands.**  
> Works on macOS / Linux / WSL; PowerShell commands are noted.

### ① Spin up the backend

```bash
git clone <your-repo-url>
cd backend

python -m venv venv
source venv/bin/activate          # PowerShell: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt

cp .env.example .env              # add your OPENAI_API_KEY
uvicorn app.main:app --reload --port 8000 &
# API live at http://127.0.0.1:8000
```

### ② Run the front-end

```bash
cd ../frontend                    # or /apps/web in a turborepo
pnpm install                      # npm / yarn / bun also fine

cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
# NEXTAUTH_SECRET=change-me-in-prod

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev                        # opens http://localhost:3000
Edit app/page.tsx and the browser refreshes instantly. ✨
```

## Environment Vars

| File / Path           | Key                   | Notes                                                       |
|-----------------------|-----------------------|-------------------------------------------------------------|
| `backend/.env`        | `OPENAI_API_KEY`      | **Required** – your secret key                              |
| `backend/.env`        | `HF_API_TOKEN`        | Optional – enable HuggingFace models                        |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | Where the FastAPI server lives                              |
| `frontend/.env.local` | `NEXTAUTH_SECRET`     | JWT signing secret (set a long random string in production) |

---

## API Reference

| Route                 | Verb | Purpose                                         |
|-----------------------|------|-------------------------------------------------|
| `/image/generate`     | POST | Generate an image via **DALL·E 3**              |
| `/audio/transcribe`   | POST | *(multipart)* Whisper speech-to-text            |
| `/summary/generate`   | POST | Produce a summary (concise / detailed / bullet) |
| `/chatgpt/chat`       | POST | Free-form ChatGPT completion                    |

> Full Swagger docs are available at **`/docs`** once the backend is running.

---

## Dev Scripts & Tests

| Command                            | Where     | Description            |
|------------------------------------|-----------|------------------------|
| `uvicorn app.main:app --reload`    | backend   | Hot-reload API server  |
| `pnpm dev`                         | frontend  | Next.js dev server     |
| `pytest` *(coming soon)*           | backend   | Unit / API tests       |
| `pnpm test`                        | frontend  | Jest unit suite        |
| `pnpm test:e2e`                    | frontend  | Playwright end-to-end  |

---

## Deployment

| Target             | Backend command / artefact               | Front-end                               |
|--------------------|------------------------------------------|-----------------------------------------|
| **Docker**         | `docker build -t wisekat-api ./backend`  | —                                       |
| **Render / Fly**   | Deploy container image                   | —                                       |
| **Vercel**         | —                                        | Auto-deploy from `main`                 |

### Self-host both services

```bash
# API
docker run -e OPENAI_API_KEY=$OPENAI_API_KEY -p 8000:8000 wisekat-api
```

### Web (SSR on port 3000)
pnpm build && pnpm start
Point DNS or an Nginx reverse-proxy as needed.

## Licence
MIT — see LICENSE.

Empowering Aussie teachers with AI, one click at a time. 


