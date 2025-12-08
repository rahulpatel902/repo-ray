import { Button } from "@/components/ui/button";
import { Input } from "postcss";
import { Github, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex text-xl font-bold tracking-tighter text-primary">
            <Zap className="mr-2 h-6 w-6" />
            Repo-Ray
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              See your code. <br className="hidden sm:inline" />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Instantly.
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Convert GitHub repositories into interactive architectural diagrams.
              Powered by Kestra, AI, and Cline.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="h-11 px-8">
                Analyze Repo
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-8">
                View Gallery
              </Button>
            </div>
          </div>
        </section>

        {/* Input UI Placeholder */}
        <section className="container max-w-[50rem] py-8">
          <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="https://github.com/facebook/react"
            />
            <Button type="submit">Visualize</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <span className="font-bold">Team Avengers</span> for AssembleHack 2025.
          </p>
        </div>
      </footer>
    </div>
  );
}
