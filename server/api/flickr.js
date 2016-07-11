let request = require('request');
let Photo = require('../photos/photoModel');
let Photos = require('../photos/photosCollection');
let _ = require('underscore');
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
      new Photo({
        flickr_id: photo.id
      })
      .fetch()
      .then((model) => {
        if (!model) {
          Photos.create({
            flickr_id: photo.id,
            url: url,
            description: photo.title,
          })
          .then((newPhoto) => {
            console.log('saved new photo', newPhoto.id);
          })
        } else {
          console.log('We already have this photo');
        }
      })
    })
  });
}

connectFlickr(process.env.FLICKR_KEY)

