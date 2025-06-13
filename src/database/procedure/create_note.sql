CREATE OR REPLACE FUNCTION create_note(
    p_title VARCHAR(10),
    p_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    p_content VARCHAR(255)
)
RETURNS TABLE(
    id INTEGER,
    title VARCHAR(10),
    created_at TIMESTAMP,
    content VARCHAR(255)
) AS $$
BEGIN 
  IF EXISTS (SELECT 1 FROM notes WHERE title = p_title) THEN 
       RAISE EXCEPTION 'Note with title "%" already exists', p_title;
   END IF;
   
 RETURN QUERY
 INSERT INTO notes (title, created_at, content)
 VALUES (p_title, p_created_at, p_content) 
 RETURNING id, title, created_at, content;
END;
$$ LANGUAGE plpgsql;