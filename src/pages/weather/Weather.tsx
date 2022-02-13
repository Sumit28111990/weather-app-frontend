import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { WeatherData } from "../../utils/types";
import Http from "../../utils/http";

function debounce<T>(this: T, func: Function, timeout = 500) {
    let timer: any;
    console.log('vruhh?', this, func);
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
        <div>

        </div>
    </>)
}

const WeatherPage = () => {

    const [markdown, setMarkDown] = useState('');


    const onChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // const sanitized = DOMPurify.sanitize(e.target);

        console.log(e);
    }
    const processChange = debounce((e: any) => onChange(e));

    return (<>
        <div className="container">
            <textarea placeholder="Enter markdown" onKeyUp={processChange as any}>

            </textarea>
            <div dangerouslySetInnerHTML={{ __html: markdown }}>

            </div>
        </div>
    </>)
}


export default WeatherPage;
