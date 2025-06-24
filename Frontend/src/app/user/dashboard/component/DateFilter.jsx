"use client";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateFilter({
  dateRange,
  setDateRange,
  showDatePicker,
  setShowDatePicker,
}) {
  const handlePreviousRange = () => {
    const diff =
      dateRange[0].endDate.getDate() - dateRange[0].startDate.getDate();
    setDateRange([
      {
        startDate: subDays(dateRange[0].startDate, diff + 1),
        endDate: subDays(dateRange[0].endDate, diff + 1),
        key: "selection",
      },
    ]);
  };

  const handleNextRange = () => {
    const diff =
      dateRange[0].endDate.getDate() - dateRange[0].startDate.getDate();
    setDateRange([
      {
        startDate: addDays(dateRange[0].startDate, diff + 1),
        endDate: addDays(dateRange[0].endDate, diff + 1),
        key: "selection",
      },
    ]);
  };

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection]);
  };

  const formatDateRange = () =>
    `${format(dateRange[0].startDate, "MMM d")} – ${format(
      dateRange[0].endDate,
      "MMM d"
    )}`;

  return (
    <div className="mb-6 relative">
      <div className="inline-flex items-center border border-gray-200 rounded-md px-4 py-2 text-[#25324B] font-medium shadow-sm bg-white">
        <button onClick={handlePreviousRange} className="mr-2 text-gray-500">
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex items-center"
        >
          <span>{formatDateRange()}</span>
          <Calendar size={16} className="ml-2 text-blue-600" />
        </button>
        <button onClick={handleNextRange} className="ml-2 text-gray-500">
          <ChevronRight size={16} />
        </button>
      </div>

      {showDatePicker && (
        <div className="absolute z-10 mt-2 right-0 bg-white p-4 border rounded-lg shadow-lg">
          <DateRange
            editableDateInputs
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            maxDate={new Date()}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setShowDatePicker(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
