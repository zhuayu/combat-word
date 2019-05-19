const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')
const classifyController = require('./../controllers/classify.js')
const wordController = require('./../controllers/word.js')
const collectionController = require('./../controllers/collection.js')

router.get('/test', testController.test)
router.post('/login', userController.login)
router.get('/classify' , classifyController.list);
router.get('/classify/:id' , classifyController.show);
router.put('/classify/:id' , classifyController.update);
router.post('/classify' , classifyController.insert);
router.delete('/classify/:id' , classifyController.delete);
router.get('/word' , wordController.list);
router.get('/word/:id' , wordController.show);
router.put('/word/:id' , wordController.update);
router.post('/word', wordController.insert);
router.delete('/word/:id', wordController.delete);
router.get('/collection', collectionController.list);
router.post('/collection/:id', collectionController.insert);
router.delete('/collection/:id' , collectionController.delete);

module.exports = router