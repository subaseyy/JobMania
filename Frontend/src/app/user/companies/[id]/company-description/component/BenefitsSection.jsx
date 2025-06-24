"use client";

export const BenefitsSection = ({ benefits }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Perks & Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl">{benefit.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};