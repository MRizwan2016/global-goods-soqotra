
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

const ManifestSkeleton: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 animate-pulse border-b h-16">
        <div className="h-8 bg-gray-200 rounded-md w-3/5"></div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Container summary */}
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-10 bg-gray-200 rounded-md"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
            </div>
          </div>
          
          {/* Table skeleton */}
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-md w-full"></div>
            <div className="space-y-2">
              <div className="h-12 bg-gray-200 rounded-md w-full"></div>
              <div className="h-12 bg-gray-200 rounded-md w-full"></div>
              <div className="h-12 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
          
          {/* Tabs skeleton */}
          <div className="animate-pulse space-y-4">
            <div className="flex space-x-2 mb-4">
              <div className="h-8 bg-gray-200 rounded-md w-24"></div>
              <div className="h-8 bg-gray-200 rounded-md w-24"></div>
              <div className="h-8 bg-gray-200 rounded-md w-24"></div>
            </div>
            <div className="h-40 bg-gray-100 rounded-md w-full"></div>
          </div>
          
          {/* Buttons skeleton */}
          <div className="animate-pulse flex justify-end space-x-4 mt-8">
            <div className="h-10 bg-gray-200 rounded-md w-24"></div>
            <div className="h-10 bg-blue-200 rounded-md w-24"></div>
          </div>
        </div>
      </CardContent>
      
      {/* Animated loading indicator */}
      <motion.div 
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
        />
      </motion.div>
    </Card>
  );
};

export default ManifestSkeleton;
