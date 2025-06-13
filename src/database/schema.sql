CREATE TABLE IF NOT EXISTS noots (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
);

CREATE INDEX IF NOT EXISTS idx_notes_title ON notes(title);
CREATE INDEX IF NOT EXISTS idx_notes_author ON notes(author);
CREATE INDEX IF NOT EXISTS idx_notes_content ON notes(content);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);