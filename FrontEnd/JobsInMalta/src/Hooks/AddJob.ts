import { useEffect } from "react";
import addData from "./AddData";

export interface JobCreateRequest {
  title: string;
  company: string;
  description: string;
  expireDate: string;
  category: string;
  salaryMin?: number;
  salaryMax?: number;
  salary?: number;
}

export interface JobPromise{
  status: string;
  data: {
    title: string,
    company: string,
    description: string,
    expire_date: Date,
    category: string,
  }
}


const AddJob = () => {
  const { postData, errors, isLoading, cleanup } = addData<JobCreateRequest, JobPromise>("/jobs/postJobs");

  useEffect(() => {
    return () => cleanup(); // Cleanup on unmount
  }, []);

  const handleSubmit = async (formData: JobCreateRequest) => {
    const result = await postData(formData);
    if (result) {
      // Success handling
      console.log("Job created:", result);
    }
  };
  
  return { handleSubmit, addJobErrors : errors, isAddJobLoading: isLoading };
};

export default AddJob;