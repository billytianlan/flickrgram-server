var photosController = require('../photos/photoController');
var tagsController = require('../tags/tagController');

var router = (app) => {
  app.get('/api/photos', photosController.getAllPhotos)
  app.get('/api/photos/map',  photosController.getMapPhotos)
  app.get('/api/tags', tagsController.findTags)
}

module.exports = {
  router: router
};
