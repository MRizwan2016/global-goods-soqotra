
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
    
    // Get file key from path
    let fileKey: string | undefined;
    
    // Check in all file permission categories
    Object.entries(filePermissions).forEach(([category, categoryData]) => {
      Object.entries(categoryData.files).forEach(([key, data]) => {
        if (data.path === path || path.startsWith(data.path)) {
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

  console.log('Rendering submenu for section:', sectionKey, submenu);

  return (
    <div className="space-y-1 pl-10 mt-2 animate-slide-in">
      {submenu.map((submenu, idx) => {
        // Filter menu items based on permissions
        const filteredItems = submenu.items.filter(item => 
          hasPermissionForPath(item.path)
        );
        
        console.log('Filtered items for', submenu.title, ':', filteredItems);
        
        // If no items in this submenu have permission, skip rendering it
        if (filteredItems.length === 0) return null;
        
        return (
          <div key={`${sectionKey}-submenu-${idx}`} className="mb-3">
            <h3 className="text-xs font-semibold text-gray-700 mb-1">{submenu.title}</h3>
            <div className="space-y-0.5">
              {filteredItems.map((item, itemIdx) => (
                <Link
                  key={`${sectionKey}-item-${itemIdx}`}
                  to={item.path}
                  className={`flex items-center text-sm px-3 py-1.5 rounded-md text-gray-600 hover:bg-[#F0F8FF] hover:text-gray-900 transition-all duration-200 ${
                    isPathActive(item.path) && "bg-[#F0F8FF] text-gray-900 font-medium"
                  }`}
                  onClick={() => onNavigate(item.path)}
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemList;
