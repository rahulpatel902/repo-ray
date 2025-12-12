# ⚡ Repo-Ray: The Codebase X-Ray

> **See your code. Instantly.**
> Transform complex GitHub repositories into beautiful, interactive architectural diagrams in seconds.

![Repo-Ray Demo](https://github.com/rahulpatel902/repo-ray/blob/main/public/demo-screenshot.png?raw=true)

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

