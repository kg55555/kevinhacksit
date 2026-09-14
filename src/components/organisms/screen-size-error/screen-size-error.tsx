import { useEffect, useState } from "react";

const ScreenSizeError = () => {
    const [isTooSmall, setIsTooSmall] = useState(window.innerWidth < 1280 || window.innerHeight < 720);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);


    useEffect(() => {
        const handleResize = () => {
            setIsTooSmall(window.innerWidth < 1280 || window.innerHeight < 720);
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isTooSmall) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#0078D7] flex flex-col items-center justify-center p-8">

            <div className="flex flex-col items-start w-full max-w-xl space-y-6">
                <span className="text-white text-7xl sm:text-8xl font-thin">:(</span>

                <p className="text-white text-xl sm:text-2xl font-light leading-snug">
                    Your screen ran into a problem and needs to be resized.
                </p>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    This application is designed for desktop and requires a minimum width of{" "}
                    <strong className="text-white">1280px</strong> to display correctly.
                    Please switch to a larger display or rotate your device to landscape.
                </p>

                <p className="text-white/80 text-xs sm:text-sm">
                    Current width: <strong className="text-white">{width}px</strong> | Current height: <strong className="text-white">{height}px</strong>
                </p>

                {/* Progress bar */}
                <div className="flex flex-col space-y-2 w-full">
                    <p className="text-white/80 text-xs sm:text-sm">Waiting for width resize...</p>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((width / 1280) * 100, 100)}%` }}
                        />
                    </div>
                    <p className="text-white/60 text-xs">
                        {Math.min(Math.round((width / 1280) * 100), 100)}% of required width
                    </p>
                </div>

                <div className="flex flex-col space-y-2 w-full">
                    <p className="text-white/80 text-xs sm:text-sm">Waiting for height resize...</p>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((height / 720) * 100, 100)}%` }}
                        />
                    </div>
                    <p className="text-white/60 text-xs">
                        {Math.min(Math.round((height / 720) * 100), 100)}% of required height
                    </p>
                </div>

                <div className="border-t border-white/20 pt-4 w-full">
                    <p className="text-white/60 text-xs">
                        DISPLAY_RESOLUTION_TOO_SMALL
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScreenSizeError;