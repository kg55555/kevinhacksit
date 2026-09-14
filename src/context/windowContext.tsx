import { createContext, useCallback, useContext, useState } from 'react';

interface WindowContextType {
  activeWindowId: string | null;
  setActiveWindowId: (id: string | null) => void;
  highestZIndex: number;
  setHighestZIndex: (zIndex: number) => void;
  activeDrag: boolean;
  setActiveDrag: (drag: boolean) => void;
  focusedWindowId: string | null;
  setFocusedWindowId: (id: string | null) => void;
  minimizedWindows: Set<string>;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  closeWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function useWindowContext() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindowContext must be used within a WindowProvider');
  return ctx;
}

export function WindowProvider({ children }: { children: React.ReactNode }) {
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [highestZIndex, setHighestZIndex] = useState(100);
    const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
    const [activeDrag, setActiveDrag] = useState(false);
    const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());
    const [focusStack, setFocusStack] = useState<string[]>([]);

    const handleSetActiveWindowId = useCallback((id: string | null) => {
        setActiveWindowId(id);
        if (id) {
            setFocusedWindowId(id);
            setFocusStack(prev => [...prev.filter(i => i !== id), id]);
            setHighestZIndex((prev) => {
                const next = prev + 1;
                document.getElementById(id)?.style.setProperty("z-index", `${next}`);
                return next;
            });
        }
    }, []);

    const minimizeWindow = (id: string) => {
        setMinimizedWindows(prev => new Set(prev).add(id));
        setFocusStack(prev => {
            const next = prev.filter(i => i !== id);
            const previousFocus = next[next.length - 1] ?? null;
            setFocusedWindowId(previousFocus);
            setActiveWindowId(previousFocus); // use raw setter, not handleSetActiveWindowId
            return next;
        });
    };

    const restoreWindow = (id: string) => {
        setMinimizedWindows(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
        setFocusStack(prev => [...prev.filter(i => i !== id), id]);
        setFocusedWindowId(id);
        setActiveWindowId(id);
        setHighestZIndex((prev) => {
            const next = prev + 1;
            document.getElementById(id)?.style.setProperty("z-index", `${next}`);
            return next;
        });
    };

    const closeWindow = (id: string) => {
        setFocusStack(prev => {
            const next = prev.filter(i => i !== id);
            const previousFocus = next[next.length - 1] ?? null;
            setFocusedWindowId(previousFocus);
            setActiveWindowId(previousFocus);
            return next;
        });
        setMinimizedWindows(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    return (
        <WindowContext.Provider value={{
            activeWindowId,
            setActiveWindowId: handleSetActiveWindowId,
            highestZIndex,
            setHighestZIndex,
            activeDrag,
            setActiveDrag,
            focusedWindowId,
            setFocusedWindowId,
            minimizedWindows,
            minimizeWindow,
            restoreWindow,
            closeWindow
        }}>
            {children}
        </WindowContext.Provider>
    );
}