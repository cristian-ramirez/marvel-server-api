# marvel-server-api

## Introduction
**marvel-server-api** is a tiny server with [express.js](https://expressjs.com/) and the npm package [marvel-api](https://github.com/fiveisprime/marvel-api) that allow us to do easy queries to API of [Marvel Developer]

## Install
1. Download the source code:
   * `git clone https://github.com/cristian-ramirez/marvel-server-api.git`.
   * `cd marvel-server-api.git`

2. Run `npm install`.

3. After that you need create account on [Marvel Developer] website.
   * Once logged in, go to tab _My Developer Account_.
   * Copy and paste the values of _public key_ and _private key_ into new file named `.env` as _APP_KEY_PUBLIC_ and _APP_KEY_PRIVATE_ respectively.
   
4. Finally run `npm run server`.

## Demo
You can use the current implementation with [Heroku demo app](https://marvel-server-api.herokuapp.com/api), the currents values availables for search are `characters, comics, creators, events, series, stories`, such as:
   * `https://marvel-server-api.herokuapp.com/api/characters`
   * `https://marvel-server-api.herokuapp.com/api/comics`

Also you can use query string to set limit of values by query and offset for pagination, for instance:
   * `https://marvel-server-api.herokuapp.com/api/characters?limit=10&offset=10`
   * `https://marvel-server-api.herokuapp.com/api/comics?limit=10&offset=40`

[Marvel Developer]: https://developer.marvel.com
