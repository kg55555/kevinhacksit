import { useWindowContext } from "../../../context/windowContext";
import { windowMetadata } from "../../../data/window-metadata-mapping";

interface TaskbarIconsProps {
    id: string,
    name: keyof typeof windowMetadata;
}

const TaskbarIcons = ({ id, name }: TaskbarIconsProps) => {

    const { minimizedWindows, minimizeWindow, restoreWindow, focusedWindowId } = useWindowContext();

    const metaData = windowMetadata[name];
    const isMinimized = minimizedWindows.has(id);
    const isFocused = focusedWindowId === id;

    const handleClick = () => {
        if (isMinimized) {
            restoreWindow(id);
        } else if (isFocused) {
            minimizeWindow(id);
        } else {
            restoreWindow(id);
        }
    };

    return (
        <div
            className={`taskbar-icon flex items-center border-b-blue-500 border-b-2 px-3 h-10 hover:bg-white/30 transition duration-100 select-none
            ${isFocused && !isMinimized ? 'bg-white/30' : ''}`}
            onClick={handleClick}>
            <img src={metaData.icon} className="w-6 h-6" alt={metaData.title} />
        </div>
    );
}

export default TaskbarIcons;