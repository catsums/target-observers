///TransformObserver.js

// import {Vector2, Rect2, Transform2} from '@catsums/vector2';
import {
	hardPush, randomID, findItem, safeDivide, hash32, hash64
} from '@catsums/my';

import { ProcessingTarget } from './ProcessingTarget';

import {
	compareJSON, 
	getGlobalOffsetRect, getLocalOffsetRect, getLocalBoundingRect, getGlobalBoundingRect, 
	getElemTransformFromCSSStyle, getElemTransformFromMatrix,
	getElemExpandedTransformFromMatrix, getElemExpandedTransformFromCSSStyle
} from './ElementFunctions';

import _ from "lodash";


// let ObserverProxyTemplate = {
// 	boundingrect:{
// 		globalposition: true,
// 		localposition: true,
// 		size: true,
// 	},
// 	offsetrect:{
// 		globalposition: true,
// 		localposition: true,
// 		size: true,
// 	},
// 	matrixtransform:{
// 		translation: true,
// 		rotation: true,
// 		scale: true,
// 		anchor: true,
// 	},
// 	globalmatrixtransform:{
// 		translation: true,
// 		rotation: true,
// 		scale: true,
// 		anchor: true,
// 	},
// 	transform:{
// 		translation: true,
// 		rotation: true,
// 		scale: true,
// 		anchor: true,
// 	},
// 	globaltransform:{
// 		translation: true,
// 		rotation: true,
// 		scale: true,
// 		anchor: true,
// 	},
// }

declare global{
	interface ITransformObserverRectOpts {
		globalposition?: boolean, gp?:boolean,
		localposition?: boolean, lp?:boolean,
		size?: boolean, s?:boolean,
	}
	interface ITransformObserverTransformOpts {
		translation?: boolean, position?: boolean, translate?: boolean, p?:boolean, t?:boolean,
		rotation?: boolean, rotate?: boolean, r?:boolean,
		scale?: boolean, size?: boolean, s?:boolean,
		anchor?: boolean, origin?: boolean, a?:boolean,
	}
	interface ITransformObserverOpts {
		boundingrect? : ITransformObserverRectOpts;
		offsetrect? : ITransformObserverRectOpts;
		transform? : ITransformObserverTransformOpts;
		localtransform? : ITransformObserverTransformOpts;
		globaltransform? : ITransformObserverTransformOpts;
		matrixtransform? : ITransformObserverTransformOpts
		localmatrixtransform? : ITransformObserverTransformOpts;
		globalmatrixtransform? : ITransformObserverTransformOpts;
	}

	interface ITransformProxyData {
		translation?: IVector2,
		rotation?: number,
		scale?: IVector2, 
		anchor?: IVector2,
	}
	interface IRectProxyData {
		globalposition?: IVector2;
		localposition?: IVector2;
		size?: IVector2;
	}

	interface ITransformObserverData {
		boundingrect? : IRectProxyData;
		offsetrect? : IRectProxyData;
		transform? : ITransformProxyData;
		localtransform? : ITransformProxyData;
		globaltransform? : ITransformProxyData;
		matrixtransform? : ITransformProxyData
		localmatrixtransform? : ITransformProxyData;
		globalmatrixtransform? : ITransformProxyData;
	}
	interface ITransformObserverProxy extends IObserverProxy, ITransformObserverData{
	}
	
	interface ITransformObserverChange {
		globalposition?: IProxyChange<IVector2>;
		localposition?: IProxyChange<IVector2>;
		size?: IProxyChange<IVector2>;
		translation?: IProxyChange<IVector2>;
		rotation?: IProxyChange<number>;
		scale?: IProxyChange<IVector2>;
		anchor?: IProxyChange<IVector2>;
	}

	interface ITransformObserverEntry {
		id: string;
		target: Element;
		changes: { [key:string] : ITransformObserverChange },
		process?: IProxyProcess;
	}
	
}



let defaultObserveOpts : ITransformObserverOpts = {
	boundingrect:{
		globalposition: false, gp:false,
		localposition: false, lp:false,
		size: false, s:false,
	},
	offsetrect:{
		globalposition: false, gp:false,
		localposition: false, lp:false,
		size: false, s:false,
	},
	transform:{
		translation: false, position: false, translate: false, p:false, t:false,
		rotation: false, rotate: false, r:false,
		scale: false, size: false, s:false,
		anchor: false, origin: false, a:false,
	},
	localtransform:{
		translation: false, position: false, translate: false, p:false, t:false,
		rotation: false, rotate: false, r:false,
		scale: false, size: false, s:false,
		anchor: false, origin: false, a:false,
	},
	globaltransform:{
		translation: false, position: false, translate: false, p:false, t:false,
		rotation: false, rotate: false, r:false,
		scale: false, size: false, s:false,
		anchor: false, origin: false, a:false,
	},
	matrixtransform:{
		translation: false, position: false, translate: false, p:false, t:false,
		rotation: false, rotate: false, r:false,
		scale: false, size: false, s:false,
		anchor: false, origin: false, a:false,
	},
	localmatrixtransform:{
		translation: false, position: false, translate: false, p:false, t:false,
		rotation: false, rotate: false, r:false,
		scale: false, size: false, s:false,
		anchor: false, origin: false, a:false,
	},
	globalmatrixtransform:{
		translation: false, position: false, translate: false, p:false, t:false,
		rotation: false, rotate: false, r:false,
		scale: false, size: false, s:false,
		anchor: false, origin: false, a:false,
	},
}



export class TransformObserver extends ProcessingTarget{
	targetName = randomID('[TransformObserver:',']');

	_precision = 0.001;

	_observedElements:{[key:string] : Element} = {}; // {String(connectID):Element}
	_proxies = new Map<Element,ITransformObserverProxy>(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})

	_entriesQueue = [];

	_callback = (entries:ITransformObserverEntry[], obs:TransformObserver) => {};

	public constructor(
		callback : (entries:ITransformObserverEntry[], obs:TransformObserver) => void, 
		opts? : {FPS?:number, frameTolerance?:number, active?:boolean, precision?:number}
	);

	constructor(
		callback=(entries:ITransformObserverEntry[], obs:TransformObserver) => {}, 
		{FPS=12, frameTolerance=Math.sqrt(Math.E)/1000, active=false, precision=0.001}
	){
		super({FPS, frameTolerance, active});

		this._precision = precision;
		this._callback = callback;
	}

	onPhysicsProcess(delta:number){
		this.checkUpdates(Object.values(this._observedElements));
	}

	async checkUpdates(elements:Element[]){

		let entries:ITransformObserverEntry[] = [];
		let promises:Promise<ITransformObserverEntry>[] = [];

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

	async checkUpdate(elem:Element){
		if(!elem) return null;
		let processTime = this.elapsedFixedTime;

		let proxy = this._proxies.get(elem);
		if(!proxy) return null;

		let entry : ITransformObserverEntry = {
			id: proxy.id,
			target: elem,
			changes: {},
		}

		for(let optK of Object.keys(proxy)){
			let optObj = proxy[optK];
			if(!optObj || !_.isObject(optObj) || !Object.keys(optObj).length) continue;

			let _change:ITransformObserverChange = {};

			switch(optK){
				case 'boundingrect':{
					let localBoundingRect = getLocalBoundingRect(elem).toJSON();
					let globalBoundingRect = getLocalBoundingRect(elem).toJSON();

					if(optObj.globalposition){
						if( !compareJSON(optObj.globalposition, globalBoundingRect.position) ){
							_change.globalposition = {
								old: optObj.globalposition,
								new: globalBoundingRect.position,
							};
						}
					}
					if(optObj.localposition){
						if( !compareJSON(optObj.localposition, localBoundingRect.position) ){
							_change.localposition = {
								old: optObj.localposition,
								new: localBoundingRect.position,
							};
						}
					}
					if(optObj.size){
						if( !compareJSON(optObj.size, localBoundingRect.size) ){
							_change.size = {
								old: optObj.size,
								new: localBoundingRect.size,
							};
						}
					}
				} break;
				case 'offsetrect':{
					let localOffsetRect = getLocalOffsetRect(elem).toJSON();
					let globalOffsetRect = getGlobalOffsetRect(elem).toJSON();

					if(optObj.globalposition){
						if( !compareJSON(optObj.globalposition, globalOffsetRect.position) ){
							_change.globalposition = {
								old: optObj.globalposition,
								new: globalOffsetRect.position,
							};
						}
					}
					if(optObj.localposition){
						if( !compareJSON(optObj.localposition, localOffsetRect.position) ){
							_change.localposition = {
								old: optObj.localposition,
								new: localOffsetRect.position,
							};
						}
					}
					if(optObj.size){
						if( !compareJSON(optObj.size, localOffsetRect.size) ){
							_change.size = {
								old: optObj.size,
								new: localOffsetRect.size,
							};
						}
					}
				} break;
				case 'localtransform':{
					let t = getElemTransformFromCSSStyle(elem, this._precision);

					let localTransform:IObject = t.toJSON();

					if(optObj.translation){
						if( !compareJSON(optObj.translation, localTransform.position) ){
							_change.translation = {
								old: optObj.translation,
								new: localTransform.position,
							};
						}
					}
					if(optObj.rotation){
						if( !compareJSON(optObj.rotation, localTransform.rotation) ){
							_change.rotation = {
								old: optObj.rotation,
								new: localTransform.rotation,
							};
						}
					}
					if(optObj.scale){
						if( !compareJSON(optObj.scale, localTransform.scale) ){
							_change.scale = {
								old: optObj.scale,
								new: localTransform.scale,
							};
						}
					}
					if(optObj.anchor){
						if( !compareJSON(optObj.anchor, localTransform.anchor) ){
							_change.anchor = {
								old: optObj.anchor,
								new: localTransform.anchor,
							};
						}
					}
				} break;
				case 'globaltransform':{
					let localTransform = getElemExpandedTransformFromCSSStyle(elem, this._precision);
					let globalTransform:IObject = localTransform.getGlobalTransform().toJSON();

					if(optObj.translation){
						if( !compareJSON(optObj.translation, globalTransform.position) ){
							_change.translation = {
								old: optObj.translation,
								new: globalTransform.position,
							};
						}
					}
					if(optObj.rotation){
						if( !compareJSON(optObj.rotation, globalTransform.rotation) ){
							_change.rotation = {
								old: optObj.rotation,
								new: globalTransform.rotation,
							};
						}
					}
					if(optObj.scale){
						if( !compareJSON(optObj.scale, globalTransform.scale) ){
							_change.scale = {
								old: optObj.scale,
								new: globalTransform.scale,
							};
						}
					}
					if(optObj.anchor){
						if( !compareJSON(optObj.anchor, globalTransform.anchor) ){
							_change.anchor = {
								old: optObj.anchor,
								new: globalTransform.anchor,
							};
						}
					}
				} break;
				case 'localmatrixtransform':{
					let localTransform:IObject = getElemTransformFromMatrix(elem, this._precision).toJSON();

					if(optObj.translation){
						if( !compareJSON(optObj.translation, localTransform.position) ){
							_change.translation = {
								old: optObj.translation,
								new: localTransform.position,
							};
						}
					}
					if(optObj.rotation){
						if( !compareJSON(optObj.rotation, localTransform.rotation) ){
							_change.rotation = {
								old: optObj.rotation,
								new: localTransform.rotation,
							};
						}
					}
					if(optObj.scale){
						if( !compareJSON(optObj.scale, localTransform.scale) ){
							_change.scale = {
								old: optObj.scale,
								new: localTransform.scale,
							};
						}
					}
					if(optObj.anchor){
						if( !compareJSON(optObj.anchor, localTransform.anchor) ){
							_change.anchor = {
								old: optObj.anchor,
								new: localTransform.anchor,
							};
						}
					}
				} break;
				case 'globalmatrixtransform':{
					let localTransform = getElemExpandedTransformFromMatrix(elem, this._precision);
					let globalTransform:IObject = localTransform.getGlobalTransform().toJSON();

					if(optObj.translation){
						if( !compareJSON(optObj.translation, globalTransform.position) ){
							_change.translation = {
								old: optObj.translation,
								new: globalTransform.position,
							};
						}
					}
					if(optObj.rotation){
						if( !compareJSON(optObj.rotation, globalTransform.rotation) ){
							_change.rotation = {
								old: optObj.rotation,
								new: globalTransform.rotation,
							};
						}
					}
					if(optObj.scale){
						if( !compareJSON(optObj.scale, globalTransform.scale) ){
							_change.scale = {
								old: optObj.scale,
								new: globalTransform.scale,
							};
						}
					}
					if(optObj.anchor){
						if( !compareJSON(optObj.anchor, globalTransform.anchor) ){
							_change.anchor = {
								old: optObj.anchor,
								new: globalTransform.anchor,
							};
						}
					}
				} break;
				default: break;
			}

			if(Object.keys(_change).length){
				entry.changes[optK] = _change;
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

	handleEntries(ents:ITransformObserverEntry[]){
		if(!_.isArray(ents)) return;
		try{
			this._callback(ents, this);
		}catch(err){
			console.log(err);
		}
		
		for(let ent of ents){
			if(!ent) return;
			this.emitSignal('transformChange',{
				changes: ent?.changes,
			},[ent.target]);
		}
	}

	processEntry(elem:Element, entry:ITransformObserverEntry, process:IProxyProcess){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		if(entry){
			for(let k of Object.keys(entry.changes)){
				let _change = entry.changes[k];

				for(let _k of Object.keys(_change)){
					if(_.isObject(_change[_k].new))
						proxy[k][_k] = Object.assign({},_change[_k].new);
					else
						proxy[k][_k] = _change[_k].new;
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

	observe(elem : Element|Element[], opts:IObject|string[]=defaultObserveOpts){
		let proxies:ITransformObserverProxy[] = [];

		if(opts instanceof Array){
			let arr = opts;
			opts = {};
			for(let k of arr){
				k = k.toLowerCase();
				opts[k] = true;
			}
		}
		if(opts instanceof Object == false) opts = defaultObserveOpts;

		if(elem instanceof Array){
			proxies = [];

			let arr = elem;
			for(let _elem of arr){
				let p = this.observe(_elem,opts);
				if(p) proxies.concat(p);
			}

		}else if(elem instanceof Element){
			let obsOpts = Object.assign({}, defaultObserveOpts);

			for(let k of Object.keys(opts)){
				k = k.toLowerCase();
				if(!(k in obsOpts)) continue;

				if(typeof opts[k] === 'boolean'){
					for(let _k of Object.keys(obsOpts[k])){
						_k = _k.toLowerCase();
						obsOpts[k][_k] = opts[k];
					}
				}else if(_.isArray(opts[k])){
					for(let _k of (opts[k])){
						_k = _k.toLowerCase();
						if(!(_k in obsOpts[k])) continue;
						obsOpts[k][_k] = true;
					}
				}else if(_.isObject(opts[k])){
					for(let _k of Object.keys(opts[k])){
						_k = _k.toLowerCase();
						if(!(_k in obsOpts[k])) continue;
						obsOpts[k][_k] = (opts[k][_k])?true:false;
					}
				}
			}

			let connectId = this.connectElement(elem);

			let proxy:ITransformObserverProxy = {
				id : connectId,
				_process:{
					processTime: this.elapsedFixedTime,
					logTime: new Date(),
				}
			};

			this._observedElements[proxy.id] = elem;

			//clean off
			for(let opt of Object.keys(obsOpts)){
				let isFalse = true;
				for(let k of Object.keys(obsOpts[opt])){
					if(obsOpts[opt][k] == true){
						isFalse = false;
					}else{
						delete obsOpts[opt][k];
					}
				}
				if(isFalse){
					delete obsOpts[opt];
				}
			}

			for(let opt of Object.keys(obsOpts)){
				opt = opt.toLowerCase();

				if(!proxy[opt]) proxy[opt] = {};
				
				let optObj = obsOpts[opt];

				switch(opt){
					case 'boundingrect':{

						let globalRect = getGlobalBoundingRect(elem);
						let localRect = getLocalBoundingRect(elem);
						if(optObj.globalposition || optObj.gp){
							proxy.boundingrect.globalposition = globalRect.position.toJSON() as IVector2;
						}
						if(optObj.localposition || optObj.lp){
							proxy.boundingrect.localposition = localRect.position.toJSON() as IVector2;
						}
						if(optObj.size || optObj.s){
							proxy.boundingrect.size = localRect.size.toJSON() as IVector2;
						}
					} break;

					case 'offsetrect':{

						let globalRect = getGlobalOffsetRect(elem);
						let localRect = getLocalOffsetRect(elem);
						if(optObj.globalposition || optObj.gp){
							proxy.offsetrect.globalposition = globalRect.position.toJSON() as IVector2;
						}
						if(optObj.localposition || optObj.lp){
							proxy.offsetrect.localposition = localRect.position.toJSON() as IVector2;
						}
						if(optObj.size || optObj.s){
							proxy.offsetrect.size = localRect.size.toJSON() as IVector2;
						}
					} break;

					case 'transform':
					case 'localtransform':{

						let precision = opts.precision || this._precision;
						let localtransform = getElemTransformFromCSSStyle(elem, precision);
						if(
							optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t
						){
							proxy.localtransform.translation = localtransform.position.toJSON() as IVector2;
						}
						if(
							optObj.scale || optObj.s || optObj.size
						){
							proxy.localtransform.scale = localtransform.scale.toJSON() as IVector2;
						}
						if(
							optObj.rotation || optObj.r || optObj.rotate
						){
							proxy.localtransform.rotation = localtransform.rotation;
						}
						if(
							optObj.anchor || optObj.a || optObj.origin
						){
							proxy.localtransform.anchor = localtransform.anchor.toJSON() as IVector2;
						}
					} break;

					case 'globaltransform':{

						let precision = opts.precision || this._precision;
						let localtransform = getElemExpandedTransformFromCSSStyle(elem, precision);

						let globaltransform = localtransform.getGlobalTransform();

						if(
							optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t
						){
							proxy.globaltransform.translation = globaltransform.position.toJSON() as IVector2;
						}
						if(
							optObj.scale || optObj.s || optObj.size
						){
							proxy.globaltransform.scale = globaltransform.scale.toJSON() as IVector2;
						}
						if(
							optObj.rotation || optObj.r || optObj.rotate
						){
							proxy.globaltransform.rotation = globaltransform.rotation;
						}
						if(
							optObj.anchor || optObj.a || optObj.origin
						){
							proxy.globaltransform.anchor = globaltransform.anchor.toJSON() as IVector2;
						}
					} break;

					case 'matrixtransform':
					case 'localmatrixtransform':{
						
						let precision = opts.precision || this._precision;
						let localtransform = getElemTransformFromMatrix(elem, precision);
						if(
							optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t
						){
							proxy.localmatrixtransform.translation = localtransform.position.toJSON() as IVector2;
						}
						if(
							optObj.scale || optObj.s || optObj.size
						){
							proxy.localmatrixtransform.scale = localtransform.scale.toJSON() as IVector2;
						}
						if(
							optObj.rotation || optObj.r || optObj.rotate
						){
							proxy.localmatrixtransform.rotation = localtransform.rotation;
						}
						if(
							optObj.anchor || optObj.a || optObj.origin
						){
							proxy.localmatrixtransform.anchor = localtransform.anchor.toJSON() as IVector2;
						}
					} break;

					case 'globalmatrixtransform':{
						
						let precision = opts.precision || this._precision;
						let localtransform = getElemExpandedTransformFromMatrix(elem, precision);
						let globaltransform = localtransform.getGlobalTransform();
						
						if(
							optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t
						){
							proxy.globalmatrixtransform.translation = globaltransform.position.toJSON() as IVector2;
						}
						if(
							optObj.scale || optObj.s || optObj.size
						){
							proxy.globalmatrixtransform.scale = globaltransform.scale.toJSON() as IVector2;
						}
						if(
							optObj.rotation || optObj.r || optObj.rotate
						){
							proxy.globalmatrixtransform.rotation = globaltransform.rotation;
						}
						if(
							optObj.anchor || optObj.a || optObj.origin
						){
							proxy.globalmatrixtransform.anchor = globaltransform.anchor.toJSON() as IVector2;
						}
					} break;

					default: break;
				}
			}

			this._proxies.set(elem, proxy);

			proxies = [proxy];
		}

		return proxies;
	}

	disconnect(elem : Element){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		delete this._observedElements[proxy.id];
		this.disconnectElement(elem);
		this._proxies.delete(elem);
	}
}