import { WeatherData } from "./types";


export default class Http {
    static WEATHER_API_KEY = 'ad479f7e066a062facb934cf34a1c77b'

    static WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={1}&lon={2}.0&appid=${this.WEATHER_API_KEY}`;


    static BASE_API_URL = 'http://localhost:8080/api/'

    static async upload_image(image_string: Blob) {
        const form_data = new FormData();

        form_data.append('image', image_string);

        return await (await fetch(this.BASE_API_URL + 'upload', {
            method: 'POST',
            body: form_data
        })).text()
    }

    static async get_weather(lat: string, lon: string): Promise<WeatherData> {

        const url = this.WEATHER_API_URL.replace('{1}', lat).replace('{2}', lon);
        return await (await fetch(url)).json();
    }

}
