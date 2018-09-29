const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth.js');
const listController = require("./controller");


router.post("/", authMiddleware.authorize, (req, res) => {
  req.body.createdBy = req.session.userInfo.id;
  listController
    .createList(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

router.post("/:id", (req, res) => {
  listController
    .getListDetails(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});


module.exports = router;
