import type { GeocodingResponse, WeatherData } from "../api/types"

interface CurrentWeatherCardProps {
    data : WeatherData,
    locationName? : GeocodingResponse
}


const CurrentWeatherCard = ({data, locationName}: CurrentWeatherCardProps) => {
  
    const response = data;

    console.log(response);
    return (
    <div>CurrentWeatherCard</div>
  )
}

export default CurrentWeatherCard