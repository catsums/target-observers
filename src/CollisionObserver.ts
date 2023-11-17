///CollisionObserver.js

// import {Vector2, Rect2, Transform2} from '@catsums/vector2';
import {
	randomID,
} from '@catsums/my';

import { ProcessingTarget } from './ProcessingTarget';

import {
	compareJSON, 
	getGlobalOffsetRect, getLocalOffsetRect, getLocalBoundingRect, getGlobalBoundingRect, 
	getElemTransformFromCSSStyle, getElemTransformFromMatrix,
	getElemExpandedTransformFromMatrix, getElemExpandedTransformFromCSSStyle,
	getPolygonIntersect, getBasicShapeProps, getElemPointsBasedOnBasicShape,
} from './ElementFunctions';

import _ from "lodash";


/* 
let proxy = {
	id: String(ConnectId)
	collisionLayers: Array(String),
	targetLayers: Array(String),
	tolerance: Number
	currentColls: Array(String(ConnectId))
}
 */

let defaultObserveOpts : ICollisionObserverOpts = {
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


declare global{
	interface ICollisionObserverRectOpts {
		boundingrect?: boolean;
		offsetrect?: boolean;
		transformrect?: boolean;
		clippath?: boolean;
		shapeoutside?: boolean;
		svgshape?: boolean;
	}
	interface ICollisionObserverOpts {
		rects: ICollisionObserverRectOpts | string[];
		collisionLayers: (string|number)[];
		targetLayers: (string|number)[];
		targets?: Element[];
		tolerance?: number;
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

	interface ICollisionObserverProxy extends IObserverProxy{
		currentCollisions: ICollisionData[];
		rects: ICollisionObserverRectOpts;
		tolerance?: number;
		collision: {
			layers?: (string|number)[];
			targets?: Element[];
			targetLayers?: (string|number)[];
		};
	}

	interface ICollisionData {
		id?: string;
		targetID?: string;
		target?: Element;
		rect?: string;
		type?: CollisionType;
		layers?: (string|number)[];
		intersect?: IVector2 | IRect | IVector2[];
	}
	
	interface ICollisionObserverChange {
		globalposition?: IProxyChange<IVector2>;
		localposition?: IProxyChange<IVector2>;
		size?: IProxyChange<IVector2>;
		translation?: IProxyChange<IVector2>;
		rotation?: IProxyChange<number>;
		scale?: IProxyChange<IVector2>;
		anchor?: IProxyChange<IVector2>;
	}

	interface ICollisionObserverEntry {
		id: string;
		target: Element;
		collisions: ICollisionData[];
		process?: IProxyProcess;
	}
	
}

enum CollisionType {
	IN = 1, OUT = -1, CHANGE = 0
}

export class CollisionObserver extends ProcessingTarget{
	targetName = randomID('[CollisionObserver:',']');

	_precision = 0.001;
	_tolerance = 0.001;

	_observedElements:{[key:string] : Element} = {}; // {String(connectID):Element}
	_proxies = new Map<Element,ICollisionObserverProxy>(); // {String(connectID):ProxyObject} or Map({Element:ProxyObject})

	_collisionLayers:{[key:string|number] : string[]} = {}; // {String:String[connectID]}

	_entriesQueue = [];

	_callback = (entries:ICollisionObserverEntry[], obs:CollisionObserver) => {};

	public constructor(
		callback : (entries:ICollisionObserverEntry[], obs:CollisionObserver) => void, 
		opts? : {FPS?:number, frameTolerance?:number, precision?:number, tolerance?:number, active?:boolean}
	);

	constructor(callback=(entries:ICollisionObserverEntry[], obs:CollisionObserver) => {}, opts:IObject={}){
		
		let {FPS=12, frameTolerance=Math.sqrt(Math.E)/1000, active=false, precision=0.001, tolerance=0.001} = opts;
		
		super({FPS, frameTolerance, active});

		this._precision = precision;
		this._tolerance = tolerance;

		this._callback = callback;
	}

	onPhysicsProcess(delta:number){
		this.checkUpdates(Object.values(this._observedElements));
	}

	async checkUpdates(elements:Element[]){
		let entries = [];
		let promises = [];

		for(let elem of elements){
			promises.push(
				this.checkUpdate(elem)
			);
		}

		let results = await Promise.all(promises);

		for(let res of results){
			if(res && _.isObject(res)){
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

		let entry : ICollisionObserverEntry = {
			id: proxy.id,
			target: elem,
			collisions:[],
			// {target:Elem, type:CollisionType, layers:[String], intersect:Rect2, intersectPoints:[{x,y}]}
		}

		let targetLayers = proxy.collision.targetLayers;

		for(let _layer of targetLayers){
			let collLayer = this._collisionLayers[_layer];

			// clog({collLayer, _layer})

			if(!collLayer) continue;
			
			for(let targID of collLayer){
				let targElem = this._observedElements[targID];
				if(!targElem) continue;

				let targProxy = this._proxies.get(targElem);
				if(!targProxy) continue;

				let _collisionData : ICollisionData = {};

				// clog({targID, targElem, targProxy, rects:proxy.rects})

				for(let opt of Object.keys(proxy.rects)){
					if(!proxy.rects[opt]) continue;

					let existingCollData = entry.collisions.find( (collData) => (collData.target == targElem && collData.rect == opt) );
					if(existingCollData){
						existingCollData.layers.push(_layer);
						continue;
					}

					// clog({opt,existingCollData})

					switch(opt){
						case 'boundingrect':{
							
							let currRect = getGlobalBoundingRect(elem);
							let targRect = getGlobalBoundingRect(targElem);

							let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
							// clog({currRect, targRect, _intersect, opt})
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
							}else if(_intersect && !compareJSON (_intersect, proxy.currentCollisions.find( _c=>(_c.id == targID) ))){
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
							let currRect = getGlobalOffsetRect(elem);
							let targRect = getGlobalOffsetRect(targElem);

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
							}else if(_intersect && !compareJSON (_intersect, proxy.currentCollisions.find( _c=>(_c.id == targID) ))){
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
						case 'transformrect':{
							let currRect = getGlobalOffsetRect(elem);
							let targRect = getGlobalOffsetRect(targElem);

							let elemT0 = getElemTransformFromCSSStyle(elem, this._tolerance);
							let elemT1 = getElemTransformFromMatrix(elem, this._tolerance);

							let targT0 = getElemTransformFromCSSStyle(targElem, this._tolerance);
							let targT1 = getElemTransformFromMatrix(targElem, this._tolerance);

							let elemPts = currRect.getCorners().map((pt)=>{
								return elemT1.applyTransform(pt, elemT1.anchor);
							}).map((pt)=>{
								return elemT0.applyTransform(pt, elemT0.anchor);
							});

							let targPts = targRect.getCorners().map((pt)=>{
								return targT1.applyTransform(pt, targT1.anchor);
							}).map((pt)=>{
								return targT0.applyTransform(pt, targT0.anchor);
							});

							let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);

							if(_intersects && !proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.IN,
									layers:[_layer],
								}
								_collisionData.intersect = _intersects.map((v:any)=>(v.toJSON?.() ?? v));
							}else if(!_intersects && proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.OUT,
									layers:[_layer],
								}
								_collisionData.intersect = null;
							}else if(_intersects && !compareJSON (_intersects, proxy.currentCollisions.find( _c=>(_c.id == targID) ))){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.CHANGE,
									layers:[_layer],
								}
								_collisionData.intersect = _intersects.map((v:any)=>(v.toJSON?.() ?? v));
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

							let [elemClipPathShape, elemClipPathProps] = getBasicShapeProps(elemClipPath);
							let [targClipPathShape, targClipPathProps] = getBasicShapeProps(targClipPath);

							let elemPts = getElemPointsBasedOnBasicShape(elem, elemClipPathShape as CSSShapeType, elemClipPathProps as any[],{opts:{
								vertices: 8, increment: 0.125
							}});
							let targPts = getElemPointsBasedOnBasicShape(targElem, targClipPathShape as CSSShapeType, targClipPathProps as any[],{opts:{
								vertices: 8, increment: 0.125
							}});

							let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);

							if(_intersects && !proxy.currentCollisions.find( (_c)=>(_c.id == targID) )){
								_collisionData = {
									targetID: targID,
									target: targElem,
									rect: opt,
									type: CollisionType.IN,
									layers:[_layer],
								}
								_collisionData.intersect = _intersects.map((v:any)=>(v.toJSON?.() ?? v));
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
								if(!compareJSON (_intersects, _x?.intersect)){
									_collisionData = {
										targetID: targID,
										target: targElem,
										rect: opt,
										type: CollisionType.CHANGE,
										layers:[_layer],
									}
									_collisionData.intersect = _intersects.map((v:any)=>(v.toJSON?.() ?? v));
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

		// clog({entry})

		if(entry.collisions.length){
			return entry;
		}
		return null;

	}

	handleEntries(ents:ICollisionObserverEntry[]){
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

	processEntry(elem:Element, entry:ICollisionObserverEntry, process:IProxyProcess){
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

	observe(elem:Element|Element[], opts=defaultObserveOpts){
		let proxies:ICollisionObserverProxy[] = [];

		if(!_.isObject(opts)) opts = defaultObserveOpts;

		if(elem instanceof Array){
			let arr = elem;
			for(let _elem of arr){
				let p = this.observe(_elem,opts);
				if(p) proxies.concat(p);
			}
		}else if(elem instanceof Element){
			let obsOpts = Object.assign({}, defaultObserveOpts);

			//rects
			if(opts.rects instanceof Array){
				for(let r of opts.rects){
					r = r.toLowerCase();
					if(!(r in obsOpts.rects)) continue;
					
					obsOpts.rects[r] = true;
				}
			}else if(_.isObject(opts.rects)){
				for(let r of Object.keys(opts.rects)){
					r = r.toLowerCase();
					if(!(r in obsOpts.rects)) continue;

					obsOpts.rects[r] = opts.rects[r]?true:false;
				}
			} 

			//collisionlayers and collisionTargets
			if(_.isArray(opts.targets)){
				obsOpts.targets = opts.targets.filter( _targ => _targ instanceof Element );
			}
			if(_.isArray(opts.collisionLayers)){
				obsOpts.collisionLayers = opts.collisionLayers.map( _layer => `${_layer}` );
			}
			if(_.isArray(opts.targetLayers)){
				obsOpts.targetLayers = opts.targetLayers.map( _layer => `${_layer}` );
			}

			if(typeof opts.tolerance === 'number'){
				obsOpts.tolerance = opts.tolerance;
			}

			let connectId = this.connectElement(elem);

			let proxy:ICollisionObserverProxy = {
				id : connectId,
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

			proxies = [proxy];

		}

		return proxies;
	}

	disconnect(elem:Element){
		let proxy = this._proxies.get(elem);
		if(!proxy) return;

		delete this._observedElements[proxy.id];
		this.disconnectElement(elem);
		this._proxies.delete(elem);

		for(let _layer of proxy.collision?.layers){
			if(!this._collisionLayers[_layer]) continue;

			let ind = this._collisionLayers[_layer].indexOf(proxy.id);
			if(ind>=0){
				this._collisionLayers[_layer].splice(ind,1);
			}
		}
	}

}
