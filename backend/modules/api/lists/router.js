const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth.js');
const listController = require("./controller");


router.post("/", authMiddleware.authorize, (req, res) => {
  req.body.createdBy = req.session.userInfo.id;
  listController
    .createList(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

router.delete("/:id", authMiddleware.authorize, (req, res) => {
  let uid = req.session.userInfo.id;
  listController
    .deleteList({ ...req.params, uid })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

router.put("/:id", authMiddleware.authorize, (req, res) => {
  let uid = req.session.userInfo.id;
  listController
    .updateList({ ...req.body, id: req.params.id, uid })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
})

router.get("/", (req, res) => {
  listController
    .getPagingList(req.query.page || 1)
    .then(data => res.send(data))
    .catch(err => res.sendStatus(500).send(err));
});

router.get("/home", (req, res) => {
  listController
    .getDataForHome()
    .then(data => res.send(data))
    .catch(err => res.sendStatus(500).send(err));
});

router.get("/top10", (req, res) => {
  listController
    .getTop10List()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
})

router.get("/:id/details", (req, res) => {
  listController
    .getListDetails(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

router.post("/:id/react", authMiddleware.authorize, (req, res) => {
  let uid = req.session.userInfo.id;
  listController
    .reactList({ id: req.params.id, uid })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

router.post("/:id/comment", authMiddleware.authorize, (req, res) => {
  let uid = req.session.userInfo.id;
  listController
    .comment({ id: req.params.id, uid, content: req.body.content })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

router.delete("/:id/comment/:commentId", authMiddleware.authorize, (req, res) => {
  let uid = req.session.userInfo.id;
  listController
    .deleteComment({ id: req.params.id, commentId: req.params.commentId, uid })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});



module.exports = router;
