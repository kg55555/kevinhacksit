import { windowMetadata } from "../../../data/window-metadata-mapping";
import ProjectTags from "../../atoms/project-tags/project-tags";

interface ProjectWindowProps {
    windowType: keyof typeof windowMetadata,
}


const AboutWindow = ({windowType}: ProjectWindowProps) => {


    return (
        <div className="flex flex-col h-full overflow-y-scroll">

            {/* Hero */}
            <div className="flex items-center space-x-6 p-6 border-b border-black/10">
                <img
                    src="/images/icons/headshot.jfif"
                    className="w-20 h-20 rounded-full object-cover border-2 border-black/10"
                    alt="Avatar"
                />
                <div>
                    <h1 className="text-2xl font-semibold">Kevin Guo</h1>
                    <p className="text-gray-500 text-sm">Full Stack Developer · Vancouver, BC</p>
                </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 p-6 border-b border-black/10">
                <div className="flex flex-col space-y-1">
                    <span className="uppercase tracking-wide">Education</span>
                    <span className="text-sm">Bachelor of Science in Applied Computer Science (Database Option)</span>
                    <span className="text-sm text-gray-500">British Columbia Institute of Technology</span>
                    <span className="text-sm text-gray-500">2026 - Present</span>
                    <span className="text-sm text-gray-400"> --- </span>

                    <span className="text-sm">Computer Systems Technology Diploma</span>
                    <span className="text-sm text-gray-500">British Columbia Institute of Technology</span>
                    <span className="text-sm text-gray-500">2023</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="uppercase tracking-wide">Experience</span>
                    <span className="text-sm">2+ Years</span>
                    <span className="text-sm text-gray-500">Web & Software Development</span>
                    <span className="text-sm">5 Years</span>
                    <span className="text-sm text-gray-500">Retail & Telecom Sales</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="uppercase tracking-wide">Currently</span>
                    <span className="text-sm">Open to Work</span>
                    <span className="text-sm text-gray-500">Full Stack / DevOps Roles</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="uppercase tracking-wide">Based In</span>
                    <span className="text-sm">Vancouver, BC</span>
                    <span className="text-sm text-gray-500">Open to Remote</span>
                </div>
            </div>

            {/* Bio */}
            <div className="p-6 border-b border-black/10">
                <span className="uppercase tracking-wide">About</span>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                    Curiosity is the word that drives my passion for development and all things tech. Whether it was building my first computer or solving a business problem, I have always been driven to find ways for technology to solve real-world challenges. With over 2 years of development experience and 5 more in retail/telecom sales, I have honed my skills in creating exceptional applications as well as the communication needed to organize and lead teams. My expertise spans across various technologies, including React, Node.js, and database management, allowing me to build robust solutions. I thrive in collaborative environments, constantly seeking opportunities to learn and grow.
                </p>
            </div>

            {/* Languages */}
            <div className="p-6 border-b border-black/10">
                <span className="uppercase tracking-wide">Languages</span>
                <div className="flex flex-wrap gap-2 mt-2">
                    {["TypeScript", "JavaScript", "Python", "SQL","C#", "Java"].map(language => (
                        <ProjectTags key={language} tagType={language} />
                    ))}
                </div>
            </div>

            {/* Technologies */}
            <div className="p-6 border-b border-black/10">
                <span className="uppercase tracking-wide">Technologies</span>
                <div className="flex flex-wrap gap-2 mt-2">
                    {["React", "TailwindCSS", "Node.js", "MongoDB", "Firebase", "PostgreSQL", "Jira", "Jest", "Docker", "Git", "Figma", "Docker", "Kubernetes"].map(skill => (
                        <ProjectTags key={skill} tagType={skill} />
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className="p-6 border-b border-black/10">
                <span className="uppercase tracking-wide">Skills</span>
                <div className="flex flex-wrap gap-2 mt-2">
                    {["Project Management", "Sales", "Public Speaking", "Technical Troubleshooting"].map(skill => (
                        <ProjectTags key={skill} tagType={skill} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AboutWindow;