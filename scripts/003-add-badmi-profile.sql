-- Inserir perfil badmi
INSERT INTO profiles (username, display_name, bio, followers_count) VALUES 
('badmi', 'Badmi Style', 'Lifestyle & Fashion 🌟 Conteúdo exclusivo para assinantes', 8750);

-- Inserir token de acesso para badmi
INSERT INTO access_tokens (profile_id, token, expires_at) VALUES 
((SELECT id FROM profiles WHERE username = 'badmi'), 'badmi_premium_2024', NOW() + INTERVAL '30 days');

-- Inserir posts de exemplo para badmi
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'badmi'), '/placeholder.svg?height=600&width=400', 'image', 'Novo look do dia ✨'),
((SELECT id FROM profiles WHERE username = 'badmi'), '/placeholder.svg?height=600&width=400', 'image', 'Behind the scenes 📸'),
((SELECT id FROM profiles WHERE username = 'badmi'), '/placeholder.svg?height=600&width=400', 'image', 'Outfit of the day'),
((SELECT id FROM profiles WHERE username = 'badmi'), '/placeholder.svg?height=600&width=400', 'image', 'Weekend vibes 🌸'),
((SELECT id FROM profiles WHERE username = 'badmi'), '/placeholder.svg?height=600&width=400', 'image', 'New collection preview');
