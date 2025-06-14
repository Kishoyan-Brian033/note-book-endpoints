DROP FUNCTION IF EXISTS update_note(INTEGER, VARCHAR, TIMESTAMP, VARCHAR);

CREATE OR REPLACE FUNCTION update_note(
    p_id INTEGER,
    p_title VARCHAR(255) DEFAULT NULL,
    p_created_at TIMESTAMP DEFAULT NULL,
    p_content VARCHAR(255) DEFAULT NULL
)
RETURNS TABLE(id INTEGER, title VARCHAR(255), created_at TIMESTAMP, content VARCHAR(255)) AS $$
DECLARE
    current_title VARCHAR(255);
    current_created_at TIMESTAMP;
    current_content VARCHAR(255);
BEGIN
    SELECT n.title, n.created_at, n.content
    INTO current_title, current_created_at, current_content
    FROM notes n WHERE n.id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Note with ID % does not exist', p_id;
    END IF;

    RETURN QUERY
    UPDATE notes
    SET title = COALESCE(p_title, current_title),
        created_at = COALESCE(p_created_at, current_created_at),
        content = COALESCE(p_content, current_content)
    WHERE notes.id = p_id
    RETURNING notes.id, notes.title, notes.created_at, notes.content;
END;
$$ LANGUAGE plpgsql;
