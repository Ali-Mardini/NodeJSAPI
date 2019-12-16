const express = require('express');
const router = express.Router();

// import data Controller 
const dataController = require('../controllers/data');


// route to get data by event type /data/event/:eventType
router.get('/event/:eventType',dataController.getDataByEventType);

// route to get data by Repo id /data/repo/:repoId
router.get('/repo/:repoId',dataController.getDataByRepoId);


// route to get repos by actor login /data/repo/actor/:actor
router.get('/repo/actor/:actor',dataController.getRepoByActor);

// route to get all repos  /data/repos
router.get('/repos',dataController.getAllRepos);

// route to delete histories by actor login  /data/events/delete/:actorLogin
router.delete('/events/delete/:actorLogin',dataController.deleteByActorLogin);


// export the routes
module.exports = router ;