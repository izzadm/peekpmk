/*
  # Add password authentication system

  1. Database Changes
    - Add `password_hash` column to users table
    - Add `last_login` column to track user activity

  2. Security Functions
    - `verify_user_credentials` - Verify PPMK ID and IC number match
    - `create_user_account` - Create password for verified user
    - `authenticate_user` - Login with PPMK ID and password

  3. Security
    - All functions use security definer to bypass RLS
    - Password hashing using pgcrypto extension
    - Proper error handling and validation
*/

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add password and login tracking columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'password_hash'
  ) THEN
    ALTER TABLE users ADD COLUMN password_hash text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE users ADD COLUMN last_login timestamptz;
  END IF;
END $$;

-- Function to verify user credentials (PPMK ID + IC number)
CREATE OR REPLACE FUNCTION verify_user_credentials(
  p_ppmk_id text,
  p_ic_number text
)
RETURNS TABLE(
  id uuid,
  ppmk_id text,
  full_name text,
  email text,
  phone text,
  university text,
  course text,
  year_of_study integer,
  password_hash text
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate input parameters
  IF p_ppmk_id IS NULL OR trim(p_ppmk_id) = '' THEN
    RAISE EXCEPTION 'PPMK ID is required';
  END IF;

  IF p_ic_number IS NULL OR trim(p_ic_number) = '' THEN
    RAISE EXCEPTION 'IC number is required';
  END IF;

  -- Return user data if credentials match
  RETURN QUERY
  SELECT 
    u.id,
    u.ppmk_id,
    u.full_name,
    u.email,
    u.phone,
    u.university,
    u.course,
    u.year_of_study,
    u.password_hash
  FROM users u
  WHERE u.ppmk_id = trim(p_ppmk_id)
    AND u.ic_number = trim(p_ic_number);
END;
$$;

-- Function to create user account (set password for verified user)
CREATE OR REPLACE FUNCTION create_user_account(
  p_ppmk_id text,
  p_password text
)
RETURNS TABLE(
  id uuid,
  ppmk_id text,
  full_name text,
  email text,
  phone text,
  university text,
  course text,
  year_of_study integer,
  created_at timestamptz,
  updated_at timestamptz
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_record users%ROWTYPE;
BEGIN
  -- Validate input parameters
  IF p_ppmk_id IS NULL OR trim(p_ppmk_id) = '' THEN
    RAISE EXCEPTION 'PPMK ID is required';
  END IF;

  IF p_password IS NULL OR length(p_password) < 6 THEN
    RAISE EXCEPTION 'Password must be at least 6 characters long';
  END IF;

  -- Check if user exists
  SELECT * INTO user_record
  FROM users u
  WHERE u.ppmk_id = trim(p_ppmk_id);

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found. Please verify your PPMK ID first.';
  END IF;

  -- Check if user already has a password
  IF user_record.password_hash IS NOT NULL THEN
    RAISE EXCEPTION 'Account already exists. Please sign in instead.';
  END IF;

  -- Update user with password hash
  UPDATE users
  SET 
    password_hash = crypt(p_password, gen_salt('bf')),
    updated_at = now()
  WHERE ppmk_id = trim(p_ppmk_id);

  -- Return updated user data
  RETURN QUERY
  SELECT 
    u.id,
    u.ppmk_id,
    u.full_name,
    u.email,
    u.phone,
    u.university,
    u.course,
    u.year_of_study,
    u.created_at,
    u.updated_at
  FROM users u
  WHERE u.ppmk_id = trim(p_ppmk_id);
END;
$$;

-- Function to authenticate user (login)
CREATE OR REPLACE FUNCTION authenticate_user(
  p_ppmk_id text,
  p_password text
)
RETURNS TABLE(
  id uuid,
  ppmk_id text,
  full_name text,
  email text,
  phone text,
  university text,
  course text,
  year_of_study integer,
  created_at timestamptz,
  updated_at timestamptz,
  last_login timestamptz
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_record users%ROWTYPE;
BEGIN
  -- Validate input parameters
  IF p_ppmk_id IS NULL OR trim(p_ppmk_id) = '' THEN
    RAISE EXCEPTION 'PPMK ID is required';
  END IF;

  IF p_password IS NULL OR trim(p_password) = '' THEN
    RAISE EXCEPTION 'Password is required';
  END IF;

  -- Get user record
  SELECT * INTO user_record
  FROM users u
  WHERE u.ppmk_id = trim(p_ppmk_id);

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid PPMK ID or password';
  END IF;

  -- Check if user has a password set
  IF user_record.password_hash IS NULL THEN
    RAISE EXCEPTION 'Account not activated. Please complete signup first.';
  END IF;

  -- Verify password
  IF NOT (user_record.password_hash = crypt(p_password, user_record.password_hash)) THEN
    RAISE EXCEPTION 'Invalid PPMK ID or password';
  END IF;

  -- Update last login
  UPDATE users
  SET last_login = now()
  WHERE ppmk_id = trim(p_ppmk_id);

  -- Return user data
  RETURN QUERY
  SELECT 
    u.id,
    u.ppmk_id,
    u.full_name,
    u.email,
    u.phone,
    u.university,
    u.course,
    u.year_of_study,
    u.created_at,
    u.updated_at,
    u.last_login
  FROM users u
  WHERE u.ppmk_id = trim(p_ppmk_id);
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION verify_user_credentials(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION create_user_account(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION authenticate_user(text, text) TO anon, authenticated;
