# ⚡ Repo-Ray: The Codebase X-Ray

> **See your code. Instantly.**
> Transform complex GitHub repositories into beautiful, interactive architectural diagrams in seconds.

![Repo-Ray Demo](https://github.com/rahulpatel902/repo-ray/blob/main/public/demo-screenshot.png?raw=true)

## 🏆 Hackathon Tracks & Prizes Targeted

Repo-Ray was built specifically for **AssembleHack 2025** and targets the "Infinity Stones" of the AI Agent world:

### 🟣 The Space Stone (Kestra) - $4,000
**Implemented:** `kestra/flow.yaml`
- Repo-Ray uses **Kestra** as the central brain to orchestrate the "Fetch -> Analyze -> Visualize" pipeline.
- We implement a custom **Python Script Task** to fetch raw GitHub data.
- We use **Kestra's Conditional Logic** ("The Wakanda Data Award") to determine if a repo needs "Basic" or "Advanced" analysis based on file complexity.

### 🔴 The Reality Stone (Cline) - $5,000
**Implemented:** `mcp-server/`
- We didn't just use Cline to build this; we built **FOR** Cline.
- Repo-Ray includes a full **Model Context Protocol (MCP) Server**.
- **Capability:** Developers can use Cline to "visualize" any repo they are working on directly in their chat context using the `visualize_repository` tool.

### 🔵 The Mind Stone (Vercel) - $2,000
**Implemented:** `app/`
- Built on **Next.js 14**, the gold standard of Vercel.
- Uses **AI SDK** patterns for streaming node analysis.
- Deployed seamlessly on Vercel's global edge network.

### 🟠 The Soul Stone (CodeRabbit) - $1,000
**Implemented:** `CodeRabbit Integration`
- The repository utilizes **CodeRabbit** for continuous AI code reviews, ensuring every PR is clean, optimized, and bug-free.

---

## 🚀 Key Features

- **🔍 Instant Visualization:** Paste a GitHub URL, get a Mermaid diagram.
- **✨ Kestra Power:** Backend orchestration handles the heavy lifting of code analysis.
- **🔌 MCP Ready:** Integrated directly into your AI coding agent (Cline).
- **🎨 Glassmorphism UI:** A premium, dark-mode-first aesthetic built with Tailwind v4.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend Orchestration:** Kestra
- **AI Engine:** OpenAI GPT-4o (via Kestra)
- **Agent Integration:** Model Context Protocol (MCP) SDK

## 📦 Installation & Setup

### 1. Clone & Install
```bash
git clone https://github.com/rahulpatel902/repo-ray.git
cd repo-ray
npm install
```

### 2. Run Locally
```bash
npm run dev
# Visit http://localhost:3000
```

### 3. Run the MCP Server (For Cline)
```bash
cd mcp-server
npm install
npm run build
# Add the config from cline_mcp_config.json to your Cline settings!
```

## 📄 License
MIT © Rahul Patel
