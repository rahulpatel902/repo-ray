"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Copy, Download } from "lucide-react";

interface DiagramDisplayProps {
    chart: string;
}

export default function DiagramDisplay({ chart }: DiagramDisplayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (chart && containerRef.current) {
            mermaid.initialize({
                startOnLoad: true,
                theme: "dark",
                securityLevel: "loose",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
            });

            mermaid.contentLoaded();

            // Clear previous
            containerRef.current.innerHTML = "";

            // Render
            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                mermaid.render(id, chart).then(({ svg }) => {
                    if (containerRef.current) {
                        containerRef.current.innerHTML = svg;
                    }
                });
            } catch (error) {
                console.error("Mermaid error:", error);
                if (containerRef.current) {
                    containerRef.current.innerHTML = "<p class='text-red-500'>Failed to render diagram. Syntax error.</p>";
                }
            }
        }
    }, [chart]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(chart);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="w-full h-full min-h-[500px] flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Architecture View</span>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy Mermaid Syntax">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 w-full h-full relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                                <Button size="icon" variant="secondary" onClick={() => zoomIn()} className="h-8 w-8 rounded-lg bg-background/80 backdrop-blur border border-white/10 hover:bg-white/10">
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="secondary" onClick={() => zoomOut()} className="h-8 w-8 rounded-lg bg-background/80 backdrop-blur border border-white/10 hover:bg-white/10">
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="secondary" onClick={() => resetTransform()} className="h-8 w-8 rounded-lg bg-background/80 backdrop-blur border border-white/10 hover:bg-white/10">
                                    <RotateCcw className="h-3 w-3" />
                                </Button>
                            </div>

                            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center p-8">
                                <div ref={containerRef} className="mermaid-container transition-opacity duration-500" />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
}
