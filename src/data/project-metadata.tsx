interface ProjectMetadataEntry {
    previewImg: string,
    title: string,
    description: string,
    tags: string[],
    date: string,
    url: string,
    experience?: string,
    challenges?: string,
    stats?: { value: string; label: string }[];
}

export type ProjectMetadata = Record<string, ProjectMetadataEntry>;

export const projectMetadata: ProjectMetadata = {
    Pondr: {
        previewImg: "/images/portfolio/pondr.png",
        title: "Pondr",
        description: "Automated bookmark manager built as a Chrome extension with AI integration for tab summaries",
        tags: ["React", "MongoDB", "Chrome Extension"],
        date: "July 2024",
        url: "https://chromewebstore.google.com/detail/pondr-tab-manager-bookmar/dmldofeoomonpalhgkbnfckliaeghjag",
        experience: "Working on Pondr gave me hands-on experience building within the constraints of the Chrome extension environment. From bug fixing to designing a folder system for tab organization, I collaborated with the team to contribute to both frontend and backend features, enhancing the extension's usability and performance. Usage tracking also needed to be lightweight enough to not slow down the extension's core tab-saving flow.",
        challenges: "The biggest challenge was building reliable features within Chrome's extension sandbox. The folder system required thoughtful design to support nesting, renaming, and reordering while remaining user friendly. State could not be kept in memory or stored locally as it had to be persisted to database and synced across devices.",
    },
    UwH: {
        previewImg: "/images/portfolio/uxwashere.png",
        title: "UX was Here",
        description: "Professional networking platform for UI & UX designers to connect and find resources",
        tags: ["React", "Firebase", "Social Media"],
        date: "September 2023",
        url: "https://beta.uxwashere.com",
        experience: "UX Was Here is an all-in-one community platform for UX professionals, combining job discovery, events, forums, and networking. I joined as a developer through Riipen's Levelup program under Omnia Consulting, working with a team of 3–4 developers alongside a lead product designer. I contributed across the full stack, building and shipping features across the platform including the jobs board, events hub, and community forum. I participated in regular pair programming sessions with teammates, which helped maintain code quality and share context across the rotating cohort structure. I conducted code reviews to ensure consistency and catch issues early, and was actively involved in leading daily standups — keeping the team aligned on blockers and progress. Sprint planning was managed in Jira, where I helped break down PRDs from the designer into actionable tickets, estimated effort, and prioritized work for each sprint cycle. Working from detailed product requirements, I collaborated closely with the designer to translate wireframes and prototypes into functional features.",
        challenges: "One of the harder aspects of the project was maintaining momentum with a rotating cohort structure — each new group needed onboarding and context that had to be transferred quickly. Clear documentation, well-scoped Jira tickets, and consistent standup cadence helped bridge those gaps.",
        stats: [
            { value: "400+", label: "Platform Signups" },
            { value: "300+", label: "Newsletter Subscribers" },
            { value: "4", label: "Dev Cohorts" },
        ]
    },
    VLMFSS: {
        previewImg: "/images/portfolio/VLMFSS_Logo.svg",
        title: "Vancouver Multicultural Family Support Society",
        description: "Client relationship management software prototype for internal use with existing clients",
        tags: ["React", "MongoDB", "CRM"],
        date: "September 2022",
        url: "https://vlmfss.org"
    }

}