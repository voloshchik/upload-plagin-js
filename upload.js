function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export function upload(selector, options) {
  const input = document.querySelector(selector)

  const open = document.createElement('button')
  const preview = document.createElement('preview')

  preview.classList.add('preview')

  open.classList.add('btn')
  open.textContent = 'Открыть'
  input.insertAdjacentElement('afterend', preview)
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

    const files = Array.from(event.target.files)

    preview.innerHTML = ''
    files.forEach((file) => {
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
            <div class="preview-remove">&times</div>
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

  open.addEventListener('click', triggerInput)

  input.addEventListener('change', changeHandler)
}
