-- Verificar e adicionar colunas uma por uma
DO $$ 
BEGIN
    -- Adicionar profile_image_url se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='profile_image_url') THEN
        ALTER TABLE profiles ADD COLUMN profile_image_url TEXT;
    END IF;
    
    -- Adicionar banner_image_url se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='banner_image_url') THEN
        ALTER TABLE profiles ADD COLUMN banner_image_url TEXT;
    END IF;
    
    -- Adicionar description se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='description') THEN
        ALTER TABLE profiles ADD COLUMN description TEXT;
    END IF;
    
    -- Adicionar show_comments se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='show_comments') THEN
        ALTER TABLE profiles ADD COLUMN show_comments BOOLEAN DEFAULT false;
    END IF;
    
    -- Adicionar restricted_content_text se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='restricted_content_text') THEN
        ALTER TABLE profiles ADD COLUMN restricted_content_text TEXT DEFAULT 'Desbloquear conteúdo restrito';
    END IF;
    
    -- Adicionar restricted_content_link se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='restricted_content_link') THEN
        ALTER TABLE profiles ADD COLUMN restricted_content_link TEXT;
    END IF;
    
    -- Adicionar is_restricted para posts se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='is_restricted') THEN
        ALTER TABLE posts ADD COLUMN is_restricted BOOLEAN DEFAULT false;
    END IF;
    
    -- Adicionar likes_count para posts se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='likes_count') THEN
        ALTER TABLE posts ADD COLUMN likes_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Atualizar valores padrão para perfis existentes
UPDATE profiles SET 
    show_comments = COALESCE(show_comments, false),
    restricted_content_text = COALESCE(restricted_content_text, 'Desbloquear conteúdo restrito')
WHERE show_comments IS NULL OR restricted_content_text IS NULL;

-- Atualizar posts existentes para ter likes padrão
UPDATE posts SET likes_count = FLOOR(RANDOM() * 50) + 5 WHERE likes_count = 0 OR likes_count IS NULL;
