import { format } from "date-fns";
import type { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
        id: number;
        main: string;
        description: string;
        icon: string;
    }
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
    //const dailyForecast = data.daily.slice(1, 6);
    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        }
        else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {} as Record<string, DailyForecast>);

    const nextdays = Object.values(dailyForecast).slice(1, 6);

    console.log(dailyForecast)
    console.log(nextdays)

    return (
        <Card>
            <CardHeader>
                <CardTitle>5 Days Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {nextdays.map((day) => {
                        return (
                            <div key={day.date} className="grid grid-cols-3 gap-4 rounded-lg border p-4">
                                <div>
                                    <p>{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                                    <p>{day.weather.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherForecast