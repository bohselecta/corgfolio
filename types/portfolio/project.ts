export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'ai' | 'data-science' | 'web' | 'creative';
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  previewImage: string | null;
  addedDate: string;
  tags: string[];
}
