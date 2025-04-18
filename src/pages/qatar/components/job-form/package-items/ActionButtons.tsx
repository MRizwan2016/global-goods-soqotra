
import React from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionButtonsProps } from "./types";

const ActionButtons: React.FC<ActionButtonsProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex justify-end gap-2">
      {onEdit && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(item)}
          className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200"
        >
          <Edit size={16} />
        </Button>
      )}
      {onDelete && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(item.id)}
          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
