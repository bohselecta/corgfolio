export interface ProjectData {
  id: string;
  title: string;
  description: string[];  // 2-3 sentence paragraphs
  deploymentUrl: string;
  githubUrl: string;
  screenshotPath: string; // "/screenshots/screenshot1.jpg"
}

export const projectData: ProjectData[] = [
  {
    id: "neon-studio",
    title: "Neon Studio",
    description: [
      "A modern web application showcasing neon-themed design elements and interactive animations.",
      "Built with React and Three.js for immersive 3D experiences."
    ],
    deploymentUrl: "https://neon-studio.example.com",
    githubUrl: "https://github.com/hayden/neon-studio",
    screenshotPath: "/screenshots/screenshot1.jpg"
  },
  {
    id: "xr-landing",
    title: "XR Landing",
    description: [
      "An immersive landing page for XR experiences featuring spatial design and interactive elements.",
      "Optimized for both desktop and mobile VR/AR viewing experiences."
    ],
    deploymentUrl: "https://xr-landing.example.com",
    githubUrl: "https://github.com/hayden/xr-landing",
    screenshotPath: "/screenshots/screenshot2.jpg"
  },
  {
    id: "gummy-brand",
    title: "Gummy Brand",
    description: [
      "Complete brand identity system for a confectionery company with playful animations and vibrant colors.",
      "Includes logo design, packaging concepts, and digital marketing materials."
    ],
    deploymentUrl: "https://gummy-brand.example.com",
    githubUrl: "https://github.com/hayden/gummy-brand",
    screenshotPath: "/screenshots/screenshot3.jpg"
  },
  {
    id: "ai-chat",
    title: "AI Chat Interface",
    description: [
      "A sleek chat interface powered by AI with real-time message streaming and voice input capabilities.",
      "Features custom animations and responsive design for seamless user experience."
    ],
    deploymentUrl: "https://ai-chat.example.com",
    githubUrl: "https://github.com/hayden/ai-chat",
    screenshotPath: "/screenshots/screenshot4.jpg"
  },
  {
    id: "data-viz",
    title: "Data Visualization",
    description: [
      "Interactive data visualization dashboard with real-time updates and customizable chart types.",
      "Built with D3.js and WebGL for smooth animations and large dataset handling."
    ],
    deploymentUrl: "https://data-viz.example.com",
    githubUrl: "https://github.com/hayden/data-viz",
    screenshotPath: "/screenshots/screenshot5.jpg"
  },
  {
    id: "mobile-app",
    title: "Mobile App Design",
    description: [
      "Complete mobile app design system with custom components and micro-interactions.",
      "Includes user flow diagrams, wireframes, and high-fidelity prototypes."
    ],
    deploymentUrl: "https://mobile-app.example.com",
    githubUrl: "https://github.com/hayden/mobile-app",
    screenshotPath: "/screenshots/screenshot6.jpg"
  },
  {
    id: "web-platform",
    title: "Web Platform",
    description: [
      "A comprehensive web platform with user authentication, dashboard, and API integration.",
      "Built with Next.js and TypeScript for scalability and maintainability."
    ],
    deploymentUrl: "https://web-platform.example.com",
    githubUrl: "https://github.com/hayden/web-platform",
    screenshotPath: "/screenshots/screenshot7.jpg"
  },
  {
    id: "creative-tools",
    title: "Creative Tools",
    description: [
      "A suite of creative tools for designers including color palette generators and asset libraries.",
      "Features collaborative workspaces and cloud synchronization."
    ],
    deploymentUrl: "https://creative-tools.example.com",
    githubUrl: "https://github.com/hayden/creative-tools",
    screenshotPath: "/screenshots/screenshot8.jpg"
  },
  {
    id: "portfolio-site",
    title: "Portfolio Site",
    description: [
      "A modern portfolio website with 3D animations and interactive elements.",
      "Showcases projects with smooth transitions and responsive design."
    ],
    deploymentUrl: "https://portfolio-site.example.com",
    githubUrl: "https://github.com/hayden/portfolio-site",
    screenshotPath: "/screenshots/screenshot9.jpg"
  }
];

// Utility function to get project by ID
export function getProjectById(id: string): ProjectData | undefined {
  return projectData.find(project => project.id === id);
}
