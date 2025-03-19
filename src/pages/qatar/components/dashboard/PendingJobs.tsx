
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyJobForecast } from "../../types/jobTypes";

interface PendingJobsProps {
  jobForecasts: DailyJobForecast[];
}

const PendingJobs = ({ jobForecasts }: PendingJobsProps) => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow mb-6">
      <CardHeader className="bg-blue-600 text-white py-2 px-4 rounded-t-md">
        <CardTitle className="text-lg uppercase">PENDING JOBS</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 text-blue-800">
                <th className="border p-2 text-center">NUM</th>
                <th className="border p-2 text-center">JOB DATE</th>
                <th className="border p-2 text-center">DAY</th>
                <th className="border p-2 text-center">TOTAL JOBS</th>
                <th className="border p-2 text-center">DELIVERIES</th>
                <th className="border p-2 text-center">COLLECTION</th>
              </tr>
            </thead>
            <tbody>
              {jobForecasts.map((forecast, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{forecast.date}</td>
                  <td className="border p-2 text-center">{forecast.day}</td>
                  <td className="border p-2 text-center font-medium">{forecast.totalJobs}</td>
                  <td className="border p-2 text-center">{forecast.deliveries}</td>
                  <td className="border p-2 text-center">{forecast.collections}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingJobs;
