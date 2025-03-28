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
    
    // Give time for the print view to be properly rendered and displayed
    setTimeout(() => {
      // Force a layout recalculation
      window.dispatchEvent(new Event('resize'));
      
      // Ensure all images are loaded before printing
      const images = document.querySelectorAll('.print-container img');
      const imagePromises = Array.from(images).map(img => {
        if ((img as HTMLImageElement).complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve); // also handle errors
        });
      });
      
      Promise.all(imagePromises).then(() => {
        // Wait a bit more to ensure everything is rendered
        setTimeout(() => {
          console.log('Triggering print dialog');
          window.print();
          
          // Keep the print view visible for future prints
          // but reset the printing state
          setTimeout(() => {
            setIsPrinting(false);
            // We intentionally don't reset printViewVisible so the manifest stays visible
          }, 1000);
        }, 300);
      });
    }, 500);
  };

  // Method to clear the print view when needed
  const clearPrintView = () => {
    setPrintViewVisible(false);
    document.body.classList.remove('print-only-manifest');
  };

  return {
    activeTab,
    setActiveTab,
    printViewVisible,
    setPrintViewVisible,
    isPrinting,
    printOptions,
    setPrintOptions,
    handlePrint,
    clearPrintView
  };
};
