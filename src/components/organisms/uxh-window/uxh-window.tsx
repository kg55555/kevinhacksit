import { projectMetadata } from "../../../data/project-metadata";

interface ProjectPageProps {
  projectType: keyof typeof projectMetadata;
}

const UxhWindow = ({ projectType }: ProjectPageProps) => {
    const project = projectMetadata[projectType];

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">

            {/* Hero */}
            <div className="w-full h-40 flex-shrink-0 border-b border-black/10">
                <img
                    src={project.previewImg}
                    className="w-full h-full object-cover"
                    alt={project.title}
                />
            </div>

            <div className="p-6 flex flex-col space-y-8">

                {/* Title Block */}
                <div className="flex items-start justify-between">
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-xl font-semibold">{project.title}</h1>
                        <p className="text-sm text-gray-500">{project.date} · Full Stack Developer</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-sm bg-black/5 border border-black/10 rounded-full px-2 py-0.5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline flex-shrink-0 ml-4"
                        >
                            View Live →
                        </a>
                    )}
                </div>

                {/* Overview */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Overview</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                </div>

                {/* Role & Contributions */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Role & Contributions</span>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        {[
                            { label: "Development", desc: "Built and shipped features across the full stack including core platform pages and components." },
                            { label: "Code Reviews", desc: "Reviewed teammate PRs to maintain code quality, consistency, and catch issues early." },
                            { label: "Pair Programming", desc: "Collaborated closely with teammates to share context and solve problems together." },
                            { label: "Standups & Planning", desc: "Led daily standups and helped break down PRDs into Jira tickets for sprint planning." },
                        ].map(({ label, desc }) => (
                            <div key={label} className="flex flex-col space-y-1 p-3 bg-black/[0.02] border border-black/10 rounded">
                                <span className="text-sm font-medium text-gray-700">{label}</span>
                                <span className="text-sm text-gray-500 leading-relaxed">{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Screenshots */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Screenshots</span>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        {["landing", "site"].map(i => (
                            <div key={i} className="border border-black/10 rounded overflow-hidden">
                                <img
                                    src={`/images/portfolio/uxwashere_${i}.png`}
                                    className="w-full h-full object-cover"
                                    alt={`${project.title} screenshot ${i}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Experience</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{project.experience}</p>
                </div>

                {/* Challenges */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Key Challenges</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{project.challenges}</p>
                </div>

                {/* Impact */}
                <div className="flex flex-col space-y-3">
                    <span className="uppercase tracking-wide">Impact</span>
                    <div className="flex space-x-3">
                        {project.stats?.map(({ value, label }) => (
                            <div key={label} className="flex-1 flex flex-col items-center p-3 bg-black/[0.02] border border-black/10 rounded text-center">
                                <span className="text-lg font-semibold text-gray-800">{value}</span>
                                <span className="text-sm text-gray-500 mt-0.5">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UxhWindow;