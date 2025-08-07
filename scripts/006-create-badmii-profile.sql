-- Criar perfil badmii (com dois i's)
INSERT INTO profiles (username, display_name, bio, followers_count) VALUES 
('badmii', 'Badmii Creative', 'Content Creator & Influencer 🎬 Vídeos exclusivos aqui!', 12350);

-- Inserir token de acesso para badmii
INSERT INTO access_tokens (profile_id, token, expires_at) VALUES 
((SELECT id FROM profiles WHERE username = 'badmii'), 'badmii_premium_access_2024', NOW() + INTERVAL '30 days');

-- Inserir posts de exemplo para badmii (mix de imagens e vídeos)
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=20', 'image', 'Novo projeto criativo ✨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', 'video', 'Behind the scenes do último shoot 🎬'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=21', 'image', 'Inspiração do dia 💫'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', 'Vídeo exclusivo para assinantes 🔥'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=22', 'image', 'Mood board atual'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://picsum.photos/400/600?random=23', 'image', 'Sessão fotográfica de hoje'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', 'video', 'Tutorial exclusivo 📚');
