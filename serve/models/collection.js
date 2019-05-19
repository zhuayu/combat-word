const Base = require('./base.js');
const knex = require('./knex.js')

class Collection extends Base {
  constructor(props = 'collection') {
    super(props);
  }

  joinWord(params={}, pagination={}) {
    let page = pagination.page || 1;
    let limit = pagination.limit || 10;
    let offset = (page - 1) * limit;
    return knex('collection')
      .leftJoin('word', 'word.id', '=', 'collection.word_id')
      .select()
      .where(params)
      .orderBy('name','asc')
      .offset(offset)
      .limit(limit)
  }
}

module.exports = new Collection()