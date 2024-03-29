const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/:movieId", (req, res) => {  
  controller
    .getMovieById({id: req.params.movieId , language: req.query.language})
    .then(data => res.send({ ...data[0], ...data[1] }))
    .catch(err => res.status(500).send(err));
});

router.get("/", (req, res) => {
  controller
    .getMovieByContent(req.query.content , req.query.language)
    .then(data => {
      !data[0].length && !data[1].length
        ? res.status(400).send([])
        : res.send([...data[0], ...data[1]]);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:movieId/homepage", (req, res) => {
  controller
    .getHomepageById(req.params.movieId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});


module.exports = router;
