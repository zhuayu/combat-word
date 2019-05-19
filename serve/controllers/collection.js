const Collection = require('./../models/collection.js');


const collectionController = {
  list: async function(ctx, next) {
    let user_id = ctx.state.user_id;
    let page = ctx.request.query.page || 1;
    let limit = ctx.request.query.limit || 20;
    let params = { user_id };
    let pagination = { page, limit };

    // const getCount = await Collection.count(params);
    const getCount = await Collection.knex().where(params).count('user_id as sum');
    let count = getCount[0].sum;
    const words = await Collection.joinWord(params, pagination);

    ctx.state.code = 200;
    ctx.state.data.words =  words;
    ctx.state.data.pagination = {};
    ctx.state.data.pagination.total = Number(count);
    ctx.state.data.pagination.pageSize = Number(limit);
    ctx.state.data.pagination.page = Number(page);
  },
  insert: async function(ctx,next){
    let word_id = ctx.params.id;
    let user_id = ctx.state.user_id;

    if(!user_id || !word_id){
      ctx.state.data.message =  '缺少必要参数';
      return
    }

    let collect = await Collection.knex().where({ user_id, word_id });
    if(collect[0]){
      ctx.state.data.message =  '已收藏';
      return
    }

    await Collection.insert({ user_id, word_id });
    ctx.state.code = 200;
    ctx.state.data.message =  'scuess';
  },
  delete: async function(ctx,next){
    let word_id = ctx.params.id;
    let user_id = ctx.state.user_id;
    if(!user_id || !word_id){
      ctx.state.data.message =  '缺少必要参数';
      return
    }
    await Collection.knex().where({word_id, user_id }).del();
    ctx.state.code = 200;
    ctx.state.data.message =  'success';
  }
}

module.exports = collectionController;