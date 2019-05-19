const Base = require('./base.js');
const knex = require('./knex.js')

class Word extends Base {
  constructor(props = 'word') {
    super(props);
  }

  joinClassify(params={},pagination={}) {
    let page = pagination.page || 1;
    let limit = pagination.limit || 10;
    let offset = (page - 1) * limit;
    return knex('word')
      .leftJoin('classify', 'word.classify_id', '=', 'classify.id')
      .select('word.id', 'word.name', 'word.pronunciation', 'word.classify_id','word.display', 'word.description', {classify_name: 'classify.name'})
      .where(params)
      // .orderBy('id','desc')
      .orderBy('name','asc')
      .offset(offset)
      .limit(limit)
  }
}

module.exports = new Word()