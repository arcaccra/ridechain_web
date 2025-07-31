import { useQuery } from "@tanstack/react-query";
import httpFetch from "@/lib/axios.ts";

export default function useFetchData(
    url: string,
    queryKey: any[],
    headers = {},
    isEnabled = true,
    staleTime?: number
) {
    const { data, isLoading, isError, error} = useQuery({
        enabled: isEnabled,
        queryFn: async () => {
            try {
                const response = await httpFetch.get(url, headers);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        },
        queryKey: queryKey,
        staleTime: staleTime
    });

    return { data, isLoading, isError, error};
}
