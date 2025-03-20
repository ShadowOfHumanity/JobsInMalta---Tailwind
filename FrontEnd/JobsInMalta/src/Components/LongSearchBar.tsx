import DropDownMenu from "./DropDownMenu";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";

const LongSearchBar = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const arangementDropDowns = ["Any site", "On-Site", "Remote", "Hybrid"];
  const dateFilterDropDown = ["Latest", "Expiring"];
  const jobTypeScrollingDropDown = []; // redirect to get Jobs category endpoint
  const experienceLevelDropDown = [
    "Intern",
    "Entry",
    "Graduate",
    "Intermediate",
    "Professional",
    "Senior",
    "Director",
  ];

  return (
    <div className="container mx-auto mt-8 px-4 relative">
      {/* motivational banner */}
      <div className="text-center mb-8 animate-fade-in">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Find your dream job today. <span className="text-primary font-semibold">Thousands of opportunities in Malta!</span>
        </p>
      </div>

      <div className="w-full h-64 absolute top-0 left-0 overflow-hidden -z-10">
        <div className="w-full h-full bg-wave-pattern opacity-20 dark:opacity-5"></div>
      </div>
      
      {/* Search section */}
      <div className="flex justify-center relative z-30">
        <div className="w-full lg:w-4/5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 
                    flex flex-col md:flex-row gap-6 shadow-lg border border-gray-100 dark:border-gray-700">
          {/* Search Input*/}
          <div className="flex-grow">
            <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-xl 
                          bg-white dark:bg-gray-700 hover:border-primary focus-within:border-primary 
                          transition-colors shadow-sm">
              <span className="pl-5 text-primary dark:text-primary-light">
                <IoSearchSharp size={24} />
              </span>
              <input
                className="w-full p-4 bg-transparent rounded-xl text-lg focus:outline-none
                         dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Search for your dream job..."
              />
            </div>
          </div>

          {/* Dropdown && button */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="relative z-40">
              <DropDownMenu dropDowns={arangementDropDowns} />
            </div>
            <button className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary p-px font-semibold text-white">
              <div className="relative rounded-xl bg-primary px-6 py-3 transition-all duration-300 group-hover/btn:bg-opacity-0">
                <span className="relative flex items-center justify-center gap-2">
                  Find Jobs
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Filters w/ mobile layout */}
      <div className="flex justify-center mt-3 relative z-20">
        <div className="w-full lg:w-4/5">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <h5 className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">Filter by:</h5>
              <button
                className="md:hidden px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300
                          hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                {filtersVisible ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            <div className={`${
              filtersVisible ? 'flex' : 'hidden'
            } md:flex flex-col w-full md:w-auto md:flex-row gap-2 mt-2 md:mt-0`}>
              <DropDownMenu
                templateText="Posted date"
                dropDowns={dateFilterDropDown}
              />
              <DropDownMenu
                templateText="Experience level"
                dropDowns={experienceLevelDropDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongSearchBar;
