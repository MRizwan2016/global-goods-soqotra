
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
  
  const hasPermissionForPath = (path: string): boolean => {
    if (isAdmin || !currentUser) return true;
    
    if (path === '/accounts/profit-loss') {
      return currentUser.permissions.accounting || false;
    }
    
    let fileKey: string | undefined;
    
    Object.entries(filePermissions).forEach(([category, categoryData]) => {
      Object.entries(categoryData.files).forEach(([key, data]) => {
        if (data.path && (data.path === path || path.startsWith(data.path))) {
          fileKey = key;
        }
      });
    });
    
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
    
    if (!fileKey) return true;
    
    return hasFilePermission(fileKey as any);
  };

  return (
    <div className="pl-4 mt-1 space-y-3 pb-2">
      {submenu.map((submenuItem, idx) => {
        const filteredItems = submenuItem.items.filter(item => 
          hasPermissionForPath(item.path)
        );
        
        if (filteredItems.length === 0) return null;
        
        return (
          <div key={`${sectionKey}-submenu-${idx}`}>
            {/* Subheading */}
            <div className="flex items-center gap-2 mb-1.5 px-2">
              <span className="w-4 h-4 rounded-full bg-[#3b5998] flex items-center justify-center text-[10px] font-bold text-white">
                {idx + 1}
              </span>
              <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{submenuItem.title}</h3>
            </div>
            
            {/* Items */}
            <div className="space-y-0.5 ml-2">
              {filteredItems.map((item, itemIdx) => {
                const letter = String.fromCharCode(65 + itemIdx);
                const active = isPathActive(item.path);
                
                return (
                  <Link
                    key={`${sectionKey}-item-${itemIdx}`}
                    to={item.path}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors duration-150 ${
                      active 
                        ? "bg-[#3b5998] text-white font-medium" 
                        : "text-slate-400 hover:text-white hover:bg-[#253549]"
                    }`}
                    onClick={() => onNavigate(item.path)}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-[#2a3a4e] text-slate-500'
                    }`}>
                      {letter}
                    </span>
                    <span className="flex-1">{item.name}</span>
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
