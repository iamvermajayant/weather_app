import { useState } from "react";
import { Button } from "./ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { useLocationSearchQuery } from "../hooks/use-wether";
import { Loader2, Search } from "lucide-react";

const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const { data: locations, isLoading } = useLocationSearchQuery(query);

    console.log(locations)
    const handleSelect = (value: string) => {  }

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
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Recent Searches">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                </div>
                            )}
                            {locations.map((location) => (      
                                <CommandItem
                                    key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Search className="h-4 w-4 mr-2"/>
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