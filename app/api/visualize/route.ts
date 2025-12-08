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

        // 1. Fetch File Tree from GitHub API (Public)
        console.log(`Fetching structure for ${owner}/${repo}...`);
        const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);

        if (!ghRes.ok) {
            return NextResponse.json({ error: "Repo not found or private (Rate Limit might be hit)" }, { status: 404 });
        }

        const files = await ghRes.json();

        // 2. Analyze Structure (Detailed Tree Mode - Enhanced)
        const nodes: string[] = [];
        const edges: string[] = [];

        // Core Node
        nodes.push(`Repo("${repo}")`);
        nodes.push(`style Repo fill:#fff,stroke:#333,stroke-width:4px`); // Highlight Main Node

        // Iterate through all fetched files
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        files.forEach((file: any) => {
            const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, ''); // Keep dots/dashes
            const nodeId = `node_${cleanName.replace(/[^a-zA-Z0-9]/g, '')}`; // Safe ID

            if (file.type === 'dir') {
                // Directories are Rectangles [ ]
                nodes.push(`${nodeId}["📂 ${file.name}"]`);
                edges.push(`Repo --> ${nodeId}`);
            } else {
                // Files are Rounded Rectangles ( ) or different shapes based on extension
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
