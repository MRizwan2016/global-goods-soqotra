
import { useState } from 'react';
import { PrintOptions } from '../../types/containerTypes';

export const usePrinting = () => {
  const [activeTab, setActiveTab] = useState("cargo");
  const [printViewVisible, setPrintViewVisible] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    section: "all",
    orientation: "portrait"
  });

  const handlePrint = () => {
    setPrintViewVisible(true);
    setIsPrinting(true);
    
    // Allow time for the print view to render before printing
    setTimeout(() => {
      window.print();
      
      // Reset after printing
      setTimeout(() => {
        setPrintViewVisible(false);
        setIsPrinting(false);
      }, 500);
    }, 100);
  };

  return {
    activeTab,
    setActiveTab,
    printViewVisible,
    setPrintViewVisible,
    isPrinting,
    printOptions,
    setPrintOptions,
    handlePrint
  };
};
