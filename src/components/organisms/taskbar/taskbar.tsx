import TaskbarIcons from "components/atoms/taskbar-icons/taskbar-icons";
import Weather from "components/molecules/weather/weather";
import { useEffect, useState } from "react";
import { windowMetadata } from "../../../data/window-metadata-mapping";

interface TaskbarProps {
    taskbarPrograms: Record<string, keyof typeof windowMetadata>;
}

const Taskbar = ({ taskbarPrograms }: TaskbarProps) => {

    const timeOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/Los_Angeles', 
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    const [currentTime, setCurrentTime] = useState<string>(formatTime(new Date()));
    const [currentDate, setCurrentDate] = useState<string>(formatDate(new Date()));


    function formatTime(date: Date): string {
        const parts = new Intl.DateTimeFormat('en-US', timeOptions).formatToParts(date);
        const hourPart = parts.find(p => p.type === 'hour');
        if (hourPart?.value.startsWith('0')) {
            hourPart.value = hourPart.value.slice(1);
        }
        return parts.map(p => p.value).join('');
    }

    function formatDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
            setCurrentDate(formatDate(new Date()));
        }, 10000);

        return () => clearInterval(timer);
    }, []);
    




  return (
    <div className="taskbar absolute bottom-0 left-0 w-full h-10 bg-taskbar z-9999 flex items-center px-2 space-x-8">
        <div className="taskbar-profile flex items-center pl-1 select-none">
            <img src="/images/icons/kicon.png" className="w-6 h-6 rounded-full" alt="Profile" />
        </div>
        <div className="taskbar-programs flex space-x-2 grow">
            {Object.entries(taskbarPrograms).map(([id, name]) => (
                <TaskbarIcons key={id} id={id} name={name} />
            ))}
        </div>
        <Weather />
        <div className="date-time flex flex-col items-center justify-center">
            <p className="text-sm">{currentTime}</p>
            <p className="text-sm">{currentDate}</p>
        </div>
    </div>
    )
}

export default Taskbar;
