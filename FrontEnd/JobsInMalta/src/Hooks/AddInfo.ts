import { useEffect } from "react";
import addData from "./AddData";
import { Education } from "../types";

export interface EditInfoRequest {
    linkedIn_url?: string;
    portfolio_url?: string;
    job_title?: string;
    education?: Education[]
    company_description?: string;
    industry?: string;
    website_url?: string;
    company_size?: string;
}

export interface EditInfoResponse {
  status: string;
}

const EditProfileInfo = () => {
  const { postData, errors, isLoading, cleanup } = addData<EditInfoRequest, EditInfoResponse>("/user/updateProfileInfo");

  useEffect(() => {
    return () => cleanup();
  }, []);

  const handleSubmit = async (formData: EditInfoRequest) => {
    const result = await postData(formData);
    if (result?.status === 'success') {
      console.log("Edit Info Sent:", result.status);
      return result.status;
    }
    return null;
  };
  
  return { handleSubmit, addInfoErrors: errors, isInfoLoading: isLoading };
};

export default EditProfileInfo;