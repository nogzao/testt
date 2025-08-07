-- Verificar quais colunas existem na tabela profiles
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- Verificar quais colunas existem na tabela posts
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;
