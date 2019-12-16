const getCookie = function (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg)) && arr[2] !== '') {
    return unescape(arr[2])
  } else {
    return null
  }
}
const setCookie = function (name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}
const deleteCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1)
  document.cookie = name + '=;expires=' + exp.toGMTString();
}

export default {
  getCookie,
  setCookie,
  deleteCookie
}
