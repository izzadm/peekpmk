/*
  # Create users table and authentication system

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches Supabase auth user ID
      - `ppmk_id` (text, unique) - PPMK identification number
      - `ic_number` (text) - IC number for verification only
      - `full_name` (text) - user's full name
      - `email` (text, unique) - user's email address
      - `phone` (text, optional) - phone number
      - `university` (text, optional) - university name
      - `course` (text, optional) - course of study
      - `year_of_study` (integer, optional) - current year of study
      - `profile_picture` (text, optional) - profile picture URL
      - `created_at` (timestamptz) - record creation timestamp
      - `updated_at` (timestamptz) - record update timestamp

  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to update their own data
    - Add policy for service role to manage all user data

  3. Sample Data
    - Create test user for demo purposes (PPMK001)
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ppmk_id text UNIQUE NOT NULL,
  ic_number text NOT NULL,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  university text,
  course text,
  year_of_study integer,
  profile_picture text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_ppmk_id ON users(ppmk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_ic_number ON users(ic_number);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample test data
INSERT INTO users (
  ppmk_id,
  ic_number,
  full_name,
  email,
  phone,
  university,
  course,
  year_of_study
) VALUES (
  'PPMK001',
  '123456789012',
  'Ahmad Bin Ali',
  'ahmad.ali@example.com',
  '+60123456789',
  'Universiti Malaya',
  'Computer Science',
  2
) ON CONFLICT (ppmk_id) DO NOTHING;

-- Additional sample users for testing
INSERT INTO users (
  ppmk_id,
  ic_number,
  full_name,
  email,
  phone,
  university,
  course,
  year_of_study
) VALUES 
(
  'PPMK002',
  '987654321098',
  'Siti Nurhaliza',
  'siti.nurhaliza@example.com',
  '+60198765432',
  'Universiti Kebangsaan Malaysia',
  'Business Administration',
  3
),
(
  'PPMK003',
  '456789123456',
  'Raj Kumar',
  'raj.kumar@example.com',
  '+60156789123',
  'Universiti Sains Malaysia',
  'Engineering',
  1
),
(
  'PPMK004',
  '789123456789',
  'Lim Wei Ming',
  'lim.weiming@example.com',
  '+60167891234',
  'Universiti Teknologi Malaysia',
  'Information Technology',
  4
)
ON CONFLICT (ppmk_id) DO NOTHING;
