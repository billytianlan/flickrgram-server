let request = require('request');
let _ = require('underscore');
let Photo = require('../db/db').Photo
require('dotenv').config();

let connectFlickr = (key) => {

  let options = {
    'method': 'GET',
    'uri': 'https://api.flickr.com/services/rest/',
    'qs': {
      'method': 'flickr.interestingness.getList',
      'api_key': key,
      'format': 'json',
      'nojsoncallback': '1'
    }
  };

  request(options, (err, res, body) => {
    let photosArray = JSON.parse(body).photos.photo;
    _.each(photosArray, (photo) => {
      let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      Photo.findOrCreate({ 
        where: {
          flickr_id: photo.id,
          url: url,
          description: photo.title
        }
      })
      .spread((photo, created) => {
        if (created) {
          console.log('New photo added', photo.id);
        } else {
          console.log('We already have this photo');
        }
      })
    })
  });
}

connectFlickr(process.env.FLICKR_KEY)

