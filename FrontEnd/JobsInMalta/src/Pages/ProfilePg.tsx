import { useAuthSession } from "../Hooks/AuthContext";
import PFP from "../Components/PFP";
import AboutContent from "../Components/AboutContent";
import { useUserInfo } from "../Hooks/UseUserInfo";

const ProfilePg = () => {
  
  //const { userInfo: profileData, loading, error, refetch: fetchUserInfo } = useUserInfo();
  //console.log("Profile Data:", profileData);

  //Mock data
  const profileData = {
    first_name: "John",
    last_name: "Doe",
    professional_title: "Software Developer",
    bio: "I'm a passionate software developer with 5+ years of experience building web applications. I love solving complex problems and creating intuitive user experiences.",
    profile_picture: "https://via.placeholder.com/150",
    contact_email: "john.doe@example.com",
    contact_phone: "123-4567",
    country_code: "+1 (555) ",
    linkedIn_url: "https://www.linkedin.com/in/johndoe",
    portfolio_url: "johndoe.portfolio.com",
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

  // if (error) {
  //   return <div className="text-red-500 text-center mt-4">{error}</div>;
  // } else {

    return (
      <div className="container mx-auto px-3 py-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 z-10"></div>

          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-28 md:h-32 relative"></div>
          <div className="p-4 md:p-6 relative">

            <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 scale-[0.4] md:scale-[0.4] origin-top flex justify-center w-full">
              <PFP profileImageUrl={profileData?.profile_picture} />
            </div>

            {/* Name and role */}
            <div className="mt-14 md:mt-16 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}` : ''}
              </h1>
             
              {profileData?.professional_title &&
                <p className="text-xl md:text-2xl text-gray-600 mb-1">{profileData.professional_title}</p>
              }
              
              <p className="text-sm text-gray-500 mb-3">
                {profileData?.location && (
                  <span className="inline-flex items-center justify-center">
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {profileData.location}
                  </span>
                )}
              </p>

              {/* Removed navigation tabs */}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 space-y-4">
                {/* About */}
                <div className="grid grid-cols-1 gap-4">
                  
                  {profileData?.bio && 
                  <AboutContent contentType={true} details={profileData.bio} />
                  }
                  {profileData?.education &&
                  <AboutContent contentType={false} details={profileData.education} />
                  }
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-3 rounded-lg shadow-sm border border-slate-100">
                  {/* Contact info */}
                  {profileData?.contact_phone && (
                    <div className="mb-3">
                      <h2 className="text-xl font-semibold mb-2 text-slate-800 border-b border-slate-200 pb-1">Contact</h2>
                      <div className="space-y-1 text-sm text-gray-700">
                        {/* Email */}
                        {profileData.contact_email && (
                          <a href={`mailto:${profileData.contact_email}`} className="flex items-center p-1 rounded hover:bg-white">
                            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                            <span className="text-sm">{profileData.contact_email}</span>
                          </a>
                        )}
                        {/* Phone */}
                        {profileData.contact_phone && (
                          <a href={`tel:${profileData.country_code} ${profileData.contact_phone}`} className="flex items-center p-1 rounded hover:bg-white">
                            <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                              </svg>
                            </div>
                            <span className="text-sm">{profileData.contact_phone}</span>
                          </a>
                        )}
                        {/* LinkedIn */}
                        {profileData.linkedIn_url && (
                          <a href={profileData.linkedIn_url} target="_blank" rel="noopener noreferrer" className="flex items-center p-1 rounded hover:bg-white">
                            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                            <span className="text-sm">{profileData.linkedIn_url}</span>
                          </a>
                        )}
                        {/* Portfolio -> only shown if exists */}
                        {profileData.portfolio_url && (
                          <a href={`https://${profileData.portfolio_url}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-1 rounded hover:bg-white">
                            <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.5 3h-15c-1.4 0-2.5 1.1-2.5 2.5v13c0 1.4 1.1 2.5 2.5 2.5h15c1.4 0 2.5-1.1 2.5-2.5v-13c0-1.4-1.1-2.5-2.5-2.5zm.5 15.5c0 .3-.2.5-.5.5h-15c-.3 0-.5-.2-.5-.5v-9h16v9zm0-10h-16v-3c0-.3.2-.5.5-.5h15c.3 0 .5.2.5.5v3z"/>
                                <circle cx="8" cy="16" r="1"/>
                                <circle cx="12" cy="16" r="1"/>
                                <circle cx="16" cy="16" r="1"/>
                              </svg>
                            </div>
                            <span className="text-sm">{profileData.portfolio_url}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {profileData?.languages && profileData.languages.length > 0 && (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
//}

export default ProfilePg;