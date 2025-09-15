
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { filePermissions } from "@/pages/admin/constants/filePermissions";

interface MenuItemType {
  name: string;
  path: string;
}

interface SubmenuType {
  title: string;
  items: MenuItemType[];
}

interface Props {
  submenu: SubmenuType[];
  isPathActive: (path: string) => boolean;
  onNavigate?: (path: string) => void;
  sectionKey: string;
}

const MenuItemList: React.FC<Props> = ({
  submenu,
  isPathActive,
  onNavigate = () => {},
  sectionKey,
}) => {
  const { currentUser, isAdmin } = useAuth();
  const { hasFilePermission } = usePermissions();
  
  // Function to check if user has permission for a menu item
  const hasPermissionForPath = (path: string): boolean => {
    if (isAdmin || !currentUser) return true; // Admin sees everything
    
    // Special case for Profit & Loss - explicitly allow
    if (path === '/accounts/profit-loss') {
      return currentUser.permissions.accounting || false;
    }
    
    // Get file key from path
    let fileKey: string | undefined;
    
    // Check in all file permission categories
    Object.entries(filePermissions).forEach(([category, categoryData]) => {
      Object.entries(categoryData.files).forEach(([key, data]) => {
        if (data.path && (data.path === path || path.startsWith(data.path))) {
          fileKey = key;
        }
      });
    });
    
    // Special case handling for specific paths
    if (path.startsWith('/master/')) {
      return currentUser.permissions.masterData;
    } else if (path.startsWith('/data-entry/')) {
      return currentUser.permissions.dataEntry;
    } else if (path.startsWith('/reports/')) {
      return currentUser.permissions.reports;
    } else if (path.startsWith('/accounts/')) {
      return currentUser.permissions.accounting;
    } else if (path.includes('/admin/control-panel')) {
      return currentUser.permissions.controlPanel;
    }
    
    // If no file key found, default to showing the item
    if (!fileKey) return true;
    
    return hasFilePermission(fileKey as any);
  };

  console.log(`Rendering submenu for section "${sectionKey}":`);
  submenu.forEach(menu => {
    console.log(`- ${menu.title} items:`, menu.items.map(item => item.name));
  });

  // Helper function to get item colors based on section
  const getItemColors = (itemIndex: number) => {
    const colors = [
      'bg-cyan-100 text-cyan-700 border-cyan-200',
      'bg-blue-100 text-blue-700 border-blue-200',
      'bg-indigo-100 text-indigo-700 border-indigo-200',
      'bg-purple-100 text-purple-700 border-purple-200',
      'bg-pink-100 text-pink-700 border-pink-200',
      'bg-rose-100 text-rose-700 border-rose-200',
      'bg-orange-100 text-orange-700 border-orange-200',
      'bg-amber-100 text-amber-700 border-amber-200',
      'bg-yellow-100 text-yellow-700 border-yellow-200',
      'bg-lime-100 text-lime-700 border-lime-200',
      'bg-green-100 text-green-700 border-green-200',
      'bg-emerald-100 text-emerald-700 border-emerald-200',
      'bg-teal-100 text-teal-700 border-teal-200',
    ];
    return colors[itemIndex % colors.length];
  };

  return (
    <div className="space-y-3 pl-6 mt-4 animate-slide-in">
      {submenu.map((submenu, idx) => {
        // Filter menu items based on permissions
        const filteredItems = submenu.items.filter(item => 
          hasPermissionForPath(item.path)
        );
        
        console.log(`Filtered items for "${submenu.title}" in "${sectionKey}":`, 
          filteredItems.map(item => `${item.name} (${item.path})`));
        
        // If no items in this submenu have permission, skip rendering it
        if (filteredItems.length === 0) return null;
        
        return (
          <div key={`${sectionKey}-submenu-${idx}`} className="mb-4">
            {/* Numbered subheading with circle */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                {idx + 1}
              </div>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">{submenu.title}</h3>
            </div>
            
            {/* Menu items with alphabetical ordering */}
            <div className="space-y-1 ml-2">
              {filteredItems.map((item, itemIdx) => {
                const letter = String.fromCharCode(65 + itemIdx); // A, B, C, etc.
                const colors = getItemColors(itemIdx);
                
                return (
                  <Link
                    key={`${sectionKey}-item-${itemIdx}`}
                    to={item.path}
                    className={`group flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md hover:translate-x-1 ${colors} ${
                      isPathActive(item.path) 
                        ? "shadow-md scale-105 ring-1 ring-blue-300" 
                        : "hover:ring-1 hover:ring-blue-200"
                    }`}
                    onClick={() => onNavigate(item.path)}
                  >
                    {/* Alphabetical letter circle */}
                    <div className="w-4 h-4 rounded-full bg-white/70 flex items-center justify-center text-xs font-bold group-hover:bg-white transition-colors duration-200">
                      {letter}
                    </div>
                    <span className="text-xs font-medium flex-1 group-hover:font-semibold transition-all duration-200">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemList;
