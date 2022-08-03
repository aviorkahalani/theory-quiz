const alertPlaceholder = document.querySelector('#live-alert')

export const customAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('')

  alertPlaceholder.append(wrapper)

  // close automaticly
  setTimeout(() => {
    wrapper.innerHTML = ''
  }, 1000)

  // close manually
  document.querySelector('.btn-close').addEventListener('click', () => {
    wrapper.innerHTML = ''
  })
}
