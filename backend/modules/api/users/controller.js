const userModel = require('./model');
const fs = require('fs');
const commonController = require("../commonController");
const createUser = ({ username, fullname, password }) => new Promise((resolve, reject) => {
    userModel.create({
        username,
        fullname,
        password,
        // avatar: fs.readFileSync(avatarFile.path),
        // contentType: avatarFile.mimetype,
    }).then(data => resolve(data)
    ).catch(err => reject(err));
})

const getUserForAuth = (username) => new Promise((resolve, reject) => {
    userModel.findOne({
        username
    }).then(data => resolve(data)
    ).catch(err => reject(err));
})

const getAllUser = () => new Promise((resolve, reject) => {
    userModel.find()
    .then(data => resolve(data))
    .catch(err => reject(err));
})

const editUserInfo = ({ id, fullname, avatarFile, aboutMe }) => new Promise((resolve, reject) => {
    const data = avatarFile ? {
        fullname,
        aboutMe,
        avatar: fs.readFileSync(avatarFile.path),
        contentType: avatarFile.mimetype,
    } : {
            fullname,
            aboutMe,
        }
    userModel.findOneAndUpdate(
        { _id: id },
        data
    )
        .then(data => resolve(data)
        ).catch(err => reject(err));
})


const getUserById = ({ id }) => new Promise((resolve, reject) => {
    userModel.findOne({ _id: id })
        .select('username fullname aboutMe like numberOfPost')
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const getImageData = ({ id }) => new Promise((resolve, reject) => {
        userModel.findOne({ _id: id })
        .select('avatar contentType')
        .then(data => resolve(data))
        .catch(err => reject(err))
})


const getUserList = (id) => new Promise((resolve, reject) => {
    commonController.getListByUser(id)
        .then(data => resolve(data))
        .catch(err => reject(err))
})



module.exports = {
    createUser,
    getUserForAuth,
    getAllUser,
    editUserInfo,
    getUserList,
    getUserById,
    getImageData,
}