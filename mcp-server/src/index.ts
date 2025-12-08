#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Define the server
const server = new Server(
    {
        name: "repo-ray-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Define the Tool Schema
const VISUALIZE_TOOL = "visualize_repository";

// Helper to query the Next.js API
async function fetchDiagram(repoUrl: string) {
    try {
        const response = await fetch("http://localhost:3000/api/visualize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ repoUrl }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.diagram;
    } catch (error) {
        return `Error fetching diagram: ${error instanceof Error ? error.message : String(error)}`;
    }
}

// List Tools Handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: VISUALIZE_TOOL,
                description: "Generates a Mermaid architecture diagram for a GitHub repository.",
                inputSchema: {
                    type: "object",
                    properties: {
                        repo_url: {
                            type: "string",
                            description: "The full GitHub URL (e.g., https://github.com/facebook/react)",
                        },
                    },
                    required: ["repo_url"],
                },
            },
        ],
    };
});

// Call Tool Handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === VISUALIZE_TOOL) {
        const args = request.params.arguments as { repo_url: string };

        if (!args.repo_url) {
            throw new Error("repo_url is required");
        }

        const diagram = await fetchDiagram(args.repo_url);

        return {
            content: [
                {
                    type: "text",
                    text: diagram,
                },
            ],
        };
    }

    throw new Error(`Tool not found: ${request.params.name}`);
});

// Start the server via Stdio
async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Repo-Ray MCP Server running on stdio");
}

run().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
