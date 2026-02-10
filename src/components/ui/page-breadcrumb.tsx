import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbSegment {
  label: string;
  path: string;
}

// Friendly labels for URL segments
const segmentLabels: Record<string, string> = {
  kenya: "Kenya",
  qatar: "Qatar",
  philippines: "Philippines",
  somalia: "Somalia",
  uae: "UAE",
  "saudi-arabia": "Saudi Arabia",
  deliveries: "Deliveries",
  delivery: "Delivery",
  vehicles: "Vehicles",
  drivers: "Drivers",
  finance: "Finance",
  testing: "Staff Testing",
  "customer-portal": "Customer Portal",
  jobs: "Jobs",
  job: "Job",
  new: "New",
  add: "New",
  edit: "Edit",
  generate: "Generate Schedule",
  print: "Print",
  "find-customer": "Find Customer",
  containers: "Containers",
  vessels: "Vessels",
  "cargo-manifest": "Cargo Manifest",
  "completed-jobs": "Completed Jobs",
  "cancelled-jobs": "Cancelled Jobs",
  "incomplete-jobs": "Incomplete Jobs",
  "job-status": "Job Status",
  schedules: "Schedules",
  invoice: "Invoice",
  display: "Display",
  dashboard: "Dashboard",
};

interface PageBreadcrumbProps {
  items?: BreadcrumbSegment[];
  className?: string;
}

const PageBreadcrumb = ({ items, className }: PageBreadcrumbProps) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if items not provided
  const breadcrumbs: BreadcrumbSegment[] = items || (() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbSegment[] = [];
    let currentPath = "";

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;

      // Skip dynamic segments (IDs) — they'll be shown as part of the previous segment
      if (segment.match(/^[0-9a-f-]{8,}$/) || segment.match(/^\d+$/)) {
        // Append ID info to last breadcrumb label
        if (crumbs.length > 0) {
          crumbs[crumbs.length - 1].label += ` #${segment.slice(0, 8)}`;
          crumbs[crumbs.length - 1].path = currentPath;
        }
        continue;
      }

      const label = segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      crumbs.push({ label, path: currentPath });
    }

    return crumbs;
  })();

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard" className="flex items-center gap-1 text-[#3b5998] hover:text-[#1e2a3a]">
              <Home size={14} />
              <span>Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <span key={crumb.path} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-[#1e2a3a] font-medium">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path} className="text-[#3b5998] hover:text-[#1e2a3a]">
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
