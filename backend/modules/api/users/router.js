const express = require('express');
const router = express.Router();
const userController = require('./controller');
const multer = require('multer');
const authMiddleware = require('../auth/auth.js');
var upload = multer({ dest: 'avatars/' })
//createUser
router.post('/', (req, res) => {
    // req.body.avatarFile = req.file;
    // console.log(req.body);
    userController.createUser(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err)
        );
})

router.get('/', (req, res) => {
    userController.getAllUser()
        .then(data => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err)
        );
})

router.get('/:id', (req, res) => {
    userController.getUserById({id: req.params.id})
        .then(data => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err)
        );
})

router.get('/:id/imageData', (req, res) => {
    userController.getImageData({id: req.params.id})
        .then(data => {
            res.contentType(data.contentType);
            res.send(data.avatar)
        })
        .catch(err => res.status(500).send(err)
        );
})

router.put('/', authMiddleware.authorize, upload.single('avatarFile'), (req, res) => {
    req.body.avatarFile = req.file;
    userController.editUserInfo({ ...req.body, id: req.session.userInfo.id })
        .then(data => {
            res.send("Edit done");
        })
        .catch(err => res.status(500).send(err));
})

router.get('/:id/list', (req, res) => {
    userController.getUserList(req.params.id )
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

module.exports = router;