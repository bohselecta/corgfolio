"use client";
import Image from "next/image";
import { useState } from "react";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"ok"|"err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // TODO: wire to your provider (ConvertKit/Mailchimp/Resend, etc.)
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  }

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0a0c12]">
      {/* top gradient hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,211,238,.8), rgba(255,62,165,.8))",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Penelope block */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
          <div className="grid grid-cols-[120px_auto] gap-4 md:grid-cols-[160px_auto]">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-black/30 ring-1 ring-white/10">
                <Image
                  src="/corgi-footer-wheelchair.png"
                  alt="Penelope, the tricolor corgi in a purple wheelchair"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 120px, 160px"
                  priority={false}
                />
              </div>
              <p className="mt-2 text-xs text-white/60 text-center">
                Based in Austin • Available for contract or full-time.
              </p>
            </div>

            <div className="flex min-w-0 flex-col justify-center">
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                <span className="text-lg brightness-125 drop-shadow-sm">🐾</span> Meet Penelope
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-white/80">
                She&apos;s the studio mascot and my reminder to build tech that cares for people.
              </p>

              {/* speech bubble */}
              <div className="relative mt-3 rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white/90">
                <span className="text-[15px] leading-6">
                  <em>&ldquo;Please consider hiring remote-ly—</em> my dad looks after me
                  <em> devotedly.&rdquo;</em>
                </span>
                <div
                  aria-hidden
                  className="absolute -left-2 top-4 h-3 w-3 rotate-45 border-l border-t border-white/15 bg-black/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact + subscribe */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="relative rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm" style={{ width: '60px', height: '60px' }}>
                <Image
                  src="/profile-pic.jpg"
                  alt="Hayden Lindley"
                  fill
                  className="rounded-full object-cover"
                  sizes="60px"
                />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white">Stay in the loop</h4>
              <p className="mt-1 text-sm text-white/70">
                Occasional updates on new experiments, open-source work, and talks.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-white placeholder-white/40 outline-none ring-0 focus:border-cyan-300"
              autoComplete="email"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl border border-transparent bg-gradient-to-r from-[#22d3ee] to-[#ff3ea5] px-4 py-2.5 font-semibold text-[#041018] hover:opacity-95"
            >
              Subscribe
            </button>
          </form>

          {status === "ok" && (
            <p className="mt-2 text-sm text-emerald-300">Thanks! Check your inbox to confirm.</p>
          )}
          {status === "err" && (
            <p className="mt-2 text-sm text-rose-300">Hmm, something went wrong. Try again?</p>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              <h5 className="text-sm font-semibold text-white/90">Contact</h5>
              <ul className="mt-1 space-y-1 text-sm text-white/70">
                <li><a href="mailto:hlindley@outlook.com" className="hover:text-white">hlindley@outlook.com</a></li>
                <li><a href="/resume" className="hover:text-white">Resume (PDF)</a></li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              <h5 className="text-sm font-semibold text-white/90">Elsewhere</h5>
              <ul className="mt-1 space-y-1 text-sm text-white/70">
                <li><a href="https://github.com/bohselecta" target="_blank" rel="noopener" className="hover:text-white">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/hayden-lindley/" target="_blank" rel="noopener" className="hover:text-white">LinkedIn</a></li>
                <li><a href="https://chatsaid.com" target="_blank" rel="noopener" className="hover:text-white">Chatsaid</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* tiny legal + brand line */}
      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-sm text-white/60 md:flex-row">
          <div>© {new Date().getFullYear()} Hayden Lindley · Austin, TX</div>
          <div className="text-white/70">
            Built with Next.js & R3F •{" "}
            <span
              className="font-bold"
              style={{
                background:
                  "linear-gradient(90deg, #22d3ee, #ff3ea5)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Corg-verse
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
