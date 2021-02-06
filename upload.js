console.log('upload.js')

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
        console.log(e.target.result)
        const src = e.target.result
        preview.insertAdjacentHTML(
          'afterbegin',
          `<div class="preview-image">
         <img src="${src}"/>
       </div>`
        )
      }

      reader.readAsDataURL(file)
    })
  }

  open.addEventListener('click', triggerInput)

  input.addEventListener('change', changeHandler)
}
