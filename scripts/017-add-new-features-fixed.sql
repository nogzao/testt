-- Adicionar colunas para banner e foto de perfil (se não existirem)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banner_image_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS description TEXT;

-- Adicionar configurações para conteúdo restrito
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_comments BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS restricted_content_text TEXT DEFAULT 'Desbloquear conteúdo restrito';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS restricted_content_link TEXT;

-- Adicionar colunas para posts restritos (se não existirem)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_restricted BOOLEAN DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- Atualizar posts existentes para ter likes padrão
UPDATE posts SET likes_count = FLOOR(RANDOM() * 100) + 1 WHERE likes_count = 0;
