///TransformObserver.js

import {Vector2, Rect2, Transform2} from '@catsums/vector2';
import {
	hardPush, randomID, findItem, safeDivide, hash32, hash64
} from '@catsums/my';
import _ from "lodash";

import { compareJSON } from './ElementFunctions';

import { ProcessingTarget } from './ProcessingTarget';

import * as EF from './ElementFunctions';

Object.entries(EF).forEach(([name, exported]) => window[name] = exported);


export class PropertyObserver extends ProcessingTarget{
	targetName = randomID('[PropertyObserver:',']');

	_precision = 0.001;

	_observedElements:Object = {}; // {String(connectID):Element}
	_proxies = new Map(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})

	_entriesQueue = [];

	_callback = (entries, obs) => {};

	public constructor(
		callback : (entries:IObject[], obs:PropertyObserver) => void, 
		opts? : {FPS?:number, frameTolerance?:number, active?:boolean, precision?:number}
	);

	constructor(callback=(ent:IObject[], obs:PropertyObserver)=>{}, opts:IObject={}){

		let {FPS=12, frameTolerance=Math.sqrt(Math.E)/1000, active=false, precision=0.001} = opts;
		
		super({FPS, frameTolerance, active});

		this._precision = precision;
		this._callback = callback;
	}

	onPhysicsProcess(delta){
		this.checkUpdates(Object.values(this._observedElements));
	}

	async checkUpdates(elements:Object[]){

		let entries = [];
		let promises = [];

		for(let elem of elements){
			promises.push(
				this.checkUpdate(elem)
			);
		}

		let results = await Promise.all(promises);

		for(let res of results){
			if(res && res instanceof Object){
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

	async checkUpdate(elem:Object){
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
			let optObj = proxy[_prop];
			if(!optObj || _.isObject(optObj) || !Object.keys(optObj).length) continue;

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
		if(!_.isArray(ents)) return;
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
					if(_.isObject(_change[_prop].new))
						proxy.properties[_prop] = Object.assign({},_change[_prop].new);
					else
						proxy.properties[_prop] = _change[k].new;
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

	observe(elem : object|object[], opts:IObject|any[]){
		let proxies:any[] = null;

		if(opts instanceof Array){
			let arr:any[] = opts;
			opts = {};
			for(let k of arr){
				if(typeof k !== 'string') continue;
				opts[k] = true;
			}
		}
		if(opts instanceof Object == false) opts = {};

		if(elem instanceof Array){
			proxies = [];

			let arr = elem;
			for(let _elem of arr){
				let p = this.observe(_elem,opts);
				if(p) proxies.concat(p);
			}

		}else if(elem instanceof Object){
			
			let proxy = {
				id : hash64(JSON.stringify(elem)),
				_process:{
					processTime: this.elapsedFixedTime,
					logTime: new Date(),
				},
				properties: {}
			};

			for(let opt of Object.keys(opts)){
				if(opts[opt] == true && elem.hasOwnProperty(opt)){
					proxy.properties[opt] = elem[opt];
				}
			}

			return [proxy];
		}

		return proxies;
	}

	disconnect(elem:object){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		this._proxies.delete(elem);
	}
}