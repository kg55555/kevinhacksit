import ProjectCard from "components/molecules/project-card/project-card";
import { ProjectMetadata, projectMetadata } from "../../../data/project-metadata";

interface ProjectListingProps {
  searchQuery: string
}

export function searchProjects(query: string): ProjectMetadata {
    if (!query.trim()) return projectMetadata;

    const terms = query.toLowerCase().split(" ").filter(Boolean);

    return Object.fromEntries(
        Object.entries(projectMetadata).filter(([_, project]) =>
            terms.every(term => {
                const regex = new RegExp(`\\b${term}`, 'i');
                return (
                    regex.test(project.title) ||
                    regex.test(project.description) ||
                    project.tags.some(tag => regex.test(tag)) ||
                    regex.test(project.date)
                );
            })
        )
    );
}

const ProjectListing = ({searchQuery}: ProjectListingProps) => {

  const results = searchProjects(searchQuery);


  return (
    <>
    <div className="project-listing flex flex-col items-center">
        {Object.entries(results).map(([key, _]) => (
            <ProjectCard key={key} projectType={key} />
        ))}
      </div>
    </>
  );
};

export default ProjectListing;