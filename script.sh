
#!/bin/bash

echo " Setting up Note-book......"

# Create database 
psql -U postgres -h localhost -c "CREATE DATABASE note_book_db;"

# Run-migration
psql -U postgres -h localhost -d note_book_db -f src/database/schema.sql

# Create stored procedures
psql -U postgres -h localhost -d note_book_db -f src/database/procedure/create_note.sql
psql -U postgres -h localhost -d note_book_db -f src/database/procedure/delete_note.sql
psql -U postgres -h localhost -d note_book_db -f src/database/procedure/get_all_note.sql
psql -U postgres -h localhost -d note_book_db -f src/database/procedure/update_note.sql
psql -U postgres -h localhost -d note_book_db -f src/database/procedure/get_note_by_id.sql



echo "Database setup complete....."

echo "You can now run : npm run start:dev"
