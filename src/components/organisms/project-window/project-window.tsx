import { windowMetadata } from "../../../data/window-metadata-mapping";
import UxhWindow from "../uxh-window/uxh-window";
import PondrWindow from "../pondr-window/pondr-window";
import UnderConstruction from "../underconstruction-window/underconstruction-window";

interface ProjectWindowProps {
    windowType: keyof typeof windowMetadata,
}

const ProjectWindow = ({windowType}: ProjectWindowProps) => {
    const projectData = windowMetadata[windowType];

    return (<>
        <div className="project-window-toolbar flex items-center w-full px-4">
            <div className="project-window-nav flex space-x-2 mr-2">
                <button className="explorer-window-back rounded">
                    <img src="/images/icons/backwardsarrow.png" className="w-4 h-4" alt="Back" />
                </button>
                <button className="explorer-window-forward rounded">
                    <img src="/images/icons/forwardarrow.png" className="w-4 h-4" alt="Forward" />
                </button>
            </div>

            <div className="explorer-window-file-hierarchy flex grow items-center mx-1 p-1 mr-5 border border-black/30 rounded-full">
                <img src="/images/icons/greenlock.png" className="w-4 h-4 mx-2 selec-none"></img>
                <p>{projectData.url}</p>
            </div>

            <div className="project-window-icon flex items-center mr-2">
                <img src="/images/icons/kicon.png" className="w-7 h-7 rounded-full" alt="Profile" />
            </div>
        </div>

        <div className="explorer-window-content h-full overflow-y-scroll mt-2">
            {windowType === "UwH" && <UxhWindow projectType={windowType} />}
            {windowType === "Pondr" && <PondrWindow projectType={windowType} />}
            {windowType === "VLMFSS" && <UnderConstruction />}
        </div>
    </>)

}

export default ProjectWindow;