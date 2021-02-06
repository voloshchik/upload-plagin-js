console.log('upload.js')

export function upload(selector, options) {
  const input = document.querySelector(selector)

  const open = document.createElement('button')
  open.classList.add('btn')
  open.textContent = 'Открыть'
  input.insertAdjacentElement('afterend', open)

  if (options.mult) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  const triggerInput = () => input.click()
  const changeHandler = (event) => {
    console.log('event', event.target.files)
  }

  open.addEventListener('click', triggerInput)

  input.addEventListener('change', changeHandler)
}
