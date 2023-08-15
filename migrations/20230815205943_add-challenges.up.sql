CREATE EXTENSION IF NOT EXISTS ulid;
CREATE table IF NOT EXISTS challenges (
  id ulid NOT NULL DEFAULT gen_ulid() PRIMARY KEY,
  title text,
  search_title tsvector GENERATED ALWAYS AS (to_tsvector('english', title)) STORED,
  prompt_type text NOT NULL,
  prompt_details json NOT NULL,
  tags text [] NOT NULL DEFAULT '{}',
  updated_at timestamp DEFAULT current_timestamp
);
CREATE INDEX search_title_idx ON challenges USING GIN (search_title);
CREATE INDEX tags_index on challenges using GIN (tags);