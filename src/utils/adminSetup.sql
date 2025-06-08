
-- Update admin@fitness.com to have admin role if it exists
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@fitness.com';

-- If the profile doesn't exist, you can create it manually:
-- INSERT INTO public.profiles (id, email, name, role)
-- SELECT id, email, COALESCE(raw_user_meta_data->>'name', email), 'admin'
-- FROM auth.users 
-- WHERE email = 'admin@fitness.com'
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
