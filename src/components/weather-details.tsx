import { Sunrise, Sunset } from "lucide-react";
import type { WeatherData } from "../api/types";
import { format } from "date-fns";

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {

    const {wind, main, sys} = data;

    const formatTime = (time: number) => {
        return format(new Date(time * 1000), "h:mm a");
    }

    const details  = [
        {ttitle:"Sunrise", value: formatTime(sys.sunrise), icon:Sunrise, color : "text-orange-500"},
        {ttitle:"Sunset", value: formatTime(sys.sunset), icon:Sunset, color : "text-blue-500"},
    ]

    return (
    <div>
        Weather Details
    </div>
    )
}

export default WeatherDetails;