var path = require('path');
//knex is a SQL query builder
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : 'io',
    database : 'flickrgram'
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('photos').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos', function (photo) {
      photo.increments('id').primary();
      photo.string('flickr_id').unique();
      photo.string('url', 255);
      photo.string('description', 255);
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table Photos', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255).unique();
      user.string('password', 255)
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table Users', table);
    });
  }
});

db.knex.schema.hasTable('likes').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('likes', function (like) {
      like.increments('id').primary();
      like.integer('user_id').references('users.id');
      like.integer('photo_id').references('photos.id');
      like.timestamps();
    }).then(function (table) {
      console.log('Created Table Likes', table);
    });
  }
});

db.knex.schema.hasTable('tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('tags', function (tag) {
      tag.increments('id').primary();
      tag.string('name', 255).unique();
      tag.timestamps();
    }).then(function (table) {
      console.log('Created Table Tags', table);
    });
  }
});

db.knex.schema.hasTable('photos_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos_tags', function (photos_tags) {
      photos_tags.increments('id').primary();
      photos_tags.integer('photo_id')
      photos_tags.integer('tag_id')
      photos_tags.timestamps();
    }).then(function (table) {
      console.log('Created Table Photos Tags', table);
    });
  }
});

module.exports = db;
