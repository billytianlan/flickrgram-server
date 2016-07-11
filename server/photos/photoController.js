let Photo = require('./photoModel');
let Photos = require('./photosCollection');

let getAllPhotos = (req, res) => {
  console.log('inside the photo controller');
  Photos.fetch()
    .then((photos) => {
      photos = photos.slice(0, 10)
      res.send(photos);
    })
}

module.exports = {
  getAllPhotos: getAllPhotos
}