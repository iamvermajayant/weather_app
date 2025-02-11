import { Sunrise, Sunset } from "lucide-react";
import type { WeatherData } from "../api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "./ui/card";

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {

    const { wind, main, sys } = data;

    const formatTime = (time: number) => {
        return format(new Date(time * 1000), "h:mm a");
    }

    const details = [
        { title: "Sunrise", value: formatTime(sys.sunrise), icon: Sunrise, color: "text-orange-500" },
        { title: "Sunset", value: formatTime(sys.sunset), icon: Sunset, color: "text-blue-500" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {details.map((detail) => {
                            return (
                                <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                                    <detail.icon className={`h-5 w-5 ${detail.color}`}/>
                                    <div>
                                        <p className="text-sm font-medium leading-none">
                                            {detail.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default WeatherDetails;