import { Project } from '@/types/portfolio/project';
import projectsData from '@/data/projects.json';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  previewImage: string;
  addedDate: string;
  tags: string[];
}

export async function getProjects(): Promise<Project[]> {
  // Convert the projects.json data to the expected format
  return projectsData.map((project: ProjectData) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.category as 'ai' | 'data-science' | 'web' | 'creative',
    tech: project.tech,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    featured: project.featured,
    previewImage: project.previewImage as string | null,
    addedDate: project.addedDate,
    tags: project.tags
  }));
}
