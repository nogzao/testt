import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { profileId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    console.log('API Posts - Params:', { profileId: params.profileId, limit, offset })

    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('profile_id', params.profileId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    console.log('API Posts - Supabase response:', { data: data?.length, error, count })

    if (error) {
      console.error('API Posts - Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch posts', details: error.message }, { status: 500 })
    }

    const posts = data || []
    console.log('API Posts - Returning posts:', posts.length)

    return NextResponse.json({ 
      posts,
      total: count,
      hasMore: posts.length === limit
    })
  } catch (error) {
    console.error('API Posts - General error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
