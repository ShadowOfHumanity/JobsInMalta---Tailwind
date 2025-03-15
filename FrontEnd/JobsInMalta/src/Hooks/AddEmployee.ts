import { useEffect } from "react";
import addData from "./AddData";
import { EmployeeCreateRequest, EmployeeResponse } from "../Users/userInterfaces";



const AddEmployee = () => {
  const { 
    postData, 
    data: employeeData,
    errors, 
    isLoading, 
    cleanup 
  } = addData<EmployeeCreateRequest, EmployeeResponse>("/auth/registerEmployee");

  useEffect(() => {
    return () => cleanup(); // Cleanup 
  }, []);

  const handleSubmit = async (formData: EmployeeCreateRequest) => {
    try {
      const result = await postData(formData);
      if (result?.status === 'success') {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error creating employee:', error);
      return null;
    }
  };
  
  return { 
    handleSubmit, 
    employeeData,
    addEmployeeErrors: errors, 
    isAddEmployeeLoading: isLoading 
  };
};

export default AddEmployee;