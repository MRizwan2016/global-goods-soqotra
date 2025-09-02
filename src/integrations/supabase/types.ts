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
