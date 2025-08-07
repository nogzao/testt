-- Corrigir posts que estão marcados como vídeo mas têm URLs de imagem
UPDATE posts 
SET media_type = 'image' 
WHERE media_type = 'video' 
AND (media_url LIKE '%placeholder.svg%' OR media_url LIKE '%picsum.photos%');

-- Adicionar alguns vídeos reais para os perfis existentes
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', 'Vídeo exclusivo dos bastidores 🎬'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video', 'Tutorial de maquiagem completo 💄');
