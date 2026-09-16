import { ReactNode, useEffect, useRef, useState } from "react";
import { useWindowContext } from "../../../context/windowContext";
import { windowMetadata } from "../../../data/window-metadata-mapping";

interface ExplorerWindowProps {
    id: string;
    name: keyof typeof windowMetadata;
    children?: ReactNode;
    onClose: () => void;
    offset: React.RefObject<{ x: number; y: number }>;
}

const ExplorerWindow = ({ id, name, children, onClose, offset }: ExplorerWindowProps) => {

    const { setActiveWindowId, setActiveDrag, highestZIndex, focusedWindowId, minimizedWindows, minimizeWindow } = useWindowContext();
    const [isMaximized, setIsMaximized] = useState(false);
    const metaData = windowMetadata[name];
    const isFocused = focusedWindowId === id;
    const isMinimized = minimizedWindows.has(id);

    useEffect(() => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.setProperty("z-index", `${highestZIndex}`);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setActiveWindowId(id);
        setActiveDrag(true);

        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const currentPosition = useRef({
        top: 15 + Math.random() * 20,
        left: 20 + Math.random() * 20,
    });

    const maximizeWindow = () => {
        if (!isMaximized) {
            // save current position before maximizing
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                currentPosition.current = {
                    top: (rect.top / window.innerHeight) * 100,
                    left: (rect.left / window.innerWidth) * 100,
                };
            }
        }
        setIsMaximized(!isMaximized);
    };

    return (
        <div
            id={id}
            onMouseDown={() => setActiveWindowId(id)}
            style={isMaximized ? { top: 0, left: 0 }
            : { top: `${currentPosition.current.top}%`, left: `${currentPosition.current.left}%` }
            }
            className={`explorer-wrapper absolute flex flex-col
                ${isMaximized ? 'w-full h-[calc(100%-2.5rem+1px)]' : 'w-1/2 h-2/3 min-w-[700px]'}
                ${isMinimized ? 'hidden' : ''}
            `}>
            <div className={`explorer-window bg-white border border-black shadow-lg w-full h-full flex flex-col`}>
                <div className="explorer-window-header p-2 flex items-center" onMouseDown={handleMouseDown}>
                    <div id={`${id}-header`} className="explorer-window-title flex grow items-center space-x-2 select-none">
                        <img src={metaData.icon} className="w-6 h-6" alt="File Explorer" />
                        <h2 className="cursor-default">{metaData.title}</h2>
                    </div>
                    <div className="explorer-window-controls flex space-x-2">
                        <button className="explorer-window-minimize text-white px-2 py-1 rounded cursor-pointer" onClick={() => minimizeWindow(id)}>
                            <img src="/images/icons/minimizebutton.png" className="w-4 h-4" alt="Minimize" />
                        </button>
                        <button className="explorer-window-maximize text-white px-2 py-1 rounded cursor-pointer" onClick={maximizeWindow}>
                            <img src={isMaximized ? '/images/icons/restorebutton.png' : '/images/icons/maximizebutton.png'} className="w-4 h-4" alt="Maximize" />
                        </button>
                        <button className="explorer-window-close text-white px-2 py-1 rounded cursor-pointer" onClick={onClose}>
                            <img src="/images/icons/closebutton.png" className="w-4 h-4" alt="Close" />
                        </button>
                    </div>
                </div>
                <div className={`flex-1 flex flex-col overflow-hidden ${isFocused ? '' : 'pointer-events-none'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ExplorerWindow;