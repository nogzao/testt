-- Corrigir URLs existentes com problemas de codificação
-- Remover o post problemático específico
DELETE FROM posts WHERE media_url LIKE '%tabela%candilib%';

-- Adicionar exemplos com URLs que têm espaços (para testar a correção)
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
-- Exemplo com espaços no nome (será corrigido automaticamente)
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=601&text=Minha Imagem', 'image', 'Teste de URL com espaços no parâmetro ✨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=602', 'image', 'Imagem funcionando perfeitamente 📸'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', 'video', 'Vídeo de alta qualidade 🎬'),

-- Adicionar mais conteúdo funcional
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=603', 'image', 'Novo ensaio fotográfico ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://picsum.photos/400/600?random=604', 'image', 'Behind the scenes exclusivo 📸'),

((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=605', 'image', 'Look inspirador do dia 👗'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://picsum.photos/400/600?random=606', 'image', 'Tutorial de estilo completo 💄');
