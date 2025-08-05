export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      clip_comments: {
        Row: {
          comment_text: string
          content_id: number
          created_at: string
          gym_id: string
          id: string
          is_admin: boolean
          progress_id: string
          requirement_index: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment_text: string
          content_id: number
          created_at?: string
          gym_id: string
          id?: string
          is_admin?: boolean
          progress_id: string
          requirement_index: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment_text?: string
          content_id?: number
          created_at?: string
          gym_id?: string
          id?: string
          is_admin?: boolean
          progress_id?: string
          requirement_index?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_archives: {
        Row: {
          archive_month: string
          content_id: number
          created_at: string
          edited_files: Json | null
          final_files: Json | null
          gym_id: string
          id: string
          performance_metrics: Json | null
          progress_id: string | null
          raw_files: Json | null
          repurpose_potential: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          archive_month: string
          content_id: number
          created_at?: string
          edited_files?: Json | null
          final_files?: Json | null
          gym_id: string
          id?: string
          performance_metrics?: Json | null
          progress_id?: string | null
          raw_files?: Json | null
          repurpose_potential?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          archive_month?: string
          content_id?: number
          created_at?: string
          edited_files?: Json | null
          final_files?: Json | null
          gym_id?: string
          id?: string
          performance_metrics?: Json | null
          progress_id?: string | null
          raw_files?: Json | null
          repurpose_potential?: string | null
          tags?: string[] | null
          updated_at?: string
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
          caption_ideas: string[] | null
          category: string
          coaching_script: string | null
          concept_goal: string | null
          content_formats: string[] | null
          content_notes: string | null
          content_status: string | null
          created_at: string | null
          created_by_admin: string | null
          data_points: string[] | null
          description: string
          difficulty: string
          due_date: string | null
          engagement: string
          features: string[]
          file_requirements: Json | null
          formats: string[]
          google_trends: string[] | null
          hook_ideas: string[] | null
          id: number
          lifecycle_stage: string | null
          month_year: string | null
          music_vibes: string[] | null
          post_visual: string | null
          production_tips_photo: string[]
          production_tips_video: string[]
          publication_month: string | null
          requirements: Json
          setup_planning_photo: string[]
          setup_planning_video: string[]
          status_options: string[] | null
          target_audience: string[]
          theme: string | null
          thumbnail: string | null
          title: string
          upload_instructions: string | null
          upload_track_photo: string[]
          upload_track_video: string[]
        }
        Insert: {
          caption_ideas?: string[] | null
          category: string
          coaching_script?: string | null
          concept_goal?: string | null
          content_formats?: string[] | null
          content_notes?: string | null
          content_status?: string | null
          created_at?: string | null
          created_by_admin?: string | null
          data_points?: string[] | null
          description: string
          difficulty: string
          due_date?: string | null
          engagement: string
          features: string[]
          file_requirements?: Json | null
          formats: string[]
          google_trends?: string[] | null
          hook_ideas?: string[] | null
          id?: number
          lifecycle_stage?: string | null
          month_year?: string | null
          music_vibes?: string[] | null
          post_visual?: string | null
          production_tips_photo: string[]
          production_tips_video: string[]
          publication_month?: string | null
          requirements: Json
          setup_planning_photo: string[]
          setup_planning_video: string[]
          status_options?: string[] | null
          target_audience: string[]
          theme?: string | null
          thumbnail?: string | null
          title: string
          upload_instructions?: string | null
          upload_track_photo: string[]
          upload_track_video: string[]
        }
        Update: {
          caption_ideas?: string[] | null
          category?: string
          coaching_script?: string | null
          concept_goal?: string | null
          content_formats?: string[] | null
          content_notes?: string | null
          content_status?: string | null
          created_at?: string | null
          created_by_admin?: string | null
          data_points?: string[] | null
          description?: string
          difficulty?: string
          due_date?: string | null
          engagement?: string
          features?: string[]
          file_requirements?: Json | null
          formats?: string[]
          google_trends?: string[] | null
          hook_ideas?: string[] | null
          id?: number
          lifecycle_stage?: string | null
          month_year?: string | null
          music_vibes?: string[] | null
          post_visual?: string | null
          production_tips_photo?: string[]
          production_tips_video?: string[]
          publication_month?: string | null
          requirements?: Json
          setup_planning_photo?: string[]
          setup_planning_video?: string[]
          status_options?: string[] | null
          target_audience?: string[]
          theme?: string | null
          thumbnail?: string | null
          title?: string
          upload_instructions?: string | null
          upload_track_photo?: string[]
          upload_track_video?: string[]
        }
        Relationships: []
      }
      content_versions: {
        Row: {
          content_id: number
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          gym_id: string
          id: string
          progress_id: string
          upload_timestamp: string
          version_notes: string | null
          version_type: string
        }
        Insert: {
          content_id: number
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          gym_id: string
          id?: string
          progress_id: string
          upload_timestamp?: string
          version_notes?: string | null
          version_type: string
        }
        Update: {
          content_id?: number
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          gym_id?: string
          id?: string
          progress_id?: string
          upload_timestamp?: string
          version_notes?: string | null
          version_type?: string
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
      media_enhancements: {
        Row: {
          created_at: string | null
          enhanced_file_url: string | null
          enhancement_quality: string
          gym_id: string | null
          id: string
          original_file_name: string
          original_file_size: number
          processing_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          enhanced_file_url?: string | null
          enhancement_quality: string
          gym_id?: string | null
          id?: string
          original_file_name: string
          original_file_size: number
          processing_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          enhanced_file_url?: string | null
          enhancement_quality?: string
          gym_id?: string | null
          id?: string
          original_file_name?: string
          original_file_size?: number
          processing_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_enhancements_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          comment_text: string
          content_id: number
          created_at: string
          gym_id: string
          id: string
          is_admin: boolean
          month_year: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment_text: string
          content_id: number
          created_at?: string
          gym_id: string
          id?: string
          is_admin?: boolean
          month_year: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment_text?: string
          content_id?: number
          created_at?: string
          gym_id?: string
          id?: string
          is_admin?: boolean
          month_year?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      submission_comments: {
        Row: {
          comment_text: string
          comment_type: string
          created_at: string
          gym_id: string
          id: string
          is_admin: boolean
          progress_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment_text: string
          comment_type?: string
          created_at?: string
          gym_id: string
          id?: string
          is_admin?: boolean
          progress_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment_text?: string
          comment_type?: string
          created_at?: string
          gym_id?: string
          id?: string
          is_admin?: boolean
          progress_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_comments_progress_id_fkey"
            columns: ["progress_id"]
            isOneToOne: false
            referencedRelation: "user_content_progress"
            referencedColumns: ["id"]
          },
        ]
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
          admin_approved: boolean | null
          admin_feedback_required: boolean | null
          admin_reviewed: boolean | null
          approved_at: string | null
          archived_at: string | null
          assignment_month: string | null
          content_id: number | null
          created_at: string | null
          draft_data: Json | null
          gym_id: string | null
          id: string
          last_comment_id: string | null
          lifecycle_stage: string | null
          publication_month: string | null
          published_at: string | null
          selected_format: string
          status: string | null
          submission_notes: string | null
          submitted_at: string | null
          updated_at: string | null
          upload_progress: Json | null
          uploaded_files: Json | null
          user_id: string | null
        }
        Insert: {
          admin_approved?: boolean | null
          admin_feedback_required?: boolean | null
          admin_reviewed?: boolean | null
          approved_at?: string | null
          archived_at?: string | null
          assignment_month?: string | null
          content_id?: number | null
          created_at?: string | null
          draft_data?: Json | null
          gym_id?: string | null
          id?: string
          last_comment_id?: string | null
          lifecycle_stage?: string | null
          publication_month?: string | null
          published_at?: string | null
          selected_format: string
          status?: string | null
          submission_notes?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          upload_progress?: Json | null
          uploaded_files?: Json | null
          user_id?: string | null
        }
        Update: {
          admin_approved?: boolean | null
          admin_feedback_required?: boolean | null
          admin_reviewed?: boolean | null
          approved_at?: string | null
          archived_at?: string | null
          assignment_month?: string | null
          content_id?: number | null
          created_at?: string | null
          draft_data?: Json | null
          gym_id?: string | null
          id?: string
          last_comment_id?: string | null
          lifecycle_stage?: string | null
          publication_month?: string | null
          published_at?: string | null
          selected_format?: string
          status?: string | null
          submission_notes?: string | null
          submitted_at?: string | null
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
          {
            foreignKeyName: "user_content_progress_last_comment_id_fkey"
            columns: ["last_comment_id"]
            isOneToOne: false
            referencedRelation: "submission_comments"
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
      user_role: ["admin", "user"],
    },
  },
} as const
