(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("TargetObservers", [], f);
    } else if ("object" == typeof exports) {
      exports["TargetObservers"] = f();
    } else {
      g["TargetObservers"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/ProcessingTarget.ts
var ProcessingTarget_exports = {};
__export(ProcessingTarget_exports, {
  ProcessingTarget: () => ProcessingTarget,
  ProcessingTargetEvent: () => ProcessingTargetEvent
});
module.exports = __toCommonJS(ProcessingTarget_exports);

// node_modules/@catsums/my/lib/esm/MyHelperFunctions.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function cout(...vars) {
  console.log(...vars);
}
__name(cout, "cout");
__name2(cout, "cout");
function clog(...x) {
  console.log(...x);
}
__name(clog, "clog");
__name2(clog, "clog");
try {
  if (typeof Storage !== "undefined") {
    Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
    };
    Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
    };
  }
} catch (err) {
  console.debug(err);
}
Array.prototype.midCeil = function() {
  return this[Math.ceil(this.length / 2)];
};
Array.prototype.midFloor = function() {
  return this[Math.floor(this.length / 2)];
};
Array.prototype.midRound = function() {
  return this[Math.round(this.length / 2)];
};
Array.prototype.last = function() {
  return this[this.length - 1];
};
Array.prototype.first = function() {
  return this[0];
};
Array.prototype.removeAt = function(index) {
  return this.splice(index, 1);
};
Array.prototype.removeItem = function(item) {
  let ind = this.indexOf(item);
  return this.splice(ind, 1) > 0;
};
BigInt.prototype.toJSON = function() {
  return this.toString();
};
Number.prototype.mod = function(n) {
  return (this % n + n) % n;
};
function mod(n, m) {
  return (n % m + m) % m;
}
__name(mod, "mod");
__name2(mod, "mod");
function isInfinity(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity, "isInfinity");
__name2(isInfinity, "isInfinity");
function safeDivide(a, b, useNaN = false) {
  let INF = Infinity;
  let res;
  if (a == 0 && b == 0) {
    if (useNaN)
      res = NaN;
    else
      res = 0;
  } else if (a == 0 && isInfinity(b)) {
    res = 0 * 1;
  } else if (isInfinity(a) && b == 0) {
    res = a * 1;
  } else if (isInfinity(a) && isInfinity(b)) {
    if (useNaN)
      res = NaN;
    else if (a == b)
      res = 1;
    else
      res = -1;
  } else if (b == 0) {
    if (useNaN)
      res = NaN;
    res = INF * a;
  } else if (isInfinity(b)) {
    if (useNaN)
      res = NaN;
    res = 0 * a;
  } else {
    res = a / b;
  }
  return res;
}
__name(safeDivide, "safeDivide");
__name2(safeDivide, "safeDivide");
function getAverageFrom(arr) {
  if (!isArray(arr))
    return null;
  if (!arr.length)
    return 0;
  let sum = arr.reduce((_sum, x) => {
    return _sum + x;
  }, 0);
  return sum / arr.length;
}
__name(getAverageFrom, "getAverageFrom");
__name2(getAverageFrom, "getAverageFrom");
function getCSSValueInPixels(str) {
  let num = 0;
  let val = parseFloat(str);
  let unit = str.replace(`${val}`, "").trim();
  switch (unit) {
    case "in":
      num = val * 96;
      break;
    case "cm":
      num = val / 2.54 * 96;
      break;
    case "mm":
      num = val / 100 / 2.54 * 96;
      break;
    case "pt":
      num = val * 72 * 96;
      break;
    case "pc":
      num = val * 12 * 72 * 96;
      break;
    default:
      num = val;
      break;
  }
  return num;
}
__name(getCSSValueInPixels, "getCSSValueInPixels");
__name2(getCSSValueInPixels, "getCSSValueInPixels");
function loadHTMLtoObject(query, url) {
  document.querySelector(query)?.setAttribute("data", url);
}
__name(loadHTMLtoObject, "loadHTMLtoObject");
__name2(loadHTMLtoObject, "loadHTMLtoObject");
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
__name(docReady, "docReady");
__name2(docReady, "docReady");
var footstrapMediaQueries = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px"
};
function forMediaQuery(mediaQuery, matchFunc, unmatchFunc) {
  let match = window.matchMedia(mediaQuery);
  if (match.matches) {
    matchFunc();
  } else {
    unmatchFunc();
  }
}
__name(forMediaQuery, "forMediaQuery");
__name2(forMediaQuery, "forMediaQuery");
function checkBootstrapMedia() {
  let qVals = Object.values(footstrapMediaQueries);
  for (var c = qVals.length - 1; c >= 0; c--) {
    let qVal = qVals[c];
    let match = window.matchMedia(`(max-width: ${qVal})`);
    if (match.matches)
      return qVal;
  }
  return "xs";
}
__name(checkBootstrapMedia, "checkBootstrapMedia");
__name2(checkBootstrapMedia, "checkBootstrapMedia");
function getFormData(query) {
  let formElement;
  if (typeof query === "string")
    formElement = document.querySelector(query);
  else if (query instanceof HTMLFormElement)
    formElement = query;
  else
    return null;
  let formData = new FormData(formElement);
  return formData;
}
__name(getFormData, "getFormData");
__name2(getFormData, "getFormData");
function submitForm(query, callback, url) {
  let formElement = document.querySelector(query);
  let formData = new FormData(formElement);
  let methodType = formElement.getAttribute("method");
  ajax(formData, url, methodType, callback);
}
__name(submitForm, "submitForm");
__name2(submitForm, "submitForm");
var defectForm = /* @__PURE__ */ __name2(function(e) {
  e.preventDefault();
  console.debug("Submit has been defected. Please use JS to override form submit");
}, "defectForm");
function defectAllFormSubmits() {
  let allForms = document.getElementsByTagName("form");
  for (var form of allForms) {
    form.submit = () => {
    };
    form.addEventListener("submit", defectForm);
  }
}
__name(defectAllFormSubmits, "defectAllFormSubmits");
__name2(defectAllFormSubmits, "defectAllFormSubmits");
function formDataToJSON(formData, stringify = false) {
  let object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  if (stringify)
    return JSON.stringify(object);
  return object;
}
__name(formDataToJSON, "formDataToJSON");
__name2(formDataToJSON, "formDataToJSON");
async function getBase64(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = () => {
      return res(reader.result);
    };
    reader.onerror = (err) => {
      rej(err);
    };
    reader.readAsDataURL(file);
  });
}
__name(getBase64, "getBase64");
__name2(getBase64, "getBase64");
function ajax(data, url = "", type = "POST", success = function(x) {
}, fail = function(x) {
}) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      console.debug("STATUS:" + req.status);
      if (req.status >= 200 && req.status < 300) {
        success(req.responseText);
      } else if (req.status >= 300) {
        fail(req.responseText);
      } else {
        console.log(req.responseText);
      }
    } else {
    }
  };
  req.open(type, url, true);
  if (type.toUpperCase() == "POST") {
    req.send(data);
  } else {
    req.send();
  }
}
__name(ajax, "ajax");
__name2(ajax, "ajax");
function ajaxGET(url, callback, failback = function(x) {
}) {
  ajax("", url, "GET", callback, failback);
}
__name(ajaxGET, "ajaxGET");
__name2(ajaxGET, "ajaxGET");
function ajaxPOST(data, url, callback, failback = function(x) {
}) {
  ajax(data, url, "POST", callback, failback);
}
__name(ajaxPOST, "ajaxPOST");
__name2(ajaxPOST, "ajaxPOST");
function getFileBlob(url, type = "", callback = (uurl, bblob, bbytes) => {
}) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";
  oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response;
    var byteArray = new Uint8Array(arrayBuffer);
    var _blob = new Blob([arrayBuffer], { type });
    var _url = URL.createObjectURL(_blob);
    callback(_url, _blob, byteArray);
  };
  oReq.send();
}
__name(getFileBlob, "getFileBlob");
__name2(getFileBlob, "getFileBlob");
function processAjaxData(contentElement, urlPath = "", response = null, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    if (contentElement)
      contentElement.innerHTML = response.html;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.pushState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(processAjaxData, "processAjaxData");
__name2(processAjaxData, "processAjaxData");
function setHistoryState(urlPath = "", response, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.replaceState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(setHistoryState, "setHistoryState");
__name2(setHistoryState, "setHistoryState");
function pushHistoryState(urlPath = "", response, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.pushState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(pushHistoryState, "pushHistoryState");
__name2(pushHistoryState, "pushHistoryState");
function objectToURLParams(obj) {
  var parts = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  return "?" + parts.join("&");
}
__name(objectToURLParams, "objectToURLParams");
__name2(objectToURLParams, "objectToURLParams");
function parseURLParams(url, typecast = false, autoParseObjects = false) {
  var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#") + 1 || url.length + 1, query = url.slice(queryStart, queryEnd - 1), pairs = query.replace(/\+/g, " ").split("&"), params = {}, i, n, v, nv, nx;
  if (query === url || query === "")
    return null;
  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);
    nx = null;
    if (typecast) {
      if (autoParseObjects) {
        if (n.includes("[")) {
          if (n.includes("[]")) {
            n = n.replace("[]", "");
            if (!params.hasOwnProperty(n))
              params[n] = [];
          } else if (n.includes("]")) {
            var nn = n.split("[", 2);
            n = nn[0];
            nx = nn[1].replace("]", "");
            if (!params.hasOwnProperty(n))
              params[n] = {};
            params[n][nx] = null;
          }
        }
      }
      if (!isNaN(v))
        v = Number(v);
      else {
        v = v === "true" || (v === "false" ? false : v);
        v = v === "undefined" ? void 0 : v === "null" ? null : v;
      }
    }
    if (!params.hasOwnProperty(n)) {
      params[n] = v;
    } else {
      if (typeof params[n] !== "object") {
        params[n] = [params[n]];
      } else if (params[n] instanceof Array)
        params[n].push(nv.length === 2 ? v : null);
      else if (nx != null)
        params[n][nx] = v;
    }
  }
  return params;
}
__name(parseURLParams, "parseURLParams");
__name2(parseURLParams, "parseURLParams");
function checkCookie(cname) {
  let cookey = getCookie(cname);
  if (cookey != "")
    return true;
  return false;
}
__name(checkCookie, "checkCookie");
__name2(checkCookie, "checkCookie");
function setCookie(cname, cvalue, exdays = 1) {
  let d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}
__name(setCookie, "setCookie");
__name2(setCookie, "setCookie");
function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
__name(deleteCookie, "deleteCookie");
__name2(deleteCookie, "deleteCookie");
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
__name(getCookie, "getCookie");
__name2(getCookie, "getCookie");
function isInt(val) {
  return isNumber(val) && Math.trunc(val) === val;
}
__name(isInt, "isInt");
__name2(isInt, "isInt");
function isNumber(val) {
  return !isNaN(Number(val));
}
__name(isNumber, "isNumber");
__name2(isNumber, "isNumber");
function isArray(arr) {
  return typeof arr === "object" && arr instanceof Array;
}
__name(isArray, "isArray");
__name2(isArray, "isArray");
function isString(str) {
  return typeof str === "string";
}
__name(isString, "isString");
__name2(isString, "isString");
function isFunction(func) {
  return typeof func === "function" || func instanceof Function;
}
__name(isFunction, "isFunction");
__name2(isFunction, "isFunction");
function isObject(object) {
  return object != null && typeof object === "object";
}
__name(isObject, "isObject");
__name2(isObject, "isObject");
function isInRange(num, min, max, inclusive = true) {
  if (inclusive)
    return num >= min && num <= max;
  else
    return num > min && num < max;
}
__name(isInRange, "isInRange");
__name2(isInRange, "isInRange");
function isJSON(str) {
  if (!isString(str)) {
    str = JSON.stringify(str);
  }
  let obj = null;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return false;
  }
  if (isObject(obj))
    return true;
  return false;
}
__name(isJSON, "isJSON");
__name2(isJSON, "isJSON");
function link_is_external(link_element, _location = window.location) {
  return link_element.host !== _location.host;
}
__name(link_is_external, "link_is_external");
__name2(link_is_external, "link_is_external");
function isExternalURLFast(url) {
  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
    return true;
  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host)
    return true;
  return false;
}
__name(isExternalURLFast, "isExternalURLFast");
__name2(isExternalURLFast, "isExternalURLFast");
function isExternalURL(url) {
  try {
    if (typeof URL === "undefined") {
    }
  } catch (e) {
    console.debug(e);
  }
  var res = false;
  try {
    res = new URL(url).origin !== location.origin;
  } catch (e) {
    return false;
  }
  return res;
}
__name(isExternalURL, "isExternalURL");
__name2(isExternalURL, "isExternalURL");
function JSONobjectsAreEqual(objA, objB) {
  var jsonA = JSON.stringify(objA);
  var jsonB = JSON.stringify(objB);
  if (jsonA === jsonB)
    return true;
  return false;
}
__name(JSONobjectsAreEqual, "JSONobjectsAreEqual");
__name2(JSONobjectsAreEqual, "JSONobjectsAreEqual");
function randomId(_prefix = "", _suffix = "") {
  return _prefix + Math.random().toString(36).substr(2, 9) + _suffix;
}
__name(randomId, "randomId");
__name2(randomId, "randomId");
function randomID(_prefix = "", _suffix = "", _length = 9) {
  return `${_prefix}${randomString(9)}${_suffix}`;
}
__name(randomID, "randomID");
__name2(randomID, "randomID");
function hexadecimalID(_len = 16, _pow = 4) {
  return Math.floor((1 + Math.random()) * Math.pow(_len, _pow)).toString(16).substring(1);
}
__name(hexadecimalID, "hexadecimalID");
__name2(hexadecimalID, "hexadecimalID");
function randomString(length, chars = null) {
  if (!chars)
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  else
    chars = String(chars);
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
__name(randomString, "randomString");
__name2(randomString, "randomString");
function randomCharFrom(str) {
  return randomString(1, str);
}
__name(randomCharFrom, "randomCharFrom");
__name2(randomCharFrom, "randomCharFrom");
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
__name(rndInt, "rndInt");
__name2(rndInt, "rndInt");
function randomItemFrom(arr) {
  return arr[rndInt(0, arr.length - 1)];
}
__name(randomItemFrom, "randomItemFrom");
__name2(randomItemFrom, "randomItemFrom");
function safeStringify(obj) {
  let cache = [];
  let s = JSON.stringify(obj, (key, value) => {
    if (isObject(value)) {
      if (cache.includes(value))
        return;
      cache.push(value);
    }
    return value;
  });
  cache = [];
  return s;
}
__name(safeStringify, "safeStringify");
__name2(safeStringify, "safeStringify");
function hash32(str) {
  var hash = 0, i, chr;
  str = JSON.stringify(str);
  if (str.length === 0)
    return String(hash);
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return String(hash);
}
__name(hash32, "hash32");
__name2(hash32, "hash32");
function hash64(str) {
  var h1 = hash32(str);
  return h1 + hash32(h1 + str);
}
__name(hash64, "hash64");
__name2(hash64, "hash64");
function hash128(str) {
  var h1 = hash64(str);
  return h1 + hash64(h1 + str);
}
__name(hash128, "hash128");
__name2(hash128, "hash128");
function stringTrimToLength(_str, _len) {
  if (_len == null)
    _len = String(_str).length;
  _str = String(_str);
  return _str.substring(0, _len);
}
__name(stringTrimToLength, "stringTrimToLength");
__name2(stringTrimToLength, "stringTrimToLength");
function jsonFix(str) {
  str = String(str);
  let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
  var newStr = str.replace(regex, "");
  return newStr;
}
__name(jsonFix, "jsonFix");
__name2(jsonFix, "jsonFix");
function deg2rad(deg) {
  var res = deg * Math.PI / 180;
  return res;
}
__name(deg2rad, "deg2rad");
__name2(deg2rad, "deg2rad");
function rad2deg(rad) {
  var res = rad * 180 / Math.PI;
  return res;
}
__name(rad2deg, "rad2deg");
__name2(rad2deg, "rad2deg");
function stepify(value, step) {
  if (step == 0)
    return value;
  if (step == Infinity)
    return 1;
  return Math.round((value + Number.EPSILON) / step) * step;
}
__name(stepify, "stepify");
__name2(stepify, "stepify");
function splitStringByLength(str, len) {
  var parts = [];
  for (var i = 0; i < str.length; i += len) {
    parts.push(str.substring(i, i + len));
  }
  return parts;
}
__name(splitStringByLength, "splitStringByLength");
__name2(splitStringByLength, "splitStringByLength");
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}
__name(sanitizeString, "sanitizeString");
__name2(sanitizeString, "sanitizeString");
function validateEmail(email) {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
__name(validateEmail, "validateEmail");
__name2(validateEmail, "validateEmail");
function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "	":
        return "\\t";
      case "":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
}
__name(mysql_real_escape_string, "mysql_real_escape_string");
__name2(mysql_real_escape_string, "mysql_real_escape_string");
function areSimilar(objA, objB) {
  if (objA == objB)
    return true;
  if (isObject(objA) && isObject(objB)) {
    objA = JSON.parse(JSON.stringify(objA));
    objB = JSON.parse(JSON.stringify(objB));
    for (let k of Object.keys(objA)) {
      if (!(k in objB))
        return false;
      if (!areSimilar(objA[k], objB[k]))
        return false;
    }
    return true;
  } else {
    if (typeof objA === typeof objB) {
      return objA === objB;
    }
  }
  return false;
}
__name(areSimilar, "areSimilar");
__name2(areSimilar, "areSimilar");
function hardPush(arr, item, compareProps) {
  if (!arr || !(arr instanceof Array))
    return false;
  if (!item)
    return false;
  if (!arr.length) {
    arr.push(item);
    return true;
  }
  if (arr.indexOf(item) >= 0)
    return false;
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    if (isObject(arrItem) && isObject(item)) {
      if (compareProps && isArray(compareProps)) {
        for (let prop of compareProps) {
          if (prop in arrItem && areSimilar(arrItem[prop], item[prop])) {
            return false;
          }
        }
      }
    } else if (arrItem === item) {
      return false;
    }
  }
  arr.push(item);
  return true;
}
__name(hardPush, "hardPush");
__name2(hardPush, "hardPush");
function shallowEqual(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
__name(shallowEqual, "shallowEqual");
__name2(shallowEqual, "shallowEqual");
function deepEqual(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    let val1 = object1[key];
    let val2 = object2[key];
    let areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
__name(deepEqual, "deepEqual");
__name2(deepEqual, "deepEqual");
function findItemIndex(arr, item) {
  if (!arr || !(arr instanceof Array))
    return -1;
  if (!item)
    return -1;
  for (let i = 0; i < arr.length; i++) {
    let arrItem = arr[i];
    if (isObject(arrItem) && isObject(item)) {
      if (shallowEqual(arrItem, item))
        return i;
      else if (arrItem === item)
        return i;
    }
  }
  return -1;
}
__name(findItemIndex, "findItemIndex");
__name2(findItemIndex, "findItemIndex");
function findItem(arr, item) {
  var res = findItemIndex(arr, item);
  if (res < 0)
    return false;
  return true;
}
__name(findItem, "findItem");
__name2(findItem, "findItem");
function arrayRemove(arr, item) {
  var res = arr.indexOf(item);
  if (res < 0)
    return false;
  let x = arr.splice(res, 1);
  return x.length > 0;
}
__name(arrayRemove, "arrayRemove");
__name2(arrayRemove, "arrayRemove");
function findItemObject(arr, item, compareProperties = null) {
  var res = findItemObjectIndex(arr, item, compareProperties);
  if (res < 0)
    return false;
  return true;
}
__name(findItemObject, "findItemObject");
__name2(findItemObject, "findItemObject");
function findItemObjectIndex(arr, item, compareProperties = null) {
  if (!arr || !(arr instanceof Array))
    return -1;
  if (!item)
    return -1;
  if (arr.length == 0) {
    return -1;
  }
  for (var i = 0; i < arr.length; i++) {
    let arrItem = arr[i];
    if (arrItem instanceof Object && item instanceof Object) {
      if (compareProperties && compareProperties instanceof Array) {
        for (let pproperty of compareProperties) {
          if (arrItem.hasOwnProperty(pproperty) && arrItem[pproperty] === item[pproperty])
            return i;
        }
      } else if (shallowEqual(arrItem, item))
        return i;
    } else if (arrItem === item)
      return i;
  }
  return -1;
}
__name(findItemObjectIndex, "findItemObjectIndex");
__name2(findItemObjectIndex, "findItemObjectIndex");
function getObjectFromArray(arr, properties) {
  if (!arr || !(arr instanceof Array))
    return false;
  if (!properties)
    return false;
  if (arr.length == 0) {
    return false;
  }
  var item = properties;
  var compareProperties = Object.keys(item);
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    if (arrItem instanceof Object && item instanceof Object) {
      if (compareProperties && compareProperties instanceof Array) {
        for (let prop of compareProperties) {
          if (arrItem.hasOwnProperty(prop) && arrItem[prop] === item[prop])
            return arrItem;
        }
      } else if (shallowEqual(arrItem, item))
        return arrItem;
    } else if (arrItem === item)
      return arrItem;
  }
  return false;
}
__name(getObjectFromArray, "getObjectFromArray");
__name2(getObjectFromArray, "getObjectFromArray");
function getClosestPathInCircle(arr, _from, _to, bias = 0) {
  if (!(arr instanceof Array)) {
    return [];
  }
  if (_from < 0 || _from >= arr.length) {
    return [];
  }
  if (_to < 0 || _to >= arr.length) {
    return [];
  }
  let iL, iR;
  iL = iR = _from;
  let arrL = [], arrR = [];
  let arrX;
  while (arrL.length < arr.length) {
    let _i = mod(iL, arr.length);
    arrL.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iL--;
  }
  while (arrR.length < arr.length) {
    let _i = mod(iR, arr.length);
    arrR.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iR++;
  }
  if (Math.abs(arrL.length) < Math.abs(arrR.length)) {
    arrX = arrL;
  } else if (Math.abs(arrL.length) > Math.abs(arrR.length)) {
    arrX = arrR;
  } else {
    if (bias > 0)
      arrX = arrR;
    else
      arrX = arrL;
  }
  return arrX;
}
__name(getClosestPathInCircle, "getClosestPathInCircle");
__name2(getClosestPathInCircle, "getClosestPathInCircle");
function roundTo(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo, "roundTo");
__name2(roundTo, "roundTo");

// src/ProcessingTarget.ts
var ProcessingTargetEvent = class extends CustomEvent {
  static {
    __name(this, "ProcessingTargetEvent");
  }
  data;
  constructor(a, b) {
    super(a, b);
    this.data = b?.detail || {};
  }
};
var ProcessingTarget = class extends EventTarget {
  static {
    __name(this, "ProcessingTarget");
  }
  FPS = 12;
  targetName = randomID("[ProcessingTarget:", "]");
  connectId = randomID("ConnectID:");
  // onProcessTimer; onPhysicsProcessTimer;
  _connectedObjects = {};
  _signals = {};
  _startSysTime = 0;
  _lastSysTime = 0;
  _currSysTime = 0;
  _deltaSysTime = 0;
  _fixedDeltaSysTime = 0;
  _initDeltaSysTime = 0;
  _elapsedDeltaTime = 0;
  _elapsedFixedDeltaTime = 0;
  _frameTolerance = Math.sqrt(Math.E) / 1e3;
  _logs = false;
  _active = false;
  _isReady = false;
  _animFrame;
  get deltaTime() {
    return this._deltaSysTime;
  }
  get fixedDeltaTime() {
    return this._fixedDeltaSysTime;
  }
  get frameTime() {
    return safeDivide(1, this.FPS);
  }
  get elapsedTime() {
    return this._elapsedDeltaTime;
  }
  get elapsedFixedTime() {
    return this._elapsedFixedDeltaTime;
  }
  constructor(opts = {}) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false } = opts;
    super();
    this.FPS = FPS;
    this._frameTolerance = frameTolerance;
    if (active) {
      this.activate();
    }
  }
  onPreProcess(timestamp) {
    try {
      this._animFrame = requestAnimationFrame(this.onPreProcess.bind(this));
      if (!this._isReady) {
        this._isReady = true;
        this.onReady();
      }
      this._currSysTime = window.performance.now();
      let fixedDelta = safeDivide(1, this.FPS);
      this._deltaSysTime = (this._currSysTime - this._lastSysTime) / 1e3;
      this._initDeltaSysTime += this._deltaSysTime;
      this.onProcess(this.deltaTime);
      this._elapsedDeltaTime += this.deltaTime;
      if (this._initDeltaSysTime >= this.frameTime) {
        this._fixedDeltaSysTime = this._initDeltaSysTime;
        this.onPhysicsProcess(this.fixedDeltaTime);
        this._elapsedFixedDeltaTime += this.fixedDeltaTime;
        this._initDeltaSysTime = 0;
      }
      this._lastSysTime = this._currSysTime;
    } catch (err) {
      console.log(err);
    }
  }
  onReady() {
  }
  onProcess(delta) {
  }
  onPhysicsProcess(delta) {
  }
  createSignal(name, ...vars) {
    let varsObj = {};
    for (let vvar of vars)
      varsObj[vvar] = null;
    let event = new ProcessingTargetEvent(name, {
      detail: varsObj
    });
    event.data = varsObj;
    this._signals[name] = event;
    if (this._logs)
      console.log("Signal " + name + " in " + this.targetName + " created");
  }
  removeSignal(name) {
    if (this._signals.hasOwnProperty(name)) {
      this._signals[name] = null;
      if (this._logs)
        console.log("Signal " + name + " in " + this.targetName + " removed");
    }
  }
  emitSignal(name, vars = {}, elems = Object.values(this._connectedObjects)) {
    let event = null;
    if (!this._signals.hasOwnProperty(name)) {
      let varKeys = Object.keys(vars);
      this.createSignal(name, ...varKeys);
    }
    event = this._signals[name];
    for (let kkey of Object.keys(vars))
      event.data[kkey] = vars[kkey];
    for (let elem of elems) {
      if (elem instanceof EventTarget)
        elem.dispatchEvent(event);
    }
  }
  connectElement(element) {
    let connectId = randomID("ConnectID:");
    if (element && element instanceof EventTarget) {
      let identifier = "";
      if (!("connectId" in element)) {
        if (element instanceof HTMLElement) {
          element.dataset.connectId = connectId;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id(" + element.id + ")";
        }
        if (String(element.className)) {
          identifier += " class(" + element.className + ")";
        }
        if (String(element.localName)) {
          identifier += " tag(" + element.localName + ")";
        } else {
          identifier += " tagName(" + element.tagName + ")";
        }
      }
      identifier += " (" + connectId + ")";
      if (this._connectedObjects.hasOwnProperty(connectId)) {
        if (this._logs)
          console.log("Element " + identifier + " is already connected");
        return connectId;
      } else {
        this._connectedObjects[connectId] = element;
        if (this._logs)
          console.log("Element " + identifier + " connected!");
        return connectId;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return null;
  }
  disconnectElement(element) {
    if (element && element instanceof EventTarget) {
      let identifier = "";
      let isDisconnected = false;
      let connectedIds = Object.keys(this._connectedObjects);
      for (let i = 0; i < connectedIds.length; i++) {
        let elem = this._connectedObjects[connectedIds[i]];
        if (elem === element) {
          delete this._connectedObjects[connectedIds[i]];
          isDisconnected = true;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id: " + element.id;
        }
        if (String(element.className)) {
          identifier += " class: " + element.className;
        }
        if (String(element.localName)) {
          identifier += " tag: " + element.localName;
        } else {
          identifier += " tagName:" + element.tagName;
        }
      }
      if (!isDisconnected) {
        if (this._logs)
          console.log("Element " + element + " was not connected/already disconnected");
        return false;
      } else {
        if (this._logs)
          console.log("Element " + element + " successfully disconnected!");
        return true;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return false;
  }
  disconnectAllElements() {
    for (let el of Object.values(this._connectedObjects)) {
      this.disconnectElement(el);
    }
  }
  connectElements(elementArr) {
    if (elementArr && elementArr instanceof Array) {
      for (let el of elementArr) {
        this.connectElement(el);
      }
    }
  }
  isConnectedToElement(element) {
    return findItem(Object.values(this._connectedObjects), element);
  }
  logsOn() {
    this._logs = true;
  }
  logsOff() {
    this._logs = false;
  }
  isActive() {
    return this._active;
  }
  activate() {
    if (this.isActive())
      return;
    this._active = true;
    this._lastSysTime = window.performance.now();
    this._startSysTime = this._lastSysTime;
    this._elapsedDeltaTime = 0;
    this._elapsedFixedDeltaTime = 0;
    this.onPreProcess(this._lastSysTime);
  }
  deactivate() {
    if (!this.isActive())
      return;
    this._active = false;
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }
};
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
