
import React from "react";
import { Button } from "@/components/ui/button";
import { useJobForm } from "./context/JobFormContext";

const JobFooter: React.FC = () => {
  const { isSaving } = useJobForm();
  
  return (
    <div className="mt-8 flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline"
        className="px-6"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6"
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Job'}
      </Button>
    </div>
  );
};

export default JobFooter;
