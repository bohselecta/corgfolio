#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const unifiedDataPath = path.join(__dirname, '../data/unified-projects.json');
const projectDataPath = path.join(__dirname, '../data/projectData.ts');
const projectsJsonPath = path.join(__dirname, '../data/projects.json');

console.log('🔄 Starting unified data sync...\n');

try {
    // Read unified data
    if (!fs.existsSync(unifiedDataPath)) {
        console.error('❌ unified-projects.json not found. Run dashboard first.');
        process.exit(1);
    }
    
    const unifiedData = JSON.parse(fs.readFileSync(unifiedDataPath, 'utf8'));
    console.log(`📊 Found ${unifiedData.projects.length} projects in unified data`);

    // 1. Update projectData.ts (for CorgVerse Console)
    console.log('\n📝 Updating projectData.ts...');
    const projectDataContent = `export interface ProjectData {
  id: string;
  title: string;
  description: string[];  // 2-3 sentence paragraphs
  deploymentUrl: string;
  githubUrl: string;
  screenshotPath: string; // "/screenshots/screenshot1.jpg"
}

export const projectData: ProjectData[] = [
${unifiedData.projects.map(project => `  {
    id: "${project.title.toLowerCase().replace(/\s+/g, '-')}",
    title: "${project.title}",
    description: [
      "${project.description.split('. ')[0]}.",
      "${project.description.split('. ').slice(1).join('. ')}"
    ],
    deploymentUrl: "${project.liveUrl}",
    githubUrl: "${project.githubUrl}",
    screenshotPath: "${project.screenshotPath}"
  }`).join(',\n')}
];

// Utility function to get project by ID
export function getProjectById(id: string): ProjectData | undefined {
  return projectData.find(project => project.id === id);
}
`;
    
    fs.writeFileSync(projectDataPath, projectDataContent);
    console.log('✅ Updated projectData.ts');

    // 2. Update projects.json (for hayden-portfolio-site compatibility)
    console.log('\n📝 Updating projects.json...');
    const projectsJson = unifiedData.projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        category: project.category,
        tech: project.framework.split(' • '),
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        featured: project.featured,
        previewImage: project.screenshotPath,
        addedDate: new Date().toISOString().split('T')[0],
        tags: project.framework.split(' • ').map(tech => tech.trim().toLowerCase().replace(/\s+/g, '-'))
    }));
    
    fs.writeFileSync(projectsJsonPath, JSON.stringify(projectsJson, null, 2));
    console.log('✅ Updated projects.json');

    // 3. Update FloppyCarousel projects array
    console.log('\n📝 Updating FloppyCarousel.tsx...');
    const floppyCarouselPath = path.join(__dirname, '../components/FloppyCarousel.tsx');
    let floppyContent = fs.readFileSync(floppyCarouselPath, 'utf8');
    
    // Find and replace the projects array
    const projectsArrayStart = floppyContent.indexOf('const projects = [');
    const projectsArrayEnd = floppyContent.indexOf('];', projectsArrayStart) + 2;
    
    const newProjectsArray = `const projects = [
${unifiedData.projects.map(project => `    { title: "${project.title}", description: "${project.description.split('.')[0]}.", tech: "${project.framework}", color: ${getColorForProject(project.id)}, url: "${project.liveUrl}", github: "${project.githubUrl}" }`).join(',\n')}
];`;
    
    floppyContent = floppyContent.substring(0, projectsArrayStart) + 
                   newProjectsArray + 
                   floppyContent.substring(projectsArrayEnd);
    
    fs.writeFileSync(floppyCarouselPath, floppyContent);
    console.log('✅ Updated FloppyCarousel.tsx');

    // 4. Update CorgVerseConsole projects
    console.log('\n📝 Updating CorgVerseConsole.tsx...');
    const corgVersePath = path.join(__dirname, '../components/CorgVerseConsole.tsx');
    let corgContent = fs.readFileSync(corgVersePath, 'utf8');
    
    // Find the projects array in CorgVerseConsole
    const corgProjectsStart = corgContent.indexOf('const projects = [');
    if (corgProjectsStart !== -1) {
        const corgProjectsEnd = corgContent.indexOf('];', corgProjectsStart) + 2;
        
        const newCorgProjectsArray = `const projects = [
${unifiedData.projects.map(project => `  { id: "${project.title.toLowerCase().replace(/\s+/g, '-')}", title: "${project.title}", img: "${project.screenshotPath}" }`).join(',\n')}
];`;
        
        corgContent = corgContent.substring(0, corgProjectsStart) + 
                     newCorgProjectsArray + 
                     corgContent.substring(corgProjectsEnd);
        
        fs.writeFileSync(corgVersePath, corgContent);
        console.log('✅ Updated CorgVerseConsole.tsx');
    }

    // 5. Update hayden-portfolio-site data
    console.log('\n📝 Updating hayden-portfolio-site data...');
    const haydenDataPath = path.join(__dirname, '../hayden-portfolio-site/data/projects.json');
    if (fs.existsSync(haydenDataPath)) {
        fs.writeFileSync(haydenDataPath, JSON.stringify(projectsJson, null, 2));
        console.log('✅ Updated hayden-portfolio-site data');
    }

    console.log('\n🎉 Data sync complete!');
    console.log(`📈 Updated ${unifiedData.projects.length} projects across all components`);
    console.log('💡 Changes will be reflected on next build/deployment');

} catch (error) {
    console.error('❌ Error during sync:', error.message);
    process.exit(1);
}

// Helper function to generate colors for floppy disks
function getColorForProject(id) {
    const colors = [
        0x00ffff, 0xff00ff, 0x00ff00, 0xffff00, 0xff6600,
        0x00ffff, 0xff0066, 0x6600ff, 0x00ff88, 0xff8800,
        0x0088ff, 0xff00aa, 0xaaff00, 0x00aaff, 0xff66ff,
        0x66ff00, 0xff6666, 0x6666ff, 0x66ffff, 0xffff66
    ];
    return colors[(id - 1) % colors.length];
}
