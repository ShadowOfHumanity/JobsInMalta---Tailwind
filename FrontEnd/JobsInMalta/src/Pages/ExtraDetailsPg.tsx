import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FadingQuestion from '../Components/FadingQuestion';
import { Education } from '../types';
 
// New color variants for question categories with enhanced color palette
//  questionTypes = {
//   professional: 'indigo',
//   education: 'emerald',
//   social: 'violet',
//   portfolio: 'amber'
// };

const ExtraDetailsPg = () => { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    education: [{ degree: '', school: '', yearStarted: '', year: '' }] as Education[],
    linkedInUrl: '',
    portfolioUrl: '',
  });

  // Optimize event handlers with useCallback to prevent recreating functions on each render
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle education field changes - optimized with useCallback
  const handleEducationChange = useCallback((index: number, field: string, value: string) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  }, [formData.education]);

  // Add a new education entry - optimized with useCallback
  const addEducation = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', yearStarted: '', year: '' }]
    }));
  }, []);

  // Remove an education entry - optimized with useCallback
  const removeEducation = useCallback((index: number) => {
    if (formData.education.length <= 1) return; // Keep at least one education entry
    
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  }, [formData.education.length]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    navigate('/profile');
  }, [formData, navigate]);

  // Updated education multi-input fields with simplified placeholder
  const educationFields = [
    { 
      key: 'degree', 
      label: 'Degree/Certification', 
      placeholder: 'e.g. Bachelor of Science in Computer Science, Master of Business Administration' 
    },
    { 
      key: 'school', 
      label: 'School/Institution', 
      placeholder: 'e.g. University of Malta' // Simplified placeholder 
    },
    { 
      key: 'yearStarted', 
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
      {/* Enhanced decorative background elements - removed animation for better performance */}
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
          {/* Professional Information Section */}
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
            
            {/* Optimized layout with hardware acceleration for transforms */}
            <div className="space-y-4 md:space-y-6">
              {/* First row: LinkedIn and Portfolio URLs side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(-1deg)' }}>
                  <FadingQuestion
                    question="LinkedIn URL"
                    placeholder="e.g. https://linkedin.com/in/yourprofile"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    position="default"
                    colorTheme={"violet"}
                  />
                </div>
                
                <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(1deg)' }}>
                  <FadingQuestion
                    question="Portfolio/Website URL"
                    placeholder="e.g. https://yourportfolio.com"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    position="default"
                    colorTheme={"amber"}
                  />
                </div>
              </div>
              
              {/* Second row: Job Title full width - with performance optimization */}
              <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300" style={{ willChange: 'transform', transform: 'translateZ(0) rotate(-1deg)' }}>
                <FadingQuestion
                  question="What is your current job title?"
                  placeholder="e.g. Software Developer, Project Manager"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  position="default"
                  colorTheme={"indigo"}
                />
              </div>
            </div>
          </div>
          
          {/* Education History section - with performance optimization */}
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
            
            {/* Optimized transform with hardware acceleration */}
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
                  yearStarted: edu.yearStarted || '',
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
          
          <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg shadow-inner">
              <div className="p-2 bg-amber-100 dark:bg-amber-800/40 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="italic opacity-90 hover:opacity-100 transition-opacity">You can always update these details later</span>
            </div>
            
            {/* Optimized button transforms */}
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
                className="px-6 py-3 rounded-lg text-sm font-medium text-white
                          relative overflow-hidden group
                          bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 
                          hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500/50 dark:focus:ring-offset-gray-900
                          transition-all duration-300 shadow-md hover:shadow-lg
                          transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                style={{ willChange: 'transform' }}
              >
                <span className="relative z-10">Save & Continue</span>
                <span className="absolute inset-0 bg-white/20 dark:bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" style={{ willChange: 'transform' }}></span>
                <span className="absolute top-0 left-0 w-20 h-full bg-white/10 transform -skew-x-12 -translate-x-32 group-hover:translate-x-[32rem] transition-transform duration-1000 ease-out" style={{ willChange: 'transform' }}></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export a memoized version of the component to prevent unnecessary re-renders
export default React.memo(ExtraDetailsPg);