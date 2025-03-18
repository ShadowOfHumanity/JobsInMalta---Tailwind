import { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import ApiClient from "../API-RELATED/Api-Client";

export interface QueryParams {
  [key: string]: string | number | boolean | undefined; // allow any query parameter
}

interface ApiResponse<T> {
  status: string;
  data?: T;
  count?: number;
  message?: string;
  sortedBy?: string;
}

const constructEndpoint = (baseEndpoint: string, params?: QueryParams) => {
  if (!params) return baseEndpoint;

  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (value === undefined || value === null) {
        return ''; 
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean) // Remove any empty strings (from undefined values)
    .join('&');

    /* 
    EXAMPLE OF WHAT THE ABOVE WILL ALLOW US TO PRODUCE:
    useData('/jobs', { id: 123 })                          -> /jobs?id=123
    useData('/jobs', { category: 'frontend' })             -> /jobs?category=frontend
    useData('/jobs', { id: 123, sortBy: 'expiring' })     -> /jobs?id=123&sortBy=expiring  --> sort by is ignored!
    useData('/jobs', { page: 2, limit: 10 })               -> /jobs?page=2&limit=10
    useData('/jobs', { category: 'frontend', sortBy: 'newest' }) -> /jobs?category=frontend&sortBy=newest
    */
    return queryParams ? `${baseEndpoint}?${queryParams}` : baseEndpoint;
}

const useData = <T>(endpoint: string, queryParams?: QueryParams, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const finalEndpoint = constructEndpoint(endpoint, queryParams);

  useEffect(
    () => {
      const controller = new AbortController();
      setIsLoading(true);
      
      ApiClient.get<ApiResponse<T>>(finalEndpoint, { signal: controller.signal })
        .then((res) => {
          // Store the full response object for access
          setData([res.data as any]);
        })
        .catch((err: AxiosError) => {
          if (err instanceof CanceledError) {
            return;
          }
          setError(err.message);
        })
        .finally(() => setIsLoading(false));

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
