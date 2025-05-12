
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface NoContainersFoundProps {
  onAddClick?: () => void;
}

const NoContainersFound: React.FC<NoContainersFoundProps> = ({ onAddClick }) => {
  return (
    <tr>
      <td colSpan={9} className="p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-gray-400 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <path d="M22 7H2"></path>
              <path d="M7 7v13"></path>
              <path d="M17 7v13"></path>
            </svg>
          </div>
          <h3 className="font-medium text-lg mb-1">No Containers Found</h3>
          <p className="text-gray-500 mb-4">There are no containers in the system yet.</p>
          
          {onAddClick && (
            <Button 
              onClick={onAddClick}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Container
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default NoContainersFound;
