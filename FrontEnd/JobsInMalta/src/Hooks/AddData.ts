import { AxiosError, CanceledError } from "axios";
import { useRef, useState } from "react";
import ApiClient from "../API-RELATED/Api-Client";

// Updated to handle different request and response types
interface ApiResponse<TResponse> {
  data: TResponse;
  status: string;
  errors: string[];
}

const addData = <TRequest, TResponse>(endpoint: string) => {
  const controllerRef = useRef<AbortController>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const [status, setStatus] = useState<string>("");
  const [hookErrors, setHookErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = async (newData: TRequest): Promise<ApiResponse<TResponse> | null> => {
    // Abort older request if exists
    controllerRef.current?.abort();
    // Create new controller
    controllerRef.current = new AbortController();

    setIsLoading(true);
    setHookErrors([]); // Clear old errors

    try {
        const response = await ApiClient.post<ApiResponse<TResponse>>(
          endpoint,
          newData,
          {
            signal: controllerRef.current.signal,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.errors?.length > 0) {
          setHookErrors(response.data.errors);
          return null;
        }

        setStatus(response.data.status);
        setData(response.data.data);
        return response.data;
    } catch (err) {
        if (err instanceof CanceledError) {
          console.log("Request was canceled");
          return null;
        }

        if (err instanceof AxiosError) {
            const axiosError = err as AxiosError<ApiResponse<TResponse>>;
            if (axiosError.response?.data) {
                setHookErrors(axiosError.response.data.errors || []);
                setStatus(axiosError.response.data.status || 'error');
            }
        }
        return null;
    } finally {
        setIsLoading(false);
    }
  };

  const cleanup = () => {
    controllerRef.current?.abort();
  };

  return { 
    postData, 
    data, 
    status, 
    errors: hookErrors, 
    isLoading, 
    cleanup 
  };
};

export default addData;
