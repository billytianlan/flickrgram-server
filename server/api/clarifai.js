let request = require('request');
let Photo = require('../db/db').Photo
let Tag = require('../db/db').Tag
let _ = require('underscore');
require('dotenv').config();


let connectClarifai = (key, photo) => {
  let options = {
    'method': 'GET',
    'url': 'https://api.clarifai.com/v1/tag/',
    'qs': {
      'url': photo.get('url')
    },
    'headers': {
      'Authorization': `Bearer ${key}`
    }
  };
  request(options, (err, res, body) => {
    body = JSON.parse(body)
    let tagsArray = body.results[0].result.tag.classes;

    _.each(tagsArray, (tag) => {
      Tag.findOrCreate({
        where: {
          name: tag
        }
      })
      .spread((newTag, created) => {
        console.log('crated new tag:', tag)
        console.log('photo');
        newTag.addPhoto(photo);
      })
    })
  })
}

module.exports = {
  connectClarifai: connectClarifai
}

