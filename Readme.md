# Node Js API





API to fetch records from MongoDB using:

  - Node.JS
  - Express
  - mongodb

### Installation

Insert Data in you local Database (mongoDB)
```sh
$ mongoimport --db FirstScreen --collection data --file 2019-01-01-15.json
```
Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ npm start
```

### End-Points
get data by event type
```sh
/data/event/:eventType
```

get data by Repo id
```sh
/data/repo/:repoId
```

get repos by actor login
```sh
/data/repo/actor/:actor
```

get all repos
```sh
/data/repos
```

delete histories by actor login
```sh
/data/events/delete/:actorLogin
```
License
----

MIT
