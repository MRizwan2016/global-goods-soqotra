
import React from "react";

interface HeaderProps {
  blNumber: string;
  date: string;
}

const Header: React.FC<HeaderProps> = ({ blNumber, date }) => {
  return (
    <>
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <div className="flex justify-center mb-3">
          <img src="/lovable-uploads/09288c32-edf3-48e9-9839-a23ae45397ae.png" alt="Soqotra Logo" className="h-16" />
        </div>
        <p className="text-sm mb-2">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
        <h1 className="text-2xl font-bold">HOUSE BILL OF LADING (H-BL)</h1>
        <p className="text-sm">NOT NEGOTIABLE UNLESS CONSIGNED TO ORDER</p>
      </div>

      <div className="flex justify-end mb-4">
        <div className="font-bold">
          <p>BL Number: {blNumber}</p>
          <p>Date: {date}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
