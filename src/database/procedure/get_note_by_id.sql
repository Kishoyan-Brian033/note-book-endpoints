DROP FUNCTION IF EXISTS get_by_id(INTEGER);

CREATE OR REPLACE FUNCTION get_by_id(p_id INTEGER)
RETURNS SETOF notes AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM notes WHERE id = p_id) THEN
        RAISE EXCEPTION 'Note with id % not found', p_id;
    END IF;

    RETURN QUERY SELECT * FROM notes WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
