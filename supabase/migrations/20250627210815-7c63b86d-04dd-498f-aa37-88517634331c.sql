
-- Clear any existing fake/test data
DELETE FROM public.gym_profiles;

-- Insert all real gym data with correct PINs and IDs
INSERT INTO public.gym_profiles (gym_name, gym_location, pin_code) VALUES
  ('Capital Gymnastics', 'Pflugerville', 'CPF'),
  ('Capital Gymnastics', 'Round Rock', 'CRR'),
  ('Capital Gymnastics', 'Cedar Park', 'CCP'),
  ('Rowland Ballard', 'Atascocita', 'RBA'),
  ('Rowland Ballard', 'Kingwood', 'RBK'),
  ('Houston Gymnastics Academy', 'Houston', 'HGA'),
  ('Estrella Gymnastics', 'Phoenix', 'EST'),
  ('Oasis Gymnastics', 'Phoenix', 'OAS'),
  ('Scottsdale Gymnastics', 'Scottsdale', 'SGT'),
  ('Tigar Gymnastics', 'Austin', 'TIG'),
  ('OWNER ADMIN', 'Jayme', '1426'),
  ('ADMIN VIEW', 'Kim', '2222');
