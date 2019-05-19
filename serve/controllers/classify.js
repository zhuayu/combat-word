const Classify = require('./../models/classify.js');
const Word = require('./../models/word.js');

const classifyController = {
  insert: async function(ctx,next){
    let name = ctx.request.body.name;
    let image = ctx.request.body.image;
    let status = ctx.request.body.status;
    let description = ctx.request.body.description;

    if(!name || !image || !description){
      ctx.state.data.message =  '缺少必要参数';
      return
    }

    const classify = await Classify.insert({ name, image, description, status });
    ctx.state.code = 200;
    ctx.state.data.id =  classify[0];
  },
  show: async function(ctx,next){
    let id = ctx.params.id;
    const classifys = await Classify.select({id});
    ctx.state.code = 200;
    ctx.state.data.classify =  classifys[0];
  },
  list: async function(ctx,next){
    let status = ctx.request.query.status;
    let params = {}
    if(status){
      params.status = status
    }
    const classifys = await Classify.select(params);
    ctx.state.code = 200;
    ctx.state.data.classifys =  classifys;
  },
  update: async function(ctx,next) {
    let id = ctx.params.id;
    let name = ctx.request.body.name;
    let image = ctx.request.body.image;
    let status = ctx.request.body.status;
    let description = ctx.request.body.description;
    
    if(!name || !image || !description){
      ctx.state.data.message =  '缺少必要参数';
      return
    }

    const classify = await Classify.update( id ,{  name, image, description, status });
    ctx.state.code = 200;
    ctx.state.data.message =  'success';
  },
  delete: async function(ctx,next){
    let id = ctx.params.id;
    await Classify.delete(id);
    await Word.select({classify_id: id}).update('classify_id', null);
    ctx.state.code = 200;
    ctx.state.data.message =  'success';
  }
}

module.exports = classifyController;