// Database types for PostgreSQL

export type AppRole = 'admin' | 'moderator' | 'user';

export type ProjectStatus = 'draft' | 'in_progress' | 'published';

export type BuildStatus = 'pending' | 'building' | 'success' | 'failed';

export type BuildType = 'apk' | 'ipa' | 'zip' | 'github';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  type: string;
  status: ProjectStatus;
  thumbnail_url?: string;
  preview_url?: string;
  created_at: string;
  updated_at: string;
  last_edited: string;
}

export interface BuildHistory {
  id: string;
  project_id: string;
  user_id: string;
  type: BuildType;
  status: BuildStatus;
  download_url?: string;
  size?: string;
  credits_used: number;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}
