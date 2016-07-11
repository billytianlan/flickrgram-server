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
      photo.string('url', 255);
      photo.string('description', 255);
      photo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
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
      console.log('Created Table', table);
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
      console.log('Created Table', table);
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
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('photos_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos_tags', function (table) {
      table.increments('id').primary();
      table.integer('photo_id').references('photos.id');
      table.integer('tag_id').references('tags.id');
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
