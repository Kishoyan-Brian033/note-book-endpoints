CREATE OR REPLACE FUNCTION get_note_by_id(
  p_id INTEGER,
  OUT result_note notes
) AS $$
BEGIN
  SELECT * INTO result_note 
  FROM notes 
  WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Note with ID % not found', p_id;
  END IF;
END;
$$ LANGUAGE plpgsql;