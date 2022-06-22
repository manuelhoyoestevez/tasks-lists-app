# TasksListsApp

[![node.js 16.14.0](https://img.shields.io/badge/node.js-16.14.0-blue)]()
[![NestJS 8.0.0](https://img.shields.io/badge/NestJS-8.0.0-red)]()
[![AngularJS 14.0.0](https://img.shields.io/badge/AngularJS-14.0.0-green)]()
[![Docker 20.10.12](https://img.shields.io/badge/Docker-20.10.12-purple)]()
[![MySQL 5.7.22](https://img.shields.io/badge/MySQL-5.7.22-yellow)]()

## Author
- [Manuel Hoyo Estévez](https://github.com/manuelhoyoestevez)

## General
This repo consists of two projects:
- `back`: Backend developed in NestJS.
- `front`: Frontend developed in AngularJS.

For `back` to run, it is necessary to link it through a .env file to a MySQL database with the table model
specified in the setup.sql file.

Both projects can be run in development mode by running the `npm start` command, having previously installed
the libraries with `npm install`.

By default, they will run on ports:
- `back`: `3000`
- `front`: `4200`

`back` embeds a compiled version of `front`, accessible from the root path `/`.

## Docker

In order to be able to run the application without having to configure anything previously, a `docker-compose`
script is incorporated that will start everything necessary for the application to work:

To do this you need to run: `docker-compose up -d`. After build the images and waiting a few moments for the
server to start, we can access it by entering `localhost:3000` in the browser.

On the other hand, if we want to see the database, PhpMyAdmin is also enabled to `localhost:8081`.
