
import React from "react";
import { Edit, ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { PackageOption } from "@/data/packageOptions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface PackageNameSelectorProps {
  formState: any;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  onOpenManualDialog: () => void;
  dbPackageTypes?: { id: string; name: string; volume_cbm: number; length_inches: number; width_inches: number; height_inches: number }[];
}

const PackageNameSelector: React.FC<PackageNameSelectorProps> = ({
  formState,
  packageOptions,
  handlePackageSelect,
  onOpenManualDialog,
  dbPackageTypes,
}) => {
  const { language } = useLanguage();
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);

  // Group packages by type
  const groupedPackages = React.useMemo(() => {
    const cartonBoxes = packageOptions.filter(pkg => pkg.description.includes("CARTON BOX"));
    const woodenBoxes = packageOptions.filter(pkg => pkg.description.includes("WOODEN BOX"));
    const plasticItems = packageOptions.filter(pkg => pkg.description.includes("PLASTIC"));
    const appliances = packageOptions.filter(pkg => 
      pkg.description.includes("TV") || 
      pkg.description.includes("OVEN") || 
      pkg.description.includes("FREEZER") ||
      pkg.description.includes("REFRIGERATOR") ||
      pkg.description.includes("FAN") ||
      pkg.description.includes("COOKER")
    );
    const furniture = packageOptions.filter(pkg => 
      pkg.description.includes("FURNITURE") || 
      pkg.description.includes("CUPBOARD") ||
      pkg.description.includes("CHAIR") ||
      pkg.description.includes("MATTRESS")
    );
    const electronics = packageOptions.filter(pkg => 
      pkg.description.includes("COMPUTER") || 
      pkg.description.includes("SPEAKER") ||
      pkg.description.includes("RADIO")
    );
    const otherItems = packageOptions.filter(pkg => 
      !cartonBoxes.includes(pkg) && 
      !woodenBoxes.includes(pkg) && 
      !plasticItems.includes(pkg) &&
      !appliances.includes(pkg) &&
      !furniture.includes(pkg) &&
      !electronics.includes(pkg)
    );
    
    return {
      cartonBoxes,
      woodenBoxes,
      plasticItems,
      appliances,
      furniture,
      electronics,
      otherItems
    };
  }, [packageOptions]);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">
        {language === 'ar' ? "اسم الطرود:" : "PACKAGES NAME:"}
      </label>
      <div className="flex gap-2">
        <Select 
          onValueChange={handlePackageSelect}
          value={formState.packagesName || ""}
          onOpenChange={setIsSelectOpen}
        >
          <SelectTrigger className="bg-blue-500 text-white py-2 px-3 rounded text-sm w-full flex justify-between items-center">
            <SelectValue placeholder={language === 'ar' ? "اختر نوع الطرد" : "Select a package"} />
            {isSelectOpen ? (
              <ArrowUpIcon className="h-4 w-4 ml-2 flex-shrink-0" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 ml-2 flex-shrink-0" />
            )}
          </SelectTrigger>
          <SelectContent className="bg-white max-h-[350px] overflow-y-auto z-[100]">
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600">{language === 'ar' ? "صناديق كرتون" : "Carton Boxes"}</SelectLabel>
              {groupedPackages.cartonBoxes.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600 pt-2">{language === 'ar' ? "صناديق خشبية" : "Wooden Boxes"}</SelectLabel>
              {groupedPackages.woodenBoxes.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600 pt-2">{language === 'ar' ? "منتجات بلاستيكية" : "Plastic Items"}</SelectLabel>
              {groupedPackages.plasticItems.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600 pt-2">{language === 'ar' ? "أجهزة" : "Appliances"}</SelectLabel>
              {groupedPackages.appliances.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600 pt-2">{language === 'ar' ? "أثاث" : "Furniture"}</SelectLabel>
              {groupedPackages.furniture.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600 pt-2">{language === 'ar' ? "إلكترونيات" : "Electronics"}</SelectLabel>
              {groupedPackages.electronics.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            <SelectGroup>
              <SelectLabel className="font-bold text-blue-600 pt-2">{language === 'ar' ? "عناصر أخرى" : "Other Items"}</SelectLabel>
              {groupedPackages.otherItems.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectGroup>
            
            {/* Database-stored package types (custom + official SL packages) */}
            {dbPackageTypes && dbPackageTypes.length > 0 && (
              <SelectGroup>
                <SelectLabel className="font-bold text-green-600 pt-2 border-t mt-2">
                  {language === 'ar' ? "أنواع الطرود المحفوظة" : "📦 Saved Package Types (DB)"}
                </SelectLabel>
                {dbPackageTypes
                  .filter(p => !packageOptions.some(po => po.description === p.name))
                  .map(pkg => (
                    <SelectItem key={`db-${pkg.id}`} value={pkg.name}>
                      {pkg.name} {pkg.volume_cbm > 0 ? `(${pkg.volume_cbm} CBM)` : ''}
                    </SelectItem>
                  ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onOpenManualDialog}
          className="flex-shrink-0"
        >
          <Edit size={18} />
        </Button>
      </div>
    </div>
  );
};

export default PackageNameSelector;
