-- This module is used to seed databases if using one in the project.
BEGIN;

    TRUNCATE "restaurants", "reviews";

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

INSERT INTO "reviews"
    ("restaurant_id", "name", "review", "rating")
VALUES
    (1, 'Anabelle', 'Loved it!', 4),
    (1, 'Wyman', 'Restaurant was amazing.', 5),
    (2, 'Sim', 'Would not ever eat here if I was starving', 1),
    (2, 'Reba', 'Compliments to the chef!', 4),
    (3, 'Tavares', 'DON NOT GET THE OYSTERS.', 2),
    (4, 'George', 'Great service all around', 5),
    (5, 'Xzavier', 'Authentic food. Can be a little pricey', 3),
    (6, 'Aubree', 'Just go anywhere else.', 1),
    (7, 'Tanner', 'Save yourself the drive', 1),
    (8, 'Dangelo', 'This restaurant is worse that we have mcdonalds at home', 1);

COMMIT;