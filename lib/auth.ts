import { supabase } from './supabase'

export async function verifyAccessToken(token: string, profileId: string) {
  const { data, error } = await supabase
    .from('access_tokens')
    .select('*')
    .eq('token', token)
    .eq('profile_id', profileId)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return { valid: false, token: null }
  }

  // Verificar se o token expirou
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, token: null }
  }

  // Incrementar contador de acesso
  await supabase
    .from('access_tokens')
    .update({ access_count: data.access_count + 1 })
    .eq('id', data.id)

  return { valid: true, token: data }
}

export async function getProfileByUsername(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getProfilePosts(profileId: string, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('profile_id', profileId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}
