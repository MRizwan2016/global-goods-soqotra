
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FileCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ManifestSkeleton: React.FC = () => {
  return (
    <Card className="shadow-md animate-pulse">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <FileCheck className="mr-2 text-green-600" size={22} />
          Loading Container Manifest...
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full bg-gray-200" />
          <Skeleton className="h-36 w-full bg-gray-200" />
          <Skeleton className="h-64 w-full bg-gray-200" />
          <Skeleton className="h-16 w-full bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ManifestSkeleton;
