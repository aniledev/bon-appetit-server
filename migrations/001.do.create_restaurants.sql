-- This module is used to create migrations is server is community with database.
CREATE TABLE "restaurants"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50),
    "location" VARCHAR(50),
    "price_range" INT
);