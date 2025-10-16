import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Calendar, CalendarDays, CalendarRange, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReportHeader from "./components/ReportHeader";
import DailyPerformance from "./components/performance/DailyPerformance";
import WeeklyPerformance from "./components/performance/WeeklyPerformance";
import MonthlyPerformance from "./components/performance/MonthlyPerformance";
import AnnualPerformance from "./components/performance/AnnualPerformance";

const StaffPerformance: React.FC = () => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`p-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-background overflow-auto' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Staff Performance</h1>
        </div>
        <Button onClick={() => navigate('/dashboard')} variant="outline" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="daily" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-1">
            <CalendarRange className="h-4 w-4" />
            Monthly
          </TabsTrigger>
          <TabsTrigger value="annual" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Annual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <ReportHeader 
              title="Daily Performance" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <DailyPerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <ReportHeader 
              title="Weekly Performance" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <WeeklyPerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <ReportHeader 
              title="Monthly Performance" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <MonthlyPerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annual">
          <Card>
            <ReportHeader 
              title="Annual Performance" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <AnnualPerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPerformance;
