
import React from "react";
import { Link } from "react-router-dom";

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
}) => (
  <div className="space-y-1 pl-10 mt-2 animate-slide-in">
    {submenu.map((submenu, idx) => (
      <div key={`${sectionKey}-submenu-${idx}`} className="mb-3">
        <h3 className="text-xs font-semibold text-gray-700 mb-1">{submenu.title}</h3>
        <div className="space-y-0.5">
          {submenu.items.map((item, itemIdx) => (
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
    ))}
  </div>
);

export default MenuItemList;
