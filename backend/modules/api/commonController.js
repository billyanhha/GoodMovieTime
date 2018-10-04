const userModel = require('./users/model');
const listModel = require('./lists/model');

const getListByUser = (id) => new Promise((resolve, reject) => {
    listModel
        .find({ createdBy: id })
        .select("_id like posterUri view name comments createdAt")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err));
})

const increasePostNumber = (id) => new Promise((resolve, reject) => {
    userModel.updateOne({ _id: id }, { $inc: { numberOfPost: 1 } })
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const decreasePostNumber = (id) => new Promise((resolve, reject) => {
    userModel.updateOne({ _id: id }, { $inc: { numberOfPost: -1 } })
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const getRecommendedList = () => new Promise((resolve, reject) => {
    listModel
        .find()
        .select("_id like posterUri view name comments createdAt")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err));
})


module.exports = {
    getListByUser,
    increasePostNumber,
    decreasePostNumber
}