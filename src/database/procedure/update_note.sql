
CREATE OR REPLACE FUNCTION update_note(
  p_id INTEGER,
  p_title TEXT,
  p_created_at TEXT,
  p_content TEXT,
)
RETURNS TABLE (
  id INTEGER,
  title TEXT,
  created_at TEXT,
  content TEXT,
) AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM notes WHERE id = p_id) THEN
    RAISE EXCEPTION 'Note with ID % not found', p_id;
  END IF;

  IF EXISTS (
    SELECT 1 FROM notes WHERE title = p_title AND id != p_id
  ) THEN
    RAISE EXCEPTION 'Title already exists for another note';
  END IF;

  UPDATE notes SET
    title = COALESCE(p_title, title),
    created_at = COALESCE(p_created_at, created_at),
    content = COALESCE(p_content, content)
  WHERE id = p_id;

  RETURN QUERY
  SELECT id, title, created_at, content FROM notes WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
