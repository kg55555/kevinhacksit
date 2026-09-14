import DesktopIcon from "../../components/atoms/desktop-icons";
import Taskbar from "../../components/organisms/taskbar";
import { useEffect, useRef, useState } from "react";
import ExplorerWindow from "../../components/organisms/explorer-window/explorer-window";
import { useWindowContext } from "../../context/windowContext";
import PortfolioWindow from "components/organisms/portfolio-window";
import { windowMetadata } from "../../data/window-metadata-mapping";
import { useOpenWindowContext } from "../../context/openWindowContext";
import ProjectWindow from "components/organisms/project-window/project-window";
import AboutWindow from "components/organisms/about-window/about-window";

const HomeMain = () => {

  const { activeWindowId, setActiveWindowId, activeDrag, setActiveDrag, closeWindow: contextCloseWindow } = useWindowContext();
  const { createWindow, setCreateWindow, windowType } = useOpenWindowContext();
  const dragHandler = useRef<((e: MouseEvent) => void) | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const [windows, setWindows] = useState<Record<string, React.ReactNode>>({});
  const [taskbarPrograms, setTaskbarPrograms] = useState<Record<string, keyof typeof windowMetadata>>({});
  const lastPosition = useRef({ top: 0, left: 0 });

  const throttle = (callback: (e: MouseEvent) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (e: MouseEvent) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          callback(e);
          timeout = undefined;
        }, wait);
      }
    };
  };

useEffect(() => {
  const el = document.getElementById(activeWindowId ?? "");
  if (!el) return;

  const mouseMoveHandler = (e: MouseEvent) => {
      const minX = window.innerWidth * 0.05;
      const minY = 0;
      const maxX = window.innerWidth * 0.95;
      const maxY = window.innerHeight * 0.90;

      if (e.clientX < minX || e.clientY < minY || e.clientX > maxX || e.clientY > maxY) return;

      const left = e.clientX - offset.current.x;
      const top = e.clientY - offset.current.y;

      lastPosition.current = { top, left };

      el.style.setProperty("left", `${left}px`);
      el.style.setProperty("top", `${top}px`);
  };

  const handleMouseUp = () => {
    setActiveWindowId(null);
    setActiveDrag(false);
    if (dragHandler.current) {
      document.removeEventListener("mousemove", dragHandler.current);
    }
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mouseup", handleMouseUp);

  if (activeDrag) {
    dragHandler.current = throttle((e: MouseEvent) => mouseMoveHandler(e), 25);
    document.addEventListener("mousemove", dragHandler.current);
    document.body.classList.add('select-none');
  } else {
    document.body.classList.remove('select-none');
  }

  return () => {
    if (dragHandler.current) {
      document.removeEventListener("mousemove", dragHandler.current);
    }
    document.removeEventListener("mouseup", handleMouseUp);
  };
}, [activeWindowId, activeDrag]);

  const closeWindow = (id: string) => {
    contextCloseWindow(id);
    setWindows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setTaskbarPrograms((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const openWindow = (windowType: keyof typeof windowMetadata) => {
    const id = `portfolio-${crypto.randomUUID()}`;
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: (
        <ExplorerWindow key={id} id={id} name={windowType} offset={offset} onClose={() => closeWindow(id)}>
          {windowType == "Portfolio" && <PortfolioWindow />}
          {windowType == "About" && <AboutWindow windowType={windowType} />}
          {windowType != "Portfolio" && windowType != "About" && <ProjectWindow windowType={windowType} />}
        </ExplorerWindow>
      )
    }));
    setTaskbarPrograms((prev) => ({
      ...prev,
      [id]: windowType
    }));
  };

  useEffect(() => {
    if (createWindow) {
      openWindow(windowType)
      setCreateWindow(false)
    
    }

  }, [createWindow])

  return (
    <>
      <div className="home-main absolute w-full h-full overflow-hidden z-1">
      <div 
      className="home-main-background absolute top-0 left-0 w-full h-full grid grid-cols-15 auto-rows-min items-start pt-4 z-10"
      style={{ backgroundImage: "url('/images/home-background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <DesktopIcon name="About" onDoubleClick={() => openWindow("About")} />
          <DesktopIcon name="Portfolio" startingRow={2} onDoubleClick={() => openWindow("Portfolio")} />
        </div>

        {Object.entries(windows).map(([id, window]) => (
          <div key={id}>{window}</div>
        ))}

        <Taskbar taskbarPrograms={taskbarPrograms} />
      </div>
    </>
  );
}

export default HomeMain;