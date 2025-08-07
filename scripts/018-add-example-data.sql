-- Atualizar perfis existentes com as novas configurações
UPDATE profiles SET 
  show_comments = false,
  restricted_content_text = 'Desbloquear conteúdo restrito',
  restricted_content_link = 'https://exemplo.com/premium'
WHERE username IN ('bella_model', 'badmi', 'badmii');

-- Adicionar algumas imagens de perfil e banners de exemplo
UPDATE profiles SET 
  profile_image_url = 'https://picsum.photos/200/200?random=1',
  banner_image_url = 'https://picsum.photos/800/300?random=1',
  description = 'Modelo e influenciadora digital. Conteúdo exclusivo e ensaios fotográficos profissionais. Acompanhe minha jornada no mundo da moda!'
WHERE username = 'bella_model';

UPDATE profiles SET 
  profile_image_url = 'https://picsum.photos/200/200?random=2',
  banner_image_url = 'https://picsum.photos/800/300?random=2',
  description = 'Lifestyle & Fashion blogger. Dicas de estilo, tutoriais de maquiagem e muito mais. Seja bem-vindo ao meu mundo!'
WHERE username = 'badmi';

UPDATE profiles SET 
  profile_image_url = 'https://picsum.photos/200/200?random=3',
  banner_image_url = 'https://picsum.photos/800/300?random=3',
  description = 'Content Creator & Influencer. Criando conteúdo único e inspirador. Vídeos exclusivos e behind the scenes da minha vida criativa.',
  show_comments = true,
  restricted_content_text = 'Acesso Premium',
  restricted_content_link = 'https://badmii.com/premium'
WHERE username = 'badmii';

-- Adicionar alguns posts restritos de exemplo
INSERT INTO posts (profile_id, media_url, media_type, caption, is_restricted, likes_count) VALUES 
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=901', 'image', 'Conteúdo exclusivo para assinantes ✨', true, 45),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=902', 'image', 'Ensaio fotográfico premium 🔥', true, 78),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=903', 'image', 'Tutorial completo de maquiagem 💄', false, 23);
