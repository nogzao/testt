-- Inserir perfil de exemplo
INSERT INTO profiles (username, display_name, bio, followers_count) VALUES 
('bella_model', 'Bella Santos', 'Modelo e influenciadora digital 💫 Conteúdo exclusivo aqui!', 15420);

-- Inserir token de acesso
INSERT INTO access_tokens (profile_id, token, expires_at) VALUES 
((SELECT id FROM profiles WHERE username = 'bella_model'), 'premium_access_2024', NOW() + INTERVAL '30 days');

-- Inserir posts de exemplo
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'bella_model'), '/placeholder.svg?height=600&width=400', 'image', 'Novo ensaio fotográfico ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), '/placeholder.svg?height=600&width=400', 'image', 'Pôr do sol na praia 🌅'),
((SELECT id FROM profiles WHERE username = 'bella_model'), '/placeholder.svg?height=600&width=400', 'image', 'Sessão no estúdio'),
((SELECT id FROM profiles WHERE username = 'bella_model'), '/placeholder.svg?height=600&width=400', 'image', 'Street style de hoje'),
((SELECT id FROM profiles WHERE username = 'bella_model'), '/placeholder.svg?height=600&width=400', 'image', 'Glamour shot 💄');
