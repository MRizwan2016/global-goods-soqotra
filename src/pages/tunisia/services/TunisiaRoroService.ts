import { supabase } from "@/integrations/supabase/client";
import { RoroShipment, RoroShipmentInput } from "../types/roroTypes";

const TABLE = "tunisia_roro_shipments";

export const TunisiaRoroService = {
  async list(): Promise<RoroShipment[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("sr", { ascending: true });
    if (error) throw error;
    return (data || []) as unknown as RoroShipment[];
  },

  async create(input: RoroShipmentInput): Promise<RoroShipment> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(input as never)
      .select()
      .single();
    if (error) throw error;
    return data as unknown as RoroShipment;
  },

  async update(id: string, input: RoroShipmentInput): Promise<RoroShipment> {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ ...input, last_edited_at: new Date().toISOString() } as never)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as unknown as RoroShipment;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw error;
  },

  async nextSr(): Promise<number> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("sr")
      .order("sr", { ascending: false })
      .limit(1);
    if (error) throw error;
    const top = data && data.length ? Number((data[0] as { sr: number | null }).sr || 0) : 0;
    return top + 1;
  },

  async uploadSwbDocument(shipment: RoroShipment, file: File): Promise<RoroShipment> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `roro-swb/${shipment.id}/${Date.now()}_${safeName}`;
    const { error: uploadError } = await supabase.storage
      .from("invoice-pdfs")
      .upload(path, file, { upsert: true, contentType: file.type || "application/pdf" });
    if (uploadError) throw uploadError;

    const { data: pub } = supabase.storage.from("invoice-pdfs").getPublicUrl(path);
    return TunisiaRoroService.update(shipment.id, {
      swb_doc_name: file.name,
      swb_doc_url: pub.publicUrl,
      swb_doc_uploaded_at: new Date().toISOString(),
      swb_issued: true,
    });
  },
};
