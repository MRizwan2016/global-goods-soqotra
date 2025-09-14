export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      effects_items: {
        Row: {
          cbm: number | null
          charge_qr: number | null
          created_at: string
          description: string
          gross_weight_kg: number | null
          hs_code: string | null
          id: string
          invoice_id: string
          item_category: string | null
          loading_location: string | null
          owner_name: string | null
          qty: number
          updated_at: string
          user_id: string
        }
        Insert: {
          cbm?: number | null
          charge_qr?: number | null
          created_at?: string
          description: string
          gross_weight_kg?: number | null
          hs_code?: string | null
          id?: string
          invoice_id: string
          item_category?: string | null
          loading_location?: string | null
          owner_name?: string | null
          qty?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          cbm?: number | null
          charge_qr?: number | null
          created_at?: string
          description?: string
          gross_weight_kg?: number | null
          hs_code?: string | null
          id?: string
          invoice_id?: string
          item_category?: string | null
          loading_location?: string | null
          owner_name?: string | null
          qty?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "effects_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          file_path: string
          id: string
          mime_type: string | null
          original_name: string
          related_id: string
          related_type: string
          size_bytes: number | null
          uploaded_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_path: string
          id?: string
          mime_type?: string | null
          original_name: string
          related_id: string
          related_type: string
          size_bytes?: number | null
          uploaded_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_path?: string
          id?: string
          mime_type?: string | null
          original_name?: string
          related_id?: string
          related_type?: string
          size_bytes?: number | null
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          details: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          details?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          details?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          cbm: number | null
          created_at: string
          description: string | null
          gross_weight_kg: number | null
          height_in: number | null
          id: string
          invoice_id: string
          length_in: number | null
          qty: number
          updated_at: string
          user_id: string
          width_in: number | null
        }
        Insert: {
          cbm?: number | null
          created_at?: string
          description?: string | null
          gross_weight_kg?: number | null
          height_in?: number | null
          id?: string
          invoice_id: string
          length_in?: number | null
          qty?: number
          updated_at?: string
          user_id: string
          width_in?: number | null
        }
        Update: {
          cbm?: number | null
          created_at?: string
          description?: string | null
          gross_weight_kg?: number | null
          height_in?: number | null
          id?: string
          invoice_id?: string
          length_in?: number | null
          qty?: number
          updated_at?: string
          user_id?: string
          width_in?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_vehicle: {
        Row: {
          chassis_no: string | null
          color: string | null
          created_at: string
          engine_no: string | null
          export_plate: string | null
          hs_code: string | null
          id: string
          invoice_id: string
          made_in_country: string | null
          make: string | null
          model: string | null
          plate_no: string | null
          updated_at: string
          user_id: string
          vehicle_type: string | null
          year: number | null
        }
        Insert: {
          chassis_no?: string | null
          color?: string | null
          created_at?: string
          engine_no?: string | null
          export_plate?: string | null
          hs_code?: string | null
          id?: string
          invoice_id: string
          made_in_country?: string | null
          make?: string | null
          model?: string | null
          plate_no?: string | null
          updated_at?: string
          user_id: string
          vehicle_type?: string | null
          year?: number | null
        }
        Update: {
          chassis_no?: string | null
          color?: string | null
          created_at?: string
          engine_no?: string | null
          export_plate?: string | null
          hs_code?: string | null
          id?: string
          invoice_id?: string
          made_in_country?: string | null
          make?: string | null
          model?: string | null
          plate_no?: string | null
          updated_at?: string
          user_id?: string
          vehicle_type?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_vehicle_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          book_no: number | null
          cargo_charges: number | null
          consignee_address: string | null
          consignee_city: string | null
          consignee_country: string | null
          consignee_idno: string | null
          consignee_name: string
          consignee_phone: string | null
          created_at: string
          discounts: number | null
          doc_fee: number | null
          effects_rate_qr_per_cbm: number | null
          effects_total_qr: number | null
          hbl_no: string | null
          id: string
          invoice_code: string | null
          invoice_date: string
          invoice_no: number
          invoice_type: string
          num_packages: number | null
          packing_fees: number | null
          page_no: number | null
          service_type: string | null
          shipper_address: string | null
          shipper_city: string | null
          shipper_country: string | null
          shipper_email: string | null
          shipper_idno: string | null
          shipper_metrash_phone: string | null
          shipper_name: string
          shipper_phone: string | null
          status: number
          total_amount: number | null
          total_cbm: number | null
          total_gross_weight_kg: number | null
          updated_at: string
          user_id: string
          vehicle_freight_qr: number | null
        }
        Insert: {
          book_no?: number | null
          cargo_charges?: number | null
          consignee_address?: string | null
          consignee_city?: string | null
          consignee_country?: string | null
          consignee_idno?: string | null
          consignee_name: string
          consignee_phone?: string | null
          created_at?: string
          discounts?: number | null
          doc_fee?: number | null
          effects_rate_qr_per_cbm?: number | null
          effects_total_qr?: number | null
          hbl_no?: string | null
          id?: string
          invoice_code?: string | null
          invoice_date: string
          invoice_no: number
          invoice_type?: string
          num_packages?: number | null
          packing_fees?: number | null
          page_no?: number | null
          service_type?: string | null
          shipper_address?: string | null
          shipper_city?: string | null
          shipper_country?: string | null
          shipper_email?: string | null
          shipper_idno?: string | null
          shipper_metrash_phone?: string | null
          shipper_name: string
          shipper_phone?: string | null
          status?: number
          total_amount?: number | null
          total_cbm?: number | null
          total_gross_weight_kg?: number | null
          updated_at?: string
          user_id: string
          vehicle_freight_qr?: number | null
        }
        Update: {
          book_no?: number | null
          cargo_charges?: number | null
          consignee_address?: string | null
          consignee_city?: string | null
          consignee_country?: string | null
          consignee_idno?: string | null
          consignee_name?: string
          consignee_phone?: string | null
          created_at?: string
          discounts?: number | null
          doc_fee?: number | null
          effects_rate_qr_per_cbm?: number | null
          effects_total_qr?: number | null
          hbl_no?: string | null
          id?: string
          invoice_code?: string | null
          invoice_date?: string
          invoice_no?: number
          invoice_type?: string
          num_packages?: number | null
          packing_fees?: number | null
          page_no?: number | null
          service_type?: string | null
          shipper_address?: string | null
          shipper_city?: string | null
          shipper_country?: string | null
          shipper_email?: string | null
          shipper_idno?: string | null
          shipper_metrash_phone?: string | null
          shipper_name?: string
          shipper_phone?: string | null
          status?: number
          total_amount?: number | null
          total_cbm?: number | null
          total_gross_weight_kg?: number | null
          updated_at?: string
          user_id?: string
          vehicle_freight_qr?: number | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          cbm: number | null
          created_at: string
          description: string | null
          height_in: number | null
          id: string
          invoice_id: string | null
          length_in: number | null
          package_no: string | null
          qty: number | null
          shipment_id: string
          updated_at: string
          user_id: string
          weight_kg: number | null
          width_in: number | null
        }
        Insert: {
          cbm?: number | null
          created_at?: string
          description?: string | null
          height_in?: number | null
          id?: string
          invoice_id?: string | null
          length_in?: number | null
          package_no?: string | null
          qty?: number | null
          shipment_id: string
          updated_at?: string
          user_id: string
          weight_kg?: number | null
          width_in?: number | null
        }
        Update: {
          cbm?: number | null
          created_at?: string
          description?: string | null
          height_in?: number | null
          id?: string
          invoice_id?: string | null
          length_in?: number | null
          package_no?: string | null
          qty?: number | null
          shipment_id?: string
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
          width_in?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packages_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_jobs: {
        Row: {
          created_at: string
          id: string
          job_data: Json
          schedule_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_data: Json
          schedule_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_data?: Json
          schedule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_jobs_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          country: string
          created_at: string
          created_by: string | null
          driver: string | null
          helper: string | null
          id: string
          sales_rep: string | null
          schedule_date: string
          schedule_number: string
          status: string | null
          total_jobs: number | null
          updated_at: string
          vehicle: string
        }
        Insert: {
          country: string
          created_at?: string
          created_by?: string | null
          driver?: string | null
          helper?: string | null
          id?: string
          sales_rep?: string | null
          schedule_date: string
          schedule_number: string
          status?: string | null
          total_jobs?: number | null
          updated_at?: string
          vehicle: string
        }
        Update: {
          country?: string
          created_at?: string
          created_by?: string | null
          driver?: string | null
          helper?: string | null
          id?: string
          sales_rep?: string | null
          schedule_date?: string
          schedule_number?: string
          status?: string | null
          total_jobs?: number | null
          updated_at?: string
          vehicle?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          container_no: string | null
          created_at: string
          destination_country: string | null
          eta_date: string | null
          id: string
          invoice_id: string | null
          loaded_date: string | null
          mode: string | null
          origin_country: string | null
          shipment_no: string | null
          status: string | null
          tracking_no: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          container_no?: string | null
          created_at?: string
          destination_country?: string | null
          eta_date?: string | null
          id?: string
          invoice_id?: string | null
          loaded_date?: string | null
          mode?: string | null
          origin_country?: string | null
          shipment_no?: string | null
          status?: string | null
          tracking_no?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          container_no?: string | null
          created_at?: string
          destination_country?: string | null
          eta_date?: string | null
          id?: string
          invoice_id?: string | null
          loaded_date?: string | null
          mode?: string | null
          origin_country?: string | null
          shipment_no?: string | null
          status?: string | null
          tracking_no?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      tunisia_containers: {
        Row: {
          arrival_date: string | null
          container_number: string
          created_at: string
          departure_date: string | null
          id: string
          loaded_vehicles: Json
          port_of_discharge: string | null
          port_of_loading: string | null
          seal_number: string | null
          status: string
          updated_at: string
          user_id: string
          vessel_name: string | null
        }
        Insert: {
          arrival_date?: string | null
          container_number: string
          created_at?: string
          departure_date?: string | null
          id?: string
          loaded_vehicles?: Json
          port_of_discharge?: string | null
          port_of_loading?: string | null
          seal_number?: string | null
          status?: string
          updated_at?: string
          user_id: string
          vessel_name?: string | null
        }
        Update: {
          arrival_date?: string | null
          container_number?: string
          created_at?: string
          departure_date?: string | null
          id?: string
          loaded_vehicles?: Json
          port_of_discharge?: string | null
          port_of_loading?: string | null
          seal_number?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          vessel_name?: string | null
        }
        Relationships: []
      }
      tunisia_customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          id_number: string | null
          name: string
          phone: string | null
          prefix: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          id_number?: string | null
          name: string
          phone?: string | null
          prefix?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          id_number?: string | null
          name?: string
          phone?: string | null
          prefix?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tunisia_invoices: {
        Row: {
          created_at: string
          customer_id: string
          date: string
          hbl_number: string | null
          id: string
          invoice_number: string
          payment_details: Json | null
          personal_effects: Json | null
          status: string
          supporting_documents: Json | null
          total_amount: number
          updated_at: string
          user_id: string
          vehicle: Json
        }
        Insert: {
          created_at?: string
          customer_id: string
          date: string
          hbl_number?: string | null
          id?: string
          invoice_number: string
          payment_details?: Json | null
          personal_effects?: Json | null
          status?: string
          supporting_documents?: Json | null
          total_amount: number
          updated_at?: string
          user_id: string
          vehicle: Json
        }
        Update: {
          created_at?: string
          customer_id?: string
          date?: string
          hbl_number?: string | null
          id?: string
          invoice_number?: string
          payment_details?: Json | null
          personal_effects?: Json | null
          status?: string
          supporting_documents?: Json | null
          total_amount?: number
          updated_at?: string
          user_id?: string
          vehicle?: Json
        }
        Relationships: []
      }
      tunisia_payment_receipts: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_id: string | null
          invoice_number: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          receipt_number: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          invoice_number: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          receipt_number: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          invoice_number?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          receipt_number?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tunisia_payment_receipts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "tunisia_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      user_owns_schedule: {
        Args: { schedule_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
