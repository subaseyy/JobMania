"use client";

export const TechStackSection = ({ techStack }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
      <div className="grid grid-cols-4 gap-3">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-1">{tech.icon}</div>
            <span className="text-xs text-gray-600 font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};