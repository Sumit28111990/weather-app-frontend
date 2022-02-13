import { Convert } from "./types";


export default class Http {
    static WEATHER_API_KEY = 'ad479f7e066a062facb934cf34a1c77b'

    static WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={1}&lon={2}.0&appid=${this.WEATHER_API_KEY}`;

    constructor() {

    }

    static async get_weather(lat: string, lon: string) {

        const url = this.WEATHER_API_URL.replace('{1}', lat).replace('{2}', lon);
        return Convert.toWeatherData(await (await fetch(url)).text());
    }

}