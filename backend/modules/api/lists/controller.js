const listModel = require("./model");
const commonController = require("../commonController");
const createList = body =>
  new Promise((resolve, reject) => {
    listModel
      .create({
        createdBy: body.createdBy,
        moviesId: body.moviesId,
        posterUri: body.posterUri,
        name: body.name,
      })
      .then(data => commonController.increasePostNumber(data))
      .then(data => resolve(data))
      .catch(err => reject(err));
  });


const deleteList = ({ id, uid }) =>
  new Promise((resolve, reject) => {
    listModel
      .findOne({ _id: id, createdBy: uid })
      .then(data => commonController.decreasePostNumber(data.createdBy))
      .then(data => listModel.findOneAndRemove({ _id: id, createdBy: uid }))
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const updateList = (body) =>
  new Promise((resolve, reject) => {
    listModel.updateOne(
      { _id: body.id, createdBy: body.uid },
      {
        moviesId: body.moviesId,
        posterUri: body.posterUri,
        name: body.name,
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getPagingList = (page) =>
  new Promise((resolve, reject) => {
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
          $sort: {createdAt : -1}
        },
        {
          $skip: ((page - 1) * 10),
        },
        {
          $limit: 10
        },
      ])
      .then(doc =>
        listModel.find().countDocuments().then(
          data => {
            resolve(Object.assign({}, doc, { listSize: data }));
          }
        ))
      .catch(err => reject(err));
  });

const getListDetails = id =>
  new Promise((resolve, reject) => {
    listModel.update(
      {
        _id: id
      }, {
        $inc: { view: 1 }
      }
    )
      .then(data => {
        listModel.findOne({ _id: id })
          .select("name moviesId posterUri like view createdBy comments")
          .populate("createdBy", "username _id")
          .then(data => resolve(data))
      })
      .catch(err => reject(data));
  });

const reactList = ({ id, uid }) =>
  new Promise((resolve, reject) => {
    listModel.findOne(
      {
        _id: id, like: { $elemMatch: { createdBy: uid } }
      }
    ).then(data => {
      if (!data) {
        listModel
          .updateOne({
            _id: id
          }, {
              $push: {
                like: {
                  createdBy: uid,
                },
                $inc: {
                  view: 1
                }
              }
            }).then(data => resolve(data))
      } else {
        listModel
          .updateOne({
            _id: id
          }, {
              $pull: {
                like: {
                  createdBy: uid,
                },
                $inc: {
                  view: 1
                }
              }
            }).then(data => resolve(data))
      }
    }
    )
      .catch(err => reject(err))
  });

const comment = ({ id, uid, content }) =>
  new Promise((resolve, reject) => {
    listModel.update(
      {
        _id: id
      },
      {
        $push: {
          comments: { createdBy: uid, content }
        }
      }
    )
      .then(data => resolve(data))
      .catch(err => reject(err))
  });

const deleteComment = ({ id, uid, commentId }) => new Promise((resolve, reject) => {
  listModel.update(
    {
      _id: id
    },
    {
      $pull: {
        comments: { createdBy: uid, _id: commentId }
      }
    }
  )
    .then(data => resolve(data))
    .catch(err => reject(err))
});


const getTop10List = () =>
  new Promise((resolve, reject) => {
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
          $sort: { likeNum: -1, view: -1, createdAt: -1 }
        }, {
          $limit: 10
        },
      ])
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getDataForHome = () => {
  return commonController.getDataForHome();
}





module.exports = {
  createList,
  getPagingList,
  getTop10List,
  getListDetails,
  reactList,
  comment,
  deleteComment,
  deleteList,
  updateList,
  getDataForHome
}
