import { projectMetadata } from "../../../data/project-metadata";

interface ProjectPageProps {
  projectType: keyof typeof projectMetadata;
}

const PondrWindow = ({ projectType }: ProjectPageProps) => {
    const project = projectMetadata[projectType];

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">

            {/* Hero */}
            <div className="w-full h-40 flex-shrink-0 border-b border-black/10">
                <img
                    src={project.previewImg}
                    className="w-full h-full object-cover object-cover"
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
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Pondr is a Chrome extension that automatically bookmarks and summarizes open tabs using AI, helping users manage tab overload. The extension captures browsing context, generates concise AI summaries per tab, and organizes saved tabs into a folder system for later retrieval. I joined as a developer contributing to core features across the extension's lifecycle.
                    </p>
                </div>

                {/* Role & Contributions */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Role & Contributions</span>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        {[
                            { label: "Usage Tracking", desc: "Implemented analytics to track how users interacted with saved tabs and summaries, providing insight into engagement patterns." },
                            { label: "Folder System", desc: "Built the folder organization system allowing users to categorize and manage their saved tabs into named collections." },
                            { label: "Bug Fixing", desc: "Identified and resolved bugs across the extension including edge cases with tab capture and summary generation." },
                            { label: "Chrome Extension APIs", desc: "Worked with Chrome's extension APIs for tab management, storage, and background service workers." },
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
                        {["landing", "figma"].map(i => (
                            <div key={i} className="border border-black/10 rounded overflow-hidden">
                                <img
                                    src={`/images/portfolio/pondr_${i}.png`}
                                    className="w-full h-full object-cover"
                                    alt={`Pondr ${i}`}
                                    onError={(e) => {
                                        e.currentTarget.parentElement!.style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Experience</span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {project.experience}
                    </p>
                    
                </div>

                {/* Key Challenges */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Key Challenges</span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {project.challenges}
                    </p>
                </div>

                {/* Technical Highlights */}
                <div className="flex flex-col space-y-2">
                    <span className="uppercase tracking-wide">Technical Highlights</span>
                    <div className="flex flex-col space-y-2 mt-1">
                        {[
                            "Designed and implemented a hierarchical folder data model stored in MongoDB, keeping tabs organized across devices.",
                            "Built usage tracking that captured tab save frequency, folder access patterns, and summary interactions without impacting extension performance.",
                            "Troubleshot and resolved communication issues between the extension and the backend API.",
                        ].map((point, i) => (
                            <p key={i} className="text-sm text-gray-700 leading-relaxed pl-4">
                                {point}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PondrWindow;