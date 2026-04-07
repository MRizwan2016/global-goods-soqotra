
import React from "react";

interface HeaderProps {
  blNumber: string;
  date: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  blNumber, 
  date, 
  editable = false,
  onChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex-1">
        <img 
          src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" 
          alt="Soqotra Shipping & Logistics" 
          className="h-10"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.src = "/soqotra-logo.png"; // Fallback to local path
            console.log("Using fallback logo path in HBL Header");
          }}
        />
      </div>
      
      <div className="flex-1 text-center">
        <h1 className="text-lg font-bold">HOUSE BILL OF LADING</h1>
        <p className="text-xs">Non-Negotiable</p>
      </div>
      
      <div className="flex-1 text-right">
        <div className="mb-1 flex justify-end items-center">
          <span className="font-semibold mr-2">B/L No:</span>
          {editable ? (
            <input 
              type="text" 
              name="blNumber"
              value={blNumber} 
              onChange={onChange}
              className="border border-gray-300 px-2 py-1 rounded w-48"
            />
          ) : (
            <span className="bl-number break-words overflow-visible w-48 inline-block text-right">{blNumber}</span>
          )}
        </div>
        
        <div>
          <span className="font-semibold mr-2">Date:</span>
          {editable ? (
            <input 
              type="date" 
              name="date"
              value={date} 
              onChange={onChange}
              className="border border-gray-300 px-2 py-1 rounded w-32"
            />
          ) : (
            <span>{date}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
