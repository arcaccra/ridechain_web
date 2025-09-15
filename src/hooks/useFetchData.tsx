import { useQuery } from "@tanstack/react-query";
import httpFetch from "@/lib/axios.ts";

export default function useFetchData<TData = unknown>(
    url: string,
    queryKey: any[],
    headers: Record<string, any> = {},
    isEnabled: boolean = true,
    staleTime?: number
) {
    const { data, isLoading, isError, error } = useQuery<TData>({
        enabled: isEnabled,
        queryFn: async (): Promise<TData> => {
            try {
                const response = await httpFetch.get(url, headers);
                return response.data as TData;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        },
        queryKey: queryKey,
        staleTime: staleTime,
    });

    return { data, isLoading, isError, error };
}
