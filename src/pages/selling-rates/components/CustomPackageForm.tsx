
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CustomPackageFormProps {
  onAddPackage: (packageName: string) => void;
}

const CustomPackageForm: React.FC<CustomPackageFormProps> = ({ onAddPackage }) => {
  const [packageName, setPackageName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (packageName.trim()) {
      onAddPackage(packageName.trim().toUpperCase());
      setPackageName('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 mb-4">
          <Plus size={16} />
          <Package size={16} />
          Add Custom Package
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Package</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium">Package Name</label>
            <Input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="e.g., CUSTOM BOX - LARGE"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Package name will be added to the rate list for all districts.
            </p>
          </div>
          
          <div className="flex justify-end pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!packageName.trim()}
            >
              Add Package
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomPackageForm;
