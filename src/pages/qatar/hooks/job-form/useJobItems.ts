
import { useState } from "react";
import { JobItem } from "../../types/jobTypes";

interface ItemAction {
  id: string;
  type: 'add' | 'update' | 'delete';
  jobId?: string;
  itemName?: string;
  sellPrice?: number;
  quantity?: number;
}

export const useJobItems = () => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);

  const handleAddItem = (action: ItemAction) => {
    setJobItems(prevItems => {
      switch (action.type) {
        case 'delete':
          return prevItems.filter(item => item.id !== action.id);
        case 'update':
          return prevItems.map(item => 
            item.id === action.id 
              ? { ...item, itemName: action.itemName!, sellPrice: action.sellPrice!, quantity: action.quantity! }
              : item
          );
        case 'add':
          return [...prevItems, { 
            id: action.id,
            jobId: action.jobId || 'temp',
            itemName: action.itemName!,
            sellPrice: action.sellPrice!,
            quantity: action.quantity!
          }];
        default:
          return prevItems;
      }
    });
  };

  return { jobItems, handleAddItem };
};
