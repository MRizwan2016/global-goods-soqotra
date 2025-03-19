
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

const ScheduleFormHeader = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4">
      <CardTitle className="text-lg font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        SCHEDULE INFORMATION
      </CardTitle>
    </CardHeader>
  );
};

export default ScheduleFormHeader;
