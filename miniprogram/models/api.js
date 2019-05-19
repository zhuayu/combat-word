const PREFIX  = 'http://localhost:3000/api';
export default {
  login: PREFIX + '/login',
  classify: PREFIX + '/classify',
  classifyItem: (id) => `${PREFIX}/classify/${id}`,
  word: PREFIX + '/word',
  wordItem: (id) => `${PREFIX}/word/${id}`,
  collection: PREFIX + '/collection',
  collectionItem: (id) => `${PREFIX}/collection/${id}`,
}