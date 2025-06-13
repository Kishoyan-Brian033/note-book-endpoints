CREATE OR REPLACE FUNCTION sp_get_all_notes()
RETURNS TABLE (
  id INTEGER,
  title TEXT,
  created_at TIMESTAMP,
  content TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT id, title, created_at, content 
  FROM notes
END;
$$ LANGUAGE plpgsql;