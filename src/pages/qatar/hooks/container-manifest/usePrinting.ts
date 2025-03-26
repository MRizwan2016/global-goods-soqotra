
import { useState } from "react";
import { PrintOptions } from "../../types/containerTypes";

export const usePrinting = () => {
  const [activeTab, setActiveTab] = useState("cargo");
  const [printViewVisible, setPrintViewVisible] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    section: "all" as "all" | "cargo" | "items" | "consignees" | "invoices",
    orientation: "portrait" as "portrait" | "landscape"
  });

  const handlePrint = () => {
    // Set printing state to prevent multiple clicks
    if (isPrinting) return;
    
    setIsPrinting(true);
    setPrintViewVisible(true);
    
    // Allow time for the print view to fully render before printing
    setTimeout(() => {
      // Apply print-specific body class
      document.body.classList.add('print-only-manifest');
      
      // Print after a short delay
      setTimeout(() => {
        window.print();
        
        // Reset after printing with a delay to ensure printing completes
        setTimeout(() => {
          document.body.classList.remove('print-only-manifest');
          setPrintViewVisible(false);
          setIsPrinting(false);
        }, 1000);
      }, 500);
    }, 800); // Increased delay before printing
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
