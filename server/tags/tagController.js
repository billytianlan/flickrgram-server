let Tag = require('../db/db').Tag

let findTags = (req, res) => {
  let query = req.query.query;
  Tag.findOne({
    where: {
      name: query
    }
  })
  .then((tag) => {
    if (tag) {
      tag.getPhotos()
      .then((photos) => {
        res.send(photos);
      })
    } else {
      res.end();
      console.log('cant find that tag');
    }
  })
}

module.exports = {
  findTags: findTags
}