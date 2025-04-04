import { useEffect } from "react";
import addData from "./AddData";
import { Education } from "../types";

export interface EmployeeInfoRequest {
    linkedIn_url: string;
    portfolio_url: string;
    job_title: string;
    education: Education[]
}

export interface EmployeeInfoResponse {
  status: string;
}

const AddJob = () => {
  const { postData, errors, isLoading, cleanup } = addData<EmployeeInfoRequest, EmployeeInfoResponse>("/user/edit-user-info");

  useEffect(() => {
    return () => cleanup();
  }, []);

  const handleSubmit = async (formData: EmployeeInfoRequest) => {
    const result = await postData(formData);
    if (result?.status === 'success') {
      console.log("Employee Info Sent:", result.status);
      return result.status;
    }
    return null;
  };
  
  return { handleSubmit, addJobErrors: errors, isAddJobLoading: isLoading };
};

export default AddJob;