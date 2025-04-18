import { useState } from "react";
import { JobItem } from "../../types/jobTypes";
import PackageItemsTable from "./PackageItemsTable";
import { toast } from "sonner";
import { useJobForm } from "./context/JobFormContext";
import ItemForm from "./package-description/ItemForm";
import CustomPackageDialog from "./package-description/CustomPackageDialog";

const PackageDescriptionSection = () => {
  const { jobItems, handleAddItem, isJobNumberGenerated } = useJobForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<JobItem | null>(null);
  
  const handleEditItem = (item: JobItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteItem = (id: string) => {
    handleAddItem({ id, type: 'delete' });
    toast.success("Item removed");
  };

  const handleAddOrUpdateItem = (item: JobItem) => {
    handleAddItem({ ...item, type: isEditing ? 'update' : 'add' });
    if (isEditing) {
      setIsEditing(false);
      setEditingItem(null);
      toast.success("Item updated successfully");
    } else {
      toast.success("Item added successfully");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PACKAGE DESCRIPTION</h3>
      
      <div className="space-y-6">
        <ItemForm
          onSubmit={handleAddOrUpdateItem}
          isJobNumberGenerated={isJobNumberGenerated}
          initialState={editingItem || undefined}
          isEditing={isEditing}
          onCancelEdit={handleCancelEdit}
        />

        <div className="flex justify-end">
          <CustomPackageDialog
            isJobNumberGenerated={isJobNumberGenerated}
            onAddPackage={handleAddOrUpdateItem}
          />
        </div>
        
        <PackageItemsTable 
          items={jobItems} 
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </div>
    </div>
  );
};

export default PackageDescriptionSection;
