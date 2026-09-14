import { createContext, useContext, useState } from 'react';
import { windowMetadata } from '../data/window-metadata-mapping';

interface OpenWindowContextType {
  createWindow: boolean;
  setCreateWindow: (createWindow: boolean) => void;
  windowType: keyof typeof windowMetadata;
  setWindowType: (windowType: keyof typeof windowMetadata) => void;
}

const OpenWindowContext = createContext<OpenWindowContextType | null>(null);

export function useOpenWindowContext() {
  const ctx = useContext(OpenWindowContext);
  if (!ctx) throw new Error('useOpenWindowContext must be used within an OpenWindowProvider');
  return ctx;
}

export function OpenWindowProvider({ children }: { children: React.ReactNode }) {
  const [createWindow, setCreateWindow] = useState<boolean>(false);
  const [windowType, setWindowType] = useState<keyof typeof windowMetadata>('Portfolio');

  return (
    <OpenWindowContext.Provider value={{ createWindow, setCreateWindow, windowType, setWindowType }}>
      {children}
    </OpenWindowContext.Provider>
  );
}