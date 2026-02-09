
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
      className="bg-[#1e2a3a] hover:bg-[#253549] text-white"
    >
      <Search className="h-4 w-4 mr-2" />
      Search Invoices
    </Button>
  );
};

export default SearchInvoiceButton;
