///CollisionObserver.js

import {Vector2, Rect2, Transform2} from '@catsums/vector2';
import * as MY from '@catsums/my';

// import SVGPathParser from 'svg-path-parser';
// import PolygonClipping from 'polygon-clipping';

import { ProcessingTarget } from './ProcessingTarget';

import * as EF from './ElementFunctions';

Object.entries(EF).forEach(([name, exported]) => window[name] = exported);


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
	rects:{
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
}

export const CollisionType = {
	IN:1, OUT:-1, CHANGE:0,
}

export class CollisionObserver extends ProcessingTarget{
	targetName = MY.randomID('[CollisionObserver:',']');

	_precision = 0.001;
	_tolerance = 0.001;

	_observedElements = {}; // {String(connectID):Element}
	_proxies = new Map(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})

	_collisionLayers = {}; // {String:String[connectID]}

	_entriesQueue = [];

	_callback = (entries, obs) => {};

	constructor(callback=this._callback, opts={}){
		super(opts);

		this._precision = opts?.precision || this._precision;
		this._tolerance = opts?.tolerance || this._tolerance;

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
			collisions:[],
			// {target:Elem, type:CollisionType, layers:[String], intersect:Rect2, intersectPoints:[{x,y}]}
		}

		let targetLayers = proxy.collision.targetLayers;

		for(let _layer of targetLayers){
			let collLayer = this._collisionLayers[_layer];

			// MY.clog({collLayer, _layer})

			if(!collLayer) continue;
			
			for(let targID of collLayer){
				let targElem = this._observedElements[targID];
				if(!targElem) continue;
				let targProxy = this._proxies.get(targElem);
				if(!targProxy) continue;

				let _collisionData = {};

				// MY.clog({targID, targElem, targProxy, rects:proxy.rects})

				for(let opt of Object.keys(proxy.rects)){
					if(!proxy.rects[opt]) continue;

					let existingCollData = entry.collisions.find( (collData) => (collData.target == targElem && collData.rect == opt) );
					if(existingCollData){
						existingCollData.layers.push(_layer);
						continue;
					}

					// MY.clog({opt,existingCollData})

					switch(opt){
						case 'boundingrect':{
							
							let currRect = EF.getGlobalBoundingRect(elem);
							let targRect = EF.getGlobalBoundingRect(targElem);

							let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
							// MY.clog({currRect, targRect, _intersect, opt})
							if( _intersect && !proxy.currentCollisions.find( (_c)=>(_c.id == targID) ) ){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.IN,
									layers:[_layer],
								}
								_collisionData.intersect = _intersect.toJSON();
							}else if(!_intersect && proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.OUT,
									layers:[_layer],
								}
								_collisionData.intersect = null;
							}else if(_intersect && !EF.compareJSON (_intersect, proxy.currentCollisions.find( _c=>(_c.id == targID) ))){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.CHANGE,
									layers:[_layer],
								}
								_collisionData.intersect = _intersect.toJSON();
							}

						} break;
						case 'offsetrect':{
							let currRect = EF.getGlobalOffsetRect(elem);
							let targRect = EF.getGlobalOffsetRect(targElem);

							let _intersect = currRect.getIntersectWith(targRect, this._tolerance);

							if(_intersect && !proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.IN,
									layers:[_layer],
								}
								_collisionData.intersect = _intersect.toJSON();
							}else if(!_intersect && proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.OUT,
									layers:[_layer],
								}
								_collisionData.intersect = null;
							}else if(_intersect && !EF.compareJSON (_intersect, proxy.currentCollisions.find( _c=>(_c.id == targID) ))){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.CHANGE,
									layers:[_layer],
								}
								_collisionData.intersect = _intersect.toJSON();
							}

						} break;
						case 'shapeoutside':
						case 'clippath':{

							let sOpt = 'clippath';
							if(opt == 'clippath') sOpt = 'clip-path';
							if(opt == 'shapeoutside') sOpt = 'shape-outside';

							//check polygon
							let elemClipPath = window.getComputedStyle(elem)[sOpt];
							let targClipPath = window.getComputedStyle(targElem)[sOpt];

							let [elemClipPathShape, elemClipPathProps] = EF.getBasicShapeProps(elemClipPath);
							let [targClipPathShape, targClipPathProps] = EF.getBasicShapeProps(targClipPath);

							let elemPts = EF.getElemPointsBasedOnBasicShape(elem, elemClipPathShape, elemClipPathProps,{},{
								vertices: 8, increment: 0.125
							});
							let targPts = EF.getElemPointsBasedOnBasicShape(targElem, targClipPathShape, targClipPathProps,{},{
								vertices: 8, increment: 0.125
							});

							let _intersects = EF.getPolygonIntersect(elemPts, targPts, this._precision);

							if(_intersects && !proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.IN,
									layers:[_layer],
								}
								_collisionData.intersect = _intersects.map((v)=>(v.toJSON?.() ?? v));
							}else if(!_intersects &&proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.OUT,
									layers:[_layer],
								}
								_collisionData.intersect = null;
							}else if(_intersects){
								let _x = proxy.currentCollisions.find( _c=>(_c.id == targID) );
								if(!EF.compareJSON (_intersects, _x?.intersect)){
									_collisionData = {
										targetID: targID,
										target: targElem,
										rect: opt,
										type: CollisionType.CHANGE,
										layers:[_layer],
									}
									_collisionData.intersect = _intersects.map((v)=>(v.toJSON?.() ?? v));
								}
								
							}

						} break;
						default: break;
					}
				}

				if(Object.keys(_collisionData).length){
					entry.collisions.push(_collisionData);
				}

			}
		}

		this.processEntry(elem, entry,{
			processTime: processTime,
			logTime: new Date(),
		});

		// MY.clog({entry})

		if(entry.collisions.length){
			return entry;
		}
		return null;

	}

	handleEntries(ents){
		this._callback(ents, this);

		let obs = this;

		ents.forEach((ent) => {
			ent.collisions.forEach((collData)=>{
				if(!collData) return;
				switch(collData.type){
					case CollisionType.IN:{
						obs.emitSignal('collisionIn',{
							collisionData: collData,
						},[ent.target]);
					} break;
					case CollisionType.OUT:{
						obs.emitSignal('collisionOut',{
							collisionData: collData,
						},[ent.target]);
					} break;
					case CollisionType.CHANGE:{
						obs.emitSignal('collisionChange',{
							collisionData: collData,
						},[ent.target]);
					} break;
				}
				obs.emitSignal('collision',{
					collisionData: collData,
				},[ent.target]);
			});
		});
	}

	processEntry(elem, entry, process){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		if(entry){
			for(let collData of entry.collisions){
				let targID = collData.targetID;

				if(collData.type == CollisionType.IN){
					proxy.currentCollisions.push({
						id: targID,
						intersect: collData.intersect,
						rect: collData.rect,
					});
				}else if(collData.type == CollisionType.OUT){
					let _coll = proxy.currentCollisions.find((_c)=>(_c.id == targID));
					let ind = proxy.currentCollisions.indexOf(_coll);

					proxy.currentCollisions.splice(ind,1);
				}else if(collData.type == CollisionType.CHANGE){
					let _coll = proxy.currentCollisions.find((_c)=>(_c.id == targID));
					Object.assign(_coll,{
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
			}
		}

		proxy._process.processTime = process.processTime;
		proxy._process.logTime = process.logTime;
	}

	observe(elem, opts=defaultObserveOpts){
		let proxies = null;

		if(!MY.isObject(opts)) opts = defaultObserveOpts;

		if(MY.isArray(elem)){
			proxies = [];

			let arr = elem;
			for(let _elem of arr){
				let p = this.observe(_elem,opts);
				if(p) proxies.push(p);
			}
		}else if(elem instanceof Element){
			let obsOpts = Object.assign({}, defaultObserveOpts);

			//rects
			if(MY.isArray(opts.rects)){
				for(let r of opts.rects){
					r = r.toLowerCase();
					if(!(r in obsOpts.rects)) continue;
					
					obsOpts.rects[r] = true;
				}
			}else if(MY.isObject(opts.rects)){
				for(let r of Object.keys(opts.rects)){
					r = r.toLowerCase();
					if(!(r in obsOpts.rects)) continue;

					obsOpts.rects[r] = opts.rects[r]?true:false;
				}
			} 

			//collisionlayers and collisionTargets
			if(MY.isArray(opts.targets)){
				obsOpts.targets = opts.targets.filter( _targ => _targ instanceof Element );
			}
			if(MY.isArray(opts.collisionLayers)){
				obsOpts.collisionLayers = opts.collisionLayers.map( _layer => `${_layer}` );
			}
			if(MY.isArray(opts.targetLayers)){
				obsOpts.targetLayers = opts.targetLayers.map( _layer => `${_layer}` );
			}

			if(MY.isNumber(opts.tolerance)){
				obsOpts.tolerance = opts.tolerance;
			}

			this.connectElement(elem);

			let proxy = {
				id : elem.dataset?.connectId || elem.connectId,
				_process:{
					processTime: this.elapsedFixedTime,
					logTime: new Date(),
				},
				currentCollisions: [],
				rects: {},
				tolerance:0,
				collision:{},
			};

			this._observedElements[proxy.id] = elem;

			for(let k of Object.keys(obsOpts.rects)){
				if(obsOpts.rects[k] == false){
					delete obsOpts.rects[k];
				}else{
					k = k.toLowerCase();
					proxy.rects[k] = obsOpts.rects[k] ? true : false;
				}
			}

			for(let _layer of obsOpts.collisionLayers){
				if(!(_layer in this._collisionLayers)){
					this._collisionLayers[_layer] = [];
				}
				this._collisionLayers[_layer].push(proxy.id);
			}

			proxy.collision = {
				layers: obsOpts.collisionLayers,
				targets: obsOpts.targets,
				targetLayers: obsOpts.targetLayers,
			}
			proxy.tolerance = obsOpts.tolerance;

			this._proxies.set(elem, proxy);

			proxies = proxy;

		}

		return proxies;
	}

	disconnect(elem){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		delete this._observedElements[proxy.id];
		this.disconnectElement(elem);
		this._proxies.delete(elem);

		for(let _layer of proxy.collision?.layers){
			if(!this._collisionLayers[_layer]) continue;

			let ind = this._collisionLayers[_layer].indexOf(elem);
			if(ind>=0){
				this._collisionLayers[_layer].splice(ind,1);
			}
		}
	}

}
