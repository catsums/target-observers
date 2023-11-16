var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import {
  randomID
} from "@catsums/my";
import { ProcessingTarget } from "./ProcessingTarget";
import {
  compareJSON,
  getGlobalOffsetRect,
  getGlobalBoundingRect,
  getElemTransformFromCSSStyle,
  getElemTransformFromMatrix,
  getPolygonIntersect,
  getBasicShapeProps,
  getElemPointsBasedOnBasicShape
} from "./ElementFunctions";
import _ from "lodash";
let defaultObserveOpts = {
  rects: {
    boundingrect: false,
    offsetrect: false,
    transformrect: false,
    clippath: false,
    shapeoutside: false
    // svgshape: false,
  },
  collisionLayers: [],
  targetLayers: [],
  targets: [],
  tolerance: 1e-3
};
var CollisionType = /* @__PURE__ */ ((CollisionType2) => {
  CollisionType2[CollisionType2["IN"] = 1] = "IN";
  CollisionType2[CollisionType2["OUT"] = -1] = "OUT";
  CollisionType2[CollisionType2["CHANGE"] = 0] = "CHANGE";
  return CollisionType2;
})(CollisionType || {});
class CollisionObserver extends ProcessingTarget {
  static {
    __name(this, "CollisionObserver");
  }
  targetName = randomID("[CollisionObserver:", "]");
  _precision = 1e-3;
  _tolerance = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _collisionLayers = {};
  // {String:String[connectID]}
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (entries, obs) => {
  }, { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3, tolerance = 1e-3 }) {
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._tolerance = tolerance;
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
      if (res && _.isObject(res)) {
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
      collisions: []
      // {target:Elem, type:CollisionType, layers:[String], intersect:Rect2, intersectPoints:[{x,y}]}
    };
    let targetLayers = proxy.collision.targetLayers;
    for (let _layer of targetLayers) {
      let collLayer = this._collisionLayers[_layer];
      if (!collLayer)
        continue;
      for (let targID of collLayer) {
        let targElem = this._observedElements[targID];
        if (!targElem)
          continue;
        let targProxy = this._proxies.get(targElem);
        if (!targProxy)
          continue;
        let _collisionData = {};
        for (let opt of Object.keys(proxy.rects)) {
          if (!proxy.rects[opt])
            continue;
          let existingCollData = entry.collisions.find((collData) => collData.target == targElem && collData.rect == opt);
          if (existingCollData) {
            existingCollData.layers.push(_layer);
            continue;
          }
          switch (opt) {
            case "boundingrect":
              {
                let currRect = getGlobalBoundingRect(elem);
                let targRect = getGlobalBoundingRect(targElem);
                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                if (_intersect && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                } else if (!_intersect && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersect && !compareJSON(_intersect, proxy.currentCollisions.find((_c) => _c.id == targID))) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0 /* CHANGE */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                }
              }
              break;
            case "offsetrect":
              {
                let currRect = getGlobalOffsetRect(elem);
                let targRect = getGlobalOffsetRect(targElem);
                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                if (_intersect && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                } else if (!_intersect && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersect && !compareJSON(_intersect, proxy.currentCollisions.find((_c) => _c.id == targID))) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0 /* CHANGE */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                }
              }
              break;
            case "transformrect":
              {
                let currRect = getGlobalOffsetRect(elem);
                let targRect = getGlobalOffsetRect(targElem);
                let elemT0 = getElemTransformFromCSSStyle(elem, this._tolerance);
                let elemT1 = getElemTransformFromMatrix(elem, this._tolerance);
                let targT0 = getElemTransformFromCSSStyle(targElem, this._tolerance);
                let targT1 = getElemTransformFromMatrix(targElem, this._tolerance);
                let elemPts = currRect.getCorners().map((pt) => {
                  return elemT1.applyTransform(pt, elemT1.anchor);
                }).map((pt) => {
                  return elemT0.applyTransform(pt, elemT0.anchor);
                });
                let targPts = targRect.getCorners().map((pt) => {
                  return targT1.applyTransform(pt, targT1.anchor);
                }).map((pt) => {
                  return targT0.applyTransform(pt, targT0.anchor);
                });
                let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);
                if (_intersects && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                } else if (!_intersects && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersects && !compareJSON(_intersects, proxy.currentCollisions.find((_c) => _c.id == targID))) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0 /* CHANGE */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                }
              }
              break;
            case "shapeoutside":
            case "clippath":
              {
                let sOpt = "clippath";
                if (opt == "clippath")
                  sOpt = "clip-path";
                if (opt == "shapeoutside")
                  sOpt = "shape-outside";
                let elemClipPath = window.getComputedStyle(elem)[sOpt];
                let targClipPath = window.getComputedStyle(targElem)[sOpt];
                let [elemClipPathShape, elemClipPathProps] = getBasicShapeProps(elemClipPath);
                let [targClipPathShape, targClipPathProps] = getBasicShapeProps(targClipPath);
                let elemPts = getElemPointsBasedOnBasicShape(elem, elemClipPathShape, elemClipPathProps, { opts: {
                  vertices: 8,
                  increment: 0.125
                } });
                let targPts = getElemPointsBasedOnBasicShape(targElem, targClipPathShape, targClipPathProps, { opts: {
                  vertices: 8,
                  increment: 0.125
                } });
                let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);
                if (_intersects && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1 /* IN */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                } else if (!_intersects && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1 /* OUT */,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersects) {
                  let _x = proxy.currentCollisions.find((_c) => _c.id == targID);
                  if (!compareJSON(_intersects, _x?.intersect)) {
                    _collisionData = {
                      targetID: targID,
                      target: targElem,
                      rect: opt,
                      type: 0 /* CHANGE */,
                      layers: [_layer]
                    };
                    _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                  }
                }
              }
              break;
            default:
              break;
          }
        }
        if (Object.keys(_collisionData).length) {
          entry.collisions.push(_collisionData);
        }
      }
    }
    this.processEntry(elem, entry, {
      processTime,
      logTime: /* @__PURE__ */ new Date()
    });
    if (entry.collisions.length) {
      return entry;
    }
    return null;
  }
  handleEntries(ents) {
    this._callback(ents, this);
    let obs = this;
    ents.forEach((ent) => {
      ent.collisions.forEach((collData) => {
        if (!collData)
          return;
        switch (collData.type) {
          case 1 /* IN */:
            {
              obs.emitSignal("collisionIn", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
          case -1 /* OUT */:
            {
              obs.emitSignal("collisionOut", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
          case 0 /* CHANGE */:
            {
              obs.emitSignal("collisionChange", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
        }
        obs.emitSignal("collision", {
          collisionData: collData
        }, [ent.target]);
      });
    });
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let collData of entry.collisions) {
        let targID = collData.targetID;
        if (collData.type == 1 /* IN */) {
          proxy.currentCollisions.push({
            id: targID,
            intersect: collData.intersect,
            rect: collData.rect
          });
        } else if (collData.type == -1 /* OUT */) {
          let _coll = proxy.currentCollisions.find((_c) => _c.id == targID);
          let ind = proxy.currentCollisions.indexOf(_coll);
          proxy.currentCollisions.splice(ind, 1);
        } else if (collData.type == 0 /* CHANGE */) {
          let _coll = proxy.currentCollisions.find((_c) => _c.id == targID);
          Object.assign(_coll, {
            id: targID,
            intersect: collData.intersect,
            rect: collData.rect
          });
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
    if (!_.isObject(opts))
      opts = defaultObserveOpts;
    if (elem instanceof Array) {
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Element) {
      let obsOpts = Object.assign({}, defaultObserveOpts);
      if (opts.rects instanceof Array) {
        for (let r of opts.rects) {
          r = r.toLowerCase();
          if (!(r in obsOpts.rects))
            continue;
          obsOpts.rects[r] = true;
        }
      } else if (_.isObject(opts.rects)) {
        for (let r of Object.keys(opts.rects)) {
          r = r.toLowerCase();
          if (!(r in obsOpts.rects))
            continue;
          obsOpts.rects[r] = opts.rects[r] ? true : false;
        }
      }
      if (_.isArray(opts.targets)) {
        obsOpts.targets = opts.targets.filter((_targ) => _targ instanceof Element);
      }
      if (_.isArray(opts.collisionLayers)) {
        obsOpts.collisionLayers = opts.collisionLayers.map((_layer) => `${_layer}`);
      }
      if (_.isArray(opts.targetLayers)) {
        obsOpts.targetLayers = opts.targetLayers.map((_layer) => `${_layer}`);
      }
      if (typeof opts.tolerance === "number") {
        obsOpts.tolerance = opts.tolerance;
      }
      let connectId = this.connectElement(elem);
      let proxy = {
        id: connectId,
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        },
        currentCollisions: [],
        rects: {},
        tolerance: 0,
        collision: {}
      };
      this._observedElements[proxy.id] = elem;
      for (let k of Object.keys(obsOpts.rects)) {
        if (obsOpts.rects[k] == false) {
          delete obsOpts.rects[k];
        } else {
          k = k.toLowerCase();
          proxy.rects[k] = obsOpts.rects[k] ? true : false;
        }
      }
      for (let _layer of obsOpts.collisionLayers) {
        if (!(_layer in this._collisionLayers)) {
          this._collisionLayers[_layer] = [];
        }
        this._collisionLayers[_layer].push(proxy.id);
      }
      proxy.collision = {
        layers: obsOpts.collisionLayers,
        targets: obsOpts.targets,
        targetLayers: obsOpts.targetLayers
      };
      proxy.tolerance = obsOpts.tolerance;
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
    for (let _layer of proxy.collision?.layers) {
      if (!this._collisionLayers[_layer])
        continue;
      let ind = this._collisionLayers[_layer].indexOf(proxy.id);
      if (ind >= 0) {
        this._collisionLayers[_layer].splice(ind, 1);
      }
    }
  }
}
export {
  CollisionObserver
};
