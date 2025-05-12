
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const CompletedBooksTable: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">721</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13136001</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13136050</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Multiple Staff</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Export</span>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CompletedBooksTable;
