let request = require('request');
let Photo = require('../db/db').Photo
let Tag = require('../db/db').Tag
let _ = require('underscore');
require('dotenv').config();


console.log(process.env.CLARIFAI_KEY);
let connectClarifai = (key) => {
  Photo.findAll()
  .then((photos) => {
    _.each(photos, function(photo) {
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
            name: tag
          })
          .fetch()
          .then((found) => {
            if (!found) {
              new Tag({ name: tag }).save()
              .then((newTag) => {
                console.log('crated new tag:', tag)
                return newTag.photos().attach(photo.id)
              })
            } else {
              console.log('we already have this tag');
            }
          })
          .catch((err) => {
            throw err;
          })
        })
      })
    })
  })
  .catch((err) => {
    throw err;
  })
}

connectClarifai(process.env.CLARIFAI_KEY)