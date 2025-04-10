
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { DollarSign, FileText, Building, PieChart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinancialReports = () => {
  const navigate = useNavigate();
  
  return (
    <Layout title="Financial Reports">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
          </div>
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                Revenue Reports
              </CardTitle>
              <CardDescription>
                Generate comprehensive revenue reports based on different criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Monthly Revenue Report</div>
                    <div className="text-sm text-gray-500">View revenue broken down by month</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-purple-600 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Branch Revenue Analysis</div>
                    <div className="text-sm text-gray-500">Compare revenue across different branches</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center">
                  <PieChart className="h-5 w-5 text-amber-600 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Service Revenue Distribution</div>
                    <div className="text-sm text-gray-500">Analyze revenue by service type</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                Financial Statements
              </CardTitle>
              <CardDescription>
                Generate official financial statements and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Profit & Loss Statement</div>
                    <div className="text-sm text-gray-500">View P&L for any time period</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-blue-600 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Balance Sheet</div>
                    <div className="text-sm text-gray-500">View company assets and liabilities</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-purple-600 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Cash Flow Statement</div>
                    <div className="text-sm text-gray-500">Track cash movements across the business</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-amber-600 mr-2" />
                Custom Reports
              </CardTitle>
              <CardDescription>
                Generate custom financial reports based on your specific needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
                <p className="text-amber-800">
                  Custom financial reports allow you to analyze your financial data in ways that suit your specific business needs.
                  Combine different metrics, filter by various criteria, and export in multiple formats.
                </p>
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700">
                <FileText className="h-4 w-4 mr-2" />
                Create Custom Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default FinancialReports;
