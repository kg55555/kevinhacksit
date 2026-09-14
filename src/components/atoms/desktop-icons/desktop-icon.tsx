import { windowMetadata } from "../../../data/window-metadata-mapping";

interface DesktopIconProps {
  name: keyof typeof windowMetadata;
  startingRow?: number;
  startingCol?: number;
  onDoubleClick?: () => void;
}

const DesktopIcon = ({ name, startingRow, startingCol, onDoubleClick }: DesktopIconProps) => {
  const iconSrc = windowMetadata[name].icon;

  const gridStyle: React.CSSProperties = {
    ...(startingRow !== undefined && { gridRow: `${startingRow} / ${startingRow + 1}` }),
    ...(startingCol !== undefined && { gridColumn: `${startingCol} / ${startingCol + 1}` }),
  };

  return (
  <div
      style={gridStyle}
      onDoubleClick={onDoubleClick}
      className="desktop-icon flex flex-col items-center justify-center cursor-pointer select-none
          w-20 h-20 xl:w-28 xl:h-28
          hover:bg-white/30 hover:border-white/40 border-transparent border-2 rounded transition duration-100
          active:bg-blue-400/30 active:border-blue-400/40"
  >
      <img src={iconSrc} alt={`${name} icon`} className="w-12 h-12 xl:w-16 xl:h-16 mb-1" />
      <span className="text-white text-center leading-tight">{name.replace(/-/g, ' ')}</span>
  </div>
  );
};

export default DesktopIcon;