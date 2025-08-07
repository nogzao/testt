-- Limpar posts existentes e adicionar novos com URLs que funcionem
DELETE FROM posts WHERE profile_id IN (
  SELECT id FROM profiles WHERE username IN ('bella_model', 'badmi')
);

-- Adicionar posts para bella_model com imagens que funcionem
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=1', 'image', 'Novo ensaio fotográfico ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=2', 'image', 'Pôr do sol na praia 🌅'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=3', 'image', 'Sessão no estúdio'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=4', 'image', 'Street style de hoje'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=5', 'image', 'Glamour shot 💄'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=11', 'image', 'Behind the scenes 📸'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=12', 'image', 'Mood do dia ✨');

-- Adicionar posts para badmi com imagens que funcionem
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=6', 'image', 'Novo look do dia ✨'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=7', 'image', 'Behind the scenes 📸'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=8', 'image', 'Outfit of the day'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=9', 'image', 'Weekend vibes 🌸'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=10', 'image', 'New collection preview'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=13', 'image', 'Fashion inspiration 👗'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=14', 'image', 'Style goals 💫');
