// "use client";

// import { format } from "date-fns";

// export default function StatsCards({ dateRange }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//       <div className="bg-white rounded-lg p-6 shadow-sm border">
//         <h3 className="text-gray-600 font-medium mb-2">
//           Applications ({format(dateRange[0].startDate, "MMM d")} - {format(dateRange[0].endDate, "MMM d")})
//         </h3>
//         <div className="text-3xl font-bold text-gray-800">24</div>
//       </div>
      
//       <div className="bg-white rounded-lg p-6 shadow-sm border">
//         <h3 className="text-gray-600 font-medium mb-2">
//           Interviews ({format(dateRange[0].startDate, "MMM d")} - {format(dateRange[0].endDate, "MMM d")})
//         </h3>
//         <div className="text-3xl font-bold text-gray-800">8</div>
//       </div>
      
//       <div className="bg-white rounded-lg p-6 shadow-sm border">
//         <h3 className="text-gray-600 font-medium mb-2">
//           Offers ({format(dateRange[0].startDate, "MMM d")} - {format(dateRange[0].endDate, "MMM d")})
//         </h3>
//         <div className="text-3xl font-bold text-gray-800">2</div>
//       </div>
//     </div>
//   );
// }