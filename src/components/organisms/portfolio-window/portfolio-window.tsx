import { ReactNode, useCallback, useState } from "react";
import ProjectListing from "../project-listing";
import debounce from "../../../util/debounce";

const PortfolioWindow = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 300),
    []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debouncedSearch(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setInputValue("");
    };

    return (
        <>
            <div className="explorer-window-search flex items-center w-full px-4">
                <div className="explorer-window-toolbar flex space-x-2 mr-2">
                    <button className="explorer-window-back rounded">
                        <img src="/images/icons/backwardsarrow.png" className="w-4 h-4" alt="Back" />
                    </button>
                    <button className="explorer-window-forward rounded">
                        <img src="/images/icons/forwardarrow.png" className="w-4 h-4" alt="Forward" />
                    </button>
                </div>

                <div className="explorer-window-file-hierarchy flex w-[60%] items-center mx-1 p-1 mr-5 border border-black/30">
                    <img src="/images/icons/codefolder.png" className="w-6 h-6 inline-block mr-2" alt="File Hierarchy" />
                    <p className="cursor-default select-none">&gt; My PC &gt; Portfolio</p>
                </div>

                <div className="explorer-window-search flex items-center grow border p-1 border-black/30">
                    <input type="text" className="explorer-window-search-input grow p-0 border-none focus:outline-none focus:ring-0"
                        onChange={handleSearch} placeholder="Search Portfolio" value={inputValue} />
                    {inputValue
                        ? <button className="explorer-window-clear-search cursor-pointer" onClick={clearSearch}>
                            <img src="/images/icons/closesearch.png" className="w-4 h-4" alt="Clear Search" />
                          </button>
                        : <img src="/images/icons/searchicon.png" className="w-4 h-4 inline-block mx-1" alt="Search" />
                    }
                </div>
            </div>

            <div className="explorer-window-content flex-1 overflow-y-auto mt-2">
                <ProjectListing searchQuery={searchQuery} />
            </div>
        </>
    );
}

export default PortfolioWindow;