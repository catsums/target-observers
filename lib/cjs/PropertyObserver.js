var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var PropertyObserver_exports = {};
__export(PropertyObserver_exports, {
  PropertyObserver: () => PropertyObserver
});
module.exports = __toCommonJS(PropertyObserver_exports);
var import_my = require("@catsums/my");
var import_lodash = __toESM(require("lodash"));
var import_ElementFunctions = require("./ElementFunctions");
var import_ProcessingTarget = require("./ProcessingTarget");
var EF = __toESM(require("./ElementFunctions"));
Object.entries(EF).forEach(([name, exported]) => window[name] = exported);
class PropertyObserver extends import_ProcessingTarget.ProcessingTarget {
  static {
    __name(this, "PropertyObserver");
  }
  targetName = (0, import_my.randomID)("[PropertyObserver:", "]");
  _precision = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (ent, obs) => {
  }, { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3 }) {
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._callback = callback;
  }
  onPhysicsProcess(delta) {
    this.checkUpdates(Object.values(this._observedElements));
  }
  async checkUpdates(elements) {
    let entries = [];
    let promises = [];
    for (let elem of elements) {
      promises.push(
        this.checkUpdate(elem)
      );
    }
    let results = await Promise.all(promises);
    for (let res of results) {
      if (res && res instanceof Object) {
        entries.push(res);
      }
    }
    if (entries.length) {
      try {
        this.handleEntries(entries);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
  async checkUpdate(elem) {
    if (!elem)
      return null;
    let processTime = this.elapsedFixedTime;
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return null;
    let entry = {
      id: proxy.id,
      target: elem,
      changes: {}
    };
    for (let _prop of Object.keys(proxy.properties)) {
      let optObj = proxy[_prop];
      if (!optObj || import_lodash.default.isObject(optObj) || !Object.keys(optObj).length)
        continue;
      let _change = {};
      if (_prop.startsWith("$")) {
        let _flag = _prop.replace("$", "");
        switch (_flag) {
          case "self":
            {
            }
            break;
          default:
            break;
        }
      } else {
        let curr = elem[_prop];
        let prev = proxy.properties[_prop];
        if (!(0, import_ElementFunctions.compareJSON)(curr, prev)) {
          _change = {
            old: prev,
            new: curr
          };
        }
      }
      if (Object.keys(_change).length) {
        entry.changes[_prop] = _change;
      }
    }
    this.processEntry(elem, entry, {
      processTime,
      logTime: /* @__PURE__ */ new Date()
    });
    if (Object.keys(entry.changes).length) {
      return entry;
    }
    return null;
  }
  handleEntries(ents) {
    if (!import_lodash.default.isArray(ents))
      return;
    try {
      this._callback(ents, this);
    } catch (err) {
      console.log(err);
    }
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let k of Object.keys(entry.changes)) {
        let _change = entry.changes[k];
        for (let _prop of Object.keys(_change)) {
          if (import_lodash.default.isObject(_change[_prop].new))
            proxy.properties[_prop] = Object.assign({}, _change[_prop].new);
          else
            proxy.properties[_prop] = _change[k].new;
        }
      }
      entry.process = {
        processTime: process.processTime,
        logTime: process.logTime,
        timeTaken: process.processTime - proxy._process.processTime
      };
    }
    proxy._process.processTime = process.processTime;
    proxy._process.logTime = process.logTime;
  }
  observe(elem, opts) {
    let proxies = null;
    if (opts instanceof Array) {
      let arr = opts;
      opts = {};
      for (let k of arr) {
        if (typeof k !== "string")
          continue;
        opts[k] = true;
      }
    }
    if (opts instanceof Object)
      opts = {};
    if (elem instanceof Array) {
      proxies = [];
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Object) {
      let proxy = {
        id: (0, import_my.hash64)(JSON.stringify(elem)),
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        },
        properties: {}
      };
      for (let opt of Object.keys(opts)) {
        if (opts[opt] == true && elem.hasOwnProperty(opt)) {
          proxy.properties[opt] = elem[opt];
        }
      }
      return [proxy];
    }
    return proxies;
  }
  disconnect(elem) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    this._proxies.delete(elem);
  }
}
