-- Adicionar posts de exemplo com URLs do S3 e CloudFront
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
-- Exemplos para bella_model
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://privacy-app-media.s3.us-east-1.amazonaws.com/images/bella-photoshoot-001.jpg', 'image', 'Ensaio exclusivo hospedado no S3 ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://d123456789.cloudfront.net/videos/bella-behind-scenes.mp4', 'video', 'Bastidores via CloudFront 🎬'),

-- Exemplos para badmi
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://privacy-content.s3.amazonaws.com/badmi/style-guide-2024.jpg', 'image', 'Guia de estilo 2024 no S3 💫'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://cdn.example.com/badmi-tutorial.mp4', 'video', 'Tutorial completo de maquiagem 💄'),

-- Exemplos para badmii
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://media-bucket.s3.us-west-2.amazonaws.com/badmii/creative-process.jpg', 'image', 'Processo criativo documentado 🎨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://d987654321.cloudfront.net/badmii/exclusive-content.mp4', 'video', 'Conteúdo exclusivo via CDN 🔥'),

-- Exemplos com Supabase Storage
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://projeto.supabase.co/storage/v1/object/public/media/bella/glamour-shot.jpg', 'image', 'Glamour shot no Supabase Storage ✨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://projeto.supabase.co/storage/v1/object/public/videos/badmii/creative-timelapse.mp4', 'video', 'Timelapse criativo no Supabase 🎬');
