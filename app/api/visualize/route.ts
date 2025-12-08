import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { repoUrl } = await req.json();

        if (!repoUrl) {
            return NextResponse.json({ error: "Repository URL is required" }, { status: 400 });
        }

        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
            return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
        }
        const [, owner, repo] = match;

        // Headers (Auth is critical for recursive fetch)
        const headers: HeadersInit = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Repo-Ray-Hackathon-App"
        };
        if (process.env.GITHUB_TOKEN) {
            headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
        }

        // 1. Get Default Branch (e.g. main or master)
        const repoMeta = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        if (!repoMeta.ok) return NextResponse.json({ error: "Repo not found" }, { status: 404 });
        const { default_branch } = await repoMeta.json();

        // 2. Fetch Recursive Tree (The "Deep Read")
        // This gets ALL files, not just the root
        const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${default_branch}?recursive=1`, { headers });
        if (!treeRes.ok) return NextResponse.json({ error: "Failed to fetch tree" }, { status: 404 });

        const treeData = await treeRes.json();

        // 3. Smart Filter & Limit
        // We can't show 10,000 files. We focus on specific depths and types.
        let nodes: string[] = [];
        let edges: string[] = [];
        const processedPaths = new Set<string>();

        // Core Repo Node
        nodes.push(`Repo("${repo}")`);
        nodes.push(`style Repo fill:#fff,stroke:#333,stroke-width:4px`);
        processedPaths.add(""); // Root

        const rawFiles = treeData.tree || [];

        // Filter: Ignore node_modules, .git, images, locks, etc.
        const relevantFiles = rawFiles.filter((f: any) => {
            const path = f.path;
            if (path.startsWith('.')) return false; // Hidden files
            if (path.includes('node_modules')) return false;
            if (path.includes('dist') || path.includes('build')) return false;
            if (path.endsWith('.lock') || path.endsWith('.json')) return true; // Configs are good
            if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.svg')) return false;
            return true;
        });

        // Limit to top 50 most relevant items to keep diagram clean
        // We prioritize folders and root files, then deep source files
        const limitedFiles = relevantFiles.slice(0, 50);

        limitedFiles.forEach((file: any) => {
            const pathParts = file.path.split('/');

            // Reconstruct the path hierarchy
            let parentId = "Repo";

            pathParts.forEach((part: string, index: number) => {
                const isLast = index === pathParts.length - 1;
                const currentPath = pathParts.slice(0, index + 1).join('/');
                const nodeId = `node_${currentPath.replace(/[^a-zA-Z0-9]/g, '')}`;

                // Avoid duplicates
                if (!processedPaths.has(currentPath)) {
                    processedPaths.add(currentPath);

                    // Determine shape/icon
                    if (isLast && file.type === 'blob') {
                        // It's a file
                        if (part.endsWith('.js') || part.endsWith('.ts') || part.endsWith('.tsx')) {
                            nodes.push(`${nodeId}("📄 ${part}")`);
                        } else if (part.endsWith('json') || part.endsWith('yml')) {
                            nodes.push(`${nodeId}("⚙️ ${part}")`);
                        } else {
                            nodes.push(`${nodeId}("${part}")`);
                        }
                    } else {
                        // It's a folder (intermediate or final)
                        nodes.push(`${nodeId}["📂 ${part}"]`);
                    }

                    // Link to parent
                    edges.push(`${parentId} --> ${nodeId}`);
                }

                parentId = nodeId; // Set current as parent for next iteration
            });
        });

        if (relevantFiles.length > 50) {
            nodes.push(`More("... (${relevantFiles.length - 50} hidden items)")`);
            edges.push(`Repo -.-> More`);
        }

        const diagram = `
    graph TD
    ${nodes.join('\n    ')}
    ${edges.join('\n    ')}
    `;

        return NextResponse.json({ diagram, status: "SUCCESS" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
