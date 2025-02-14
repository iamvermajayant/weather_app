import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/button"
import { useGeolocation } from "../hooks/use-geolocation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import WeatherSkeleton from "../components/WeatherSkeleton";
import { useForecastQuery, useReverseGeocodingQuery, useWeatherQuery } from "../hooks/use-wether";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyTemperature from "../components/hourlytemperature";
import WeatherDetails from "../components/weather-details";
import WeatherForecast from "../components/weather-forecast";


const Weatherdashboard = () => {
  const { coordinates, error: locationError, isLoading: loadinglocation, getLocation } = useGeolocation();

  //console.log(coordinates);
  const locationQuery = useReverseGeocodingQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      //reload the waether data
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if(loadinglocation){
    return <WeatherSkeleton/>
   }

   if(locationError){
     return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription className="flex flex-col space-y-2">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant="outline" className="w-fit">
              <MapPin className="mr-2 h-4 w-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
     )
}

const locationName = locationQuery.data?.[0];


if(weatherQuery.error || forecastQuery.error){
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col space-y-2">
        <p>Failed to fetch weather data. please try again</p>
        <Button onClick={getLocation} variant="outline" className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
 )
}

if(!weatherQuery.data || !forecastQuery.data){ 
  return <WeatherSkeleton /> 
}


if(!coordinates){
  return (
     <Alert variant="destructive">
       <AlertTriangle className="h-4 w-4" />
       <AlertTitle>Location Error</AlertTitle>
       <AlertDescription className="flex flex-col space-y-2">
         <p>Please enable the location access to see your local weather</p>
         <Button onClick={getLocation} variant="outline" className="w-fit">
           <MapPin className="mr-2 h-4 w-4" />
           Enable Location
         </Button>
       </AlertDescription>
     </Alert>
  )
}

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={'outline'} size={'icon'} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching} >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching  ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeatherCard data={weatherQuery.data} 
          locationName={locationName} />

          <HourlyTemperature data={forecastQuery.data}/>
          {/* {current weather} */}
          {/* hourly temperature */}
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* {details} */}
          <WeatherDetails data={weatherQuery.data} />
          {/* {forecast} */}
          <WeatherForecast data={forecastQuery.data} /> 
        </div>
      </div>
    </div>
  )
}

export default Weatherdashboard