///TransformObserver.js

import {Vector2, Rect2, Transform2} from '@catsums/vector2';
import * as MY from '@catsums/my';

import { ProcessingTarget } from './ProcessingTarget';

import * as EF from './ElementFunctions';

Object.entries(EF).forEach(([name, exported]) => window[name] = exported);


export class PropertyObserver extends ProcessingTarget{
	targetName = MY.randomID('[PropertyObserver:',']');

	_precision = 0.001;

	_observedElements = {}; // {String(connectID):Element}
	_proxies = new Map(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})

	_entriesQueue = [];

	_callback = (entries, obs) => {};

	constructor(callback=this._callback, opts={}){
		super(opts);

		this._precision = opts?.precision || this._precision;

		if(MY.isFunction(callback)){
			this._callback = callback;
		}
	}

	onPhysicsProcess(delta){
		this.checkUpdates(Object.values(this._observedElements));
	}

	async checkUpdates(elements){

		let entries = [];
		let promises = [];

		for(let elem of elements){
			promises.push(
				this.checkUpdate(elem)
			);
		}

		let results = await Promise.all(promises);

		for(let res of results){
			if(res && MY.isObject(res)){
				entries.push(res);
			}
		}

		if(entries.length){
			try{
				this.handleEntries(entries);
			}catch(err){
				console.log(err);
				return;
			}
		}
	}

	async checkUpdate(elem){
		if(!elem) return null;
		let processTime = this.elapsedFixedTime;

		let proxy = this._proxies.get(elem);
		if(!proxy) return null;

		let entry = {
			id: proxy.id,
			target: elem,
			changes: {},
		}

		for(let _prop of Object.keys(proxy.properties)){
			let optObj = proxy[optK];
			if(!optObj || !MY.isObject(optObj) || !Object.keys(optObj).length) continue;

			let _change = {};

			if(_prop.startsWith('$')){
				let _flag = _prop.replace('$','');

				switch(_flag){
					case 'self':{
						
					}break;

					default: break;
				}
			}else{
				let curr = elem[_prop];
				let prev = proxy.properties[_prop];

				if( !compareJSON(curr, prev) ){
					_change = {
						old: prev,
						new: curr,
					};
				}
			}

			

			if(Object.keys(_change).length){
				entry.changes[_prop] = _change;
			}
			
		}

		this.processEntry(elem, entry,{
			processTime: processTime,
			logTime: new Date(),
		});

		if(Object.keys(entry.changes).length){
			return entry;
		}

		return null;
	}

	handleEntries(ents){
		if(!MY.isArray(ents)) return;
		try{
			this._callback(ents, this);
		}catch(err){
			console.log(err);
		}
		
		// for(let ent of ents){
		// 	if(!ent) return;
		// 	this.emitSignal('propertyChange',{
		// 		changes: ent?.changes,
		// 	},[ent.target]);
		// }
	}

	processEntry(elem, entry, process){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		if(entry){
			for(let k of Object.keys(entry.changes)){
				let _change = entry.changes[k];

				for(let _prop of Object.keys(_change)){
					if(MY.isObject(_change[_prop].new))
						proxy.properties[_prop] = Object.assign({},_change[_prop].new);
					else
						proxy.properties[_prop] = _change[_k].new;
				}
			}

			entry.process = {
				processTime: process.processTime,
				logTime: process.logTime,
				timeTaken: (process.processTime - proxy._process.processTime),
			}
		}

		proxy._process.processTime = process.processTime;
		proxy._process.logTime = process.logTime;

	}

	observe(elem, opts={}){
		let proxies = null;

		if(MY.isArray(opts)){
			let arr = opts;
			opts = {};
			for(let k of arr){
				if(!MY.isString(k)) continue;
				opts[k] = true;
			}
		}
		if(!MY.isObject(opts)) opts = {};

		if(MY.isArray(elem)){
			proxies = [];

			let arr = elem;
			for(let _elem of arr){
				let p = this.observe(_elem,opts);
				if(p) proxies.push(p);
			}

		}else if(elem instanceof Object){
			
			let proxy = {
				id : MY.hash64(elem),
				_process:{
					processTime: this.elapsedFixedTime,
					logTime: new Date(),
				}
			};

			proxy.properties = {};

			for(let opt of Object.keys(opts)){
				if(opts[opt] == true && elem.hasOwnProperty(opt)){
					proxy.properties[opt] = elem[opt];
				}
			}
		}

		return proxies;
	}

	disconnect(elem){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		this._proxies.delete(elem);
	}
}