import Classify from '@/pages/Classify'
import Word from '@/pages/Word'

export default [
  {
    path: '/',
    redirect: { name: 'Classify' }
  },
  {
    path: '/admin/classify',
    name: 'Classify',
    component: Classify
  },
  {
    path: '/admin/word',
    name: 'Word',
    component: Word
  },
]