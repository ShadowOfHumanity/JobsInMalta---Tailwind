import { useAuthSession } from "../Hooks/AuthContext";
import { useState } from "react";

const ProfilePg = () => {
  const { user } = useAuthSession(); 
  // Future hook implementation
  const [activeTab, setActiveTab] = useState('about-skills');
  
  // Mock data
  const profileData = {
    name: "John Doe",
    role: "Software Developer",
    aboutMe: "I'm a passionate software developer with 5+ years of experience building web applications. I love solving complex problems and creating intuitive user experiences.",
    profilePicture: "https://via.placeholder.com/150",
    hobbies: ["Reading", "Hiking", "Photography", "Coding side projects"],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Tailwind CSS"],
    contact: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/johndoe"
    },
    location: "Malta",
    education: [
      { degree: "Master's in Computer Science", school: "University of Malta", year: "2018-2020" },
      { degree: "Bachelor's in Software Engineering", school: "Technical Institute of Technology", year: "2014-2018" }
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Maltese", level: "Fluent" },
      { name: "Italian", level: "Intermediate" }
    ]
  };
  
  return (
    <div className="container mx-auto px-3 py-4 max-w-5xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative">
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 z-10"></div>
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-28 md:h-32 relative"></div>
        
        <div className="p-4 md:p-6 relative">
          {/* Profile picture */}
          <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse blur-md opacity-80"></div>
              <img 
                src={profileData.profilePicture} 
                alt={profileData.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full border-3 border-white shadow-lg object-cover relative z-10"
              />
            </div>
          </div>
          
          {/* Name and role */}
          <div className="mt-14 md:mt-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{profileData.name}</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-1">{profileData.role}</p>
            <p className="text-sm text-gray-500 mb-3">
              <span className="inline-flex items-center justify-center">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                {profileData.location}
              </span>
            </p>
            
            {/* Navigation tabs */}
            <div className="mb-4 border-b bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-t-lg">
              <div className="flex justify-center">
                <button 
                  onClick={() => setActiveTab('about-skills')}
                  className={`py-1 px-3 text-base font-medium transition-all duration-200 ${activeTab === 'about-skills' 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                    : 'text-gray-500 hover:text-blue-400'}`}
                >
                  About & Skills
                </button>
                <button 
                  onClick={() => setActiveTab('education-hobbies')}
                  className={`py-1 px-3 text-base font-medium transition-all duration-200 ${activeTab === 'education-hobbies' 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                    : 'text-gray-500 hover:text-blue-400'}`}
                >
                  Education & Hobbies
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              {/* About & Skills tab */}
              {activeTab === 'about-skills' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* About Me */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm border border-blue-100">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-800 border-b border-indigo-200 pb-1">About Me</h2>
                    <p className="text-base text-gray-700">{profileData.aboutMe}</p>
                  </div>
                  
                  {/* Skills */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-lg shadow-sm border border-emerald-100">
                    <h2 className="text-xl font-semibold mb-2 text-emerald-800 border-b border-emerald-200 pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-1.5">
                      {profileData.skills.map((skill, index) => (
                        <span key={index} className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Education & Hobbies tab */}
              {activeTab === 'education-hobbies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Education */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg shadow-sm border border-amber-100">
                    <h2 className="text-xl font-semibold mb-2 text-amber-800 border-b border-amber-200 pb-1">Education</h2>
                    <div className="space-y-2">
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="border-l-3 border-amber-400 pl-2 py-1">
                          <h3 className="text-base font-medium text-gray-800">{edu.degree}</h3>
                          <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hobbies */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg shadow-sm border border-purple-100">
                    <h2 className="text-xl font-semibold mb-2 text-purple-800 border-b border-purple-200 pb-1">Hobbies</h2>
                    <div className="grid grid-cols-1 gap-2">
                      {profileData.hobbies.map((hobby, index) => (
                        <div key={index} className="flex items-center bg-white rounded-md shadow-sm p-1.5">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white mr-2">
                            {/* Hobby icons */}
                            {hobby === "Reading" && (
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                              </svg>
                            )}
                            {/* ...other hobby icons... */}
                          </div>
                          <span className="text-sm text-gray-700">{hobby}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-3 rounded-lg shadow-sm border border-slate-100">
                {/* Contact info */}
                <div className="mb-3">
                  <h2 className="text-xl font-semibold mb-2 text-slate-800 border-b border-slate-200 pb-1">Contact</h2>
                  <div className="space-y-1 text-sm text-gray-700">
                    {/* Email */}
                    <a href={`mailto:${profileData.contact.email}`} className="flex items-center p-1 rounded hover:bg-white">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span className="text-sm">{profileData.contact.email}</span>
                    </a>
                    {/* Phone */}
                    <a href={`tel:${profileData.contact.phone}`} className="flex items-center p-1 rounded hover:bg-white">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <span className="text-sm">{profileData.contact.phone}</span>
                    </a>
                    {/* LinkedIn */}
                    <a href={`https://${profileData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-1 rounded hover:bg-white">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <span className="text-sm">{profileData.contact.linkedin}</span>
                    </a>
                  </div>
                </div>
                
                {/* Languages */}
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-slate-800 border-b border-slate-200 pb-1">Languages</h2>
                  <div className="space-y-1.5">
                    {profileData.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{lang.name}</span>
                        <span className="text-sm bg-white px-2 py-0.5 rounded-full text-blue-600 border border-blue-100">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePg;