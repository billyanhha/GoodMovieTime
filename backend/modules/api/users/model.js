const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userModel = new Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    aboutMe: { type: String, default: "Hi" },
    avatar: { type: Buffer },
    contentType: { type: String },
    like: {type : Number , default : 0}
},
    { timestamps: { createdAt: "createdAt" } }
)

//bcrypts
userModel.pre("save", function (next) {
    if (!this.isModified("password")) { // TODO bug on update password
        console.log("Modified");
        return next();

        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('There are already '));
        } else {
            next(error);
        }


    }

    bcrypt
        .genSalt(12)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err));
});


module.exports = mongoose.model("users", userModel);