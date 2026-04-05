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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cargo_status_notifications: {
        Row: {
          cargo_tracking_id: string
          customer_account_id: string
          email_sent_to: string
          error: string | null
          id: string
          new_status: string
          old_status: string | null
          resend_message_id: string | null
          sent_at: string
        }
        Insert: {
          cargo_tracking_id: string
          customer_account_id: string
          email_sent_to: string
          error?: string | null
          id?: string
          new_status: string
          old_status?: string | null
          resend_message_id?: string | null
          sent_at?: string
        }
        Update: {
          cargo_tracking_id?: string
          customer_account_id?: string
          email_sent_to?: string
          error?: string | null
          id?: string
          new_status?: string
          old_status?: string | null
          resend_message_id?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargo_status_notifications_cargo_tracking_id_fkey"
            columns: ["cargo_tracking_id"]
            isOneToOne: false
            referencedRelation: "cargo_tracking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargo_status_notifications_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      cargo_tracking: {
        Row: {
          arrival_date: string | null
          cargo_description: string | null
          clearance_date: string | null
          collection_date: string | null
          created_at: string
          created_by: string | null
          current_status: string
          customer_account_id: string
          customer_name: string
          delivery_date: string | null
          destination: string | null
          id: string
          in_transit_date: string | null
          invoice_number: string
          loaded_date: string | null
          notes: string | null
          origin: string | null
          processing_date: string | null
          updated_at: string
        }
        Insert: {
          arrival_date?: string | null
          cargo_description?: string | null
          clearance_date?: string | null
          collection_date?: string | null
          created_at?: string
          created_by?: string | null
          current_status?: string
          customer_account_id: string
          customer_name: string
          delivery_date?: string | null
          destination?: string | null
          id?: string
          in_transit_date?: string | null
          invoice_number: string
          loaded_date?: string | null
          notes?: string | null
          origin?: string | null
          processing_date?: string | null
          updated_at?: string
        }
        Update: {
          arrival_date?: string | null
          cargo_description?: string | null
          clearance_date?: string | null
          collection_date?: string | null
          created_at?: string
          created_by?: string | null
          current_status?: string
          customer_account_id?: string
          customer_name?: string
          delivery_date?: string | null
          destination?: string | null
          id?: string
          in_transit_date?: string | null
          invoice_number?: string
          loaded_date?: string | null
          notes?: string | null
          origin?: string | null
          processing_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargo_tracking_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_performance: {
        Row: {
          city: string | null
          collection_date: string
          created_at: string
          id: string
          invoice_id: string | null
          job_id: string | null
          job_status: string | null
          job_type: string | null
          location: string | null
          on_time: boolean | null
          satisfaction_rating: number | null
          staff_id: string | null
          staff_name: string
          staff_type: string
          total_cbm: number | null
          total_packages: number | null
          total_revenue_qr: number | null
          total_weight_kg: number | null
        }
        Insert: {
          city?: string | null
          collection_date?: string
          created_at?: string
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          job_status?: string | null
          job_type?: string | null
          location?: string | null
          on_time?: boolean | null
          satisfaction_rating?: number | null
          staff_id?: string | null
          staff_name: string
          staff_type?: string
          total_cbm?: number | null
          total_packages?: number | null
          total_revenue_qr?: number | null
          total_weight_kg?: number | null
        }
        Update: {
          city?: string | null
          collection_date?: string
          created_at?: string
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          job_status?: string | null
          job_type?: string | null
          location?: string | null
          on_time?: boolean | null
          satisfaction_rating?: number | null
          staff_id?: string | null
          staff_name?: string
          staff_type?: string
          total_cbm?: number | null
          total_packages?: number | null
          total_revenue_qr?: number | null
          total_weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_performance_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_accounts: {
        Row: {
          activated_at: string | null
          activated_by: string | null
          country: string
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          mobile_number: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          activated_by?: string | null
          country?: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          mobile_number: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          activated_by?: string | null
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          mobile_number?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      drivers: {
        Row: {
          country: string
          created_at: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          country: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          book_no: string | null
          consignee_name: string | null
          created_at: string
          id: string
          invoice_code: string | null
          invoice_no: string | null
          num_packages: number | null
          page_no: string | null
          shipper_name: string | null
          total_amount: number | null
          total_cbm: number | null
          total_gross_weight_kg: number | null
          updated_at: string
        }
        Insert: {
          book_no?: string | null
          consignee_name?: string | null
          created_at?: string
          id?: string
          invoice_code?: string | null
          invoice_no?: string | null
          num_packages?: number | null
          page_no?: string | null
          shipper_name?: string | null
          total_amount?: number | null
          total_cbm?: number | null
          total_gross_weight_kg?: number | null
          updated_at?: string
        }
        Update: {
          book_no?: string | null
          consignee_name?: string | null
          created_at?: string
          id?: string
          invoice_code?: string | null
          invoice_no?: string | null
          num_packages?: number | null
          page_no?: string | null
          shipper_name?: string | null
          total_amount?: number | null
          total_cbm?: number | null
          total_gross_weight_kg?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      manage_invoice_book_stock: {
        Row: {
          assigned_date: string | null
          assigned_to_driver: string | null
          assigned_to_sales_rep: string | null
          available_pages: Json
          book_number: string
          country: string
          country_id_number: string | null
          created_at: string
          end_page: string
          id: string
          job_data: Json | null
          job_number: string | null
          pages_used: number
          start_page: string
          status: string
          total_pages: number
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          assigned_date?: string | null
          assigned_to_driver?: string | null
          assigned_to_sales_rep?: string | null
          available_pages?: Json
          book_number: string
          country: string
          country_id_number?: string | null
          created_at?: string
          end_page: string
          id?: string
          job_data?: Json | null
          job_number?: string | null
          pages_used?: number
          start_page: string
          status?: string
          total_pages?: number
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          assigned_date?: string | null
          assigned_to_driver?: string | null
          assigned_to_sales_rep?: string | null
          available_pages?: Json
          book_number?: string
          country?: string
          country_id_number?: string | null
          created_at?: string
          end_page?: string
          id?: string
          job_data?: Json | null
          job_number?: string | null
          pages_used?: number
          start_page?: string
          status?: string
          total_pages?: number
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          is_admin: boolean | null
          mobile_number: string | null
          permissions: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          is_admin?: boolean | null
          mobile_number?: string | null
          permissions?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          is_admin?: boolean | null
          mobile_number?: string | null
          permissions?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sales_representatives: {
        Row: {
          country: string
          created_at: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          country: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
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
          job_data?: Json
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
          country?: string
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
      sl_book_assignments: {
        Row: {
          assigned_date: string
          book_number: string
          country: string
          created_at: string
          end_page_no: string
          id: string
          pages_used: number
          staff_name: string
          start_page_no: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_date?: string
          book_number: string
          country?: string
          created_at?: string
          end_page_no: string
          id?: string
          pages_used?: number
          staff_name: string
          start_page_no: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_date?: string
          book_number?: string
          country?: string
          created_at?: string
          end_page_no?: string
          id?: string
          pages_used?: number
          staff_name?: string
          start_page_no?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      tunisia_containers: {
        Row: {
          container_number: string
          created_at: string
          id: string
          loaded_vehicles: Json | null
          seal_number: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          container_number: string
          created_at?: string
          id?: string
          loaded_vehicles?: Json | null
          seal_number?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          container_number?: string
          created_at?: string
          id?: string
          loaded_vehicles?: Json | null
          seal_number?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tunisia_invoices: {
        Row: {
          created_at: string
          customer_id: string | null
          date: string | null
          hbl_number: string | null
          id: string
          invoice_number: string
          payment_details: Json | null
          personal_effects: Json | null
          status: string | null
          supporting_documents: Json | null
          total_amount: number | null
          updated_at: string
          user_id: string
          vehicle: Json | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          date?: string | null
          hbl_number?: string | null
          id?: string
          invoice_number: string
          payment_details?: Json | null
          personal_effects?: Json | null
          status?: string | null
          supporting_documents?: Json | null
          total_amount?: number | null
          updated_at?: string
          user_id: string
          vehicle?: Json | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          date?: string | null
          hbl_number?: string | null
          id?: string
          invoice_number?: string
          payment_details?: Json | null
          personal_effects?: Json | null
          status?: string | null
          supporting_documents?: Json | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string
          vehicle?: Json | null
        }
        Relationships: []
      }
      tunisia_payment_receipts: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string
          invoice_number: string
          notes: string | null
          payment_date: string
          payment_method: string
          receipt_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id: string
          invoice_number: string
          notes?: string | null
          payment_date: string
          payment_method?: string
          receipt_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string
          invoice_number?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          receipt_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      staff_annual_performance: {
        Row: {
          avg_satisfaction: number | null
          collection_jobs: number | null
          completed_jobs: number | null
          delivery_jobs: number | null
          on_time_completion_rate: number | null
          staff_id: string | null
          staff_name: string | null
          staff_type: string | null
          total_jobs: number | null
          total_packages: number | null
          total_revenue_qr: number | null
          total_volume_cbm: number | null
          total_weight_kg: number | null
          year: number | null
        }
        Relationships: []
      }
      staff_daily_performance: {
        Row: {
          avg_satisfaction: number | null
          collection_date: string | null
          collection_jobs: number | null
          completed_jobs: number | null
          delivery_jobs: number | null
          on_time_completion_rate: number | null
          staff_id: string | null
          staff_name: string | null
          staff_type: string | null
          total_jobs: number | null
          total_packages: number | null
          total_revenue_qr: number | null
          total_volume_cbm: number | null
          total_weight_kg: number | null
        }
        Relationships: []
      }
      staff_monthly_performance: {
        Row: {
          avg_satisfaction: number | null
          collection_jobs: number | null
          completed_jobs: number | null
          delivery_jobs: number | null
          month: number | null
          month_start: string | null
          on_time_completion_rate: number | null
          staff_id: string | null
          staff_name: string | null
          staff_type: string | null
          total_jobs: number | null
          total_packages: number | null
          total_revenue_qr: number | null
          total_volume_cbm: number | null
          total_weight_kg: number | null
          year: number | null
        }
        Relationships: []
      }
      staff_weekly_performance: {
        Row: {
          avg_satisfaction: number | null
          collection_jobs: number | null
          completed_jobs: number | null
          delivery_jobs: number | null
          on_time_completion_rate: number | null
          staff_id: string | null
          staff_name: string | null
          staff_type: string | null
          total_jobs: number | null
          total_packages: number | null
          total_revenue_qr: number | null
          total_volume_cbm: number | null
          total_weight_kg: number | null
          week_start: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_customer_active: { Args: { _user_id: string }; Returns: boolean }
      track_cargo_by_invoice: {
        Args: { _invoice_number: string }
        Returns: {
          arrival_date: string
          cargo_description: string
          clearance_date: string
          collection_date: string
          created_at: string
          current_status: string
          customer_name: string
          delivery_date: string
          destination: string
          id: string
          in_transit_date: string
          invoice_number: string
          loaded_date: string
          notes: string
          origin: string
          processing_date: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "customer"
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
    Enums: {
      app_role: ["admin", "staff", "customer"],
    },
  },
} as const
