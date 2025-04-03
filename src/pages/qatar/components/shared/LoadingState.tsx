
import React from "react";
import { Ship, Package, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  type?: "vessel" | "container" | "manifest";
  text?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = "vessel", 
  text 
}) => {
  const getIcon = () => {
    switch (type) {
      case "vessel":
        return <Ship className="h-12 w-12 text-blue-300" />;
      case "container":
        return <Package className="h-12 w-12 text-blue-300" />;
      case "manifest":
        return <FileText className="h-12 w-12 text-blue-300" />;
      default:
        return <Ship className="h-12 w-12 text-blue-300" />;
    }
  };

  const defaultText = type === "vessel" 
    ? "Loading vessels..." 
    : type === "container" 
      ? "Loading containers..." 
      : "Loading manifest...";

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="mb-4"
      >
        {getIcon()}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-gray-500 font-medium"
      >
        {text || defaultText}
      </motion.div>
      
      <motion.div 
        className="w-32 h-1 bg-gray-200 mt-4 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-blue-500"
          animate={{
            x: [-120, 120]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingState;
