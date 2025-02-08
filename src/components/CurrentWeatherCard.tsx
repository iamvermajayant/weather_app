import { ArrowDown, ArrowUp } from "lucide-react";
import type { GeocodingResponse, WeatherData } from "../api/types"
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherCardProps {
    data: WeatherData,
    locationName?: GeocodingResponse
}


const CurrentWeatherCard = ({ data, locationName }: CurrentWeatherCardProps) => {

    const response = data;

    const { weather: [currentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed },
    } = data

    console.log(locationName)

    const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end gap-1">
                                <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
                                <span className="ml-2">({locationName?.local_names?.kn})</span>
                                {locationName?.state && <span className="text-muted-foreground ml-1">{locationName?.state}</span>}
                            </div>
                            <p className="text-muted-foreground">{locationName?.country}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-7xl font-bold tracking-tighter">{formatTemp(temp)}</p>

                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(feels_like)}</p> 
                            <div className="flex gap-2 text-sm font-medium ">
                                <span className="flex items-center gap-1 text-blue-500">
                                    <ArrowDown className="h-4 w-4" />
                                    {formatTemp(temp_min)}
                                </span>
                                <span className="flex items-center gap-1 text-blue-500">
                                    <ArrowUp className="h-4 w-4" />
                                    {formatTemp(temp_max)}
                                </span>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CurrentWeatherCard