-- Limpar posts problemáticos
DELETE FROM posts WHERE media_url LIKE '%tabela%candilib%';

-- Adicionar a URL que funciona no navegador
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://pub-d34eff651b7a4f5bb4dd8eee19134c9d.r2.dev/tabela%20candilib.png', 'image', 'Imagem do R2 que funciona perfeitamente ✅'),

-- Adicionar mais exemplos funcionais
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=701', 'image', 'Teste de imagem funcionando 📸'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', 'Vídeo de teste funcionando 🎬'),

((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=702', 'image', 'Novo ensaio fotográfico ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=703', 'image', 'Behind the scenes exclusivo 📸'),

((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=704', 'image', 'Look inspirador do dia 👗'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=705', 'image', 'Tutorial de estilo completo 💄');
