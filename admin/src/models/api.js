const HOST = 'http://localhost:3000'
const PREFIX  = HOST + '/api';
export default {
  classify: PREFIX + '/classify',
  classifyItem : (id) => `${PREFIX}/classify/${id}`,
  word: PREFIX + '/word',
  wordItem : (id) => `${PREFIX}/word/${id}`,
}