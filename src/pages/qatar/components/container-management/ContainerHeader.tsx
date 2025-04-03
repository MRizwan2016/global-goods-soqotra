
import React from "react";
import { motion } from "framer-motion";

const ContainerHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg mb-6 p-5"
    >
      <h1 className="text-2xl font-bold text-blue-800 flex items-center">
        <span className="mr-2">📦</span>
        Container Management System
      </h1>
      <p className="text-blue-600 mt-1">Manage containers, cargo loading, and manifests</p>
    </motion.div>
  );
};

export default ContainerHeader;
