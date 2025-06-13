CREATE OR REPLACE FUNCTION sp_delete_note(
  p_id 
)
RETURNS TABLE(
  id ,
  title TEXT,
  message TEXT
) AS $$
BEGIN
  -- Check if note exists
  IF NOT EXISTS (SELECT 1 FROM notes WHERE id = p_id) THEN
    RAISE EXCEPTION 'Note with ID % not found', p_id;
  END IF;

  -- Delete the note and return info
  RETURN QUERY
  DELETE FROM notes 
  WHERE id = p_id
  RETURNING 
    id, 
    title, 
    'Note deleted successfully' AS message;
END;
$$ LANGUAGE plpgsql;