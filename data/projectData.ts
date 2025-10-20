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
    id: "1",
    title: "Tablature",
    description: [
      "A privacy-first platform designed to align team intent and execution.",
      "Allows workers to share needs safely while providing managers with clear insights without personal diaries."
    ],
    deploymentUrl: "https://www.tablature.io/",
    githubUrl: "https://github.com/bohselecta/middle-ground",
    screenshotPath: "/previews/tablature.jpg"
  },
  {
    id: "2",
    title: "Mr Deep Seeks",
    description: [
      "An AI-powered search platform that provides intelligent search capabilities.",
      "Features advanced query processing and contextual results for enhanced user experience."
    ],
    deploymentUrl: "https://www.mrdeepseeks.me/",
    githubUrl: "https://github.com/bohselecta/mrdeepseeks",
    screenshotPath: "/previews/mrdeepseeks.jpg"
  },
  {
    id: "3",
    title: "Wove",
    description: [
      "A modern web application featuring innovative design patterns and interactive user experiences.",
      "Built with cutting-edge web technologies for immersive digital experiences."
    ],
    deploymentUrl: "https://wove-nine.vercel.app/",
    githubUrl: "https://github.com/bohselecta/wove",
    screenshotPath: "/previews/wove.jpg"
  },
  {
    id: "4",
    title: "Luvler",
    description: [
      "A modern dating platform with intuitive user interface and advanced matching algorithms.",
      "Features real-time messaging and profile customization for meaningful connections."
    ],
    deploymentUrl: "https://luvler.com/",
    githubUrl: "https://github.com/bohselecta/luvler",
    screenshotPath: "/previews/luvler.jpg"
  },
  {
    id: "5",
    title: "Schema",
    description: [
      "A data modeling and schema management platform that helps developers design, validate, and manage database schemas.",
      "Features visual tools for efficient database design and management."
    ],
    deploymentUrl: "https://schema-swart.vercel.app/",
    githubUrl: "https://github.com/bohselecta/schema",
    screenshotPath: "/previews/schema.jpg"
  },
  {
    id: "6",
    title: "Etifyd Demo",
    description: [
      "A demonstration platform showcasing innovative web technologies and user interface patterns.",
      "Features interactive demos and real-time updates for engaging user experiences."
    ],
    deploymentUrl: "https://etifyd-demo.vercel.app/",
    githubUrl: "https://github.com/bohselecta/etifyd-demo",
    screenshotPath: "/previews/etifyd.jpg"
  },
  {
    id: "7",
    title: "MechaCrew",
    description: [
      "A community platform for mechanical engineering professionals featuring project showcases and collaboration tools.",
      "Enables knowledge sharing and networking within the mechanical engineering community."
    ],
    deploymentUrl: "https://mechacrew.org/",
    githubUrl: "https://github.com/bohselecta/mechacrew",
    screenshotPath: "/previews/mechacrew.jpg"
  },
  {
    id: "8",
    title: "Glyphos",
    description: [
      "A creative typography and design platform featuring custom font tools, text effects, and design utilities.",
      "Designed for creative professionals who need advanced typography and design capabilities."
    ],
    deploymentUrl: "https://glyphos.vercel.app/",
    githubUrl: "https://github.com/bohselecta/glyphos",
    screenshotPath: "/previews/glyphos.jpg"
  },
  {
    id: "9",
    title: "Labs for America",
    description: [
      "A civic technology platform providing one-click deployment of community websites.",
      "Enables schools, departments, and local organizations to quickly establish their online presence."
    ],
    deploymentUrl: "https://labs-for-america.vercel.app/",
    githubUrl: "https://github.com/bohselecta/labs-for-america",
    screenshotPath: "/previews/labs-for-america.jpg"
  }
];

// Utility function to get project by ID
export function getProjectById(id: string): ProjectData | undefined {
  return projectData.find(project => project.id === id);
}
