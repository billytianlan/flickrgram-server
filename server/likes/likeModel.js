let db = require('../db/db.js');
let Photo = require('../photos/photoModel.js');
let User = require('../users/userModel.js');

let Like = db.Model.extend({
  tableName: 'likes',
  hasTimestamps: true,
  photo: () => {this.belongsTo(Photo)},
  user: () => {this.belongsTo(User)}
})

module.exports = Like;