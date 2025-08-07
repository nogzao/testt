-- Limpar posts antigos problemáticos
DELETE FROM posts WHERE media_url LIKE '%tabela%candilib%' OR media_url LIKE '%WhatsApp%Image%';

-- Adicionar a URL específica que você testou
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://pub-d34eff651b7a4f5bb4dd8eee19134c9d.r2.dev/WhatsApp%20Image%202025-06-28%20at%2013.16.46.jpeg', 'image', 'Imagem do WhatsApp via R2 - Teste específico 📱'),

-- Adicionar mais exemplos para comparação
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=801', 'image', 'Imagem de controle (Picsum) ✅'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', 'Vídeo de controle (Google) 🎬'),

((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=802', 'image', 'Teste de comparação 📸'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=803', 'image', 'Outro teste de controle 🎯');
