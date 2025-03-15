interface jobCardProps {
  companyImageUrl: string;
  companyName: string;
  vacancyName: string;
  vacancyDescription: string;
  vacancyTags?: string[];
}

const JobCards = ({
  companyImageUrl,
  companyName,
  vacancyName,
  vacancyDescription,
  vacancyTags,
}: jobCardProps) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="w-full md:w-3/4 bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl 
                    p-6 flex flex-col gap-4 shadow-md hover:shadow-lg border border-gray-100 
                    dark:border-gray-700 transition-all duration-300">
        {/* Company Logo & Title */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary 
                          rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <img
              className="relative h-20 w-20 object-cover rounded-xl"
              src={companyImageUrl}
              alt={`${companyName} logo`}
            />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">{vacancyName}</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{companyName}</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl 
                           font-semibold transition-colors duration-300 flex items-center gap-2">
            Apply Now
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>

        {/* Vacancy Description */}
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          {vacancyDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {vacancyTags?.map((tag, index) => {
            const tagStyles = [
              'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
              'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
              'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
              'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300'
            ];
            return (
              <span
                key={index}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${tagStyles[index % tagStyles.length]}
                          transition-all duration-300 hover:scale-105 cursor-default`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobCards;
