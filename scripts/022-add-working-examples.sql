-- Atualizar perfis com configurações completas
UPDATE profiles SET 
  profile_image_url = 'https://picsum.photos/200/200?random=1',
  banner_image_url = 'https://picsum.photos/800/300?random=1',
  description = 'Modelo e influenciadora digital. Conteúdo exclusivo e ensaios fotográficos profissionais.',
  show_comments = true,
  restricted_content_text = 'Desbloquear Premium',
  restricted_content_link = 'https://bella-model.com/premium',
  button_text = 'Seguir no Instagram',
  button_link = 'https://instagram.com/bella_model'
WHERE username = 'bella_model';

UPDATE profiles SET 
  profile_image_url = 'https://picsum.photos/200/200?random=2',
  banner_image_url = 'https://picsum.photos/800/300?random=2',
  description = 'Lifestyle & Fashion blogger. Dicas de estilo, tutoriais de maquiagem e muito mais.',
  show_comments = false,
  restricted_content_text = 'Acesso VIP',
  restricted_content_link = 'https://badmi.com/vip',
  button_text = 'Assinar Canal',
  button_link = 'https://youtube.com/badmi'
WHERE username = 'badmi';

UPDATE profiles SET 
  profile_image_url = 'https://picsum.photos/200/200?random=3',
  banner_image_url = 'https://picsum.photos/800/300?random=3',
  description = 'Content Creator & Influencer. Criando conteúdo único e inspirador para você.',
  show_comments = true,
  restricted_content_text = 'Conteúdo Exclusivo',
  restricted_content_link = 'https://badmii.com/exclusive',
  button_text = 'Apoiar no Patreon',
  button_link = 'https://patreon.com/badmii'
WHERE username = 'badmii';

-- Garantir que posts tenham likes realistas
UPDATE posts SET likes_count = FLOOR(RANDOM() * 100) + 10 WHERE likes_count IS NULL OR likes_count = 0;

-- Marcar alguns posts como restritos
UPDATE posts SET is_restricted = true 
WHERE id IN (
  SELECT id FROM posts 
  WHERE profile_id = (SELECT id FROM profiles WHERE username = 'badmii')
  ORDER BY RANDOM() 
  LIMIT 2
);

UPDATE posts SET is_restricted = true 
WHERE id IN (
  SELECT id FROM posts 
  WHERE profile_id = (SELECT id FROM profiles WHERE username = 'bella_model')
  ORDER BY RANDOM() 
  LIMIT 1
);
