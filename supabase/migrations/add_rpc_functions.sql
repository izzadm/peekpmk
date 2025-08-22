/*
  # Add RPC functions for authentication

  1. Functions
    - `verify_user_credentials` - Verify PPMK ID and IC number (bypasses RLS)
    - `get_user_email` - Get user email by PPMK ID (bypasses RLS)
    - `update_user_auth_id` - Update user with auth ID (bypasses RLS)

  2. Security
    - Functions run with SECURITY DEFINER to bypass RLS
    - Only accessible to authenticated users and anon users for verification
*/

-- Function to verify user credentials (bypasses RLS)
CREATE OR REPLACE FUNCTION verify_user_credentials(p_ppmk_id text, p_ic_number text)
RETURNS TABLE(
  id uuid,
  ppmk_id text,
  ic_number text,
  full_name text,
  email text,
  phone text,
  university text,
  course text,
  year_of_study integer,
  profile_picture text,
  created_at timestamptz,
  updated_at timestamptz
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.ppmk_id, u.ic_number, u.full_name, u.email, u.phone, 
         u.university, u.course, u.year_of_study, u.profile_picture, 
         u.created_at, u.updated_at
  FROM users u
  WHERE u.ppmk_id = p_ppmk_id AND u.ic_number = p_ic_number;
END;
$$;

-- Function to get user email by PPMK ID (bypasses RLS)
CREATE OR REPLACE FUNCTION get_user_email(p_ppmk_id text)
RETURNS TABLE(email text)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT u.email
  FROM users u
  WHERE u.ppmk_id = p_ppmk_id;
END;
$$;

-- Function to update user with auth ID (bypasses RLS)
CREATE OR REPLACE FUNCTION update_user_auth_id(p_ppmk_id text, p_auth_id uuid)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE users 
  SET id = p_auth_id, updated_at = now()
  WHERE ppmk_id = p_ppmk_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION verify_user_credentials(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_user_email(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_user_auth_id(text, uuid) TO anon, authenticated;
