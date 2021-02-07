import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from './upload'

const firebaseConfig = {
  apiKey: 'AIzaSyChsaZ6kIG9Qy2sX8pJVkujcCKfT_6yzG0',
  authDomain: 'fe-upload-plagin.firebaseapp.com',
  projectId: 'fe-upload-plagin',
  storageBucket: 'fe-upload-plagin.appspot.com',
  messagingSenderId: '320743912596',
  appId: '1:320743912596:web:eec2a9855759bbef73f081',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
  mult: true,
  accept: ['.jpg', '.png', '.jpeg', '.img'],
  onUpload(files, blocks) {
    console.log('files', files)
    files.forEach((file, index) => {
      const ref = storage.ref(`/image/${file.name}`)
      const task = ref.put(file)
      task.on(
        'state_change',
        (snapshot) => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
          const block = blocks[index].querySelector('.preview-info-progress')
          block.textContent = percentage
          block.style.width = percentage
        },
        (error) => {
          console.log(error)
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url)
          })
        }
      )
    })
  },
})
