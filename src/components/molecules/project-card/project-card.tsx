import ProjectTags from "components/atoms/project-tags/project-tags";
import { useOpenWindowContext } from "../../../context/openWindowContext";
import { projectMetadata } from "../../../data/project-metadata";
import { windowMetadata } from "../../../data/window-metadata-mapping";

interface ProjectCardProps {
  projectType: keyof typeof windowMetadata | keyof typeof projectMetadata;
}

const ProjectCard = ({ projectType }: ProjectCardProps) => {

  const { setWindowType, setCreateWindow } = useOpenWindowContext();
  const projectData = projectMetadata[projectType];

  const openProject = (projectType: keyof typeof windowMetadata | keyof typeof projectMetadata) => {
    setWindowType(projectType as keyof typeof windowMetadata);
    setCreateWindow(true);
  }

  return (
    <div className="project-card w-[99%] max-w-[1920px] h-60 p-2 m-2 bg-white border border-black/30 shadow-lg flex cursor-pointer overflow-hidden" onClick={() => openProject(projectType)}>
        <div className="project-card-image w-1/4 border-r border-black/30 p-2">
            <img src={projectData.previewImg} alt={projectData.title} className="w-full h-full object-contain" />
        </div>
        <div className="project-card-content w-3/4 p-5 flex flex-col justify-between space-y-4 bg-radial-[at_10%_10%] from-gray-500 to-gray-700 to-75% text-white">
            <h3 className="project-card-title text-2xl font-bold">{projectData.title}</h3>
            <p className="project-card-description text-lg">{projectData.description}</p>
            <div className="project-card-tags flex justify-between">
              <div className="project-card-tags flex space-x-1">
                {projectData.tags.map((val) => (
                  <ProjectTags tagType={val}/>
                ))}
              </div>
              <p className="project-card-date">{projectData.date}</p>
            </div>

            {/* <a rel="noopener noreferrer" className="project-card-link text-blue-500 mt-2 cursor-pointer select-none" onClick={() => openProject(projectType)}>View Project</a> */}
        </div>
    </div>
  );
}

export default ProjectCard;