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
      app_settings: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          setting_key: string
          setting_value?: Json
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      content_categories: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: number
          name: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: number
          name: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      content_ideas: {
        Row: {
          category: string
          content_formats: string[] | null
          created_at: string | null
          description: string
          difficulty: string
          engagement: string
          features: string[]
          file_requirements: Json | null
          formats: string[]
          id: number
          production_tips_photo: string[]
          production_tips_video: string[]
          requirements: Json
          setup_planning_photo: string[]
          setup_planning_video: string[]
          status_options: string[] | null
          target_audience: string[]
          thumbnail: string | null
          title: string
          upload_track_photo: string[]
          upload_track_video: string[]
        }
        Insert: {
          category: string
          content_formats?: string[] | null
          created_at?: string | null
          description: string
          difficulty: string
          engagement: string
          features: string[]
          file_requirements?: Json | null
          formats: string[]
          id?: number
          production_tips_photo: string[]
          production_tips_video: string[]
          requirements: Json
          setup_planning_photo: string[]
          setup_planning_video: string[]
          status_options?: string[] | null
          target_audience: string[]
          thumbnail?: string | null
          title: string
          upload_track_photo: string[]
          upload_track_video: string[]
        }
        Update: {
          category?: string
          content_formats?: string[] | null
          created_at?: string | null
          description?: string
          difficulty?: string
          engagement?: string
          features?: string[]
          file_requirements?: Json | null
          formats?: string[]
          id?: number
          production_tips_photo?: string[]
          production_tips_video?: string[]
          requirements?: Json
          setup_planning_photo?: string[]
          setup_planning_video?: string[]
          status_options?: string[] | null
          target_audience?: string[]
          thumbnail?: string | null
          title?: string
          upload_track_photo?: string[]
          upload_track_video?: string[]
        }
        Relationships: []
      }
      extracted_content_ideas: {
        Row: {
          approval_status: string
          approved_at: string | null
          category: string
          content_idea_id: number | null
          created_at: string
          description: string
          difficulty: string
          document_id: string
          engagement: string
          features: string[]
          formats: string[]
          gym_id: string
          id: string
          imported_to_content_ideas: boolean
          production_tips_photo: string[]
          production_tips_video: string[]
          requirements: Json
          setup_planning_photo: string[]
          setup_planning_video: string[]
          target_audience: string[]
          title: string
          updated_at: string
          upload_track_photo: string[]
          upload_track_video: string[]
        }
        Insert: {
          approval_status?: string
          approved_at?: string | null
          category: string
          content_idea_id?: number | null
          created_at?: string
          description: string
          difficulty: string
          document_id: string
          engagement: string
          features?: string[]
          formats?: string[]
          gym_id: string
          id?: string
          imported_to_content_ideas?: boolean
          production_tips_photo?: string[]
          production_tips_video?: string[]
          requirements?: Json
          setup_planning_photo?: string[]
          setup_planning_video?: string[]
          target_audience?: string[]
          title: string
          updated_at?: string
          upload_track_photo?: string[]
          upload_track_video?: string[]
        }
        Update: {
          approval_status?: string
          approved_at?: string | null
          category?: string
          content_idea_id?: number | null
          created_at?: string
          description?: string
          difficulty?: string
          document_id?: string
          engagement?: string
          features?: string[]
          formats?: string[]
          gym_id?: string
          id?: string
          imported_to_content_ideas?: boolean
          production_tips_photo?: string[]
          production_tips_video?: string[]
          requirements?: Json
          setup_planning_photo?: string[]
          setup_planning_video?: string[]
          target_audience?: string[]
          title?: string
          updated_at?: string
          upload_track_photo?: string[]
          upload_track_video?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "extracted_content_ideas_content_idea_id_fkey"
            columns: ["content_idea_id"]
            isOneToOne: false
            referencedRelation: "content_ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extracted_content_ideas_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "uploaded_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extracted_content_ideas_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_profiles: {
        Row: {
          active: boolean | null
          created_at: string | null
          gym_location: string | null
          gym_name: string
          id: string
          pin_code: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          gym_location?: string | null
          gym_name: string
          id?: string
          pin_code: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          gym_location?: string | null
          gym_name?: string
          id?: string
          pin_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      uploaded_documents: {
        Row: {
          created_at: string
          file_path: string
          file_size: number
          file_type: string
          filename: string
          gym_id: string
          id: string
          processed_at: string | null
          processing_status: string
          updated_at: string
          upload_status: string
        }
        Insert: {
          created_at?: string
          file_path: string
          file_size: number
          file_type: string
          filename: string
          gym_id: string
          id?: string
          processed_at?: string | null
          processing_status?: string
          updated_at?: string
          upload_status?: string
        }
        Update: {
          created_at?: string
          file_path?: string
          file_size?: number
          file_type?: string
          filename?: string
          gym_id?: string
          id?: string
          processed_at?: string | null
          processing_status?: string
          updated_at?: string
          upload_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploaded_documents_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_content_progress: {
        Row: {
          content_id: number | null
          created_at: string | null
          draft_data: Json | null
          gym_id: string | null
          id: string
          selected_format: string
          status: string | null
          updated_at: string | null
          upload_progress: Json | null
          uploaded_files: Json | null
          user_id: string | null
        }
        Insert: {
          content_id?: number | null
          created_at?: string | null
          draft_data?: Json | null
          gym_id?: string | null
          id?: string
          selected_format: string
          status?: string | null
          updated_at?: string | null
          upload_progress?: Json | null
          uploaded_files?: Json | null
          user_id?: string | null
        }
        Update: {
          content_id?: number | null
          created_at?: string | null
          draft_data?: Json | null
          gym_id?: string | null
          id?: string
          selected_format?: string
          status?: string | null
          updated_at?: string | null
          upload_progress?: Json | null
          uploaded_files?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_content_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_content_progress_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          content_id: number | null
          created_at: string | null
          gym_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          content_id?: number | null
          created_at?: string | null
          gym_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          content_id?: number | null
          created_at?: string | null
          gym_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id?: string }
        Returns: string
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
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
      user_role: ["admin", "user"],
    },
  },
} as const
