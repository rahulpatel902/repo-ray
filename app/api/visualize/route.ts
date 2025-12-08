import { NextRequest, NextResponse } from "next/server";

// Mock response for "Repo-Ray" demo (until Kestra is connected live)
// This ensures the UI works immediately for the Hackathon video.
const MOCK_MERMAID = `
graph TD
    A[User] -->|Visits| B(Landing Page)
    B -->|Enters URL| C{Valid URL?}
    C -- Yes --> D[API Route /api/visualize]
    C -- No --> E[Show Error]
    D -->|POST| F[Kestra Backend]
    F -->|Task 1| G[Fetch GitHub Code]
    F -->|Task 2| H[AI Analysis]
    H -->|Result| I[Mermaid Syntax]
    I -->|Return| B
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style F fill:#bbf,stroke:#333,stroke-width:2px
`;

export async function POST(req: NextRequest) {
    try {
        const { repoUrl } = await req.json();

        if (!repoUrl) {
            return NextResponse.json(
                { error: "Repository URL is required" },
                { status: 400 }
            );
        }

        // TODO: In Phase 3, we will replace this with the actual Kestra API call.
        // await fetch('http://localhost:8080/api/v1/executions/trigger/company.team/repo-ray-analyzer', ...)

        // Simulating delay for realism
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return NextResponse.json({
            diagram: MOCK_MERMAID,
            status: "SUCCESS",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
