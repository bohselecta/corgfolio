'use client';

import React, { useState } from 'react';
import { Project } from '@/types/portfolio/project';

interface FilterButtonsProps {
  projects: Project[];
}

export default function FilterButtons({ projects }: FilterButtonsProps) {
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: `All Projects (${projects.length})` },
    { key: 'featured', label: '⭐ Featured' },
    { key: 'ai', label: 'AI/ML' },
    { key: 'data-science', label: 'Data Science' },
    { key: 'web', label: 'Web Apps' },
    { key: 'creative', label: 'Creative Tools' },
  ];

  // Update the projects grid when filter changes
  React.useEffect(() => {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
      // This will be handled by the parent component
      // For now, we'll just update the filter state
    }
  }, [filter]);

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => setFilter(category.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === category.key
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
