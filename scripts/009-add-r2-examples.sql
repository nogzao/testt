-- Adicionar posts de exemplo com URLs do Cloudflare R2
INSERT INTO posts (profile_id, media_url, media_type, caption) VALUES 
-- Exemplos para bella_model com R2
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://pub-demo123.r2.dev/bella/photoshoot-exclusive-001.jpg', 'image', 'Ensaio exclusivo no Cloudflare R2 ✨'),
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://media.privacyapp.com/bella/behind-scenes-video.mp4', 'video', 'Bastidores via R2 com domínio customizado 🎬'),

-- Exemplos para badmi com R2
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://pub-456def.r2.dev/badmi/style-guide-2024.jpg', 'image', 'Guia de estilo 2024 no R2 💫'),
((SELECT id FROM profiles WHERE username = 'badmi'), 'https://cdn.badmistyle.com/tutorials/makeup-complete.mp4', 'video', 'Tutorial completo via R2 CDN 💄'),

-- Exemplos para badmii com R2
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://pub-789ghi.r2.dev/badmii/creative-process-2024.jpg', 'image', 'Processo criativo documentado no R2 🎨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://content.badmii.com/exclusive/premium-content.mp4', 'video', 'Conteúdo premium via R2 🔥'),

-- Exemplos com diferentes CDNs para comparação
((SELECT id FROM profiles WHERE username = 'bella_model'), 'https://d123456789.cloudfront.net/bella/glamour-shot.jpg', 'image', 'Glamour shot via CloudFront ✨'),
((SELECT id FROM profiles WHERE username = 'badmii'), 'https://cdn.bunny.net/badmii/creative-timelapse.mp4', 'video', 'Timelapse via Bunny CDN 🎬');
