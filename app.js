import { upload } from './upload'

console.log('working')

upload('#file', {
  mult: true,
  accept: ['.jpg', '.png', 'jpeg', 'img'],
})
