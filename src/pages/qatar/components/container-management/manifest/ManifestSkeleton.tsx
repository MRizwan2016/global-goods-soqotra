
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ManifestSkeleton: React.FC = () => {
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <Loader2 className="mr-2 animate-spin" size={22} />
          Loading Container Manifest
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Summary skeleton */}
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 rounded-md" />
            <Skeleton className="h-20 rounded-md" />
            <Skeleton className="h-20 rounded-md" />
          </div>
          
          {/* Container details skeleton */}
          <div className="mt-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
          </div>
          
          {/* Tabs skeleton */}
          <div className="mt-6">
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
            
            <Skeleton className="h-60 rounded-md" />
          </div>
          
          {/* Action buttons skeleton */}
          <div className="flex justify-between items-center mt-6">
            <Skeleton className="h-10 w-24 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManifestSkeleton;
