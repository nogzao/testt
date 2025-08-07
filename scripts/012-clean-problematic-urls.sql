-- Remover posts com URLs que podem causar problemas de CORS
DELETE FROM posts WHERE media_url LIKE '%tabela%candilib%' 
   OR media_url LIKE '%pub-d34eff651b7a4f5bb4dd8eee19134c9d%';

-- Adicionar posts com URLs que realmente funcionam
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 

-- URLs do Google Storage que funcionam bem
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', 'video', 'Conteúdo exclusivo em alta qualidade 🎬'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', 'video', 'Vídeo premium para assinantes ✨'),

-- Imagens do Picsum que sempre funcionam
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=501', 'image', 'Novo projeto criativo documentado 🎨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=502', 'image', 'Behind the scenes do processo 📸'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=503', 'image', 'Inspiração para novos trabalhos 💫'),

-- Adicionar mais conteúdo para outros perfis também
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=504', 'image', 'Ensaio fotográfico exclusivo ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', 'video', 'Vídeo especial para seguidores 🎥'),

((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=505', 'image', 'Look do dia inspirador 👗'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=506', 'image', 'Tutorial de estilo completo 💄');
