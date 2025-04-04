
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="text-center border-b-2 border-black pb-4 mb-6">
      <div className="flex justify-center mb-3">
        <img src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" alt="Soqotra Logo" className="h-16" />
      </div>
      <p className="text-sm mb-2">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
      <h1 className="text-2xl font-bold">MASTER BILL OF LADING (M-BL)</h1>
      <p className="text-sm">NOT NEGOTIABLE UNLESS CONSIGNED TO ORDER</p>
    </div>
  );
};

export default Header;
