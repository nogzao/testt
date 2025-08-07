import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  username: string
  display_name: string
  bio?: string
  description?: string
  profile_image_url?: string
  banner_image_url?: string
  followers_count: number
  is_active: boolean
  show_comments: boolean
  restricted_content_text: string
  restricted_content_link?: string
  button_text: string
  button_link?: string
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  profile_id: string
  media_url: string
  media_type: 'image' | 'video'
  caption?: string
  is_active: boolean
  is_restricted: boolean
  likes_count: number
  created_at: string
  updated_at: string
}

export type AccessToken = {
  id: string
  profile_id: string
  token: string
  expires_at?: string
  is_active: boolean
  access_count: number
  created_at: string
}
