const userModel = require('./users/model');
const listModel = require('./lists/model');

const getListByUser = (id) => new Promise((resolve, reject) => {
    listModel
        .find({ createdBy: id })
        .select("_id like posterUri view name comments createdAt createdBy")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err));
})

const increasePostNumber = (data1) => new Promise((resolve, reject) => {
    userModel.updateOne({ _id: data1.createdBy }, { $inc: { numberOfPost: 1 } })
        .then(data => resolve(data1._id))
        .catch(err => reject(err))
})

const decreasePostNumber = (id) => new Promise((resolve, reject) => {
    userModel.updateOne({ _id: id }, { $inc: { numberOfPost: -1 } })
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const getRecommendedList = () => new Promise((resolve, reject) => {
    let i = Math.round(Math.random() * 9);
    listModel.aggregate(
        [
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy",
                },
            },
            {
                $project: {
                    name: 1,
                    moviesId: 1,
                    posterUri: 1,
                    createdAt: 1,
                    view: 1,
                    commentNum: { $size: "$comments" },
                    likeNum: { $size: "$like" },
                    createdBy: {
                        _id: 1,
                        username: 1
                    }
                }
            },
            {
                $sort: { likeNum: -1, view: -1, createdAt: -1 }
            },
            {
                $skip: i
            },
            {
                $limit: 1
            },
        ])
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const getNewList = () => new Promise((resolve, reject) => {
    listModel
    listModel.aggregate(
        [
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy",
                },
            },
            {
                $project: {
                    name: 1,
                    moviesId: 1,
                    posterUri: 1,
                    view: 1,
                    createdAt: 1,
                    commentNum: { $size: "$comments" },
                    likeNum: { $size: "$like" },
                    createdBy: {
                        _id: 1,
                        username: 1
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            }, 
            {
                $limit: 6
            },
        ])
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const getTopUser = () => new Promise((resolve, reject) => {
    userModel
        .find()
        .sort({ like: -1, numberOfPost: -1 })
        .limit(10)
        .select("username like numberOfPost")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
})

const getDataForHome = () =>
    Promise.all([getRecommendedList(), getNewList(), getTopUser()]);


module.exports = {
    getListByUser,
    increasePostNumber,
    decreasePostNumber,
    getDataForHome
}