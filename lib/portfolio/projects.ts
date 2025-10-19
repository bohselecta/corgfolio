import { Project } from '@/types/portfolio/project';
import projectsData from '@/data/projects.json';

export async function getProjects(): Promise<Project[]> {
  // Convert the projects.json data to the expected format
  return projectsData.map((project: Record<string, unknown>) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.category,
    tech: project.tech,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    featured: project.featured,
    previewImage: project.previewImage,
    addedDate: project.addedDate,
    tags: project.tags
  }));
}
