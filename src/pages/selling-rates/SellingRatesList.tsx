
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  InvoiceTableHead,
  InvoiceTableCell 
} from "@/components/ui/table";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Edit, 
  Trash, 
  Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for selling rates
const mockSellingRates = [
  { id: "1", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "POLONNARUWA", country: "Sri Lanka" },
  { id: "2", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "CHILAW", country: "Sri Lanka" },
  { id: "3", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "AMPARA", country: "Sri Lanka" },
  { id: "4", freightType: "S", tariffNumber: "2", effectiveFrom: "01/01/2022", district: "NAIROBI", country: "Kenya" },
  { id: "5", freightType: "A", tariffNumber: "3", effectiveFrom: "01/01/2022", district: "ASMARA", country: "Eritrea" },
  { id: "6", freightType: "S", tariffNumber: "4", effectiveFrom: "01/01/2022", district: "KHARTOUM", country: "Sudan" },
  { id: "7", freightType: "S", tariffNumber: "5", effectiveFrom: "01/01/2022", district: "RIYADH", country: "Saudi Arabia" },
  { id: "8", freightType: "A", tariffNumber: "6", effectiveFrom: "01/01/2022", district: "DUBAI", country: "United Arab Emirates" },
  { id: "9", freightType: "S", tariffNumber: "7", effectiveFrom: "01/01/2022", district: "MOGADISHU", country: "Somalia" },
  { id: "10", freightType: "S", tariffNumber: "8", effectiveFrom: "01/01/2022", district: "TUNIS", country: "Tunisia" },
];

const SellingRatesList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [sector, setSector] = useState("COLOMBO : C");
  const [country, setCountry] = useState("ALL");

  const filteredData = mockSellingRates.filter(
    (item) =>
      (searchText === "" || 
        item.district.toLowerCase().includes(searchText.toLowerCase()) || 
        item.tariffNumber.toLowerCase().includes(searchText.toLowerCase())) &&
      (country === "ALL" || item.country === country)
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Layout title="Selling Rates Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">View Selling Tariff Record Listed</h3>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 w-full">
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="COLOMBO : C">COLOMBO : C</option>
              <option value="DOHA : D">DOHA : D</option>
              <option value="MANILA : M">MANILA : M</option>
            </select>
            
            <select 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL COUNTRIES</option>
              <option value="Sri Lanka">SRI LANKA</option>
              <option value="Kenya">KENYA</option>
              <option value="Eritrea">ERITREA</option>
              <option value="Sudan">SUDAN</option>
              <option value="Saudi Arabia">SAUDI ARABIA</option>
              <option value="United Arab Emirates">UNITED ARAB EMIRATES</option>
              <option value="Somalia">SOMALIA</option>
              <option value="Tunisia">TUNISIA</option>
            </select>
            
            <Link to="/data-entry/selling-rates/new" className="ml-auto">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Add New
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>50</option>
                <option>100</option>
                <option>200</option>
              </select>
              <span className="text-sm text-gray-500">entries</span>
            </div>
            
            <div className="relative ml-auto">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 pr-3 py-1 border border-gray-300 rounded text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
          
          <div className="overflow-x-auto border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-soqotra-blue hover:bg-soqotra-blue">
                  <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Modify</InvoiceTableHead>
                  <InvoiceTableHead>Freight Type</InvoiceTableHead>
                  <InvoiceTableHead>Tariff Number</InvoiceTableHead>
                  <InvoiceTableHead>Effective From</InvoiceTableHead>
                  <InvoiceTableHead>District/Zone</InvoiceTableHead>
                  <InvoiceTableHead>Country</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Delete</InvoiceTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Link to={`/data-entry/selling-rates/edit/${item.id}`}>
                          <Edit size={16} className="text-blue-500 inline-block" />
                        </Link>
                      </InvoiceTableCell>
                      <InvoiceTableCell>{item.freightType}</InvoiceTableCell>
                      <InvoiceTableCell>{item.tariffNumber}</InvoiceTableCell>
                      <InvoiceTableCell>{item.effectiveFrom}</InvoiceTableCell>
                      <InvoiceTableCell>{item.district}</InvoiceTableCell>
                      <InvoiceTableCell>{item.country}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Trash size={16} className="text-red-500 inline-block cursor-pointer" />
                      </InvoiceTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <InvoiceTableCell colSpan={8} className="text-center py-4">
                      No data available in table
                    </InvoiceTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredData.length > 0 ? indexOfFirstEntry + 1 : 0} to{" "}
              {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
            </div>
            
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellingRatesList;
