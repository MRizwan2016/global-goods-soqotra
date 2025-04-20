
import React from "react";

const SignatureSection: React.FC = () => {
  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-8">Customer Signature</p>
          <div className="border-t border-gray-300 w-32"></div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-8">Authorized Signature</p>
          <div className="border-t border-gray-300 w-32"></div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">Email: accounts@soqotralogistics.com</p>
      </div>
    </div>
  );
};

export default SignatureSection;
