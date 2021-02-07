function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)
  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content
  }
  return node
}

export function upload(selector, options) {
  let files = []
  const input = document.querySelector(selector)

  const preview = element('div', ['preview'])

  // const preview = document.createElement('div')

  // preview.classList.add('preview')

  const open = element('button', ['btn'], 'Открыть')

  const upload = element('button', ['btn', 'primary'], 'Загрузить')
  upload.style.display = 'none'
  // const open = document.createElement('button')
  // open.classList.add('btn')
  // open.textContent = 'Открыть'

  input.insertAdjacentElement('afterend', preview)
  input.insertAdjacentElement('afterend', upload)

  input.insertAdjacentElement('afterend', open)

  if (options.mult) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  const triggerInput = () => input.click()
  const changeHandler = (event) => {
    if (!event.target.files) {
      return
    }

    files = Array.from(event.target.files)

    upload.style.display = 'inline'
    preview.innerHTML = ''
    files.forEach((file, i) => {
      // console.log(file)
      if (!file.type.match('image')) {
        return
      }
      const reader = new FileReader()

      reader.onload = (e) => {
        const src = e.target.result
        console.log(bytesToSize(file.size))
        preview.insertAdjacentHTML(
          'afterbegin',
          `<div class="preview-image">
            <div class="preview-remove" data-name="${file.name}">&times</div>
            <img src="${src}"/>
            <div class="preview-info">
              <span>${file.name}</span>
              ${bytesToSize(file.size)}
             
            </div>
          </div>`
        )
      }

      reader.readAsDataURL(file)
    })
  }

  const uploadHandler = () => {
    console.log('uploadHadler')
  }

  const removeHandler = (e) => {
    if (!e.target.dataset.name) {
      return
    }
    const id = e.target.dataset.name

    files = files.filter((file) => {
      return file.name !== id
    })

    if (!files.length) {
      upload.style.display = 'none'
    }
    let block = document.querySelector(`[data-name="${id}"]`).closest('.preview-image')

    block.classList.add('removing')

    setTimeout(() => block.remove(), 500)
  }

  open.addEventListener('click', triggerInput)

  input.addEventListener('change', changeHandler)

  preview.addEventListener('click', removeHandler)
  upload.addEventListener('click', uploadHandler)
}
