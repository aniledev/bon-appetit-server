const app = require("../src/app");

describe("App", () => {
  it('GET /api responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/api").expect(200, "Hello, world!");
  });
});

describe("GET /", () => {
  it("GET /api/restaurant  responds with 200 with correct response", () => {
    return supertest(app)
      .get("/api/restaurant") // invoke the endpoint
      .expect(200) // assert that you get a 200  OK status
      .expect("Content-Type", /json/)
      .then((res) => {
        // make sure you get an object
        expect(res.body).to.be.an("object");
        // object  must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });
});

describe("GET /:id", () => {
  it("GET /api/restaurant/:id responds with 200 with correct response", () => {
    return supertest(app)
      .get("/:id") // invoke the endpoint
      .expect(200) // assert that you get a 200  OK status
      .expect("Content-Type", /json/)
      .then((res) => {
        // make sure you get an object
        expect(res.body).to.be.an("object");
        // object must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });
});

describe("POST /api/restaurant", () => {
  it("POST /api/restaurant responds with 200 with correct response", () => {
    return supertest(app)
      .post("/api/restaurant")
      .send({ name: "Buenos", location: "New York", price_range: "3" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("POST /api/restaurant/:id/review", () => {
  it("POST /api/restaurant/:id/review responds with 201 with correct response", () => {
    return supertest(app)
      .post("/api/restaurant/:id/review")
      .send({ name: "Elina", review: "Great restaurant", rating: "5" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("DELETE /api/restaurant/:id", (done) => {
  it("DELETE /api/restaurant/:id responds with 204 with correct response", () => {
    return supertest(app)
      .delete("/api/restaurant/:id")
      .send({ id: "3" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(204, done);
  });
});
