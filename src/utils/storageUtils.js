
const setSync = function (key, data) {
  localStorage.setItem(key, data)
}

const getSync = function (key) {
  return localStorage.getItem(key)
}

const removeSync = function (key) {
  localStorage.removeItem(key)
}

const clearSync = function () {
  localStorage.clear()
}

export default {
  set: setSync,
  get: getSync,
  remove: removeSync,
  clear: clearSync
}
