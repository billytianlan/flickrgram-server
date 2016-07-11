var db = require('../db/db');
var Photo = require('./photoModel');

var Photos = new db.Collection();

Photos.model = Photo;

module.exports = Photos;
