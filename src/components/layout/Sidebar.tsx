
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Package2, Database, FileInput, 
  FileText, Download, ChevronDown, ChevronRight, 
  Users, Truck, Plane, Ship, BarChart4, DollarSign,
  Settings, CreditCard, Receipt, Calculator, LineChart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  to?: string;
  children?: SidebarItemProps[];
  isOpen?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, title, to, children, isOpen, onClick }: SidebarItemProps) => {
  const hasChildren = Boolean(children && children.length > 0);
  
  const content = (
    <>
      <div className="flex items-center gap-2 py-2 px-3 rounded-md w-full text-white hover:bg-white/10 transition-colors duration-200">
        <span className="w-5">{icon}</span>
        <span>{title}</span>
        {hasChildren && (
          <span className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full">
      {to ? (
        <Link to={to} className="w-full">
          {content}
        </Link>
      ) : (
        <button className="w-full text-left" onClick={onClick}>
          {content}
        </button>
      )}
      
      {hasChildren && isOpen && (
        <div className="pl-4 ml-2 border-l border-soqotra-lightBlue/30 animate-fade-in">
          {children?.map((child, index) => (
            <Link key={index} to={child.to || "#"} className="w-full">
              <div className="flex items-center gap-2 py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors duration-200">
                <span className="w-5">{child.icon}</span>
                <span>{child.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    masterData: false,
    dataEntry: false,
    reports: false,
    accounting: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 bg-soqotra-blue min-h-screen flex flex-col">
      <div className="p-4 border-b border-b-white/10">
        <img 
          src="/lovable-uploads/fd4e7867-4693-4d2d-8439-0b3e46571f57.png" 
          alt="SOQOTRA Logo" 
          className="h-12 object-contain mb-2"
        />
        <h2 className="text-white font-bold text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</h2>
      </div>
      
      <div className="flex flex-col gap-1 p-2 overflow-y-auto flex-1">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          title="Dashboard" 
          to="/"
        />
        
        <SidebarItem 
          icon={<Database size={18} />} 
          title="MASTER DATA" 
          isOpen={openSections.masterData}
          onClick={() => toggleSection('masterData')}
          children={[
            { icon: <Users size={18} />, title: "Sales Rep", to: "/master/sales-rep" },
            { icon: <FileText size={18} />, title: "Town", to: "/master/town" },
            { icon: <Package2 size={18} />, title: "Item", to: "/master/item" },
            { icon: <Package2 size={18} />, title: "Package Options", to: "/master/package-options" },
            { icon: <DollarSign size={18} />, title: "Selling Rates", to: "/master/selling-rates" },
            { icon: <Ship size={18} />, title: "Container", to: "/master/container" },
            { icon: <Ship size={18} />, title: "Vessel", to: "/master/vessel" },
            { icon: <FileText size={18} />, title: "Invoice Book", to: "/master/invoice-book" },
            { icon: <Truck size={18} />, title: "Driver/Helper", to: "/master/driver-helper" },
          ]}
        />
        
        <SidebarItem 
          icon={<FileInput size={18} />} 
          title="DATA ENTRY" 
          isOpen={openSections.dataEntry}
          onClick={() => toggleSection('dataEntry')}
          children={[
            { icon: <FileText size={18} />, title: "Invoicing", to: "/data-entry/invoicing" },
            { icon: <DollarSign size={18} />, title: "Payment Receivable", to: "/data-entry/payment" },
            { icon: <Ship size={18} />, title: "Load Container", to: "/data-entry/container" },
            { icon: <Ship size={18} />, title: "Load Vessel", to: "/data-entry/vessel" },
            { icon: <Plane size={18} />, title: "Load Air Cargo", to: "/data-entry/air-cargo" },
            { icon: <FileText size={18} />, title: "Packing List", to: "/data-entry/packing-list" },
          ]}
        />
        
        <SidebarItem 
          icon={<BarChart4 size={18} />} 
          title="REPORTS" 
          isOpen={openSections.reports}
          onClick={() => toggleSection('reports')}
          children={[
            { icon: <FileText size={18} />, title: "Cargo Reports", to: "/reports/cargo" },
            { icon: <LineChart size={18} />, title: "Financial Reports", to: "/reports/financial" },
            { icon: <FileText size={18} />, title: "Shipping Reports", to: "/reports/shipping" },
          ]}
        />
        
        <SidebarItem 
          icon={<DollarSign size={18} />} 
          title="ACCOUNTS" 
          isOpen={openSections.accounting}
          onClick={() => toggleSection('accounting')}
          children={[
            { icon: <CreditCard size={18} />, title: "Payment Methods", to: "/accounts/payment-methods" },
            { icon: <Receipt size={18} />, title: "Reconciliation", to: "/accounts/reconciliation" },
            { icon: <Calculator size={18} />, title: "Profit & Loss", to: "/accounts/profit-loss" },
          ]}
        />
        
        <SidebarItem 
          icon={<Settings size={18} />} 
          title="CONTROL PANEL" 
          to="/admin/control-panel"
        />
        
        <SidebarItem 
          icon={<Download size={18} />} 
          title="DOWNLOADS" 
          to="/downloads"
        />
      </div>
      
      <div className="p-3 text-white/70 text-xs border-t border-t-white/10">
        Logged in as: Administrator
      </div>
    </div>
  );
};

export default Sidebar;
