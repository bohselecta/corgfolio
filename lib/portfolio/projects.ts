import { Project } from '@/types/portfolio/project';

// Inline projects data to avoid JSON import issues in Vercel
const projectsData = [
  {
    id: 1,
    title: "Tablature",
    description: "A privacy-first platform designed to align team intent and execution. Allows workers to share needs safely while providing managers with clear insights without personal diaries.",
    category: "web",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    liveUrl: "https://www.tablature.io/",
    githubUrl: "https://github.com/bohselecta/middle-ground",
    featured: true,
    previewImage: "/previews/tablature.jpg",
    addedDate: "2025-01-15",
    tags: [
      "next.js",
      "typescript",
      "tailwind-css"
    ]
  },
  {
    id: 2,
    title: "Mr Deep Seeks",
    description: "An AI-powered search platform that provides intelligent search capabilities with advanced query processing and contextual results.",
    category: "ai",
    tech: [
      "React",
      "Node.js",
      "AI/ML"
    ],
    liveUrl: "https://www.mrdeepseeks.me/",
    githubUrl: "https://github.com/bohselecta/mrdeepseeks",
    featured: true,
    previewImage: "/previews/mrdeepseeks.jpg",
    addedDate: "2025-01-15",
    tags: [
      "react",
      "node.js",
      "ai-ml"
    ]
  },
  {
    id: 3,
    title: "Wove",
    description: "A modern web application featuring innovative design patterns and interactive user experiences. Built with cutting-edge web technologies.",
    category: "web",
    tech: [
      "Next.js",
      "Three.js",
      "WebGL"
    ],
    liveUrl: "https://wove-nine.vercel.app/",
    githubUrl: "https://github.com/bohselecta/wove",
    featured: true,
    previewImage: "/previews/wove.jpg",
    addedDate: "2025-01-15",
    tags: [
      "next.js",
      "three.js",
      "webgl"
    ]
  },
  {
    id: 4,
    title: "Luvler",
    description: "A modern dating platform with intuitive user interface and advanced matching algorithms. Features real-time messaging and profile customization.",
    category: "web",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    liveUrl: "https://luvler.com/",
    githubUrl: "https://github.com/bohselecta/luvler",
    featured: false,
    previewImage: "/previews/luvler.jpg",
    addedDate: "2025-01-15",
    tags: [
      "react",
      "node.js",
      "postgresql"
    ]
  },
  {
    id: 5,
    title: "Schema",
    description: "A data modeling and schema management platform that helps developers design, validate, and manage database schemas with visual tools.",
    category: "data-science",
    tech: [
      "Next.js",
      "TypeScript",
      "Database Design"
    ],
    liveUrl: "https://schema-swart.vercel.app/",
    githubUrl: "https://github.com/bohselecta/schema",
    featured: false,
    previewImage: "/previews/schema.jpg",
    addedDate: "2025-01-15",
    tags: [
      "next.js",
      "typescript",
      "database-design"
    ]
  },
  {
    id: 6,
    title: "Etifyd Demo",
    description: "A demonstration platform showcasing innovative web technologies and user interface patterns. Features interactive demos and real-time updates.",
    category: "web",
    tech: [
      "React",
      "WebSockets",
      "Real-time"
    ],
    liveUrl: "https://etifyd-demo.vercel.app/",
    githubUrl: "https://github.com/bohselecta/etifyd-demo",
    featured: false,
    previewImage: "/previews/etifyd.jpg",
    addedDate: "2025-01-15",
    tags: [
      "react",
      "websockets",
      "real-time"
    ]
  },
  {
    id: 7,
    title: "MechaCrew",
    description: "A community platform for mechanical engineering professionals featuring project showcases, collaboration tools, and knowledge sharing.",
    category: "web",
    tech: [
      "Next.js",
      "Community Features",
      "User Management"
    ],
    liveUrl: "https://mechacrew.org/",
    githubUrl: "https://github.com/bohselecta/mechacrew",
    featured: false,
    previewImage: "/previews/mechacrew.jpg",
    addedDate: "2025-01-15",
    tags: [
      "next.js",
      "community",
      "user-management"
    ]
  },
  {
    id: 8,
    title: "Glyphos",
    description: "A creative typography and design platform featuring custom font tools, text effects, and design utilities for creative professionals.",
    category: "creative",
    tech: [
      "WebGL",
      "Typography",
      "Design Tools"
    ],
    liveUrl: "https://glyphos.vercel.app/",
    githubUrl: "https://github.com/bohselecta/glyphos",
    featured: false,
    previewImage: "/previews/glyphos.jpg",
    addedDate: "2025-01-15",
    tags: [
      "webgl",
      "typography",
      "design-tools"
    ]
  },
  {
    id: 9,
    title: "Labs for America",
    description: "A civic technology platform providing one-click deployment of community websites for schools, departments, and local organizations.",
    category: "web",
    tech: [
      "Next.js",
      "Civic Tech",
      "Community Tools"
    ],
    liveUrl: "https://labs-for-america.vercel.app/",
    githubUrl: "https://github.com/bohselecta/labs-for-america",
    featured: false,
    previewImage: "/previews/labs-for-america.jpg",
    addedDate: "2025-01-15",
    tags: [
      "next.js",
      "civic-tech",
      "community-tools"
    ]
  }
];

export async function getProjects(): Promise<Project[]> {
  // Convert the inline data to the expected format
  return projectsData.map((project) => ({
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
