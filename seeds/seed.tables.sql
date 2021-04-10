-- This module is used to seed databases if using one in the project.
BEGIN;

    TRUNCATE TABLE "restaurants";

    INSERT INTO "restaurants"
        ("name", "location", "price_range")

    VALUES
        ('Le Bernardin', 'New York', 4),
        ('Due Amici Pizza', 'Tampa', 1),
        ('El Five', 'Denver', 3),
        ('Born and Raised', 'San Diego', 4),
        ('Riel', 'Houston', 3),
        ('Adda', 'New York', 2),
        ('Gemma', 'Dallas', 2),
        ('Se7en Bites', 'Orlando', 2),
        ('Epicure', 'Paris', 5),
        ('Brawn', 'London', 2);

    COMMIT;