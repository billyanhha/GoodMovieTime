const listModel = require("./model");

const createList = body =>
  new Promise((resolve, reject) => {
    listModel
      .create({
        moviesId: body.moviesId,
        posterUri: body.posterUri,
        name: body.name,
        original_language: body.original_language
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getlistCount = () =>
  new Promise((resolve, reject) => {
    listModel
      .find()
      .then(data => resolve({ count: data.length }))
      .catch(err => reject(err));
  });

const getAllListWithPage = page =>
  new Promise((resolve, reject) => {
    listModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .select("_id like moviesId posterUri name original_language")
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getTop10List = () =>
  new Promise((resolve, reject) => {
    listModel
      .find()
      .sort({ like: -1, createdAt: -1 })
      .limit(10)
      .select("_id  moviesId posterUri name like original_language")
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getDatalistById = id =>
  new Promise((resolve, reject) => {
    listModel
      .findOne({ _id: id })
      .select("_id like moviesId posterUri name original_language createdAt")
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(data));
  });

const increaseLike = (id) =>
  new Promise((resolve, reject) => {
    listModel
      .update({ _id: id }, { $inc: { like: 1 } })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

module.exports = {
  createList,
  getlistCount,
  getAllListWithPage,
  getTop10List,
  getDatalistById,
  increaseLike
};
