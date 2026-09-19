export interface RoroShipment {
  id: string;
  sr: number | null;
  plate: string | null;
  consignee: string;
  passport: string | null;
  description: string | null;
  model: number | null;
  colour: string | null;
  chassis: string | null;
  cbm: number;
  weight: number;
  bl: string | null;
  vessel: string | null;
  loading_status: string | null;
  swb_issued: boolean;
  released: boolean;
  freight: number;
  storage_charges: number;
  amount_paid: number;
  swb_doc_name: string | null;
  swb_doc_url: string | null;
  swb_doc_uploaded_at: string | null;
  sector: string | null;
  notes: string | null;
  last_edited_by: string | null;
  last_edited_at: string | null;
  created_at: string;
  updated_at: string;
}

export type RoroShipmentInput = Partial<Omit<RoroShipment, "id" | "created_at" | "updated_at">>;

export const roroTotal = (r: RoroShipment) => Number(r.freight || 0) + Number(r.storage_charges || 0);
export const roroBalance = (r: RoroShipment) => roroTotal(r) - Number(r.amount_paid || 0);
