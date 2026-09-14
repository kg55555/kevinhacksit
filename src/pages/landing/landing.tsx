import { useEffect, useState } from "react";
import HomeMain from "../home-main";

const LandingPage = () => {
    const [zoomed, setZoomed] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        setTimeout(() => setFadeIn(false), 50);
    }, []);

    const handleScreenClick = () => {
        setZoomed(true);
        setTimeout(() => setShowHome(true), 2000);
    };

    if (showHome) return <HomeMain />;

    return (
        <div className="relative w-screen h-screen overflow-hidden">

            <div className={`absolute inset-0 bg-white z-50 transition-opacity duration-1500 pointer-events-none
                ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            />

            <div
                className={`w-full h-full transition-transform duration-[2s] ease-in ${zoomed ? 'scale-[15]' : 'scale-100'}`}
                style={{ transformOrigin: '52% 53%' }}
            >
                <div className="relative w-full h-full">
                    <img
                        src="/images/landing.jpg"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 75%' }}
                        alt="Desk"
                    />
                    <img
                        src="/images/landing-click-white.png"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            objectPosition: 'center 75%',
                            animation: zoomed ? 'none' : 'pulse-opacity 4s ease-in-out infinite',
                            opacity: zoomed ? 0 : undefined,
                        }}
                        alt="Desk"
                    />


                        <div
                            onClick={handleScreenClick}
                            className={`absolute transition-opacity duration-200
                                ${zoomed ? 'opacity-0 pointer-events-none' : 'cursor-pointer'}
                            `}
                            style={{
                                top: '37%',
                                left: '43.5%',
                                width: '16%',
                                height: '25%',
                            }}
                        />

                    <div className={`landing-title absolute top-0 h-1/3 w-full flex items-center justify-center`}>
                        <h1 className="text-8xl font-bold font-serif">Kevin Hacks It.</h1>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;