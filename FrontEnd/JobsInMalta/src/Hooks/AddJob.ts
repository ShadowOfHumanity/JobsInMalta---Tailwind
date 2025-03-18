import { useEffect } from "react";
import addData from "./AddData";

export interface JobCreateRequest {
  title: string;
  company: string;
  description: string;
  expire_date: string; 
  category: string;
  salary_data?: { 
    type: 'range' | 'single';
    min?: number;
    max?: number;
    value?: number;
  };
}

export interface JobResponse {
  status: string;
  data: {
    title: string,
    company: string,
    description: string,
    expire_date: string,
    category: string,
  }
}

const AddJob = () => {
  const { postData, errors, isLoading, cleanup } = addData<JobCreateRequest, JobResponse>("/jobs/postJobs");

  useEffect(() => {
    return () => cleanup();
  }, []);

  const handleSubmit = async (formData: JobCreateRequest) => {
    const result = await postData(formData);
    if (result?.status === 'success') {
      console.log("Job created:", result.data);
      return result.data;
    }
    return null;
  };
  
  return { handleSubmit, addJobErrors: errors, isAddJobLoading: isLoading };
};

export default AddJob;