
import React from "react";

interface ScheduleTitleProps {
  scheduleNumber: string;
}

const ScheduleTitle: React.FC<ScheduleTitleProps> = ({ scheduleNumber }) => {
  return (
    <h2 className="text-xl font-bold uppercase text-center">
      COLLECTION/ DELIVERY JOB SHEET [ SCHEDULE NO: {scheduleNumber} ]
    </h2>
  );
};

export default ScheduleTitle;
