"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Zap, Search, Loader2, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import for Mermaid component to avoid SSR issues
const DiagramDisplay = dynamic(() => import("@/components/diagram-display"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-muted-foreground animate-pulse">Initializing Visualization Engine...</div>
});

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diagram, setDiagram] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVisualize = async () => {
    if (!repoUrl) return;

    setIsLoading(true);
    setError(null);
    setDiagram(null);

    try {
      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate diagram");
      }

      setDiagram(data.diagram);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVisualize();
    }
  };

  const setExample = (url: string) => {
    setRepoUrl(`https://github.com/${url}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 font-sans">
      {/* Background Grid & Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px] animate-pulse"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 opacity-20 blur-[120px]"></div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
          <div className="flex items-center text-xl font-bold tracking-tighter text-foreground/90 hover:text-foreground transition-colors cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="p-1 rounded-md bg-primary/10 mr-2 group-hover:bg-primary/20 transition-colors">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            Repo-Ray
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <a href="https://github.com" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              <a href="https://github.com/rahulpatel902/repo-ray" target="_blank">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-white/5 bg-white/5 hover:bg-white/10">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-start relative w-full pt-20 pb-20">

        {/* Intro Section (Hidden when diagram is shown to save space) */}
        <AnimatePresence>
          {!diagram && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              className="space-y-8 pb-12 container mx-auto px-4 max-w-[64rem] flex flex-col items-center text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v1.0.0 Public Beta
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                See your code. <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 drop-shadow-sm selection:text-white">
                  Instantly.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Repo-Ray transforms complex GitHub repositories into beautiful, interactive architectural diagrams in seconds.
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Input UI */}
        <section className={`container mx-auto px-4 max-w-[50rem] w-full transition-all duration-500 ${diagram ? 'mt-4' : 'mt-0'}`}>
          <div className="relative group w-full z-10">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${isLoading ? 'opacity-80 animate-pulse' : ''}`}></div>
            <div className="relative flex w-full items-center bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl">
              <div className="pl-4 pr-3 text-muted-foreground">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <Search className="h-5 w-5" />}
              </div>
              <input
                className="flex-1 h-12 bg-transparent text-base placeholder:text-muted-foreground/50 focus:outline-none text-foreground font-mono"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button size="lg" className="h-11 rounded-lg px-6 font-semibold bg-white text-black hover:bg-gray-200" onClick={handleVisualize} disabled={isLoading}>
                {isLoading ? 'Analyzing...' : 'Visualize'}
              </Button>
            </div>
          </div>

          {/* Quick Suggestions */}
          {!diagram && !isLoading && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['facebook/react', 'vercel/next.js', 'kestra-io/kestra', 'torvalds/linux'].map((repo) => (
                <button
                  key={repo}
                  onClick={() => setExample(repo)}
                  className="group flex items-center px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-3 w-3 mr-2 opacity-50 group-hover:opacity-100" />
                  {repo}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center gap-2"
          >
            <AlertCircle className="h-5 w-5" />
            {error}
          </motion.div>
        )}

        {/* Diagram Result */}
        <AnimatePresence>
          {diagram && (
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4 max-w-screen-xl mt-12 w-full flex-1"
            >
              <DiagramDisplay chart={diagram} />
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built by <a href="https://github.com/rahulpatel902" target="_blank" className="font-bold text-foreground hover:underline">Rahul Patel</a>.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground/60">
            <span>Powered by Kestra</span>
            <span>•</span>
            <span>Built with Cline</span>
            <span>•</span>
            <span>Deployed on Vercel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
