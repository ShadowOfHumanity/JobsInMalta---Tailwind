import defaultProfile from '../assets/DefaultAvatar.jpg'
import { useAuthSession } from '../Hooks/AuthContext';

interface PFPEditProps {
  profileImageUrl: string | undefined;
  editable?: boolean; // Added boolean prop to control edit mode
}

const PFPEdit = ({profileImageUrl, editable = false} : PFPEditProps) => {

  const { user } = useAuthSession();

  return (
    <>
    
              {/* PFP */}
              <div className={`relative ${editable ? 'group cursor-pointer' : ''}`}>
                
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden ring-4 ring-white">
                  <img 
                    src={profileImageUrl ? profileImageUrl : defaultProfile} 
                    alt={user?.user_id + "'s profile picture"} 
                    className="w-full h-full object-cover object-center "
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.currentTarget.classList.add('hidden');
                      e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-purple-400', 'to-indigo-600', 'flex', 'items-center', 'justify-center');
                      const initialsEl = document.createElement('span');
                      initialsEl.textContent = "PFP"; 
                      initialsEl.className = 'text-white text-6xl font-bold';
                      e.currentTarget.parentElement?.appendChild(initialsEl);
                    }}
                  />
                  
                  {/* Grey overlay on hover - only shown in edit mode */}
                  {editable && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {/* Plus icon */}
                      <span className="text-white text-6xl font-light transform scale-0 group-hover:scale-100 transition-transform duration-300">+</span>
                    </div>
                  )}
                </div>
              </div>
            
    </>
  )
}

export default PFPEdit