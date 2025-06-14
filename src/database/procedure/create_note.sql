CREATE OR REPLACE FUNCTION create_note(
    p_title VARCHAR(250),
    p_created_at TIMESTAMP,
    p_content VARCHAR(250)
)
 RETURNS TABLE(id INTEGER, title VARCHAR(250), created_at TIMESTAMP, content VARCHAR(250)) AS $$
    BEGIN
       IF EXISTS (SELECT 1 FROM notes n WHERE n.title = p_title) THEN
        RAISE EXCEPTION 'Note with title "%" already exists', p_title;
    END IF;

    -- Insert the book and return inserted row
    RETURN QUERY
    INSERT INTO notes (title, created_at,content)
    VALUES (p_title, p_created_at, p_content)
    RETURNING notes.id, notes.title, notes.created_at, notes.content;
END;
$$ LANGUAGE plpgsql;