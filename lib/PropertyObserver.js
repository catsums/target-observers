"use strict";
///TransformObserver.js
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyObserver = void 0;
const my_1 = require("@catsums/my");
const lodash_1 = __importDefault(require("lodash"));
const ElementFunctions_1 = require("./ElementFunctions");
const ProcessingTarget_1 = require("./ProcessingTarget");
const EF = __importStar(require("./ElementFunctions"));
Object.entries(EF).forEach(([name, exported]) => window[name] = exported);
class PropertyObserver extends ProcessingTarget_1.ProcessingTarget {
    targetName = (0, my_1.randomID)('[PropertyObserver:', ']');
    _precision = 0.001;
    _observedElements = {}; // {String(connectID):Element}
    _proxies = new Map(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
    _entriesQueue = [];
    _callback = (entries, obs) => { };
    constructor(callback = (ent, obs) => { }, opts = {}) {
        let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1000, active = false, precision = 0.001 } = opts;
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
        for (let _prop of Object.keys(proxy.properties)) {
            let optObj = proxy[_prop];
            if (!optObj || lodash_1.default.isObject(optObj) || !Object.keys(optObj).length)
                continue;
            let _change = {};
            if (_prop.startsWith('$')) {
                let _flag = _prop.replace('$', '');
                switch (_flag) {
                    case 'self':
                        {
                        }
                        break;
                    default: break;
                }
            }
            else {
                let curr = elem[_prop];
                let prev = proxy.properties[_prop];
                if (!(0, ElementFunctions_1.compareJSON)(curr, prev)) {
                    _change = {
                        old: prev,
                        new: curr,
                    };
                }
            }
            if (Object.keys(_change).length) {
                entry.changes[_prop] = _change;
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
        // for(let ent of ents){
        // 	if(!ent) return;
        // 	this.emitSignal('propertyChange',{
        // 		changes: ent?.changes,
        // 	},[ent.target]);
        // }
    }
    processEntry(elem, entry, process) {
        let proxy = this._proxies.get(elem);
        if (!proxy)
            return;
        if (entry) {
            for (let k of Object.keys(entry.changes)) {
                let _change = entry.changes[k];
                for (let _prop of Object.keys(_change)) {
                    if (lodash_1.default.isObject(_change[_prop].new))
                        proxy.properties[_prop] = Object.assign({}, _change[_prop].new);
                    else
                        proxy.properties[_prop] = _change[k].new;
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
    observe(elem, opts) {
        let proxies = null;
        if (opts instanceof Array) {
            let arr = opts;
            opts = {};
            for (let k of arr) {
                if (typeof k !== 'string')
                    continue;
                opts[k] = true;
            }
        }
        if (opts instanceof Object == false)
            opts = {};
        if (elem instanceof Array) {
            proxies = [];
            let arr = elem;
            for (let _elem of arr) {
                let p = this.observe(_elem, opts);
                if (p)
                    proxies.concat(p);
            }
        }
        else if (elem instanceof Object) {
            let proxy = {
                id: (0, my_1.hash64)(JSON.stringify(elem)),
                _process: {
                    processTime: this.elapsedFixedTime,
                    logTime: new Date(),
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
exports.PropertyObserver = PropertyObserver;
