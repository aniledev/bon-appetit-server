# Bon Appetit API

Client Repo: https://github.com/aniledev/bon-appetit
API Repo: https://github.com/aniledev/bon-appetit-server
Live API hosted on Heroku: https://protected-ridge-35280.herokuapp.com/api

## Application Summary

This backend server is to be used with the client aniledev/bon-appetit and provides support restaurant tracker and review application. This repo directory is organized by source files, files related to the /api/resaturant endpoint, and configuration files.

Each endpoint uses the express.Router class to create modularized route handlers. Additionally, the routers make use node-postgres, modules for interfacing with PostgreSQL databases.

## Technology Used

- Node
- Express
- PostgreSQL
- cors
- helmet
- morgan
- node-postgres
- Heroku

## Endpoints

### Restaurant

`GET /api/restaurant`<br/>

`POST /api/restaurant`<br/>
**This endpoint requires a request body in the form of `const { name, location, price_range } = req.body`.**

`GET /api/restaurant/:id`<br/>

`PUT /api/restaurant/:id`<br/>
**This endpoint requires a request body in the form of `const { name, location, price_range } = req.body`.**

`DELETE /api/restaurant/:id`<br/>

`POST /api/restaurant/:id/review`<br/>
**This endpoint requires a request body in the form of `const { name, review, rating } = req.body`.**

## Status Codes

The API here returns the following status codes:

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Ok                    |
| 404         | Bad Request           |
| 400         | Not Found             |
| 500         | Internal Server Error |

## Local Dev Setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin bon-appetit
createdb -U dunder-mifflin bon-appetit-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=bon-appetit-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
