// let Photo = require('./photoModel');
// let Photos = require('./photosCollection');
let Photo = require('../db/db').Photo

let getAllPhotos = (req, res) => {
  console.log('inside the photo controller');
  Photo.findAll()
    .then((photos) => {
      photos = photos.slice(0, 10)
      res.send(photos);
    })
}

module.exports = {
  getAllPhotos: getAllPhotos
}