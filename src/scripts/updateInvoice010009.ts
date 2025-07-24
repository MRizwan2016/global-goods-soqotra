import { InvoiceUpdateService } from '../services/InvoiceUpdateService';

/**
 * Script to update Invoice 010009 with correct cargo details
 * BED (MEDICAL BED) - Dimension: 78x11x41 inches, 54.90 kg
 */
export const updateInvoice010009 = () => {
  // Calculate cubic metre from inches (convert to cm first, then to m³)
  const length = 78 * 2.54; // inches to cm
  const width = 11 * 2.54;
  const height = 41 * 2.54;
  const cubicMetre = (length * width * height) / 1000000; // cm³ to m³

  const updateData = {
    invoiceNumber: "010009",
    packageItems: [
      {
        id: "bed-medical-001",
        name: "BED (MEDICAL BED)",
        length: 78,
        width: 11,
        height: 41,
        weight: 54.90,
        quantity: 1,
        cubicMetre: parseFloat(cubicMetre.toFixed(3)),
        description: "MEDICAL EQUIPMENT"
      }
    ]
  };

  const success = InvoiceUpdateService.updateInvoicePackageDetails(updateData);
  
  if (success) {
    console.log("✅ Invoice 010009 updated successfully with BED (MEDICAL BED) details");
    console.log("Details:", updateData.packageItems[0]);
    console.log(`Dimensions: ${updateData.packageItems[0].length}x${updateData.packageItems[0].width}x${updateData.packageItems[0].height} inches`);
    console.log(`Weight: ${updateData.packageItems[0].weight} kg`);
    console.log(`Volume: ${updateData.packageItems[0].cubicMetre} m³`);
  } else {
    console.error("❌ Failed to update invoice 010009");
  }
  
  return success;
};