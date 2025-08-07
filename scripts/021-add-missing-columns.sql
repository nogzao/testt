-- Adicionar coluna para botão personalizado
DO $$ 
BEGIN
    -- Adicionar button_text se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='button_text') THEN
        ALTER TABLE profiles ADD COLUMN button_text TEXT DEFAULT 'Seguir';
    END IF;
    
    -- Adicionar button_link se não existir
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='button_link') THEN
        ALTER TABLE profiles ADD COLUMN button_link TEXT;
    END IF;
END $$;

-- Atualizar perfis existentes com botões padrão
UPDATE profiles SET 
    button_text = COALESCE(button_text, 'Seguir'),
    button_link = COALESCE(button_link, 'https://exemplo.com/seguir')
WHERE button_text IS NULL OR button_link IS NULL;

-- Garantir que posts tenham likes padrão
UPDATE posts SET likes_count = FLOOR(RANDOM() * 50) + 5 WHERE likes_count IS NULL OR likes_count = 0;

-- Adicionar alguns posts restritos de exemplo
UPDATE posts SET is_restricted = true WHERE id IN (
    SELECT id FROM posts ORDER BY RANDOM() LIMIT 2
);
