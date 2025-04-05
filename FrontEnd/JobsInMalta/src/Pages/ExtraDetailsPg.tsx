import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FadingQuestion from '../Components/FadingQuestion';
import { Education } from '../types';
import { useAuthSession } from '../Hooks/AuthContext';
import EditProfileInfo from '../Hooks/AddInfo';
 
const ExtraDetailsPg = () => { 
  const navigate = useNavigate();
  const {user} = useAuthSession();
  const {handleSubmit: handleEditSubmit, addInfoErrors, isInfoLoading} = EditProfileInfo()

  const [formData, setFormData] = useState({
    job_title: '',
    education: [{ degree: '', school: '', year_started: '', year: '' }] as Education[],
    linkedIn_url: '',
    portfolio_url: '',
    company_description: '',
    industry: '',
    website_url: '',
    company_size: ''
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleEducationChange = useCallback((index: number, field: string, value: string) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  }, [formData.education]);

  const addEducation = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year_started: '', year: '' }]
    }));
  }, []);

  const removeEducation = useCallback((index: number) => {
    if (formData.education.length <= 1) return; //  at least one education entry
    
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  }, [formData.education.length]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
      let result = await handleEditSubmit(formData);
      if (result === 'success') {
        console.log("Form submitted successfully:", result);
        navigate('/profile');
      }
    
      
    
    

    
  }, [formData, navigate]);

  const educationFields = [
    { 
      key: 'degree', 
      label: 'Degree/Certification', 
      placeholder: 'e.g. Bachelor of Science in Computer Science, Master of Business Administration' 
    },
    { 
      key: 'school', 
      label: 'School/Institution', 
      placeholder: 'e.g. University of Malta' 
    },
    { 
      key: 'year_started', 
      label: 'Year Started', 
      placeholder: 'e.g. 2016', 
      type: 'text' 
    },
    { 
      key: 'year', 
      label: 'Year Completed', 
      placeholder: 'e.g. 2020', 
      type: 'text' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/30 py-12 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-1/3 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-bl-full opacity-60 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-40 bg-emerald-100 dark:bg-emerald-900/30 rounded-tr-full opacity-60 -z-10"></div>
      <div className="absolute top-1/4 left-0 w-24 h-24 bg-violet-100 dark:bg-violet-900/20 rounded-full opacity-40 -z-10 blur-lg"></div>
      <div className="absolute bottom-1/3 right-0 w-32 h-32 bg-amber-100 dark:bg-amber-900/20 rounded-full opacity-40 -z-10 blur-lg"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg shadow-lg"></div>
        
        <div className="text-center mb-12 mt-6"> 
          <br />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Complete Your Profile
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us a bit more about yourself to help us personalize your experience and match you with the perfect opportunities
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-gray-800/50">
          {user?.user_role === "employee" ? (
            <>
              {/* Professional Information  */}
              <div className="mb-10 md:mb-16 relative">
                <div className="flex items-center mb-6 md:mb-8">
                  <span className="h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </span>
                  <h2 className="text-lg md:text-xl font-semibold pb-1 border-b-2 border-indigo-400 dark:border-indigo-500">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-200">
                      Professional Information
                    </span>
                  </h2>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(-1deg)' }}>
                      <FadingQuestion
                        question="LinkedIn URL"
                        placeholder="e.g. https://linkedin.com/in/yourprofile"
                        name="linkedIn_url"
                        value={formData.linkedIn_url}
                        onChange={handleChange}
                        position="default"
                        colorTheme={"violet"}
                      />
                    </div>
                    
                    <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(1deg)' }}>
                      <FadingQuestion
                        question="Portfolio/Website URL"
                        placeholder="e.g. https://yourportfolio.com"
                        name="portfolio_url"
                        value={formData.portfolio_url}
                        onChange={handleChange}
                        position="default"
                        colorTheme={"amber"}
                      />
                    </div>
                  </div>
                  
                  <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(-1deg)' }}>
                    <FadingQuestion
                      question="What is your current job title?"
                      placeholder="e.g. Software Developer, Project Manager"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      position="default"
                      colorTheme={"indigo"}
                    />
                  </div>
                </div>
              </div>
             
              <div className="mb-8 relative">
                <div className="flex items-center mb-6 md:mb-8">
                  <span className="h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </span>
                  <h2 className="text-lg md:text-xl font-semibold pb-1 border-b-2 border-emerald-400 dark:border-emerald-500">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
                      Education History
                    </span>
                  </h2>
                </div>
                
                <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(1deg)' }}>
                  <FadingQuestion
                    question="Education Details"
                    placeholder="Add your education details"
                    name="education"
                    position="default"
                    colorTheme={"emerald"}
                    isMultiInput={true}
                    multiInputFields={educationFields}
                    multiValues={formData.education.map(edu => ({
                      degree: edu.degree || '',
                      school: edu.school || '',
                      year_started: edu.year_started || '',
                      year: edu.year || ''
                    }))}
                    onMultiInputChange={handleEducationChange}
                    onAddInput={addEducation}
                    onRemoveInput={removeEducation}
                    showAddButton={true}
                    fullWidthDegree={true}
                    twoRowLayout={true}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              {/* Company Description */}
              <div className="mb-10 relative">
                <div className="flex items-center mb-6 md:mb-8">
                  <span className="h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h2 className="text-lg md:text-xl font-semibold pb-1 border-b-2 border-indigo-400 dark:border-indigo-500">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-200">
                      Company Information
                    </span>
                  </h2>
                </div>
                
                <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(-1deg)' }}>
                  <FadingQuestion
                    question="Company Description"
                    placeholder="Describe your company, mission, culture, and what makes it unique..."
                    name="company_description"
                    value={formData.company_description}
                    onChange={handleChange}
                    position="default"
                    colorTheme={"indigo"}
                  />
                </div>
              </div>
              
              {/* Industry */}
              <div className="mb-10 relative">
                <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(1deg)' }}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange as any}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    >
                      <option value="">Select your industry</option>
                      <option value="lorem1">Lorem Ipsum Industry 1</option>
                      <option value="lorem2">Lorem Ipsum Industry 2</option>
                      <option value="lorem3">Lorem Ipsum Industry 3</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Website URL & Company Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(-1deg)' }}>
                  <FadingQuestion
                    question="Company Website URL"
                    placeholder="e.g. https://yourcompany.com"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    position="default"
                    colorTheme={"violet"}
                  />
                </div>
                
                <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(1deg)' }}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Size</label>
                    <select
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleChange as any}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg shadow-inner">
              <div className="p-2 bg-amber-100 dark:bg-amber-800/40 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="italic opacity-90 hover:opacity-100 transition-opacity">You can always update these details later</span>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 
                          bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
                          hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-750 dark:hover:text-white
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400/50 dark:focus:ring-offset-gray-900
                          transition-all duration-300 shadow-sm hover:shadow
                          transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto
                          relative overflow-hidden group"
                style={{ willChange: 'transform' }}
              >
                <span className="relative z-10">Skip for now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700 ease-out" style={{ willChange: 'opacity, transform' }}></span>
              </button>
              <button
                type="submit"
                disabled={isInfoLoading}
                className="px-6 py-3 rounded-lg text-sm font-medium text-white
                          relative overflow-hidden group
                          bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 
                          hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500/50 dark:focus:ring-offset-gray-900
                          transition-all duration-300 shadow-md hover:shadow-lg
                          transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto
                          disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ willChange: 'transform' }} 
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isInfoLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Save & Continue'}
                </span>
                <span className="absolute inset-0 bg-white/20 dark:bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" style={{ willChange: 'transform' }}></span>
                <span className="absolute top-0 left-0 w-20 h-full bg-white/10 transform -skew-x-12 -translate-x-32 group-hover:translate-x-[32rem] transition-transform duration-1000 ease-out" style={{ willChange: 'transform' }}></span>
              </button>
            </div>
          </div>
          
          {addInfoErrors && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {typeof addInfoErrors === 'string' 
                    ? addInfoErrors 
                    : 'There was an error processing your information. Please try again.'}
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default React.memo(ExtraDetailsPg);