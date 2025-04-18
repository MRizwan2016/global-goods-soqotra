
import { JobItem } from "../../../types/jobTypes";

export interface ItemFormState {
  itemName: string;
  sellPrice: string;
  quantity: string;
}

export interface PackageDimensionsState {
  length: string;
  width: string;
  height: string;
  weight: string;
}

export interface CommonItemsProps {
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export interface ItemFormProps {
  onSubmit: (item: JobItem) => void;
  isJobNumberGenerated: boolean;
  initialState?: JobItem;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}
