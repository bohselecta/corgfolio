import React from 'react';
import { Github, Linkedin, Mail, Award, BookOpen, Briefcase, Code, Sparkles } from 'lucide-react';
import ProjectCard from '@/components/portfolio/ProjectCard';
import FilterButtons from '@/components/portfolio/FilterButtons';
import { getProjects } from '@/lib/portfolio/projects';

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative border-b border-slate-800 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/header-bckgrnd.jpg)',
            filter: 'brightness(0.3) saturate(1.2)'
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <span className="text-cyan-400 font-mono text-sm tracking-wider">PORTFOLIO 2025</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">
              Hayden Lindley
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl leading-relaxed">
              AI-accelerated creative developer building production experiences in the age of unbridled creativity
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="mailto:hayden@example.com"
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </a>
              <a 
                href="https://www.linkedin.com/in/hayden-lindley/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/bohselecta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-cyan-400">{projects.length}</div>
              <div className="text-slate-400 text-sm mt-1">Production Apps</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">32</div>
              <div className="text-slate-400 text-sm mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">5+</div>
              <div className="text-slate-400 text-sm mt-1">Disciplines</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">∞</div>
              <div className="text-slate-400 text-sm mt-1">Creative Potential</div>
            </div>
          </div>
        </div>
      </div>

      {/* Who I Am Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-white mb-6">The Rare Breed</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I don&apos;t fit in a box, and that&apos;s my superpower. After three decades in software, I&apos;ve learned that the most valuable people aren&apos;t specialists—they&apos;re synthesizers. I bridge worlds most people don&apos;t even know exist.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="flex gap-4">
                <Code className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Technical Depth</h3>
                  <p className="text-slate-400 text-sm">32 years of software development, from enterprise systems to cutting-edge AI. I&apos;ve seen paradigms come and go. I adapt and ship.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Briefcase className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Real-World Execution</h3>
                  <p className="text-slate-400 text-sm">Residential architectural designer & general contractor. I understand budgets, timelines, stakeholders, and the gap between vision and reality.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Award className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Research Credibility</h3>
                  <p className="text-slate-400 text-sm">Data science inventions with published papers. Constitutional AI training with benchmark results coming soon. I don&apos;t just build—I advance the field.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <BookOpen className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Human Understanding</h3>
                  <p className="text-slate-400 text-sm">MA in Counseling + musician. I build for humans, not just machines. UX isn&apos;t a department—it&apos;s empathy encoded in every interaction.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-300 text-lg font-medium">
              In the AI era, companies don&apos;t need more prompt engineers. They need people who can <span className="text-cyan-400">envision</span>, <span className="text-cyan-400">architect</span>, <span className="text-cyan-400">execute</span>, and <span className="text-cyan-400">ship</span>. I&apos;m one of the few.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <FilterButtons projects={projects} />
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Add a Force Multiplier to Your Team?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            I don&apos;t just write code—I architect solutions, envision possibilities, and ship products that matter. Let&apos;s talk about what we can build together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:hayden@example.com"
              className="flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium text-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              hayden@example.com
            </a>
            <a
              href="https://www.linkedin.com/in/hayden-lindley/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium text-lg transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <div>
              <p>Hayden Lindley • Austin, TX • 46 • MA Counseling</p>
              <p className="text-xs mt-1">32 Years Software • Architect • Contractor • AI Developer • Musician • Researcher</p>
            </div>
            <div className="text-slate-600 text-xs">
              © 2025 • Built with Next.js & Claude
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
