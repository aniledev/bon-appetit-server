CREATE TABLE "reviews"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "restaurant_id" SERIAL NOT NULL REFERENCES restaurants(id),
    "name" VARCHAR(50) NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INT NOT NULL check(rating >= 1 and rating <=5)
);
