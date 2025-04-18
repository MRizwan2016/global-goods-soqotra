
import { useState } from "react";
import { JobItem } from "../../types/jobTypes";

interface ItemAction {
  id: string;
  type: 'add' | 'update' | 'delete';
  jobId?: string;
  itemName?: string;
  name?: string;
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
              ? { 
                  ...item, 
                  name: action.name || action.itemName || item.name || item.itemName || '', 
                  itemName: action.itemName || action.name || item.itemName || item.name || '',
                  sellPrice: action.sellPrice || item.sellPrice || 0, 
                  quantity: action.quantity || item.quantity 
                }
              : item
          );
        case 'add':
          return [...prevItems, { 
            id: action.id,
            name: action.name || action.itemName || '',
            itemName: action.itemName || action.name || '',
            jobId: action.jobId || 'temp',
            sellPrice: action.sellPrice || 0,
            quantity: action.quantity || 1
          }];
        default:
          return prevItems;
      }
    });
  };

  return { jobItems, handleAddItem };
};
