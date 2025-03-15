import { useState } from "react";

interface DropDownProp {
  dropDowns: string[];
  templateText?: string;
}

const DropDownMenu = ({ dropDowns, templateText }: DropDownProp) => {
  const [selected, setSelected] = useState<string>(templateText || "");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto px-4 py-2 md:px-5 md:py-4 bg-white dark:bg-gray-700 
                 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm 
                 flex items-center justify-between min-w-[160px] md:min-w-[200px]
                 hover:border-primary dark:hover:border-primary-light transition-all duration-300"
      >
        <span className="text-gray-700 dark:text-gray-200 text-base md:text-lg">{selected || dropDowns[0]}</span>
        <svg className={`w-5 h-5 ml-2 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
             viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 border-2 border-gray-100 
                      dark:border-gray-600 rounded-xl shadow-xl animate-slide-up">
          {dropDowns.map((item, index) => (
            <button
              key={`dropdown-${item}-${index}`}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
              className="w-full px-5 py-3 text-left text-gray-700 dark:text-gray-200 
                       hover:bg-gray-50 dark:hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg
                       transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
