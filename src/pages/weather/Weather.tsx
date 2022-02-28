import React, { useState, useEffect } from "react";

import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'

import { WeatherData } from "../../utils/types";
import Http from "../../utils/http";

import './Weather.css';

declare global {
    namespace JSX {
        // this merges with the existing intrinsic elements, adding 'custom weather tag' and its props
        interface IntrinsicElements {
            'weather': { 'lat': string, 'lon': string }
        }
    }
}

function debounce<T>(this: T, func: Function, timeout = 120) {
    let timer: any;
    return (...args: T[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const Weather = ({ lat, lon }: { lat: string, lon: string }) => {

    const [weather, setWeather] = useState<WeatherData>(Object.create({}));

    const init = async () => {

        const data = await Http.get_weather(lat, lon);

        setWeather(data);
    }

    useEffect(() => {

        init();

    }, [])

    return (<>
        {weather?.main &&
            <div>
                <h2>Location: {weather.name}</h2>
                <div className="container">
                    <span>Clouds: {weather.clouds.all}</span>
                    <span>Timezone: {weather.timezone}</span>
                    <span>Weather: {weather.weather[0].main}</span>
                    <span>Temperature: {weather.main.temp}</span>
                </div>
            </div>
        }
    </>)
}

const WeatherPage = () => {

    const [markdown, setMarkDown] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        setMarkDown(value);
    }
    const processChange = debounce((e: any) => onChange(e),65);

    return (<>
        <div className="container">
            <textarea placeholder="Enter markdown" onChange={processChange as any}>

            </textarea>
            <div className="weather_data">
                <ReactMarkdown children={markdown} rehypePlugins={[rehypeRaw]} components={{ weather: ({ lat, lon }: {lat: string,lon: string}) => <Weather lat={lat} lon={lon} /> }} />
            </div>
        </div>
    </>)
}


export default WeatherPage;
