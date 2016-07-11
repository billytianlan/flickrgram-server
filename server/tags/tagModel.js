let db = require('../db/db.js');
let Photos = require('../photos/photoModel.js');

let Tag = db.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  tags: () => {this.belongsToMany(Photos)}
})

module.exports = Tag;
