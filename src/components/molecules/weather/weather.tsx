import { useEffect, useState } from "react";

interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Rain {
    "1h": number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface CurrentWeatherResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

const Weather = () => {
    const [weatherData, setWeatherData] = useState<CurrentWeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const lat = 49.246292;
    const lon = -123.116226;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            }
            catch (err) {
                setError((err as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <>
        {weatherData && (
            <div className="weather flex items-center space-x-2">
                <img className="w-8 h-8" src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`} alt={weatherData?.weather?.[0]?.description} />
                <p>{(weatherData?.main?.temp - 273.15).toFixed(0)}°C</p>
                <p>{weatherData?.weather?.[0]?.main}</p>
            </div>
        )}
        </>

    );
};

export default Weather;