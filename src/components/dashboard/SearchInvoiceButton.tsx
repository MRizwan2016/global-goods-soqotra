
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchInvoiceButton = () => {
  const navigate = useNavigate();

  const handleSearchInvoices = () => {
    navigate('/reports/cargo');
  };

  return (
    <Button
      onClick={handleSearchInvoices}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      <Search className="h-4 w-4 mr-2" />
      Search Invoices
    </Button>
  );
};

export default SearchInvoiceButton;
