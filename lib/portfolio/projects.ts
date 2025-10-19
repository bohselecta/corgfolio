import { Project } from '@/types/portfolio/project';

// Inline projects data to avoid JSON import issues in Vercel
const projectsData = [
  {
    id: 1,
    title: "Neon Studio",
    description: "A modern web application showcasing neon-themed design elements and interactive animations. Built with React and Three.js for immersive 3D experiences.",
    category: "web",
    tech: [
      "React",
      "Three.js",
      "Tailwind CSS"
    ],
    liveUrl: "https://neon-studio.example.com",
    githubUrl: "https://github.com/hayden/neon-studio",
    featured: true,
    previewImage: "/screenshots/screenshot1.jpg",
    addedDate: "2025-10-19",
    tags: [
      "react",
      "three.js",
      "tailwind-css"
    ]
  },
  {
    id: 2,
    title: "XR Landing",
    description: "An immersive landing page for XR experiences featuring spatial design and interactive elements. Optimized for both desktop and mobile VR/AR viewing experiences.",
    category: "web",
    tech: [
      "Next.js",
      "WebXR",
      "Three.js"
    ],
    liveUrl: "https://xr-landing.example.com",
    githubUrl: "https://github.com/hayden/xr-landing",
    featured: true,
    previewImage: "/screenshots/screenshot2.jpg",
    addedDate: "2025-10-19",
    tags: [
      "next.js",
      "webxr",
      "three.js"
    ]
  },
  {
    id: 3,
    title: "Gummy Brand",
    description: "Complete brand identity system for a confectionery company with playful animations and vibrant colors. Includes logo design, packaging concepts, and digital marketing materials.",
    category: "creative",
    tech: [
      "Figma",
      "After Effects",
      "Illustrator"
    ],
    liveUrl: "https://gummy-brand.example.com",
    githubUrl: "https://github.com/hayden/gummy-brand",
    featured: true,
    previewImage: "/screenshots/screenshot3.jpg",
    addedDate: "2025-10-19",
    tags: [
      "figma",
      "after-effects",
      "illustrator"
    ]
  },
  {
    id: 4,
    title: "AI Chat Interface",
    description: "A sleek chat interface powered by AI with real-time message streaming and voice input capabilities. Features custom animations and responsive design for seamless user experience.",
    category: "ai",
    tech: [
      "React",
      "Node.js",
      "OpenAI API"
    ],
    liveUrl: "https://ai-chat.example.com",
    githubUrl: "https://github.com/hayden/ai-chat",
    featured: false,
    previewImage: "/screenshots/screenshot4.jpg",
    addedDate: "2025-10-19",
    tags: [
      "react",
      "node.js",
      "openai-api"
    ]
  },
  {
    id: 5,
    title: "Data Visualization",
    description: "Interactive data visualization dashboard with real-time updates and customizable chart types. Built with D3.js and WebGL for smooth animations and large dataset handling.",
    category: "data-science",
    tech: [
      "D3.js",
      "WebGL",
      "Python"
    ],
    liveUrl: "https://data-viz.example.com",
    githubUrl: "https://github.com/hayden/data-viz",
    featured: false,
    previewImage: "/screenshots/screenshot5.jpg",
    addedDate: "2025-10-19",
    tags: [
      "d3.js",
      "webgl",
      "python"
    ]
  },
  {
    id: 6,
    title: "Mobile App Design",
    description: "Complete mobile app design system with custom components and micro-interactions. Includes user flow diagrams, wireframes, and high-fidelity prototypes.",
    category: "creative",
    tech: [
      "Figma",
      "Swift",
      "Kotlin"
    ],
    liveUrl: "https://mobile-app.example.com",
    githubUrl: "https://github.com/hayden/mobile-app",
    featured: false,
    previewImage: "/screenshots/screenshot6.jpg",
    addedDate: "2025-10-19",
    tags: [
      "figma",
      "swift",
      "kotlin"
    ]
  },
  {
    id: 7,
    title: "Web Platform",
    description: "A comprehensive web platform with user authentication, dashboard, and API integration. Built with Next.js and TypeScript for scalability and maintainability.",
    category: "web",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL"
    ],
    liveUrl: "https://web-platform.example.com",
    githubUrl: "https://github.com/hayden/web-platform",
    featured: false,
    previewImage: "/screenshots/screenshot7.jpg",
    addedDate: "2025-10-19",
    tags: [
      "next.js",
      "typescript",
      "postgresql"
    ]
  },
  {
    id: 8,
    title: "Creative Tools",
    description: "A suite of creative tools for designers including color palette generators and asset libraries. Features collaborative workspaces and cloud synchronization.",
    category: "creative",
    tech: [
      "Vue.js",
      "Node.js",
      "MongoDB"
    ],
    liveUrl: "https://creative-tools.example.com",
    githubUrl: "https://github.com/hayden/creative-tools",
    featured: false,
    previewImage: "/screenshots/screenshot8.jpg",
    addedDate: "2025-10-19",
    tags: [
      "vue.js",
      "node.js",
      "mongodb"
    ]
  },
  {
    id: 9,
    title: "Portfolio Site",
    description: "A modern portfolio website with 3D animations and interactive elements. Showcases projects with smooth transitions and responsive design.",
    category: "web",
    tech: [
      "Three.js",
      "GSAP",
      "WebGL"
    ],
    liveUrl: "https://portfolio-site.example.com",
    githubUrl: "https://github.com/hayden/portfolio-site",
    featured: false,
    previewImage: "/screenshots/screenshot9.jpg",
    addedDate: "2025-10-19",
    tags: [
      "three.js",
      "gsap",
      "webgl"
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
