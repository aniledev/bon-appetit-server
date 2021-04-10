-- This module is used to seed databases if using one in the project.
BEGIN;

    TRUNCATE TABLE "restaurants";

    INSERT INTO "restaurants"
        ("id", "name", "location", "price_range")

    VALUES
        (1, 'Le Bernardin', 'New York', 4),
        (2, 'Due Amici Pizza', 'Tampa', 1),
        (3, 'El Five', 'Denver', 3),
        (4, 'Born and Raised', 'San Diego', 4),
        (5, 'Riel', 'Houston', 3),
        (6, 'Adda', 'New York', 2),
        (7, 'Gemma', 'Dallas', 2),
        (8, 'Se7en Bites', 'Orlando', 2),
        (9, 'Epicure', 'Paris', 5),
        (10, 'Brawn', 'London', 2);

    COMMIT;