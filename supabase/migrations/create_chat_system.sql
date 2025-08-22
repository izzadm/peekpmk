/*
  # Create chat system tables

  1. New Tables
    - `chat_rooms`
      - `id` (uuid, primary key)
      - `name` (text) - room name like "PPMK Official Group"
      - `type` (text) - 'official', 'club', 'event', 'study'
      - `description` (text, optional)
      - `icon` (text, optional) - icon identifier
      - `is_active` (boolean) - whether room is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `chat_room_members`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key to chat_rooms)
      - `user_id` (uuid, foreign key to users)
      - `role` (text) - 'member', 'admin', 'moderator'
      - `joined_at` (timestamptz)
      - `last_read_at` (timestamptz, optional)

    - `chat_messages`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key to chat_rooms)
      - `sender_id` (uuid, foreign key to users)
      - `content` (text)
      - `message_type` (text) - 'text', 'image', 'file'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all chat tables
    - Users can only see rooms they're members of
    - Users can only send messages to rooms they're members of

  3. Sample Data
    - Create official PPMK chat rooms
    - Auto-assign all users to official groups
*/

-- Create chat_rooms table
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'official',
  description text,
  icon text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_room_members table
CREATE TABLE IF NOT EXISTS chat_room_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  last_read_at timestamptz,
  UNIQUE(room_id, user_id)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  message_type text DEFAULT 'text',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chat_rooms
CREATE POLICY "Users can view rooms they are members of"
  ON chat_rooms
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_room_members 
      WHERE room_id = chat_rooms.id 
      AND user_id = auth.uid()
    )
  );

-- Create policies for chat_room_members
CREATE POLICY "Users can view their own memberships"
  ON chat_room_members
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for chat_messages
CREATE POLICY "Users can view messages in rooms they are members of"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_room_members 
      WHERE room_id = chat_messages.room_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to rooms they are members of"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_room_members 
      WHERE room_id = chat_messages.room_id 
      AND user_id = auth.uid()
    )
  );

-- Service role policies for management
CREATE POLICY "Service role can manage all chat data"
  ON chat_rooms
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage all memberships"
  ON chat_room_members
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage all messages"
  ON chat_messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_room_members_user_id ON chat_room_members(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_room_members_room_id ON chat_room_members(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Create updated_at triggers
CREATE TRIGGER update_chat_rooms_updated_at
  BEFORE UPDATE ON chat_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at
  BEFORE UPDATE ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert official chat rooms
INSERT INTO chat_rooms (name, type, description, icon) VALUES
('PPMK Official Group', 'official', 'Official PPMK community group for all members', 'users'),
('Badminton Club', 'club', 'PPMK Badminton Club discussions and events', 'activity'),
('Hackathon : Hacktopus', 'event', 'Hacktopus hackathon event coordination', 'code')
ON CONFLICT DO NOTHING;

-- Auto-assign all existing users to official groups
DO $$
DECLARE
  room_record RECORD;
  user_record RECORD;
BEGIN
  -- Get all official rooms
  FOR room_record IN SELECT id FROM chat_rooms WHERE type = 'official'
  LOOP
    -- Assign all users to official rooms
    FOR user_record IN SELECT id FROM users
    LOOP
      INSERT INTO chat_room_members (room_id, user_id, role)
      VALUES (room_record.id, user_record.id, 'member')
      ON CONFLICT (room_id, user_id) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;

-- Insert sample messages
DO $$
DECLARE
  official_room_id uuid;
  badminton_room_id uuid;
  hackathon_room_id uuid;
  user1_id uuid;
  user2_id uuid;
BEGIN
  -- Get room IDs
  SELECT id INTO official_room_id FROM chat_rooms WHERE name = 'PPMK Official Group';
  SELECT id INTO badminton_room_id FROM chat_rooms WHERE name = 'Badminton Club';
  SELECT id INTO hackathon_room_id FROM chat_rooms WHERE name = 'Hackathon : Hacktopus';
  
  -- Get user IDs
  SELECT id INTO user1_id FROM users WHERE ppmk_id = 'PPMK001';
  SELECT id INTO user2_id FROM users WHERE ppmk_id = 'PPMK002';
  
  -- Insert sample messages
  IF official_room_id IS NOT NULL AND user1_id IS NOT NULL THEN
    INSERT INTO chat_messages (room_id, sender_id, content) VALUES
    (official_room_id, user1_id, 'Welcome to the official PPMK group! Feel free to introduce yourselves.'),
    (badminton_room_id, user1_id, 'Next practice session is this Friday at 7 PM. See you there!'),
    (hackathon_room_id, user2_id, 'Excited for the Hacktopus event! Who else is participating?');
  END IF;
END $$;
