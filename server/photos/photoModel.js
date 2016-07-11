let db = require('../db/db.js');
let Likes = require('../likes/likeModel.js');
let Tags = require('../tags/tagModel.js');

let Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  likes: () => {this.hasMany(Likes)},
  tags: () => {this.belongsToMany(Tags)}
})

module.exports = Photo;
