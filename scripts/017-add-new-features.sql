-- Adicionar colunas para banner e foto de perfil
ALTER TABLE profiles ADD COLUMN profile_image_url TEXT;
ALTER TABLE profiles ADD COLUMN banner_image_url TEXT;
ALTER TABLE profiles ADD COLUMN description TEXT;

-- Adicionar configurações globais para o perfil
ALTER TABLE profiles ADD COLUMN restricted_content_text TEXT DEFAULT 'Desbloquear conteúdo restrito';
ALTER TABLE profiles ADD COLUMN restricted_content_link TEXT;

-- Adicionar colunas para posts restritos
ALTER TABLE posts ADD COLUMN is_restricted BOOLEAN DEFAULT false;
ALTER TABLE posts ADD COLUMN likes_count INTEGER DEFAULT 0;

-- Criar tabela para configurações do perfil
CREATE TABLE IF NOT EXISTS profile_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  show_comments BOOLEAN DEFAULT false,
  restricted_content_text TEXT DEFAULT 'Desbloquear conteúdo restrito',
  restricted_content_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configurações padrão para perfis existentes
INSERT INTO profile_settings (profile_id, show_comments, restricted_content_text)
SELECT id, false, 'Desbloquear conteúdo restrito'
FROM profiles
WHERE NOT EXISTS (
  SELECT 1 FROM profile_settings WHERE profile_settings.profile_id = profiles.id
);
