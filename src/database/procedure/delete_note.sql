DROP FUNCTION IF EXISTS delete_note(INTEGER);

CREATE OR REPLACE FUNCTION delete_note(p_id INTEGER)
RETURNS TEXT AS $$
DECLARE
    exists_note INTEGER;
BEGIN
    SELECT 1 INTO exists_note FROM notes WHERE id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Note with ID % does not exist', p_id;
    END IF;

    DELETE FROM notes WHERE id = p_id;

    RETURN FORMAT('Note with ID % has been deleted successfully.', p_id);
END;
$$ LANGUAGE plpgsql;
