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
    
    // Apply print-specific body class immediately
    document.body.classList.add('print-only-manifest');
    
    // First, let's make sure the view is properly rendered
    setTimeout(() => {
      // Trigger window.print() to show the print dialog
      window.print();
      
      // Keep the print view visible for future prints
      // but reset the printing state
      setTimeout(() => {
        setIsPrinting(false);
        // We intentionally don't reset printViewVisible so the manifest stays visible
      }, 1000);
    }, 1000);
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
