export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string | null
          description: string | null
          equipment: string | null
          id: string
          muscle_group: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          equipment?: string | null
          id?: string
          muscle_group?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          equipment?: string | null
          id?: string
          muscle_group?: string | null
          name?: string
        }
        Relationships: []
      }
      home_content: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          image_url: string | null
          section: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          section: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          section?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          carbs_grams: number | null
          client_id: string | null
          created_at: string | null
          created_by: string | null
          date: string
          fat_grams: number | null
          id: string
          notes: string | null
          protein_grams: number | null
          total_calories: number | null
          updated_at: string | null
        }
        Insert: {
          carbs_grams?: number | null
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          fat_grams?: number | null
          id?: string
          notes?: string | null
          protein_grams?: number | null
          total_calories?: number | null
          updated_at?: string | null
        }
        Update: {
          carbs_grams?: number | null
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          fat_grams?: number | null
          id?: string
          notes?: string | null
          protein_grams?: number | null
          total_calories?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          calories: number | null
          carbs_grams: number | null
          created_at: string | null
          fat_grams: number | null
          food_name: string
          id: string
          meal_plan_id: string | null
          meal_type: string
          protein_grams: number | null
          quantity: string | null
        }
        Insert: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fat_grams?: number | null
          food_name: string
          id?: string
          meal_plan_id?: string | null
          meal_type: string
          protein_grams?: number | null
          quantity?: string | null
        }
        Update: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fat_grams?: number | null
          food_name?: string
          id?: string
          meal_plan_id?: string | null
          meal_type?: string
          protein_grams?: number | null
          quantity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meals_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          client_name: string
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          client_name?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      weight_tracking: {
        Row: {
          body_fat_percentage: number | null
          client_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          recorded_date: string | null
          weight_kg: number
        }
        Insert: {
          body_fat_percentage?: number | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          recorded_date?: string | null
          weight_kg: number
        }
        Update: {
          body_fat_percentage?: number | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          recorded_date?: string | null
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "weight_tracking_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercises: {
        Row: {
          actual_reps: number | null
          created_at: string | null
          exercise_id: string | null
          id: string
          notes: string | null
          planned_reps: number
          sets: number
          updated_at: string | null
          weight_kg: number | null
          workout_session_id: string | null
        }
        Insert: {
          actual_reps?: number | null
          created_at?: string | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          planned_reps: number
          sets: number
          updated_at?: string | null
          weight_kg?: number | null
          workout_session_id?: string | null
        }
        Update: {
          actual_reps?: number | null
          created_at?: string | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          planned_reps?: number
          sets?: number
          updated_at?: string | null
          weight_kg?: number | null
          workout_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_session_id_fkey"
            columns: ["workout_session_id"]
            isOneToOne: false
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_plans: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          updated_at: string | null
          week_start_date: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          updated_at?: string | null
          week_start_date: string
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          updated_at?: string | null
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_plans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_sessions: {
        Row: {
          created_at: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          id: string
          is_rest_day: boolean | null
          workout_plan_id: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          id?: string
          is_rest_day?: boolean | null
          workout_plan_id?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          id?: string
          is_rest_day?: boolean | null
          workout_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_sessions_workout_plan_id_fkey"
            columns: ["workout_plan_id"]
            isOneToOne: false
            referencedRelation: "workout_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      youtube_videos: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
          youtube_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          youtube_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          youtube_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      day_of_week:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | "off"
      user_role: "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      day_of_week: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "off",
      ],
      user_role: ["admin", "client"],
    },
  },
} as const
