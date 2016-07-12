let Photo = require('../db/db').Photo

let getAllPhotos = (req, res) => {
  console.log('inside the photo controller');
  Photo.findAll({ 
    limit: 20,
    order: 'createdAt DESC'
  })
  .then((photos) => {
    res.send(photos);
  })
}

module.exports = {
  getAllPhotos: getAllPhotos
}