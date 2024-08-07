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
var TransformObserver_exports = {};
__export(TransformObserver_exports, {
  TransformObserver: () => TransformObserver
});
module.exports = __toCommonJS(TransformObserver_exports);
var import_my = require("@catsums/my");
var import_ProcessingTarget = require("./ProcessingTarget");
var import_ElementFunctions = require("./ElementFunctions");
var import_lodash = __toESM(require("lodash"));
let defaultObserveOpts = {
  boundingrect: {
    globalposition: false,
    gp: false,
    localposition: false,
    lp: false,
    size: false,
    s: false
  },
  offsetrect: {
    globalposition: false,
    gp: false,
    localposition: false,
    lp: false,
    size: false,
    s: false
  },
  transform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  localtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  globaltransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  matrixtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  localmatrixtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  globalmatrixtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  }
};
class TransformObserver extends import_ProcessingTarget.ProcessingTarget {
  static {
    __name(this, "TransformObserver");
  }
  targetName = (0, import_my.randomID)("[TransformObserver:", "]");
  _precision = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (entries, obs) => {
  }, opts = {}) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3 } = opts;
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._callback = callback;
  }
  onPhysicsProcess(delta) {
    this.checkUpdates(Object.values(this._observedElements));
  }
  async checkUpdates(elements = Object.values(this._observedElements)) {
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
    for (let optK of Object.keys(proxy)) {
      let optObj = proxy[optK];
      if (!optObj || !import_lodash.default.isObject(optObj) || !Object.keys(optObj).length)
        continue;
      let _change = {};
      switch (optK) {
        case "boundingrect":
          {
            let localBoundingRect = (0, import_ElementFunctions.getLocalBoundingRect)(elem).toJSON();
            let globalBoundingRect = (0, import_ElementFunctions.getLocalBoundingRect)(elem).toJSON();
            if (optObj.globalposition) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.globalposition, globalBoundingRect.position)) {
                _change.globalposition = {
                  old: optObj.globalposition,
                  new: globalBoundingRect.position
                };
              }
            }
            if (optObj.localposition) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.localposition, localBoundingRect.position)) {
                _change.localposition = {
                  old: optObj.localposition,
                  new: localBoundingRect.position
                };
              }
            }
            if (optObj.size) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.size, localBoundingRect.size)) {
                _change.size = {
                  old: optObj.size,
                  new: localBoundingRect.size
                };
              }
            }
          }
          break;
        case "offsetrect":
          {
            let localOffsetRect = (0, import_ElementFunctions.getLocalOffsetRect)(elem).toJSON();
            let globalOffsetRect = (0, import_ElementFunctions.getGlobalOffsetRect)(elem).toJSON();
            if (optObj.globalposition) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.globalposition, globalOffsetRect.position)) {
                _change.globalposition = {
                  old: optObj.globalposition,
                  new: globalOffsetRect.position
                };
              }
            }
            if (optObj.localposition) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.localposition, localOffsetRect.position)) {
                _change.localposition = {
                  old: optObj.localposition,
                  new: localOffsetRect.position
                };
              }
            }
            if (optObj.size) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.size, localOffsetRect.size)) {
                _change.size = {
                  old: optObj.size,
                  new: localOffsetRect.size
                };
              }
            }
          }
          break;
        case "localtransform":
          {
            let t = (0, import_ElementFunctions.getElemTransformFromCSSStyle)(elem, this._precision);
            let localTransform = t.toJSON();
            if (optObj.translation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.translation, localTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: localTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.rotation, localTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: localTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.scale, localTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: localTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.anchor, localTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: localTransform.anchor
                };
              }
            }
          }
          break;
        case "globaltransform":
          {
            let localTransform = (0, import_ElementFunctions.getElemExpandedTransformFromCSSStyle)(elem, this._precision);
            let globalTransform = localTransform.getGlobalTransform().toJSON();
            if (optObj.translation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.translation, globalTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: globalTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.rotation, globalTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: globalTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.scale, globalTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: globalTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.anchor, globalTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: globalTransform.anchor
                };
              }
            }
          }
          break;
        case "localmatrixtransform":
          {
            let localTransform = (0, import_ElementFunctions.getElemTransformFromMatrix)(elem, this._precision).toJSON();
            if (optObj.translation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.translation, localTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: localTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.rotation, localTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: localTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.scale, localTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: localTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.anchor, localTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: localTransform.anchor
                };
              }
            }
          }
          break;
        case "globalmatrixtransform":
          {
            let localTransform = (0, import_ElementFunctions.getElemExpandedTransformFromMatrix)(elem, this._precision);
            let globalTransform = localTransform.getGlobalTransform().toJSON();
            if (optObj.translation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.translation, globalTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: globalTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.rotation, globalTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: globalTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.scale, globalTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: globalTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!(0, import_ElementFunctions.compareJSON)(optObj.anchor, globalTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: globalTransform.anchor
                };
              }
            }
          }
          break;
        default:
          break;
      }
      if (Object.keys(_change).length) {
        entry.changes[optK] = _change;
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
    for (let ent of ents) {
      if (!ent)
        return;
      this.emitSignal("transformChange", {
        changes: ent?.changes
      }, [ent.target]);
    }
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let k of Object.keys(entry.changes)) {
        let _change = entry.changes[k];
        for (let _k of Object.keys(_change)) {
          if (import_lodash.default.isObject(_change[_k].new))
            proxy[k][_k] = Object.assign({}, _change[_k].new);
          else
            proxy[k][_k] = _change[_k].new;
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
  observe(elem, opts = defaultObserveOpts) {
    let proxies = [];
    if (opts instanceof Array) {
      let arr = opts;
      opts = {};
      for (let k of arr) {
        k = k.toLowerCase();
        opts[k] = true;
      }
    }
    if (opts instanceof Object == false)
      opts = defaultObserveOpts;
    if (elem instanceof Array) {
      proxies = [];
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Element) {
      let obsOpts = Object.assign({}, defaultObserveOpts);
      for (let k of Object.keys(opts)) {
        k = k.toLowerCase();
        if (!(k in obsOpts))
          continue;
        if (typeof opts[k] === "boolean") {
          for (let _k of Object.keys(obsOpts[k])) {
            _k = _k.toLowerCase();
            obsOpts[k][_k] = opts[k];
          }
        } else if (import_lodash.default.isArray(opts[k])) {
          for (let _k of opts[k]) {
            _k = _k.toLowerCase();
            if (!(_k in obsOpts[k]))
              continue;
            obsOpts[k][_k] = true;
          }
        } else if (import_lodash.default.isObject(opts[k])) {
          for (let _k of Object.keys(opts[k])) {
            _k = _k.toLowerCase();
            if (!(_k in obsOpts[k]))
              continue;
            obsOpts[k][_k] = opts[k][_k] ? true : false;
          }
        }
      }
      let connectId = this.connectElement(elem);
      let proxy = {
        id: connectId,
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        }
      };
      this._observedElements[proxy.id] = elem;
      for (let opt of Object.keys(obsOpts)) {
        let isFalse = true;
        for (let k of Object.keys(obsOpts[opt])) {
          if (obsOpts[opt][k] == true) {
            isFalse = false;
          } else {
            delete obsOpts[opt][k];
          }
        }
        if (isFalse) {
          delete obsOpts[opt];
        }
      }
      for (let opt of Object.keys(obsOpts)) {
        opt = opt.toLowerCase();
        if (!proxy[opt])
          proxy[opt] = {};
        let optObj = obsOpts[opt];
        switch (opt) {
          case "boundingrect":
            {
              let globalRect = (0, import_ElementFunctions.getGlobalBoundingRect)(elem);
              let localRect = (0, import_ElementFunctions.getLocalBoundingRect)(elem);
              if (optObj.globalposition || optObj.gp) {
                proxy.boundingrect.globalposition = globalRect.position.toJSON();
              }
              if (optObj.localposition || optObj.lp) {
                proxy.boundingrect.localposition = localRect.position.toJSON();
              }
              if (optObj.size || optObj.s) {
                proxy.boundingrect.size = localRect.size.toJSON();
              }
            }
            break;
          case "offsetrect":
            {
              let globalRect = (0, import_ElementFunctions.getGlobalOffsetRect)(elem);
              let localRect = (0, import_ElementFunctions.getLocalOffsetRect)(elem);
              if (optObj.globalposition || optObj.gp) {
                proxy.offsetrect.globalposition = globalRect.position.toJSON();
              }
              if (optObj.localposition || optObj.lp) {
                proxy.offsetrect.localposition = localRect.position.toJSON();
              }
              if (optObj.size || optObj.s) {
                proxy.offsetrect.size = localRect.size.toJSON();
              }
            }
            break;
          case "transform":
          case "localtransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = (0, import_ElementFunctions.getElemTransformFromCSSStyle)(elem, precision);
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.localtransform.translation = localtransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.localtransform.scale = localtransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.localtransform.rotation = localtransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.localtransform.anchor = localtransform.anchor.toJSON();
              }
            }
            break;
          case "globaltransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = (0, import_ElementFunctions.getElemExpandedTransformFromCSSStyle)(elem, precision);
              let globaltransform = localtransform.getGlobalTransform();
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.globaltransform.translation = globaltransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.globaltransform.scale = globaltransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.globaltransform.rotation = globaltransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.globaltransform.anchor = globaltransform.anchor.toJSON();
              }
            }
            break;
          case "matrixtransform":
          case "localmatrixtransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = (0, import_ElementFunctions.getElemTransformFromMatrix)(elem, precision);
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.localmatrixtransform.translation = localtransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.localmatrixtransform.scale = localtransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.localmatrixtransform.rotation = localtransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.localmatrixtransform.anchor = localtransform.anchor.toJSON();
              }
            }
            break;
          case "globalmatrixtransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = (0, import_ElementFunctions.getElemExpandedTransformFromMatrix)(elem, precision);
              let globaltransform = localtransform.getGlobalTransform();
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.globalmatrixtransform.translation = globaltransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.globalmatrixtransform.scale = globaltransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.globalmatrixtransform.rotation = globaltransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.globalmatrixtransform.anchor = globaltransform.anchor.toJSON();
              }
            }
            break;
          default:
            break;
        }
      }
      this._proxies.set(elem, proxy);
      proxies = [proxy];
    }
    return proxies;
  }
  disconnect(elem) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    delete this._observedElements[proxy.id];
    this.disconnectElement(elem);
    this._proxies.delete(elem);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TransformObserver
});
