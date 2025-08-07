-- Limpar todos os posts existentes
DELETE FROM posts;

-- Adicionar apenas URLs que sabemos que funcionam
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 

-- URLs do Picsum (sempre funcionam)
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=1001', 'image', 'Ensaio fotográfico exclusivo ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=1002', 'image', 'Behind the scenes 📸'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=1003', 'image', 'Pôr do sol na praia 🌅'),

-- URLs do Google Storage (sempre funcionam)
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', 'Vídeo exclusivo para assinantes 🎬'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=1004', 'image', 'Novo look do dia ✨'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=1005', 'image', 'Tutorial de maquiagem 💄'),

-- URLs para badmii
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=1006', 'image', 'Processo criativo 🎨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', 'Conteúdo premium 🔥'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=1007', 'image', 'Inspiração do dia 💫');
