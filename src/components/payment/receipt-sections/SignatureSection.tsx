
import React from "react";

const SignatureSection: React.FC = () => {
  return (
    <div className="mt-3 border-t pt-3">
      <div className="flex justify-between">
        <div>
          <p className="text-[9px] text-gray-600 mb-4">Customer Signature</p>
          <div className="border-t border-gray-300 w-20"></div>
        </div>
        <div>
          <p className="text-[9px] text-gray-600 mb-4">Authorized Signature</p>
          <div className="border-t border-gray-300 w-20"></div>
        </div>
      </div>
      <div className="mt-4 text-center text-[9px] text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">Email: accounts@soqotralogistics.com</p>
      </div>
    </div>
  );
};

export default SignatureSection;
