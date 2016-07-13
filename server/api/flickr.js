let request = require('request');
let _ = require('underscore');
let Photo = require('../db/db').Photo
let clarifai = require('./clarifai');
require('dotenv').config();

let connectFlickr = (options) => {

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
          clarifai.connectClarifai(process.env.CLARIFAI_KEY, photo)
          console.log('New photo added', photo.id);
        } else {
          console.log('We already have this photo');
        }
      })
    })
  });
}

let options = {
  'method': 'GET',
  'uri': 'https://api.flickr.com/services/rest/',
  'qs': {
    'method': 'flickr.interestingness.getList',
    'api_key': process.env.FLICKR_KEY,
    'per_page': '200',
    'format': 'json',
    'nojsoncallback': '1'
  }
};

connectFlickr(options)

