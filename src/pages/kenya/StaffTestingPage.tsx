
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ClipboardList, Bug, PenTool } from "lucide-react";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const StaffTestingPage = () => {
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [newFeedback, setNewFeedback] = useState("");

  const handleSubmitFeedback = () => {
    if (newFeedback.trim()) {
      setFeedbacks([...feedbacks, newFeedback]);
      setNewFeedback("");
      toast.success("Feedback submitted successfully");
    } else {
      toast.error("Please enter your feedback");
    }
  };

  const testingAreas = [
    {
      title: "Delivery Management",
      description: "Test creating, viewing, and updating deliveries",
      steps: [
        "Navigate to Deliveries page",
        "Create a new delivery with the Add New Delivery button",
        "View a delivery's details by clicking on it",
        "Update delivery status and information"
      ]
    },
    {
      title: "Vehicle Management",
      description: "Test vehicle tracking and management features",
      steps: [
        "Navigate to Vehicles page",
        "Add a new vehicle using the Add New Vehicle button",
        "Filter vehicles by status",
        "Edit vehicle information"
      ]
    },
    {
      title: "Driver Management",
      description: "Test driver assignment and management",
      steps: [
        "Navigate to Drivers page",
        "Add a new driver using the Add New Driver button",
        "Assign drivers to deliveries",
        "Update driver information and status"
      ]
    },
    {
      title: "Financial System",
      description: "Test financial tracking and reporting",
      steps: [
        "Navigate to Finance page",
        "Review payment records",
        "Test invoice approval system",
        "Generate financial reports"
      ]
    }
  ];

  return (
    <Layout title="Staff Testing - www.soqotralog.com">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya" />
            <h3 className="text-lg font-medium text-green-800">Staff Testing Portal</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to www.soqotralog.com Testing</h1>
            <p className="text-gray-600">
              This page provides instructions and resources for staff members testing the system.
              Please follow the guidelines below and report any issues found.
            </p>
          </div>

          <Tabs defaultValue="instructions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="instructions" className="flex items-center gap-1">
                <ClipboardList className="h-4 w-4" />
                Testing Instructions
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-1">
                <Bug className="h-4 w-4" />
                Submit Feedback
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {testingAreas.map((area, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{area.title}</CardTitle>
                      <CardDescription>{area.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Testing Guidelines</CardTitle>
                  <CardDescription>Follow these best practices when testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Test with realistic data that matches actual use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Try both valid and invalid inputs to test error handling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Test on different devices and screen sizes if possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Document any issues found with detailed steps to reproduce</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Testing Feedback</CardTitle>
                  <CardDescription>Report issues or suggest improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full gap-1.5">
                      <label htmlFor="feedback" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Your Feedback
                      </label>
                      <textarea
                        id="feedback"
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe any issues found or improvements needed..."
                      />
                    </div>
                    <Button 
                      onClick={handleSubmitFeedback}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <PenTool className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </div>

                  {feedbacks.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Submitted Feedback:</h4>
                      <ul className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-3">
                        {feedbacks.map((feedback, i) => (
                          <li key={i} className="bg-gray-50 p-3 rounded-md border border-gray-100">
                            {feedback}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StaffTestingPage;
