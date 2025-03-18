
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useBillOfLadingData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blData, setBlData] = useState<any>(null);

  useEffect(() => {
    // In a real app, fetch the BL data from an API
    // For now, we'll simulate loading data
    const fetchBillOfLading = async () => {
      try {
        // Mock data for the Bill of Lading
        const mockBillOfLading = {
          id,
          blNumber: `BL${id}`,
          date: new Date().toISOString().split('T')[0],
          shipper: "Example Shipping Company",
          shipperAddress: "123 Shipping Lane, Port City",
          consignee: "Global Receiving Ltd.",
          consigneeAddress: "456 Receiving Road, Destination City",
          notifyParty: "Logistics Department",
          vessel: "MV Ocean Explorer",
          voyage: "VOY-2023-45",
          portOfLoading: "Mogadishu, Somalia",
          portOfDischarge: "Mombasa, Kenya",
          finalDestination: "Nairobi, Kenya",
          packages: 12,
          weight: "2,500 KG",
          volume: "15 CBM",
          description: "Mixed general merchandise",
          marks: "Handle with care, This side up",
          specialInstructions: "Keep dry, Temperature controlled"
        };

        setBlData(mockBillOfLading);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bill of Lading:", error);
        toast.error("Failed to load Bill of Lading data");
        setLoading(false);
      }
    };

    fetchBillOfLading();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return {
    loading,
    blData,
    handlePrint,
    handleBack
  };
};
