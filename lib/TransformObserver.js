"use strict";
///TransformObserver.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformObserver = void 0;
// import {Vector2, Rect2, Transform2} from '@catsums/vector2';
const my_1 = require("@catsums/my");
const ProcessingTarget_1 = require("./ProcessingTarget");
const ElementFunctions_1 = require("./ElementFunctions");
const lodash_1 = __importDefault(require("lodash"));
let defaultObserveOpts = {
    boundingrect: {
        globalposition: false, gp: false,
        localposition: false, lp: false,
        size: false, s: false,
    },
    offsetrect: {
        globalposition: false, gp: false,
        localposition: false, lp: false,
        size: false, s: false,
    },
    transform: {
        translation: false, position: false, translate: false, p: false, t: false,
        rotation: false, rotate: false, r: false,
        scale: false, size: false, s: false,
        anchor: false, origin: false, a: false,
    },
    localtransform: {
        translation: false, position: false, translate: false, p: false, t: false,
        rotation: false, rotate: false, r: false,
        scale: false, size: false, s: false,
        anchor: false, origin: false, a: false,
    },
    globaltransform: {
        translation: false, position: false, translate: false, p: false, t: false,
        rotation: false, rotate: false, r: false,
        scale: false, size: false, s: false,
        anchor: false, origin: false, a: false,
    },
    matrixtransform: {
        translation: false, position: false, translate: false, p: false, t: false,
        rotation: false, rotate: false, r: false,
        scale: false, size: false, s: false,
        anchor: false, origin: false, a: false,
    },
    localmatrixtransform: {
        translation: false, position: false, translate: false, p: false, t: false,
        rotation: false, rotate: false, r: false,
        scale: false, size: false, s: false,
        anchor: false, origin: false, a: false,
    },
    globalmatrixtransform: {
        translation: false, position: false, translate: false, p: false, t: false,
        rotation: false, rotate: false, r: false,
        scale: false, size: false, s: false,
        anchor: false, origin: false, a: false,
    },
};
class TransformObserver extends ProcessingTarget_1.ProcessingTarget {
    targetName = (0, my_1.randomID)('[TransformObserver:', ']');
    _precision = 0.001;
    _observedElements = {}; // {String(connectID):Element}
    _proxies = new Map(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
    _entriesQueue = [];
    _callback = (entries, obs) => { };
    constructor(callback = (entries, obs) => { }, opts = {}) {
        let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1000, active = false, precision = 0.001 } = opts;
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
            promises.push(this.checkUpdate(elem));
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
            changes: {},
        };
        for (let optK of Object.keys(proxy)) {
            let optObj = proxy[optK];
            if (!optObj || !lodash_1.default.isObject(optObj) || !Object.keys(optObj).length)
                continue;
            let _change = {};
            switch (optK) {
                case 'boundingrect':
                    {
                        let localBoundingRect = (0, ElementFunctions_1.getLocalBoundingRect)(elem).toJSON();
                        let globalBoundingRect = (0, ElementFunctions_1.getLocalBoundingRect)(elem).toJSON();
                        if (optObj.globalposition) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.globalposition, globalBoundingRect.position)) {
                                _change.globalposition = {
                                    old: optObj.globalposition,
                                    new: globalBoundingRect.position,
                                };
                            }
                        }
                        if (optObj.localposition) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.localposition, localBoundingRect.position)) {
                                _change.localposition = {
                                    old: optObj.localposition,
                                    new: localBoundingRect.position,
                                };
                            }
                        }
                        if (optObj.size) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.size, localBoundingRect.size)) {
                                _change.size = {
                                    old: optObj.size,
                                    new: localBoundingRect.size,
                                };
                            }
                        }
                    }
                    break;
                case 'offsetrect':
                    {
                        let localOffsetRect = (0, ElementFunctions_1.getLocalOffsetRect)(elem).toJSON();
                        let globalOffsetRect = (0, ElementFunctions_1.getGlobalOffsetRect)(elem).toJSON();
                        if (optObj.globalposition) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.globalposition, globalOffsetRect.position)) {
                                _change.globalposition = {
                                    old: optObj.globalposition,
                                    new: globalOffsetRect.position,
                                };
                            }
                        }
                        if (optObj.localposition) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.localposition, localOffsetRect.position)) {
                                _change.localposition = {
                                    old: optObj.localposition,
                                    new: localOffsetRect.position,
                                };
                            }
                        }
                        if (optObj.size) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.size, localOffsetRect.size)) {
                                _change.size = {
                                    old: optObj.size,
                                    new: localOffsetRect.size,
                                };
                            }
                        }
                    }
                    break;
                case 'localtransform':
                    {
                        let t = (0, ElementFunctions_1.getElemTransformFromCSSStyle)(elem, this._precision);
                        let localTransform = t.toJSON();
                        if (optObj.translation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.translation, localTransform.position)) {
                                _change.translation = {
                                    old: optObj.translation,
                                    new: localTransform.position,
                                };
                            }
                        }
                        if (optObj.rotation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.rotation, localTransform.rotation)) {
                                _change.rotation = {
                                    old: optObj.rotation,
                                    new: localTransform.rotation,
                                };
                            }
                        }
                        if (optObj.scale) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.scale, localTransform.scale)) {
                                _change.scale = {
                                    old: optObj.scale,
                                    new: localTransform.scale,
                                };
                            }
                        }
                        if (optObj.anchor) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.anchor, localTransform.anchor)) {
                                _change.anchor = {
                                    old: optObj.anchor,
                                    new: localTransform.anchor,
                                };
                            }
                        }
                    }
                    break;
                case 'globaltransform':
                    {
                        let localTransform = (0, ElementFunctions_1.getElemExpandedTransformFromCSSStyle)(elem, this._precision);
                        let globalTransform = localTransform.getGlobalTransform().toJSON();
                        if (optObj.translation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.translation, globalTransform.position)) {
                                _change.translation = {
                                    old: optObj.translation,
                                    new: globalTransform.position,
                                };
                            }
                        }
                        if (optObj.rotation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.rotation, globalTransform.rotation)) {
                                _change.rotation = {
                                    old: optObj.rotation,
                                    new: globalTransform.rotation,
                                };
                            }
                        }
                        if (optObj.scale) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.scale, globalTransform.scale)) {
                                _change.scale = {
                                    old: optObj.scale,
                                    new: globalTransform.scale,
                                };
                            }
                        }
                        if (optObj.anchor) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.anchor, globalTransform.anchor)) {
                                _change.anchor = {
                                    old: optObj.anchor,
                                    new: globalTransform.anchor,
                                };
                            }
                        }
                    }
                    break;
                case 'localmatrixtransform':
                    {
                        let localTransform = (0, ElementFunctions_1.getElemTransformFromMatrix)(elem, this._precision).toJSON();
                        if (optObj.translation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.translation, localTransform.position)) {
                                _change.translation = {
                                    old: optObj.translation,
                                    new: localTransform.position,
                                };
                            }
                        }
                        if (optObj.rotation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.rotation, localTransform.rotation)) {
                                _change.rotation = {
                                    old: optObj.rotation,
                                    new: localTransform.rotation,
                                };
                            }
                        }
                        if (optObj.scale) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.scale, localTransform.scale)) {
                                _change.scale = {
                                    old: optObj.scale,
                                    new: localTransform.scale,
                                };
                            }
                        }
                        if (optObj.anchor) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.anchor, localTransform.anchor)) {
                                _change.anchor = {
                                    old: optObj.anchor,
                                    new: localTransform.anchor,
                                };
                            }
                        }
                    }
                    break;
                case 'globalmatrixtransform':
                    {
                        let localTransform = (0, ElementFunctions_1.getElemExpandedTransformFromMatrix)(elem, this._precision);
                        let globalTransform = localTransform.getGlobalTransform().toJSON();
                        if (optObj.translation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.translation, globalTransform.position)) {
                                _change.translation = {
                                    old: optObj.translation,
                                    new: globalTransform.position,
                                };
                            }
                        }
                        if (optObj.rotation) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.rotation, globalTransform.rotation)) {
                                _change.rotation = {
                                    old: optObj.rotation,
                                    new: globalTransform.rotation,
                                };
                            }
                        }
                        if (optObj.scale) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.scale, globalTransform.scale)) {
                                _change.scale = {
                                    old: optObj.scale,
                                    new: globalTransform.scale,
                                };
                            }
                        }
                        if (optObj.anchor) {
                            if (!(0, ElementFunctions_1.compareJSON)(optObj.anchor, globalTransform.anchor)) {
                                _change.anchor = {
                                    old: optObj.anchor,
                                    new: globalTransform.anchor,
                                };
                            }
                        }
                    }
                    break;
                default: break;
            }
            if (Object.keys(_change).length) {
                entry.changes[optK] = _change;
            }
        }
        this.processEntry(elem, entry, {
            processTime: processTime,
            logTime: new Date(),
        });
        if (Object.keys(entry.changes).length) {
            return entry;
        }
        return null;
    }
    handleEntries(ents) {
        if (!lodash_1.default.isArray(ents))
            return;
        try {
            this._callback(ents, this);
        }
        catch (err) {
            console.log(err);
        }
        for (let ent of ents) {
            if (!ent)
                return;
            this.emitSignal('transformChange', {
                changes: ent?.changes,
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
                    if (lodash_1.default.isObject(_change[_k].new))
                        proxy[k][_k] = Object.assign({}, _change[_k].new);
                    else
                        proxy[k][_k] = _change[_k].new;
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
        }
        else if (elem instanceof Element) {
            let obsOpts = Object.assign({}, defaultObserveOpts);
            for (let k of Object.keys(opts)) {
                k = k.toLowerCase();
                if (!(k in obsOpts))
                    continue;
                if (typeof opts[k] === 'boolean') {
                    for (let _k of Object.keys(obsOpts[k])) {
                        _k = _k.toLowerCase();
                        obsOpts[k][_k] = opts[k];
                    }
                }
                else if (lodash_1.default.isArray(opts[k])) {
                    for (let _k of (opts[k])) {
                        _k = _k.toLowerCase();
                        if (!(_k in obsOpts[k]))
                            continue;
                        obsOpts[k][_k] = true;
                    }
                }
                else if (lodash_1.default.isObject(opts[k])) {
                    for (let _k of Object.keys(opts[k])) {
                        _k = _k.toLowerCase();
                        if (!(_k in obsOpts[k]))
                            continue;
                        obsOpts[k][_k] = (opts[k][_k]) ? true : false;
                    }
                }
            }
            let connectId = this.connectElement(elem);
            let proxy = {
                id: connectId,
                _process: {
                    processTime: this.elapsedFixedTime,
                    logTime: new Date(),
                }
            };
            this._observedElements[proxy.id] = elem;
            //clean off
            for (let opt of Object.keys(obsOpts)) {
                let isFalse = true;
                for (let k of Object.keys(obsOpts[opt])) {
                    if (obsOpts[opt][k] == true) {
                        isFalse = false;
                    }
                    else {
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
                    case 'boundingrect':
                        {
                            let globalRect = (0, ElementFunctions_1.getGlobalBoundingRect)(elem);
                            let localRect = (0, ElementFunctions_1.getLocalBoundingRect)(elem);
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
                    case 'offsetrect':
                        {
                            let globalRect = (0, ElementFunctions_1.getGlobalOffsetRect)(elem);
                            let localRect = (0, ElementFunctions_1.getLocalOffsetRect)(elem);
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
                    case 'transform':
                    case 'localtransform':
                        {
                            let precision = opts.precision || this._precision;
                            let localtransform = (0, ElementFunctions_1.getElemTransformFromCSSStyle)(elem, precision);
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
                    case 'globaltransform':
                        {
                            let precision = opts.precision || this._precision;
                            let localtransform = (0, ElementFunctions_1.getElemExpandedTransformFromCSSStyle)(elem, precision);
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
                    case 'matrixtransform':
                    case 'localmatrixtransform':
                        {
                            let precision = opts.precision || this._precision;
                            let localtransform = (0, ElementFunctions_1.getElemTransformFromMatrix)(elem, precision);
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
                    case 'globalmatrixtransform':
                        {
                            let precision = opts.precision || this._precision;
                            let localtransform = (0, ElementFunctions_1.getElemExpandedTransformFromMatrix)(elem, precision);
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
                    default: break;
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
exports.TransformObserver = TransformObserver;
