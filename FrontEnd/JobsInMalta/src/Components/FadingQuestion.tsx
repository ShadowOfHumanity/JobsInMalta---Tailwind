import React, { useState, useCallback, useMemo, memo } from 'react';

// Enhanced color theme mapping with more vibrant colors
const themeColors = {
  default: {
    gradient: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850',
    focus: 'ring-primary/40',
    icon: 'fill-primary/80',
    text: 'text-primary dark:text-primary-light',
    border: 'border-primary/30 dark:border-primary/30',
    ring: 'ring-primary/60',
    shadow: 'shadow-gray-300/50 dark:shadow-gray-900/50',
    hover: 'from-blue-50/20 to-indigo-50/20 dark:from-blue-900/10 dark:to-indigo-900/10'
  },
  indigo: {
    gradient: 'from-indigo-50 to-blue-50/70 dark:from-indigo-900/30 dark:to-blue-900/20',
    focus: 'ring-indigo-400/40',
    icon: 'fill-indigo-500',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-300/50 dark:border-indigo-500/30',
    ring: 'ring-indigo-400/60',
    shadow: 'shadow-indigo-200/50 dark:shadow-indigo-900/30',
    hover: 'from-indigo-100/30 to-blue-100/30 dark:from-indigo-800/20 dark:to-blue-800/20'
  },
  emerald: {
    gradient: 'from-emerald-50 to-teal-50/70 dark:from-emerald-900/30 dark:to-teal-900/20',
    focus: 'ring-emerald-400/40',
    icon: 'fill-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-300/50 dark:border-emerald-500/30',
    ring: 'ring-emerald-400/60',
    shadow: 'shadow-emerald-200/50 dark:shadow-emerald-900/30',
    hover: 'from-emerald-100/30 to-teal-100/30 dark:from-emerald-800/20 dark:to-teal-800/20'
  },
  violet: {
    gradient: 'from-violet-50 to-purple-50/70 dark:from-violet-900/30 dark:to-purple-900/20',
    focus: 'ring-violet-400/40',
    icon: 'fill-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-300/50 dark:border-violet-500/30',
    ring: 'ring-violet-400/60',
    shadow: 'shadow-violet-200/50 dark:shadow-violet-900/30',
    hover: 'from-violet-100/30 to-purple-100/30 dark:from-violet-800/20 dark:to-purple-800/20'
  },
  amber: {
    gradient: 'from-amber-50 to-orange-50/70 dark:from-amber-900/30 dark:to-orange-900/20',
    focus: 'ring-amber-400/40',
    icon: 'fill-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-300/50 dark:border-amber-500/30',
    ring: 'ring-amber-400/60',
    shadow: 'shadow-amber-200/50 dark:shadow-amber-900/30',
    hover: 'from-amber-100/30 to-orange-100/30 dark:from-amber-800/20 dark:to-orange-800/20'
  }
};

// Type for multi-input fields
interface MultiInputField {
  key: string;
  label: string;
  placeholder: string;
  type?: string;
}

interface FadingQuestionProps {
  question: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  position?: 'default' | 'left' | 'right';
  colorTheme?: 'default' | 'indigo' | 'emerald' | 'violet' | 'amber';
  // New props for multi-input support
  isMultiInput?: boolean;
  multiInputFields?: MultiInputField[];
  multiValues?: Record<string, string>[];
  onMultiInputChange?: (index: number, field: string, value: string) => void;
  onAddInput?: () => void;
  onRemoveInput?: (index: number) => void;
  showAddButton?: boolean;
  // New props for enhanced education layout
  fullWidthDegree?: boolean; 
  twoRowLayout?: boolean;
}

const FadingQuestion: React.FC<FadingQuestionProps> = ({ 
  question, 
  placeholder, 
  name,
  value = '',
  onChange = () => {},
  type = 'text',
  position = 'default',
  colorTheme = 'default',
  // Multi-input props with defaults
  isMultiInput = false,
  multiInputFields = [],
  multiValues = [],
  onMultiInputChange = () => {},
  onAddInput = () => {},
  onRemoveInput = () => {},
  showAddButton = false,
  twoRowLayout = false
}) => {
  // Combine related state into a single object to reduce renders
  const [state, setState] = useState({
    isFocused: false,
    isHovered: false,
    hasInteracted: false,
    focusedInputIndex: null as number | null
  });

  // Memoize theme colors to avoid recalculation
  const theme = useMemo(() => themeColors[colorTheme], [colorTheme]);

  // Optimize handlers with useCallback
  const handleMouseEnter = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isHovered: true,  
      hasInteracted: true 
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState(prev => ({ ...prev, isHovered: false }));
  }, []);

  const handleFocus = useCallback(() => {
    setState(prev => ({ ...prev, isFocused: true }));
  }, []);

  const handleBlur = useCallback(() => {
    setState(prev => ({ ...prev, isFocused: false }));
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setState(prev => ({ ...prev, hasInteracted: true }));
  }, [onChange]);

  const handleMultiInputFocus = useCallback((index: number) => {
    setState(prev => ({ ...prev, focusedInputIndex: index }));
  }, []);

  const handleMultiInputBlur = useCallback(() => {
    setState(prev => ({ ...prev, focusedInputIndex: null }));
  }, []);

  // Extract state values for readability
  const { isFocused, isHovered, hasInteracted, focusedInputIndex } = state;

  return (
    <div 
      className={`
        mb-8 
        ${position === 'left' ? 'max-w-xl' : position === 'right' ? 'ml-auto max-w-xl' : 'w-full'}
      `}
    >
      {/* Standard single input question */}
      {!isMultiInput && (
        <div 
          className={`
            flex flex-col gap-2 text-base 
            bg-gradient-to-br ${theme.gradient}
            hover:bg-gradient-to-br hover:${theme.hover}
            rounded-lg shadow-sm ${theme.shadow}
            p-5 transition-all duration-300 ease-in-out
            ${isHovered && !isFocused ? 'scale-[1.005]' : ''}
            ${isFocused ? `scale-[1.01] ring-2 ${theme.focus}` : ''}
            hover:shadow-md dark:hover:shadow-gray-900/70
            ${hasInteracted ? 'translate-y-0' : 'translate-y-2 opacity-90'}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform, box-shadow',
            transform: `translateZ(0) ${isFocused ? 'scale(1.01)' : isHovered ? 'scale(1.005)' : 'scale(1)'} ${hasInteracted ? 'translateY(0)' : 'translateY(0.5rem)'}`,
          }}
        >
          {/* Optimized decorative elements - reduced number of blur effects */}
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white/30 dark:bg-gray-700/30 -z-10 opacity-80"></div>
          <div className={`absolute -bottom-1 -left-1 w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradient} -z-10 opacity-70`}></div>
          
          {/* Header with question */}
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-[18px] h-[18px] transition-colors duration-300 ${isFocused ? theme.icon : 'fill-gray-400 dark:fill-gray-500'}`}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z" />
              </svg>
              <span className={`font-medium transition-colors duration-300 ${isFocused ? theme.text : 'text-gray-700 dark:text-gray-300'}`}>
                {question}
              </span>
            </div>
          </div>

          {/* Optimized divider with simplified animation */}
          <div className="relative h-px w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div 
              className={`absolute h-full bg-gradient-to-r from-transparent via-${colorTheme === 'default' ? 'primary' : colorTheme}-500 to-transparent dark:via-${colorTheme === 'default' ? 'primary-light' : colorTheme}-400`}
              style={{
                width: '100%',
                left: isFocused ? '0%' : '-100%',
                opacity: isFocused ? 0.6 : 0,
                transition: 'left 700ms ease-in-out, opacity 700ms ease-in-out',
                willChange: 'left, opacity'
              }}
            ></div>
          </div>

          {/* Input field with improved performance */}
          <div className="mt-2">
            <div className="relative overflow-hidden rounded-md">
              {/* Hardware-accelerated background effect when focused */}
              {isFocused && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5"
                  style={{ 
                    animation: 'shine 1.6s ease-in-out infinite',
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
                ></div>
              )}
              
              <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`
                  w-full py-3.5 px-4 
                  border-0 rounded-md
                  text-gray-800 dark:text-gray-100 
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  text-base
                  transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-0
                  shadow-inner shadow-gray-200/70 dark:shadow-black/30
                  relative z-10
                  ${isFocused 
                    ? 'bg-white dark:bg-gray-700' 
                    : isHovered 
                      ? 'bg-white/95 dark:bg-gray-750/95' 
                      : 'bg-white/90 dark:bg-gray-750/90'
                  }
                `}
                style={{
                  backdropFilter: 'blur(8px)',
                  willChange: 'background-color'
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              
              {/* Optimized focus effect - reduced animation complexity */}
              {isFocused && (
                <div 
                  className={`absolute inset-0 rounded-md pointer-events-none ring-1 ${theme.ring}`}
                  style={{ 
                    opacity: '0.8',
                    willChange: 'opacity'
                  }}
                ></div>
              )}
              
              {/* Static highlight on hover instead of animated */}
              {isHovered && !isFocused && (
                <div 
                  className="absolute inset-0 rounded-md pointer-events-none ring-1 ring-gray-300 dark:ring-gray-600"
                  style={{ willChange: 'opacity' }}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Multi-input question with performance optimizations */}
      {isMultiInput && (
        <div>
          <div 
            className={`
              flex flex-col gap-2 text-base 
              bg-gradient-to-br ${theme.gradient}
              rounded-lg shadow-sm ${theme.shadow}
              p-5 transition-all duration-300 ease-in-out
              hover:shadow-md dark:hover:shadow-gray-900/70
            `}
            onMouseEnter={handleMouseEnter}
            style={{
              willChange: 'box-shadow',
              transform: 'translateZ(0)'
            }}
          >
            {/* Header with question */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-[18px] h-[18px] ${theme.icon}`}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z" />
                </svg>
                <span className={`font-medium ${theme.text}`}>
                  {question}
                </span>
              </div>
            </div>

            {/* Performance-optimized education fields */}
            {multiValues.map((itemValues, index) => (
              <div 
                key={index} 
                className={`mb-6 p-5 bg-white/80 dark:bg-gray-750/80 rounded-lg shadow-sm ${focusedInputIndex === index ? `ring-2 ${theme.focus}` : ''}`}
                style={{
                  willChange: focusedInputIndex === index ? 'box-shadow' : 'auto',
                  transform: 'translateZ(0)'
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                    Education #{index + 1}
                  </span>
                  
                  {/* Remove button - optimized */}
                  {multiValues.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => onRemoveInput(index)}
                      className="p-1.5 rounded-full text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Optimized layout for education fields */}
                <div className="space-y-4">
                  {/* Row 1: Degree (full width) - optimized */}
                  {twoRowLayout && (
                    <div className="w-full">
                      {multiInputFields.filter(field => field.key === 'degree').map((field) => (
                        <div key={field.key} className="relative">
                          <label 
                            htmlFor={`${name}-${index}-${field.key}`} 
                            className={`block text-sm font-medium mb-1.5 ${theme.text}`}
                          >
                            {field.label}
                          </label>
                          <input
                            id={`${name}-${index}-${field.key}`}
                            type={field.type || 'text'}
                            value={itemValues[field.key] || ''}
                            onChange={(e) => {
                              onMultiInputChange(index, field.key, e.target.value);
                              setState(prev => ({ ...prev, hasInteracted: true }));
                            }}
                            placeholder={field.placeholder}
                            className="w-full bg-white/90 dark:bg-gray-700/90 border-0 rounded-md py-2.5 px-3 text-gray-800 dark:text-gray-100 shadow-inner shadow-gray-200/40 dark:shadow-black/20 focus:ring-2 focus:outline-none transition-all duration-200"
                            onFocus={() => handleMultiInputFocus(index)}
                            onBlur={handleMultiInputBlur}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Rest of the education fields - optimized rendering */}
                  <div className="w-full">
                    {multiInputFields
                      .filter(field => field.key === 'school')
                      .map((field) => (
                        <div key={field.key} className="relative">
                          <label 
                            htmlFor={`${name}-${index}-${field.key}`} 
                            className={`block text-sm font-medium mb-1.5 ${theme.text}`}
                          >
                            {field.label}
                          </label>
                          <input
                            id={`${name}-${index}-${field.key}`}
                            type={field.type || 'text'}
                            value={itemValues[field.key] || ''}
                            onChange={(e) => {
                              onMultiInputChange(index, field.key, e.target.value);
                              setState(prev => ({ ...prev, hasInteracted: true }));
                            }}
                            placeholder={field.placeholder}
                            className="w-full bg-white/90 dark:bg-gray-700/90 border-0 rounded-md py-2.5 px-3 text-gray-800 dark:text-gray-100 shadow-inner shadow-gray-200/40 dark:shadow-black/20 focus:ring-2 focus:outline-none transition-all duration-200"
                            onFocus={() => handleMultiInputFocus(index)}
                            onBlur={handleMultiInputBlur}
                          />
                        </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {multiInputFields
                      .filter(field => field.key === 'yearStarted' || field.key === 'year')
                      .map((field) => (
                        <div key={field.key} className="relative">
                          <label 
                            htmlFor={`${name}-${index}-${field.key}`} 
                            className={`block text-sm font-medium mb-1.5 ${theme.text}`}
                          >
                            {field.label}
                          </label>
                          <input
                            id={`${name}-${index}-${field.key}`}
                            type={field.type || 'text'}
                            value={itemValues[field.key] || ''}
                            onChange={(e) => {
                              onMultiInputChange(index, field.key, e.target.value);
                              setState(prev => ({ ...prev, hasInteracted: true }));
                            }}
                            placeholder={field.placeholder}
                            className="w-full bg-white/90 dark:bg-gray-700/90 border-0 rounded-md py-2.5 px-3 text-gray-800 dark:text-gray-100 shadow-inner shadow-gray-200/40 dark:shadow-black/20 focus:ring-2 focus:outline-none transition-all duration-200"
                            onFocus={() => handleMultiInputFocus(index)}
                            onBlur={handleMultiInputBlur}
                          />
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Optimized Add button */}
            {showAddButton && (
              <button
                type="button"
                onClick={onAddInput}
                className={`mt-3 flex items-center gap-2 ${theme.text} hover:opacity-80 text-sm font-medium transition-colors self-start bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/30`}
              >
                <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-200 dark:bg-emerald-800/50`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Add Another Education</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Add CSS for optimized shine animation
const injectShineAnimation = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shine {
      0% { transform: translateX(-100%) translateZ(0); }
      100% { transform: translateX(100%) translateZ(0); }
    }
  `;
  document.head.appendChild(style);
};

// Run once when component is first used
if (typeof window !== 'undefined') {
  injectShineAnimation();
}

// Memoize the component to prevent unnecessary re-renders
export default memo(FadingQuestion);