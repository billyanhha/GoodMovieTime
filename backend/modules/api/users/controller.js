const userModel = require('./model');
const fs = require('fs');
const listController = require("../lists/controller");

createUser = ({ username, fullname, password }) => new Promise((resolve, reject) => {
    userModel.create({
        username,
        fullname,
        password,
        // avatar: fs.readFileSync(avatarFile.path),
        // contentType: avatarFile.mimetype,
    }).then(data => resolve(data)
    ).catch(err => reject(err));
})

getUserForAuth = (username) => new Promise((resolve, reject) => {
    userModel.findOne({
        username
    }).then(data => resolve(data)
    ).catch(err => reject(err));
})

getAllUser = () => new Promise((resolve, reject) => {
    userModel.find().then(data => resolve(data)
    ).catch(err => reject(err));
})

editUserInfo = ({ id, fullname, avatarFile, aboutMe }) => new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
        { _id: id },
        {
            fullname,
            aboutMe,
            avatar: fs.readFileSync(avatarFile.path),
            contentType: avatarFile.mimetype,
        }
    )
        .then(data => resolve(data)
        ).catch(err => reject(err));
})

getUserList = ({id}) => new Promise((resolve , reject) => {
    listController.getUserList({id})
    .then(data=> resolve(data))
    .catch(err => reject(err))
})

getUserById = ({id}) => new Promise((resolve , reject) => {
    userModel.findOne({_id : id})
    .select('username fullname aboutMe like')
    .then(data => resolve(data))
    .catch(err => reject(err))
})

getImageData = ({id}) => new Promise((resolve , reject) => {
    userModel.findOne({_id : id})
    .select('avatar contentType')
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
    getImageData
}