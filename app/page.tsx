import { Button } from "@/components/ui/button";
import { Github, Zap, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Background Grid & Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px] animate-pulse"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 opacity-20 blur-[120px]"></div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
          <div className="flex items-center text-xl font-bold tracking-tighter text-foreground/90 hover:text-foreground transition-colors cursor-pointer group">
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
      <main className="flex-1 flex flex-col items-center justify-center relative w-full">
        <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 container mx-auto px-4 max-w-[64rem] flex flex-col items-center text-center">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            v1.0.0 Public Beta
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance animate-in fade-in zoom-in-95 duration-700 delay-100">
            See your code. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 drop-shadow-sm selection:text-white">
              Instantly.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Repo-Ray transforms complex GitHub repositories into beautiful, interactive architectural diagrams in seconds.
          </p>

          {/* Buttons */}
          <div className="space-x-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)] hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)] transition-all duration-300">
              Analyze Repo
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base backdrop-blur-sm hover:bg-white/5 border-white/10">
              View Gallery
            </Button>
          </div>
        </section>

        {/* Input UI Placeholder */}
        <section className="container mx-auto px-4 max-w-[40rem] pb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 w-full">
          <div className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex w-full items-center bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl">
              <div className="pl-4 pr-3 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <input
                className="flex-1 h-12 bg-transparent text-base placeholder:text-muted-foreground/50 focus:outline-none text-foreground font-mono"
                placeholder="github.com/username/repository..."
              />
              <Button size="lg" className="h-11 rounded-lg px-6 font-semibold bg-white text-black hover:bg-gray-200">
                Visualize
              </Button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['facebook/react', 'vercel/next.js', 'kestra-io/kestra', 'torvalds/linux'].map((repo, i) => (
              <button
                key={repo}
                className="group flex items-center px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm text-muted-foreground hover:text-foreground"
                style={{ animationDelay: `${500 + (i * 100)}ms` }}
              >
                <Github className="h-3 w-3 mr-2 opacity-50 group-hover:opacity-100" />
                {repo}
              </button>
            ))}
          </div>
        </section>
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
