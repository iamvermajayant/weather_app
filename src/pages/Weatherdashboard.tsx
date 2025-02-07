import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/button"
import { useGeolocation } from "../hooks/use-geolocation";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const Weatherdashboard = () => {
  const { coordinates, error: locationError, isLoading: loadinglocation, getLocation } = useGeolocation();

  console.log(coordinates);

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      console.log(coordinates);
    }
  }

  if(loadinglocation){
    return <Skeleton />
   }

   if(locationError){
     return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription>
            <p>{locationError}</p>
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
        <Button variant={'outline'} size={'icon'} onClick={handleRefresh} >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Weatherdashboard