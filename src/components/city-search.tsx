import { useState } from "react";
import { Button } from "./ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { useLocationSearchQuery } from "../hooks/use-wether";
import { Clock, Ghost, Loader2, Search, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/use-search-history";
import { format } from "date-fns";

const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data: locations, isLoading } = useLocationSearchQuery(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();

    console.log(locations)



    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");
        console.log(lat, lon, name, country);

        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country
        });

        navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
        setOpen(false);
    }

    return (
        <>

            <Button variant="outline" className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md-w-40 lg:w-64" onClick={() => setOpen(true)}>Search cities...</Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Type a command or search..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}
                    <CommandGroup heading="Favorites">
                        {/* <CommandItem>Calendar</CommandItem> */}
                    </CommandGroup>


                    {history.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup>
                                <div>
                                    <p>Recent Searches</p>
                                    <Button variant="ghost" size="sm" onClick={() => {
                                        clearHistory.mutate();
                                    }}>
                                        <XCircle className="h-4 w-4" />
                                        Clear
                                    </Button>
                                </div>
                                {history.map((location) => (
                                    <CommandItem
                                    key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                    >
                                        {console.log(history)}
                                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{location.query}</span>
                                        <span>{location?.name}</span>
                                        {location?.state && <span>, {location?.state}</span>}
                                        <span className="text-sm text-muted-foreground">, {location?.country}</span>
                                        <span>
                                            {format(location.searchedAt, "MMM d, h:mm a")}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}

                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {locations.map((location) => (
                                <CommandItem
                                    key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    <span>{location.name}</span>
                                    {location?.state && <span>, {location?.state}</span>}
                                    <span className="text-sm text-muted-foreground">, {location?.country}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch;