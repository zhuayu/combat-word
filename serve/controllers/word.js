const Word = require('./../models/word.js');
const Collection = require('./../models/collection.js');

const wordController = {
  insert: async function(ctx, next){
    let name = ctx.request.body.name;
    let pronunciation = ctx.request.body.pronunciation;
    let display = ctx.request.body.display;
    let description = ctx.request.body.description;
    let classify_id = ctx.request.body.classify_id;

    if(!name || !pronunciation || !display || !description || !classify_id){
      ctx.state.data.message =  '缺少必要参数';
      return
    }

    const words = await Word.insert({ name, pronunciation, display, description, classify_id });
    ctx.state.code = 200;
    ctx.state.data.id =  words[0];
  },
  list: async function(ctx, next){
    let page = ctx.request.query.page || 1;
    let limit = ctx.request.query.limit || 20;
    let classify_id = ctx.request.query.classify_id;
    let params = {};

    let pagination = { page, limit };
    if(classify_id){
      params.classify_id = classify_id
    }

    const getCount = await Word.count(params);
    let count = getCount[0].sum;
    const words = await Word.joinClassify(params, pagination);

    let user_id = ctx.state.user_id;
    if(user_id){
      let words_ids = words.map(data => data.id);
      let collections = await Collection.knex()
        .whereIn('word_id', words_ids)
        .andWhere('user_id', user_id)
        .select()

      if(collections.length){
        collections = collections.map(data => data.word_id);
        words.forEach(data => {
          if(collections.includes(data.id)){
            data.collection = true
          }
        })
      }
    }

    pagination.total = count;
    ctx.state.code = 200;
    ctx.state.data.words =  words;
    ctx.state.data.pagination = {};
    ctx.state.data.pagination.total = Number(count);
    ctx.state.data.pagination.pageSize = Number(limit);
    ctx.state.data.pagination.page = Number(page);
  },
  show: async function(ctx, next){
    let id = ctx.params.id;
    const words = await Word.select({ id });
    ctx.state.code = 200;
    ctx.state.data.word =  words[0];
  },
  update: async function(ctx, next) {
    let id = ctx.params.id;
    let name = ctx.request.body.name;
    let pronunciation = ctx.request.body.pronunciation;
    let display = ctx.request.body.display;
    let description = ctx.request.body.description;
    let classify_id = ctx.request.body.classify_id;

    if(!name || !pronunciation || !display || !description || !classify_id){
      ctx.state.data.message =  '缺少必要参数';
      return
    }
    
    await Word.update( id ,{  name, pronunciation, display, description, classify_id });
    ctx.state.code = 200;
    ctx.state.data.message =  'success';
  },
  delete: async function(ctx, next){
    let id = ctx.params.id;
    await Word.delete(id);
    await Collection.knex().where({ word_id: id }).del();
    ctx.state.code = 200;
    ctx.state.data.message =  'success';
  }
}

module.exports = wordController;