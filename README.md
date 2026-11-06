# Library Management System

## Schema Decisions

**Why Book references Genre via `genreId` instead of embedding:**
We chose a relational approach using a foreign key (`genreId`) rather than embedding the genre directly inside the Book model (as one might do in a document database like MongoDB).

This design ensures normalization. If we embed the genre name into every book, renaming a genre (e.g., from "Sci-Fi" to "Science Fiction") would require updating multiple book records, risking data inconsistency. By referencing the Genre table, we only update the genre in one place. Furthermore, it enforces data integrity—a book cannot have a genre that does not exist in the database, thanks to the relation constraint.
