const userModel = require('./model');
const fs = require('fs');

createUser = ({ username, fullname, password, avatarFile }) => new Promise((resolve, reject) => {
    userModel.create({
        username,
        fullname,
        password,
        avatar: fs.readFileSync(avatarFile.path),
        contentType: avatarFile.mimetype,
    }).then(data => resolve(data)
    ).catch(err => reject(err));
})

getUserForAuth = (username) => new Promise((resolve, reject) => {
    userModel.findOne({
        username
    }).then(data => resolve(data)
    ).catch(err => reject(err));
})


module.exports = {
    createUser,
    getUserForAuth
}