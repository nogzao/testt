-- Limpar posts existentes para demonstração
DELETE FROM posts WHERE profile_id IN (
  SELECT id FROM profiles WHERE username IN ('bella_model', 'badmi', 'badmii')
);

-- Adicionar posts com URLs reais que funcionam
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 

-- Posts para bella_model
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=101', 'image', 'Ensaio fotográfico exclusivo ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', 'Vídeo exclusivo para assinantes 🎬'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=102', 'image', 'Behind the scenes 📸'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=103', 'image', 'Pôr do sol na praia 🌅'),

-- Posts para badmi
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=201', 'image', 'Novo look do dia ✨'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', 'Tutorial de maquiagem completo 💄'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=202', 'image', 'Outfit of the day 👗'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=203', 'image', 'Weekend vibes 🌸'),

-- Posts para badmii
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=301', 'image', 'Processo criativo documentado 🎨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video', 'Conteúdo exclusivo premium 🔥'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=302', 'image', 'Inspiração do dia 💫'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=303', 'image', 'Sessão fotográfica de hoje'),

-- Exemplos com URLs de S3/R2 simuladas (para demonstrar detecção)
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://privacy-media.s3.us-east-1.amazonaws.com/bella/exclusive-001.jpg', 'image', 'Conteúdo hospedado no S3 🔒'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://pub-demo123.r2.dev/badmi/style-guide.jpg', 'image', 'Guia de estilo no Cloudflare R2 ☁️'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://d123456789.cloudfront.net/badmii/premium-video.mp4', 'video', 'Vídeo via CloudFront CDN ⚡');
