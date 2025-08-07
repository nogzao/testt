-- Limpar posts com URLs fictícias que causam erro
DELETE FROM posts WHERE media_url LIKE '%d123456789.cloudfront.net%' 
   OR media_url LIKE '%privacy-media.s3.%' 
   OR media_url LIKE '%pub-demo123.r2.dev%';

-- Adicionar apenas URLs reais que funcionam
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 

-- Vídeos reais que funcionam
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'video', 'Conteúdo exclusivo que realmente funciona 🔥'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 'video', 'Vídeo premium de alta qualidade ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 'video', 'Behind the scenes exclusivo 🎬'),

-- Imagens reais que funcionam
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=401', 'image', 'Novo projeto criativo 🎨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=402', 'image', 'Processo de criação documentado 📸'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=403', 'image', 'Ensaio fotográfico profissional ✨');
