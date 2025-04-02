export interface Education {
  degree:  string,
  school : string,
  year : string
}

// TRUE = ABOUT ME, FALSE = EDUCATION. YOU CAN CHANGE THIS TO STRING FOR MORE OPTIONS
const AboutContent = ({ contentType, details }: { contentType: boolean, details: string | Education[] }) => {
    if (contentType === true) {
        return (
            <>
                {/* About Me */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm border border-blue-100">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-800 border-b border-indigo-200 pb-1">About Me</h2>
                    <p className="text-base text-gray-700">{String(details)}</p>
                </div>
            </>
        )
    } else if (contentType === false) {
        return (
            <>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg shadow-sm border border-amber-100">
                    <h2 className="text-xl font-semibold mb-2 text-amber-800 border-b border-amber-200 pb-1">Education</h2>
                    <div className="space-y-2">
                        {Array.isArray(details) && details.map((edu, index) => (
                            <div key={index} className="border-l-3 border-amber-400 pl-2 py-1">
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg shadow-sm border border-amber-100">
                                    <div className="space-y-2">
                                        <div key={index} className="border-l-3 border-amber-400 pl-2 py-1">
                                            <h3 className="text-base font-medium text-gray-800">{edu.degree}</h3>
                                            <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default AboutContent