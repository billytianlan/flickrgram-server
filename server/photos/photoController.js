var Photo = require('./photoModel.js');

var getAllPhotos = (req, res) => {
  console.log('inside the photo controller');
  res.status(200).send();
}

module.exports = {
  getAllPhotos: getAllPhotos
}