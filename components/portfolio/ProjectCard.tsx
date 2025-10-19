'use client';

import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/portfolio/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden hover:border-cyan-600 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/10">
      {/* Project Preview Image */}
      <div className="relative aspect-video bg-slate-800 overflow-hidden">
        {project.previewImage && !imageError ? (
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 400 225"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="400" height="225" fill="#1e293b"/>
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#64748b"
                fontSize="14"
                fontFamily="monospace"
              >
                {project.title}
              </text>
            </svg>
          </div>
        )}
        
        {project.featured && (
          <div className="absolute top-3 right-3 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            FEATURED
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
          >
            View Live Demo
            <ExternalLink className="w-4 h-4" />
          </a>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-300 font-medium text-sm transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
