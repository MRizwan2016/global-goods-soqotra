
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ManifestErrorProps {
  error: string | null;
  onCancel: () => void;
  onRetry?: () => void;
}

const ManifestError: React.FC<ManifestErrorProps> = ({ 
  error, 
  onCancel,
  onRetry
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-md border-red-200">
        <CardContent className="p-6">
          <motion.div 
            className="flex flex-col items-center justify-center p-8 text-center"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold text-red-700 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Error Loading Manifest
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-6 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {error || "There was an error loading the container manifest. Please try again or contact support."}
            </motion.p>
            
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="flex items-center gap-2"
              >
                <Home size={16} />
                Back to Containers
              </Button>
              
              {onRetry && (
                <Button 
                  onClick={onRetry}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <RotateCcw size={16} />
                  Retry
                </Button>
              )}
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ManifestError;
