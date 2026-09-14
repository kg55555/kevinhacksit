const UnderConstruction = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full space-y-4 p-6 select-none">
            <img
                src="/images/icons/underconstruction.png"
                className="w-24 h-24 object-contain"
                alt="Under Construction"
            />
            <div className="flex flex-col items-center space-y-1">
                <h2 className="text-base font-semibold text-gray-800">Under Construction</h2>
                <p className="text-sm text-gray-500 text-center max-w-xs">
                    This page is still being built. Check back soon.
                </p>
            </div>
        </div>
    );
};

export default UnderConstruction;