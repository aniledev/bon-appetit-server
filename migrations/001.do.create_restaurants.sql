CREATE TABLE "restaurants"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "location" VARCHAR(50) NOT NULL,
    "price_range" INT NOT NULL check(price_range >= 1 and price_range <=5)
);
