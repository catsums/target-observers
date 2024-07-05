"use strict";
///CollisionObserver.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionObserver = void 0;
// import {Vector2, Rect2, Transform2} from '@catsums/vector2';
const my_1 = require("@catsums/my");
const ProcessingTarget_1 = require("./ProcessingTarget");
const ElementFunctions_1 = require("./ElementFunctions");
const lodash_1 = __importDefault(require("lodash"));
/*
let proxy = {
    id: String(ConnectId)
    collisionLayers: Array(String),
    targetLayers: Array(String),
    tolerance: Number
    currentColls: Array(String(ConnectId))
}
 */
let defaultObserveOpts = {
    rects: {
        boundingrect: false,
        offsetrect: false,
        transformrect: false,
        clippath: false,
        shapeoutside: false,
        // svgshape: false,
    },
    collisionLayers: [],
    targetLayers: [],
    targets: [],
    tolerance: 0.001,
};
var CollisionType;
(function (CollisionType) {
    CollisionType[CollisionType["IN"] = 1] = "IN";
    CollisionType[CollisionType["OUT"] = -1] = "OUT";
    CollisionType[CollisionType["CHANGE"] = 0] = "CHANGE";
})(CollisionType || (CollisionType = {}));
class CollisionObserver extends ProcessingTarget_1.ProcessingTarget {
    targetName = (0, my_1.randomID)('[CollisionObserver:', ']');
    _precision = 0.001;
    _tolerance = 0.001;
    _observedElements = {}; // {String(connectID):Element}
    _proxies = new Map(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
    _collisionLayers = {}; // {String:String[connectID]}
    _entriesQueue = [];
    _callback = (entries, obs) => { };
    constructor(callback = (entries, obs) => { }, opts = {}) {
        let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1000, active = false, precision = 0.001, tolerance = 0.001 } = opts;
        super({ FPS, frameTolerance, active });
        this._precision = precision;
        this._tolerance = tolerance;
        this._callback = callback;
    }
    onPhysicsProcess(delta) {
        this.checkUpdates(Object.values(this._observedElements));
    }
    async checkUpdates(elements = Object.values(this._observedElements)) {
        let entries = [];
        let promises = [];
        for (let elem of elements) {
            promises.push(this.checkUpdate(elem));
        }
        let results = await Promise.all(promises);
        for (let res of results) {
            if (res && lodash_1.default.isObject(res)) {
                entries.push(res);
            }
        }
        if (entries.length) {
            try {
                this.handleEntries(entries);
            }
            catch (err) {
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
            collisions: [],
            // {target:Elem, type:CollisionType, layers:[String], intersect:Rect2, intersectPoints:[{x,y}]}
        };
        let targetLayers = proxy.collision.targetLayers;
        for (let _layer of targetLayers) {
            let collLayer = this._collisionLayers[_layer];
            // clog({collLayer, _layer})
            if (!collLayer)
                continue;
            for (let targID of collLayer) {
                let targElem = this._observedElements[targID];
                if (!targElem)
                    continue;
                if (targElem == elem)
                    continue; //do not detect collisions with self
                let targProxy = this._proxies.get(targElem);
                if (!targProxy)
                    continue;
                let _collisionData = {};
                // clog({targID, targElem, targProxy, rects:proxy.rects})
                for (let opt of Object.keys(proxy.rects)) {
                    if (!proxy.rects[opt])
                        continue;
                    let existingCollData = entry.collisions.find((collData) => (collData.target == targElem && collData.rect == opt));
                    if (existingCollData) {
                        existingCollData.layers.push(_layer);
                        continue;
                    }
                    // clog({opt,existingCollData})
                    switch (opt) {
                        case 'boundingrect':
                            {
                                let currRect = (0, ElementFunctions_1.getGlobalBoundingRect)(elem);
                                let targRect = (0, ElementFunctions_1.getGlobalBoundingRect)(targElem);
                                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                                // clog({currRect, targRect, _intersect, opt})
                                if (_intersect && !proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.IN,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersect.toJSON();
                                }
                                else if (!_intersect && proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.OUT,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = null;
                                }
                                else if (_intersect && !(0, ElementFunctions_1.compareJSON)(_intersect, proxy.currentCollisions.find(_c => (_c.id == targID))?.intersect)) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.CHANGE,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersect.toJSON();
                                }
                            }
                            break;
                        case 'offsetrect':
                            {
                                let currRect = (0, ElementFunctions_1.getGlobalOffsetRect)(elem);
                                let targRect = (0, ElementFunctions_1.getGlobalOffsetRect)(targElem);
                                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                                if (_intersect && !proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.IN,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersect.toJSON();
                                }
                                else if (!_intersect && proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.OUT,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = null;
                                }
                                else if (_intersect && !(0, ElementFunctions_1.compareJSON)(_intersect, proxy.currentCollisions.find(_c => (_c.id == targID))?.intersect)) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.CHANGE,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersect.toJSON();
                                }
                            }
                            break;
                        case 'transformrect':
                            {
                                let currRect = (0, ElementFunctions_1.getGlobalOffsetRect)(elem);
                                let targRect = (0, ElementFunctions_1.getGlobalOffsetRect)(targElem);
                                let elemT0 = (0, ElementFunctions_1.getElemTransformFromCSSStyle)(elem, this._tolerance);
                                let elemT1 = (0, ElementFunctions_1.getElemTransformFromMatrix)(elem, this._tolerance);
                                let targT0 = (0, ElementFunctions_1.getElemTransformFromCSSStyle)(targElem, this._tolerance);
                                let targT1 = (0, ElementFunctions_1.getElemTransformFromMatrix)(targElem, this._tolerance);
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
                                let _intersects = (0, ElementFunctions_1.getPolygonIntersect)(elemPts, targPts, this._precision);
                                if (_intersects && !proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.IN,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersects.map((v) => (v.toJSON?.() ?? v));
                                }
                                else if (!_intersects && proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.OUT,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = null;
                                }
                                else if (_intersects && !(0, ElementFunctions_1.compareJSON)(_intersects, proxy.currentCollisions.find(_c => (_c.id == targID))?.intersect)) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.CHANGE,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersects.map((v) => (v.toJSON?.() ?? v));
                                }
                            }
                            break;
                        case 'shapeoutside':
                        case 'clippath':
                            {
                                let sOpt = 'clippath';
                                if (opt == 'clippath')
                                    sOpt = 'clip-path';
                                if (opt == 'shapeoutside')
                                    sOpt = 'shape-outside';
                                //check polygon
                                let elemClipPath = window.getComputedStyle(elem)[sOpt];
                                let targClipPath = window.getComputedStyle(targElem)[sOpt];
                                let [elemClipPathShape, elemClipPathProps] = (0, ElementFunctions_1.getBasicShapeProps)(elemClipPath);
                                let [targClipPathShape, targClipPathProps] = (0, ElementFunctions_1.getBasicShapeProps)(targClipPath);
                                let elemPts = (0, ElementFunctions_1.getElemPointsBasedOnBasicShape)(elem, elemClipPathShape, elemClipPathProps, { opts: {
                                        vertices: 8, increment: 0.125
                                    } });
                                let targPts = (0, ElementFunctions_1.getElemPointsBasedOnBasicShape)(targElem, targClipPathShape, targClipPathProps, { opts: {
                                        vertices: 8, increment: 0.125
                                    } });
                                let _intersects = (0, ElementFunctions_1.getPolygonIntersect)(elemPts, targPts, this._precision);
                                if (_intersects && !proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.IN,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = _intersects.map((v) => (v.toJSON?.() ?? v));
                                }
                                else if (!_intersects && proxy.currentCollisions.find((_c) => (_c.id == targID))) {
                                    _collisionData = {
                                        targetID: targID,
                                        target: targElem,
                                        rect: opt,
                                        type: CollisionType.OUT,
                                        layers: [_layer],
                                    };
                                    _collisionData.intersect = null;
                                }
                                else if (_intersects) {
                                    let _x = proxy.currentCollisions.find(_c => (_c.id == targID));
                                    if (!(0, ElementFunctions_1.compareJSON)(_intersects, _x?.intersect)) {
                                        _collisionData = {
                                            targetID: targID,
                                            target: targElem,
                                            rect: opt,
                                            type: CollisionType.CHANGE,
                                            layers: [_layer],
                                        };
                                        _collisionData.intersect = _intersects.map((v) => (v.toJSON?.() ?? v));
                                    }
                                }
                            }
                            break;
                        default: break;
                    }
                }
                if (Object.keys(_collisionData).length) {
                    entry.collisions.push(_collisionData);
                }
            }
        }
        this.processEntry(elem, entry, {
            processTime: processTime,
            logTime: new Date(),
        });
        // clog({entry})
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
                    case CollisionType.IN:
                        {
                            obs.emitSignal('collisionIn', {
                                collisionData: collData,
                            }, [ent.target]);
                        }
                        break;
                    case CollisionType.OUT:
                        {
                            obs.emitSignal('collisionOut', {
                                collisionData: collData,
                            }, [ent.target]);
                        }
                        break;
                    case CollisionType.CHANGE:
                        {
                            obs.emitSignal('collisionChange', {
                                collisionData: collData,
                            }, [ent.target]);
                        }
                        break;
                }
                obs.emitSignal('collision', {
                    collisionData: collData,
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
                if (collData.type == CollisionType.IN) {
                    proxy.currentCollisions.push({
                        id: targID,
                        intersect: collData.intersect,
                        rect: collData.rect,
                    });
                }
                else if (collData.type == CollisionType.OUT) {
                    let _coll = proxy.currentCollisions.find((_c) => (_c.id == targID));
                    let ind = proxy.currentCollisions.indexOf(_coll);
                    proxy.currentCollisions.splice(ind, 1);
                }
                else if (collData.type == CollisionType.CHANGE) {
                    let _coll = proxy.currentCollisions.find((_c) => (_c.id == targID));
                    Object.assign(_coll, {
                        id: targID,
                        intersect: collData.intersect,
                        rect: collData.rect,
                    });
                }
            }
            entry.process = {
                processTime: process.processTime,
                logTime: process.logTime,
                timeTaken: (process.processTime - proxy._process.processTime),
            };
        }
        proxy._process.processTime = process.processTime;
        proxy._process.logTime = process.logTime;
    }
    observe(elem, opts = defaultObserveOpts) {
        let proxies = [];
        if (!lodash_1.default.isObject(opts))
            opts = defaultObserveOpts;
        if (elem instanceof Array) {
            let arr = elem;
            for (let _elem of arr) {
                let p = this.observe(_elem, opts);
                if (p)
                    proxies.concat(p);
            }
        }
        else if (elem instanceof Element) {
            let obsOpts = Object.assign({}, defaultObserveOpts);
            //rects
            if (opts.rects instanceof Array) {
                for (let r of opts.rects) {
                    r = r.toLowerCase();
                    if (!(r in obsOpts.rects))
                        continue;
                    obsOpts.rects[r] = true;
                }
            }
            else if (lodash_1.default.isObject(opts.rects)) {
                for (let r of Object.keys(opts.rects)) {
                    r = r.toLowerCase();
                    if (!(r in obsOpts.rects))
                        continue;
                    obsOpts.rects[r] = opts.rects[r] ? true : false;
                }
            }
            //collisionlayers and collisionTargets
            if (lodash_1.default.isArray(opts.targets)) {
                obsOpts.targets = opts.targets.filter(_targ => _targ instanceof Element);
            }
            if (lodash_1.default.isArray(opts.collisionLayers)) {
                obsOpts.collisionLayers = opts.collisionLayers.map(_layer => `${_layer}`);
            }
            if (lodash_1.default.isArray(opts.targetLayers)) {
                obsOpts.targetLayers = opts.targetLayers.map(_layer => `${_layer}`);
            }
            if (typeof opts.tolerance === 'number') {
                obsOpts.tolerance = opts.tolerance;
            }
            let connectId = this.connectElement(elem);
            let proxy = {
                id: connectId,
                _process: {
                    processTime: this.elapsedFixedTime,
                    logTime: new Date(),
                },
                currentCollisions: [],
                rects: {},
                tolerance: 0,
                collision: {},
            };
            this._observedElements[proxy.id] = elem;
            for (let k of Object.keys(obsOpts.rects)) {
                if (obsOpts.rects[k] == false) {
                    delete obsOpts.rects[k];
                }
                else {
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
                targetLayers: obsOpts.targetLayers,
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
exports.CollisionObserver = CollisionObserver;
