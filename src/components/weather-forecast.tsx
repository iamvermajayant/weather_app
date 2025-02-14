import { format } from "date-fns";
import type { ForecastData } from "../api/types";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id:number;
        main:string;
        description:string;
        icon: string;
    }
}

const WeatherForecast = ({data} : WeatherForecastProps) => {
    //const dailyForecast = data.daily.slice(1, 6);
    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date:forecast.dt,
            };
        }
        else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {} as Record<string, DailyForecast>);


    console.log(dailyForecast)

    return (
        <div>
            WeatherForecast
        </div>
    )
}

export default WeatherForecast