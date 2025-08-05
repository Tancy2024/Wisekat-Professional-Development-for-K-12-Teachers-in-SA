# API Reference

> Base URL (local dev): `http://127.0.0.1:8000`
>
> All endpoints return **JSON** unless otherwise noted. Authentication is handled via server‑side environment variables (no user token is required for these internal tools).

---

## 1. Image Generation

| Method | Path              | Description                                                               |
| ------ | ----------------- | ------------------------------------------------------------------------- |
| `POST` | `/image/generate` | Generate an image from a text prompt using OpenAI DALL·E (v3 by default). |

### Request Body

```jsonc
{
  "prompt": "A watercolor illustration of a robot teaching children",
  "size": "512x512" // optional, default: 1024x1024
}
```

### Successful Response – `200 OK`

```jsonc
{
  "image_url": "https://.../generated‑image.png"
}
```

---

## 2. Text Summarizer

| Method | Path                | Description                                     |
| ------ | ------------------- | ----------------------------------------------- |
| `POST` | `/summary/generate` | Produce a summary for an input text via GPT‑4o. |

### Request Body

```jsonc
{
  "text": "<long document text>",
  "style": "concise"            // "concise" (default) | "detailed" | "bullet"
}
```

### Successful Response – `200 OK`

```jsonc
{
  "summary": "Short executive summary of the document..."
}
```

---

## 3. Audio Transcription

| Method | Path                | Description                                                                  |
| ------ | ------------------- | ---------------------------------------------------------------------------- |
| `POST` | `/audio/transcribe` | Transcribe an audio file (mp3, wav, m4a, webm…) via OpenAI Whisper‑large‑v3. |

### Multipart Form‑Data Field

| Field  | Type   | Required | Notes               |
| ------ | ------ | -------- | ------------------- |
| `file` | binary | ✅        | Audio file ≤ 25 MB. |

### Successful Response – `200 OK`

```jsonc
{
  "transcript": "Recognised speech as text…"
}
```

---

## 4. ChatGPT QA Tool

| Method | Path            | Description                           |
| ------ | --------------- | ------------------------------------- |
| `POST` | `/chatgpt/chat` | Ask a single‑turn question to GPT‑4o. |

### Request Body

```jsonc
{
  "prompt": "What is the capital of Australia?"
}
```

### Successful Response – `200 OK`

```jsonc
{
  "answer": "Canberra."
}
```

---

## 5. Error Handling

* **4xx** – client error (validation failure, bad JSON, unsupported file type). `detail` contains explanation.
* **5xx** – server/OpenAI error. Message will include a short description; check server logs for full trace.

---

## 6. Versioning & Upgrading

All endpoints are currently **v1** and may change before production.  Versioned prefixes (e.g. `/v1/…`) will be added once the API stabilises.

---

## 7. Changelog

| Date       | Change                                                         |
| ---------- | -------------------------------------------------------------- |
| 2025‑05‑22 | Initial public draft – image, summary, audio & chat endpoints. |
