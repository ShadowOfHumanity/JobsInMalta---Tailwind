import { useEffect } from "react";
import addData from "./AddData";
import { EmployerCreateRequest, EmployerResponse } from "../Users/userInterfaces";


const AddEmployer = () => {
  const { 
    postData, 
    data: employerData,
    errors, 
    isLoading, 
    cleanup 
  } = addData<EmployerCreateRequest, EmployerResponse>("/auth/registerEmployer");

  useEffect(() => {
    return () => cleanup(); // Cleanup 
  }, []);

  const handleSubmit = async (formData: EmployerCreateRequest) => {
    try {
      const result = await postData(formData);
      if (result?.status === 'success') {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error creating employer:', error);
      return null;
    }
  };
  
  return { 
    handleSubmit, 
    employerData,
    addEmployerErrors: errors, 
    isAddEmployerLoading: isLoading 
  };
};

export default AddEmployer;