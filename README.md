<h1 align="center">Bon Appetit Server</h1>
<h3 align="center">A back-end server that returns information regarding restaurant entries in the database and corresponding review information</h3>

<p align="center">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/aniledev/bon-appetit-server">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/aniledev/bon-appetit-server">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/aniledev/bon-appetit-server">
<img alt="GitHub repo size in bytes" src="https://img.shields.io/github/repo-size/aniledev/bon-appetit-server">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/aniledev/bon-appetit-server?color=red">
<img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/aniledev/bon-appetit-server?color=informational">
</p>

## Contents

<details open="open">
  <summary>Contents</summary>
  <ol>
    <li><a href="#application-summary">Application Summary</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#local-dev-setup">Local Dev Setup</a></li>
    <li><a href="#configuring-postgresql">Configuring PostgreSQL</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#technical-aspects">Technical Aspects</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#connect-with-me">Connect With Me</a></li>
  </ol>
</details>

## Application Summary

This backend server is to be used with the client aniledev/bon-appetit and provides support restaurant tracker and review application. This repo directory is organized by source files, files related to the /api/restaurant endpoint, and configuration files.

Each endpoint uses the express.Router class to create modularized route handlers. Additionally, the routers make use of [node-postgres](https://node-postgres.com/), a module for easy interfacing with PostgreSQL databases.

## API Documentation

Full API documentation can be found on [Postman](https://documenter.getpostman.com/view/13220930/TzJx8wYr). See the complete documentation for endpoint descriptions, example request snippets, and example response snippets in various formats.

### Endpoints

#### Restaurant

`GET /api/restaurant`<br/>

`POST /api/restaurant`<br/>
**This endpoint requires a request body in the form of `const { name, location, price_range } = req.body`.**

`GET /api/restaurant/:id`<br/>

`PUT /api/restaurant/:id`<br/>
**This endpoint requires a request body in the form of `const { name, location, price_range } = req.body`.**

`DELETE /api/restaurant/:id`<br/>

`POST /api/restaurant/:id/review`<br/>
**This endpoint requires a request body in the form of `const { name, review, rating } = req.body`.**

### Status Codes

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

## Configuring PostgreSQL

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

And `npm test` should work at this point.

## Scripts

Start the application `npm run start`

Start nodemon for the application `npm run dev`

Run the test mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`

## Built With

<p align="left"> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://mochajs.org" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="mocha" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>

## Technical Aspects

- [cors](https://www.npmjs.com/package/cors)
- [helmet](https://www.npmjs.com/package/helmet)
- [morgan](https://www.npmjs.com/package/morgan)
- [node-postgres](https://node-postgres.com/)

## Deployment

View the client repo [here](https://github.com/aniledev/bon-appetit). The live api is hosted on [Heroku](https://protected-ridge-35280.herokuapp.com/api). The live client is hosted with [Vercel](bon-appetit-theta.vercel.app).

## Acknowledgements

- [Font Awesome](https://fontawesome.com)
- [Thinkful Coding Bootcamp](https://www.thinkful.com/)

## Connect With Me

🔭 I’m currently working on **mastering data structures and complex algorithms.**

🌱 I’m currently learning **the fundamentals of Angular.**

🤝 I’m looking for help with **networking as a new dev in the community.**

👨‍💻 All of my projects are available [here](https://aniledev.github.io/dev-portfolio/)

💬 Ask me about **the ease of the PERN stack.**

📫 The best way to reach me is by email: **elinamcgill@gmail.com**

📄 Check out [my resume of experiences](https://docs.google.com/document/d/1bxScP6d6Olv4QE5icvVSBI9L2EXfiZyZ2j2SDJhkoes/edit?usp=sharing)

⚡ Fun fact **Hiatus Kaiyote is my favorite band at the moment.**

<p align="left">
<a href="https://linkedin.com/in/elina-mcgill" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="elina-mcgill" height="30" width="40" /></a>
</p>
