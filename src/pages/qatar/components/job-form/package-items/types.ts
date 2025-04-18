
import { JobItem } from "../../../types/jobTypes";

export interface PackageItemsTableProps {
  items: JobItem[];
  onEdit?: (item: JobItem) => void;
  onDelete?: (id: string) => void;
}

export interface ActionButtonsProps {
  item: JobItem;
  onEdit?: (item: JobItem) => void;
  onDelete?: (id: string) => void;
}
