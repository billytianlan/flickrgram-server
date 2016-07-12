let Photo = require('../db/db').Photo;
let request = require('request');
let _ = require('underscore');
require('dotenv').config();

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

let getMapPhotos = (req, response) => {
  let lat = req.query.lat;
  let lon = req.query.lon
  console.log(lat)
  console.log(lon)
  let options = {
    'method': 'GET',
    'uri': 'https://api.flickr.com/services/rest/',
    'qs': {
      'method': 'flickr.photos.search',
      'api_key': process.env.FLICKR_KEY,
      'per_page': '20',
      'lat': lat,
      'lon': lon,
      'format': 'json',
      'nojsoncallback': '1'
    }
  };
  request(options, (err, res, body) => {
    let photosArray = JSON.parse(body).photos.photo;
    let respObj = _.map(photosArray, (photo) => {
      let photoObj = {
        'url': `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        'description': photo.title,
        'id': photo.id
      }
      return photoObj;
    })
    response.send(respObj);
  })
}

module.exports = {
  getAllPhotos: getAllPhotos,
  getMapPhotos: getMapPhotos
}