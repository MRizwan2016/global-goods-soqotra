
import React from "react";
import { QatarJob } from "../../../../types/jobTypes";

interface JobItemDetailsProps {
  job: QatarJob;
}

const JobItemDetails: React.FC<JobItemDetailsProps> = ({ job }) => {
  return (
    <div className="pl-2 text-sm">
      <div>
        <span className="font-bold">Location:</span> {job.city}-{job.town}-{job.location}
      </div>
      <div>
        <span className="font-bold">Remarks:</span> {job.remarks || '-'}
      </div>
      <div>
        <span className="font-bold">Description:</span>{" "}
        {job.items && job.items.length > 0
          ? job.items.map((item, i) => (
              <span key={i}>
                {item.itemName}: {item.quantity}
                {i < job.items!.length - 1 ? ", " : ""}
              </span>
            ))
          : "-"}
      </div>
    </div>
  );
};

export default JobItemDetails;
