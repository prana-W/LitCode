# LitCode — Your LeetCode Coding Assistant

LitCode is a browser-based LeetCode assistant designed to help you **understand problems better before coding**.

---

## 🚀 What LitCode Does (Current Features)

LitCode currently focuses on **problem analysis**, not solution dumping.

For any LeetCode problem, it can:

- ⏱️ **Estimate the expected optimal time complexity**
- 💾 **Estimate the expected optimal space complexity**

All results are displayed **directly on the LeetCode problem page** in a native-looking UI.

---

## 🧠 How It Works

LitCode uses a **locally running LLM** via **Ollama**, wrapped by a lightweight Node.js server.

### Current Architecture

```
Browser Extension
        ↓
ChadGPT Server (Node.js)
        ↓
Ollama (Local LLM)
```

- The browser extension extracts the problem text
- The ChadGPT server formats and sanitizes prompts
- Ollama runs a local LLM model to generate structured analysis
- The result is injected back into the LeetCode UI

---

## 🤖 Models

- **Local model:** Ollama (default)
- **Wrapper server:** ChadGPT  
  👉 https://github.com/prana-w/chadgpt

> Cloud model support is **coming soon**.

---

## 🛠️ Tech Stack

- Chrome Extension (Manifest V3)
- JavaScript (content scripts + background service worker)
- Node.js + Express (ChadGPT server)
- Ollama (local LLM inference)

---

## 🔮 Upcoming Features

Planned improvements include:

- 🐞 Code debugging assistance
- 🧩 Step-by-step hints
- 📊 Difficulty re-evaluation
- 📦 Result caching per problem
- ☁️ Cloud LLM support
- ⚡ Streaming responses
- 🧪 Confidence scores for analysis

---

## 📌 Status

This project is under **active development**.  
Features and architecture may evolve rapidly.

---

