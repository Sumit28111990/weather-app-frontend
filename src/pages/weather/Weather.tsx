import React, { useState, useEffect, useRef } from "react";
import DOMPurify from 'dompurify';

import ReactDOM from 'react-dom';

import { WeatherData } from "../../utils/types";
import Http from "../../utils/http";

import './Weather.css';


function debounce<T>(this: T, func: Function, timeout = 500) {
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
    const [loc, setLoc] = useState<{ lat: string, lon: string }>({ lat: '', lon: '' });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        const weather = value.substring(value.indexOf('weather')).match(/{(.*?)}/g);

        var lat = '';
        var lon = '';

        if (weather && weather.length > 0) {
            lat = weather[0].replace('{', '').replace('}', '');
            lon = weather[1].replace('{', '').replace('}', '');
            setLoc({ lat, lon });
        }

        const sanitized = DOMPurify.sanitize(value);

        // console.log(sanitized);
        // console.log(value, lat, long);
        console.log(lat, lon);

        setMarkDown(sanitized);
    }
    const processChange = debounce((e: any) => onChange(e));

    return (<>
        <div className="container">
            <textarea placeholder="Enter markdown" onChange={processChange as any}>

            </textarea>
            <div className="weather_data">
                <div dangerouslySetInnerHTML={{ __html: markdown }}>
                </div>
                {loc.lat != '' && loc.lon != '' && <Weather lat={loc.lat} lon={loc.lon}></Weather>}
            </div>
        </div>
    </>)
}


export default WeatherPage;
