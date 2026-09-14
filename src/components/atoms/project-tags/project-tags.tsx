const TagColours: Record<string, string> = {
    "React": "bg-blue-600",
    "MongoDB": "bg-green-600",
    "Firebase": "bg-red-600",
    "Social Media": "bg-purple-600",
    "CRM": "bg-gray-600",
    "Chrome Extension": "bg-pink-600",
    "ExpressJS": "bg-yellow-600"
}

interface ProjectTagsProps {
    tagType: string;
}

const ProjectTags = ({ tagType }: ProjectTagsProps) => {
    return (
        <div className={`project-tag rounded-full bg-gray-400 px-3 text-white`}>
            {tagType}
        </div>
    );
}

export default ProjectTags;