import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { Search } from 'lucide-react';

interface SearchHistoryItem {
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;
}

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>("search-history", []);

    useQuery({
        queryKey: ["search-history"],
        queryFn: () => history,
        initialData: history,
    })

    const addToHistory = useMutation({
        mutationFn: async (search : Omit<SearchHistoryItem, "id" | "SearchedAt">) => {
            const newSearch: SearchHistoryItem = {
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt: Date.now(),
            };
        }
    })
}