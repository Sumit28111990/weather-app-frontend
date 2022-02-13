import React, { useState } from "react";
import DOMPurify from 'dompurify';

function debounce<T>(this: T, func: Function, timeout = 500) {
    let timer: any;
    console.log('vruhh?',this,func);
    return (...args: T[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const Weather = () => {

    const [markdown, setMarkDown] = useState('');


    const onChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // const sanitized = DOMPurify.sanitize(e.target);

        console.log(e);
    }
    const processChange = debounce((e:any) => onChange(e));

    return (<>
        <div className="container">
            <textarea placeholder="Enter markdown" onKeyUp={processChange as any}>

            </textarea>
            <div dangerouslySetInnerHTML={{ __html: markdown }}>

            </div>
        </div>
    </>)
}


export default Weather;
