export const utilService = {
  getRandomInt,
  makeId,
  debounce,
  loadFromStorage,
  saveToStorage,
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function makeId(length = 20) {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substring(2, 9)
}

function debounce(func, wait = 1000) {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function loadFromStorage(key) {
  const val = localStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

function saveToStorage(key, val) {
  localStorage[key] = JSON.stringify(val)
}
