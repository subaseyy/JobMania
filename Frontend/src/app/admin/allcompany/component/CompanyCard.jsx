const { Edit, Trash2 } = require("lucide-react");

export default function CompanyCard({ company, onEdit, onDelete }) {
  return (
    <div className="block sm:hidden bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-lg text-gray-800">{company.name}</div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(company)}
            className="text-[#4640DE] hover:text-[#3a35c7] flex items-center"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(company.id)}
            className="text-red-600 hover:text-red-800 flex items-center"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Industry:</span> {company.industry}
      </div>
      <div className="text-sm text-gray-500">
        <span className="font-semibold">Email:</span> {company.email}
      </div>
    </div>
  );
}
