let Sequelize = require('sequelize');
let db = new Sequelize('flickrgram', 'root', 'io', {
  host: 'localhost',
  dialect: 'mysql'
});

let Photo = db.define('photo', {
  flickr_id: Sequelize.STRING,
  url: Sequelize.STRING,
  description: Sequelize.STRING
});

let User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

let Like = db.define('like', {
});

Like.belongsTo(User);
Like.belongsTo(Photo);

let Tag = db.define('tag', {
  name: Sequelize.STRING
});

let PhotoTag = db.define('photo_tag', {
})

Photo.belongsToMany(Tag, { through: PhotoTag });
Tag.belongsToMany(Photo, { through: PhotoTag });

Photo.sync();
User.sync();
Like.sync();
Tag.sync();
PhotoTag.sync();

exports.Photo = Photo;
exports.User = User;
exports.Like = Like;
exports.Tag = Tag;
exports.PhotoTag = PhotoTag;

