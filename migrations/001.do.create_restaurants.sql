-- This module is used to create migrations is server is community with database.
CREATE TABLE "restaurants"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "location" VARCHAR(50) NOT NULL,
    "price_range" INT NOT NULL
);
