let request = require('request');
let Photo = require('../photos/photoModel');
let Photos = require('../photos/photosCollection');
let Tag = require('../tags/tagModel');
let Tags = require('../tags/tagsCollection');
let _ = require('underscore');
require('dotenv').config();


console.log(process.env.CLARIFAI_KEY);
let connectClarifai = (key) => {
  Photo.fetchAll()
  .then((photos) => {
    photos = photos.slice()
    _.each(photos, function(photo) {
      console.log(photo.attributes);
      let options = {
        'method': 'GET',
        'url': 'https://api.clarifai.com/v1/tag/',
        'qs': {
          'url': photo.attributes.url
        },
        'headers': {
          'Authorization': `Bearer ${key}`
        }
      };
      request(options, (err, res, body) => {
        body = JSON.parse(body)
        let tagsArray = body.results[0].result.tag.classes;

        _.each(tagsArray, (tag) => {
          new Tag({
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