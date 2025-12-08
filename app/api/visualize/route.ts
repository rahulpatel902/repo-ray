import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { repoUrl } = await req.json();

        if (!repoUrl) {
            return NextResponse.json({ error: "Repository URL is required" }, { status: 400 });
        }

        // Parse Owner/Repo
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
            return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
        }
        const [, owner, repo] = match;

        // 1. Fetch File Tree from GitHub API
        console.log(`Fetching structure for ${owner}/${repo}...`);

        const headers: HeadersInit = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Repo-Ray-Hackathon-App"
        };

        // Use Token if available (Crucial for Rate Limits)
        if (process.env.GITHUB_TOKEN) {
            headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, { headers });

        if (!ghRes.ok) {
            if (ghRes.status === 403) {
                return NextResponse.json({ error: "GitHub API Rate Limit Exceeded. Please add GITHUB_TOKEN to .env.local" }, { status: 403 });
            }
            return NextResponse.json({ error: "Repo not found or private" }, { status: 404 });
        }

        const files = await ghRes.json();

        // 2. Analyze Structure (Smart Filtered Mode)
        const nodes: string[] = [];
        const edges: string[] = [];

        // Core Node
        nodes.push(`Repo("${repo}")`);
        nodes.push(`style Repo fill:#fff,stroke:#333,stroke-width:4px`);

        // Filter and Limit (To keep diagrams beautiful)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const visibleFiles = files
            .filter((f: any) => !f.name.startsWith('.')) // Hide .github, .gitignore, etc.
            .slice(0, 25); // Limit to top 25 items to prevent "Graph Noise"

        // Iterate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        visibleFiles.forEach((file: any) => {
            const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
            const nodeId = `node_${cleanName.replace(/[^a-zA-Z0-9]/g, '')}`;

            if (file.type === 'dir') {
                nodes.push(`${nodeId}["📂 ${file.name}"]`);
                edges.push(`Repo --> ${nodeId}`);
            } else {
                if (file.name.endsWith('.json') || file.name.endsWith('.config.js') || file.name.endsWith('.yml')) {
                    nodes.push(`${nodeId}("⚙️ ${file.name}")`);
                } else if (file.name.endsWith('.md')) {
                    nodes.push(`${nodeId}>"📝 ${file.name}"]`);
                } else {
                    nodes.push(`${nodeId}("📄 ${file.name}")`);
                }
                edges.push(`Repo --> ${nodeId}`);
            }
        });

        if (files.length > 25) {
            nodes.push(`More("... (${files.length - 25} more files)")`);
            edges.push(`Repo -.-> More`);
        }

        // 3. Construct Mermaid
        const diagram = `
    graph TD
    ${nodes.join('\n    ')}
    ${edges.join('\n    ')}
    `;

        return NextResponse.json({
            diagram: diagram,
            status: "SUCCESS",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
