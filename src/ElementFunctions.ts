
import {Vector2, Vector2Line, Rect2, Transform2} from '@catsums/vector2';
import {
	getCSSValueInPixels, isInfinity, safeDivide, deg2rad, rad2deg,
} from '@catsums/my';

import SVGPathParser from 'svg-path-parser';

// import * as Geometric from 'geometric';
// import * as PolygonClipping from 'polygon-clipping';

export function compareJSON(a,b){
	return (JSON.stringify(a) === JSON.stringify(b));
}

export function getAnchor(elem : Element, opts={global:false}){

	let {global} = opts;

	let rect = getLocalOffsetRect(elem);
	if(global){
		rect = getGlobalOffsetRect(elem);
	}

	let compStyle = window.getComputedStyle(elem);

	let tOrigin = compStyle["transform-origin"].split(" ");

	let extents = rect.extents;

	let offset = new Vector2(extents);

	for(let i=0; i<tOrigin.length;i++){
		let val;
		if(!tOrigin[i]) continue;
		switch(tOrigin[i].toLowerCase()){
			case 'top': offset.y = extents.y * 0; break;
			case 'bottom': offset.y = extents.y * 2; break;
			case 'left': offset.x = extents.y * 0; break;
			case 'right': offset.x = extents.y * 2; break;
			case 'center':
				if(i==0) offset.x = extents.x;
				if(i==1) offset.y = extents.y;
				break;
			default:
				if(tOrigin[i].endsWith("%")){
					val = parseFloat(tOrigin[i])/100;
				}else{
					val = getCSSValueInPixels(tOrigin[i]);
				}
				if(i==0) offset.x = val;
				if(i==1) offset.y = val;
				
				break;
		}
	}

	let anchor = Vector2.ADD(rect.start, offset);

	return anchor;
}

export function getGlobalOffsetRect(elem : Element){
	let localRect = getLocalOffsetRect(elem);

	let globalRect = new Rect2(localRect);

	let parent = elem?.parentElement || null;
	if(parent && parent != document.body && parent != document.documentElement){
		let parentRect = getLocalOffsetRect(parent);

		globalRect.position = Vector2.ADD(
			parentRect.position, globalRect.position
		);
	}
	
	return globalRect;
}

export function getLocalOffsetRect(elem:Element){
	let localRect:Rect2;
	if(elem instanceof HTMLElement){
		localRect = new Rect2(
			elem.offsetLeft, elem.offsetTop, elem.offsetWidth, elem.offsetHeight
		);
	}else if(elem instanceof SVGGraphicsElement){
		let bbox = elem.getBBox();
		localRect = new Rect2(
			bbox.x, bbox.y, bbox.width, bbox.height
		);
	}else{
		localRect = getLocalBoundingRect(elem);
	}   

	return localRect;
}

export function getGlobalBoundingRect(elem:Element){
	let _rect = elem.getBoundingClientRect();
	let globalRect = new Rect2(
		_rect.x, _rect.y, _rect.width, _rect.height
	);

	return globalRect;
}

export function getLocalBoundingRect(elem : Element) : Rect2{

	let globalRect = getGlobalBoundingRect(elem);

	let compStyle = window.getComputedStyle(elem);

	let positionType = compStyle.position?.toLowerCase();

	let parentRect = new Rect2(Vector2.ZERO, Vector2.ZERO);

	switch( positionType ){
		case 'static':
		case 'relative':
		case 'absolute':
		case 'sticky':
			{
				let parent = elem?.parentElement || null;
				if(positionType == 'absolute'){
					while(parent && parent != elem && parent != document.body && parent != document.documentElement){
						let parentPosType = window.getComputedStyle(parent)?.position?.toLowerCase();
						if(parentPosType == "static"){
							parent = parent?.parentElement || null;
						}else{
							break;
						}
					}
				}
				if(parent){
					let prect = parent.getBoundingClientRect();
					parentRect = new Rect2(
						prect.x, prect.y, prect.width, prect.height
					); 
				}
			}break;
		case 'fixed':
			{
				let parent = elem.parentElement || null;
				if(parent){
					let prect = document.body?.getBoundingClientRect() || document.documentElement?.getBoundingClientRect() || null;
					parentRect = new Rect2(
						prect.x, prect.y, prect.width, prect.height
					); 
				}
			}break;
		default:
			break;
	}

	let localRect = new Rect2(
		Vector2.SUBTRACT(globalRect.position, parentRect.position),
		globalRect.size
	);

	return localRect;
}

export function roundTo(num : number, step:number){
	if(step == 0) return num;
	if(isInfinity(step)) return Infinity;
	let invStep = Math.pow(step,-1);
	let invMiniStep = Math.pow(step/10,-1);

	let initNum = Math.round(num * invMiniStep) / invMiniStep;

	let init = Math.round(initNum  * invStep) / invStep;
	// let res = init;
	let res = Math.round((init + Number.EPSILON)  * invStep) / invStep;

	return res;
}


///https://stackoverflow.com/a/16372587
export function deltaTransformPoint(matrix:number[], point:IVector2)  {

	var dx = point.x * matrix[0] + point.y * matrix[2] + 0;
	var dy = point.x * matrix[1] + point.y * matrix[3] + 0;
	return { x: dx, y: dy };
}export function decomposeMatrix(matrix:number[], _t=0) {

	// @see https://gist.github.com/2052247

	if(matrix?.length !== 6){
		matrix = [1,0,0,1,0,0];
	}

	// calculate delta transform point
	var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
	var py = deltaTransformPoint(matrix, { x: 1, y: 0 });

	//code to convert css transform into a matrix   

	let [a,b,c,d,tx,ty] = matrix;

	let det = (a*d)-(c*b);

	let sx = Math.sqrt( Math.pow(a,2) + Math.pow(b,2) );
	let sy = (det/sx);

	let r = Math.atan2(b,a);

	let kx = Math.tan(
		Math.atan2( ( (a*c)+(b*d) ), ( (a*a)+(b*b) ) )
	);
	let ky = Math.tan(0);

	return {
		translate: new Vector2( roundTo(tx,_t), roundTo(ty,_t) ),
		scale: new Vector2( roundTo(sx,_t),roundTo(sy,_t) ),
		skew: new Vector2( roundTo(kx,_t),roundTo(ky,_t) ),
		rotation: roundTo(r, _t/10), // rotation is the same as skew x
		// rotation: (Math.atan2(matrix[]))
	};		
}

///https://stackoverflow.com/a/35543016
export function parseCSSTransform(transform:string){
	//add sanity check
	return transform.split(/\(|,|\)/).slice(1,-1).map( function(v){
		return parseFloat(v);
	});
}
export function transformCSSCoord(transformArr:number[], v:IVector2){
	v = new Vector2(v);
	let x = v.x, y = v.y;
	//add sanity checks and default values	  
	if( transformArr.length == 6 ){
		//2D matrix //need some math to apply inverse of matrix
		var t = transformArr,
			det = t[0]*t[3] - t[1]*t[2];
		return new Vector2({
			x: safeDivide((  x*t[3] - y*t[2] + t[2]*t[5] - t[4]*t[3] ), det),
			y: safeDivide(( -x*t[1] + y*t[0] + t[4]*t[1] - t[0]*t[5] ), det)
		});
	}else{
		return v as Vector2;
	}
}

export function getElemExpandedTransformFromMatrix(elem : Element, _t=0){
	let localTransform = getElemTransformFromMatrix(elem,_t);

	if(elem != document.body && elem != document.documentElement){
		let parent = elem?.parentElement || null;

		if(parent && parent!=elem){
			let parentTransform = getElemExpandedTransformFromMatrix(parent, _t);
			parentTransform.addChild(localTransform);
		}
	}

	return localTransform;
}

export function getElemExpandedTransformFromCSSStyle(elem : Element, _t=0){
	let localTransform = getElemTransformFromCSSStyle(elem,_t);

	if(elem != document.body && elem != document.documentElement){
		let parent = elem?.parentElement || null;

		if(parent && parent!=elem){
			let parentTransform = getElemExpandedTransformFromCSSStyle(parent, _t);
			parentTransform.addChild(localTransform);
		}
	}

	return localTransform;
}

export function getElemTransformFromCSSStyle(elem:Element, _t=0){
	let compStyle = window.getComputedStyle(elem);

	let rect = getLocalOffsetRect(elem);
	let anchor = getAnchor(elem);

	let p, s, r;

	let cssTranslate = compStyle.translate.trim().split(' ');

	if(cssTranslate.length==1){
		let _x = parseFloat(compStyle.translate.split(' ')[0]);
		if(isNaN(_x)) _x = 0;
		p = new Vector2(_x,0);
	}else{
		let _x = parseFloat(compStyle.translate.split(' ')[0]);
		let _y = parseFloat(compStyle.translate.split(' ')[1]);
		if(isNaN(_x)) _x = 0;
		if(isNaN(_y)) _y = 0;

		p = new Vector2(_x,_y);
	}

	let cssRotate = compStyle.rotate.trim().split(' ');
	if(cssRotate.length==1){
		let _r = parseFloat(compStyle.rotate.split(' ')[0]);
		if(isNaN(_r)) _r = 0;
		r = deg2rad(_r);
	}else{
		r = 0;
	}

	let cssScale = compStyle.scale.trim().split(' ');
	if(cssScale.length==1){
		let _x = parseFloat(compStyle.scale.split(' ')[0]);
		if(isNaN(_x)) _x = 1;
		s = new Vector2(_x,_x);
	}else{
		let _x = parseFloat(compStyle.scale.split(' ')[0]);
		let _y = parseFloat(compStyle.scale.split(' ')[1]);
		if(isNaN(_x)) _x = 0;
		if(isNaN(_y)) _y = 0;

		s = new Vector2(_x,_y);
	}

	p = new Vector2(roundTo(p.x, _t), roundTo(p.y, _t));
	r = roundTo(r, (_t/10) );
	s = new Vector2(roundTo(s.x, _t), roundTo(s.y, _t));

	let transform = new Transform2(
		p, r, s, Vector2.ZERO, anchor
	);

	return transform;
}
export function getElemTransformFromMatrix(elem:Element,precision=0){
	let compStyle = window.getComputedStyle(elem);

	let parsedTrans = parseCSSTransform(compStyle["transform"]);
	if(!parsedTrans.length){
		parsedTrans = [1,0,0,1,0,0];
	}else if(parsedTrans.length==16){
		let t = parsedTrans;
		/* 
			matrix3d(
				a, b, 0, 0, 
				c, d, 0, 0, 
				0, 0, 1, 0, 
				tx, ty, 0, 1)
		*/
		parsedTrans = [
		   t[0], t[1], t[4], t[5], t[12], t[13]
		];
	}

	let [a,b,c,d,tx,ty] = parsedTrans;

	let det = (a*d)-(c*b);
	let decomp = decomposeMatrix(parsedTrans, precision);
	let {
		translate:p, rotation:r, scale:s, skew:k
	} = decomp;

	let rect = getLocalOffsetRect(elem);
	let anchor = getAnchor(elem);

	let transform = new Transform2(p,r,s,k,anchor);

	return transform;
	
}

/* 
	let ptrn = (/\((.*?)\)/g); //anything inbetween brackets
	let cssValueString = window.getComputedStyle(elem)['clip-path'];

	let cssBasicShapeStr;
	for(let s of cssValueString.split(' ')){
		if( s.includes('(') && s.includes(')') ){
			cssBasicShapeStr = s; break;
		}
	}

	let cssBS = cssBasicShapeStr.split('(');

	let shape = cssBS[0];
	let propsString = cssBS[1].replaceAll(')');

	let props = propsString;
	switch(shape){
		case "polygon":
			props = propsString.split(',');
			break;
		case "path":
			props = SVGPathParser.parseSVG(propsString);
			props = SVGPathParser.makeAbsolute(props);
			default:
				props = propsString.split(' ');
				break;
			}
			
			*/
			
declare global{
	type CSSShapeType = 'inset'|'circle'|'ellipse'|'path'|'rectangle'|'polygon'|'none';
}
export function getBasicShapeProps(cssValueString:string){
	//let ptrn = (/\((.*?)\)/g); ///anything inbetween brackets
	// let cssValueString = window.getComputedStyle(elem)['clip-path'];

	let cssBasicShapeStr = "";
	let _comps = cssValueString.split(' ');
	for(let s of _comps){
		if( s.includes('(')){
			cssBasicShapeStr = s; break;
		}
	}

	let cssBS = cssBasicShapeStr.split('(');
	let shape = cssBS[0] || "none";

	let propsString = cssValueString.split('(')[1]?.replaceAll(')','') || "";

	let props = [propsString];
	switch(shape){
		case "polygon":
			props = propsString.split(',');
			break;
		case "path":
			try{
				propsString = propsString.replaceAll(`"`,``);
				props = SVGPathParser.parseSVG(propsString);
				props = SVGPathParser.makeAbsolute(props);
			}catch(e){
				console.log(e);
				props = [];
			}
			break;
		default:
			props = propsString.split(' ');
			break;
	}

	props = props.map((prop)=>{
		if(prop) prop = prop.trim();
		return prop;
	});

	// MY.clog({shape,props});

	return [shape, props];
}


export function getElemPointsBasedOnBasicShape(elem : Element, shape : CSSShapeType, props:any[]=[], {transform=true, global=true, opts={}}){
	let rect:Rect2;
	if(global) rect = getGlobalOffsetRect(elem);
	else rect = getLocalOffsetRect(elem);

	let mTransform : Transform2, sTransform : Transform2;
	if(transform){
		mTransform = getElemTransformFromMatrix(elem);
		sTransform = getElemTransformFromCSSStyle(elem);
	}else{
		mTransform = new Transform2();
		sTransform = new Transform2();
	}

	let points = [];

	switch(shape){
		case 'inset':
			points = getPointsInset(rect, props, opts);
			points.push(new Vector2(points[0])); //closes it
			break;
		case 'circle': case 'ellipse':
			points = getPointsEllipse(rect, props, opts);
			points.push(new Vector2(points[0])); //closes it
			break;
		case 'polygon':
			points = getPointsPolygon(rect,props,opts);
			points.push(new Vector2(points[0])); //closes it
			break;
		case 'path':
			points = getPointsPath(rect, props, opts);
			break;
		default: //assume rectangle
			points = rect.getCorners();
			points.push(new Vector2(points[0])); //closes it
			break;
	}

	points = rect.clampPoints(points);
	let anchor = getAnchor(elem, {global:true});

	let newPoints = (points).map((pt)=>{
		return mTransform.applyTransform(pt, anchor);
	}).map((pt)=>{
		return sTransform.applyTransform(pt, anchor);
	});
	// let newPoints = points.map((pt)=>{
	// 	return sTransform.applyTransform(pt, sTransform.anchor);
	// });

	return newPoints;

}

export function getPointsPath(r : IRect, props=[], {increment=0.125, vertices=8}){
	if(!props?.length){
		if(props) props = [props];
		else props = [];
	}
	let rect = new Rect2(r);

	let pts:IVector2[] = []; let paths:IVector2[][] = [];

	for(let prop of props){
		if(!prop || !prop.command || !prop.code) continue;

		switch(prop.code){
			case 'V': case 'H':
			case 'L':{
				let pt = new Vector2(prop.x, prop.y);
				pts.push(pt);
			} break;
			case 'S':
			case 'C':{
				increment = Math.abs(increment);

				let _pts = Vector2.quadraticBezierPoints([
					new Vector2(prop.x0, prop.y0), 
					new Vector2(prop.x1, prop.y1),
					new Vector2(prop.x2, prop.y2),
					new Vector2(prop.x, prop.y),
				], increment);

				pts = pts.concat(_pts);

			} break;
			case 'T':
			case 'Q':{
				increment = Math.abs(increment);

				let _pts = Vector2.quadraticBezierPoints([
					new Vector2(prop.x0, prop.y0), 
					new Vector2(prop.x1, prop.y1),
					new Vector2(prop.x, prop.y),
				], increment);

				pts = pts.concat(_pts);

			} break;
			case 'A':{
				// let _radius = new Vector2(prop.rx, prop.ry);
				// let _start = new Vector2(prop.x0, prop.y0);
				// let _end = new Vector2(prop.x, prop.y);
				// let _angle = MY.deg2rad(prop.xAxisRotation);
				// let _arc = prop.largeArc;
				// let _sweep = prop.sweep;

				//Not implemented
				pts.push(prop.x, prop.y);

			} break;
			case 'Z':{
				pts.push(pts[0]);
			}	
			case 'M':{
				paths.push(pts);
				let pt = new Vector2(prop.x, prop.y);
				pts = [pt];
			} break;
		}
	}

	if(!paths.length) paths = [rect.getCorners()];
	let newPts:Vector2[] = [];
	for(let path of paths){
		for(let _pt of path){
			newPts.push(new Vector2(_pt));
		}
	}

	let t1 = new Transform2(new Vector2(rect.left,rect.top));
	newPts = newPts.map((pt)=>(t1.applyTranslate(pt)));

	// MY.clog({paths, newPts})

	return newPts;
}

export function getPointsPolygon(r:IRect, props=[], opts:Object){
	if(!props?.length){
		if(props) props = [props];
		else props = [];
	}
	let rect = new Rect2(r);

	let pts:Vector2[] = [];

	for(let prop of props){
		if(prop=='nonzero' || prop=='evenodd'){
			continue;
		}
		let ptsStr = prop.split(' ');
		if(ptsStr.length!=2) return rect.getCorners();

		let _x = (parseFloat(ptsStr[0]));
		let _y = (parseFloat(ptsStr[1]));

		if(ptsStr[0].includes('%')){
			_x = rect.width * (parseFloat(ptsStr[0])/100);
		}
		if(ptsStr[1].includes('%')){
			_y = rect.height * (parseFloat(ptsStr[1])/100);
		}
		let x = rect.left + _x;
		let y = rect.top + _y;

		pts.push(new Vector2(x,y));

	}

	return pts;
}

export function getPointsEllipse(r:IRect, props=[], {vertices=8}){
	if(!props?.length){
		if(props) props = [props];
		else props = [];
	}

	let rect = new Rect2(r);

	let rx, ry, cx, cy;

	let radVals = []; let posVals = []; let hasAt = false;
	for(let i=0; i<props.length; i++){
		let prop = props[i];
		if(prop == 'at'){
			hasAt = true;
			continue;
		}
		if(isNaN(parseFloat(prop))){
			if(hasAt) posVals.push(prop);
			else break;
		}
		if(hasAt) posVals.push(prop);
		else radVals.push(prop);
	}

	if(!radVals.length){ return rect.getCorners() }
	//radius
	{
		let val = parseFloat(radVals[0]);
		if(radVals[0].startsWith('%')){
			val = rect.width * (val/100);
		}
		rx = val;
	}
	if(radVals[1]){
		let val = parseFloat(radVals[1]);
		if(radVals[1].startsWith('%')){
			val = rect.height * (val/100);
		}
		ry = val;
	}else{ ry = rx; }
	//position
	if(!posVals.length){ cx = rect.center.x; cy = rect.center.y; }
	else{
		let val = parseFloat(posVals[0]);
		if(posVals[0].startsWith('%')){
			val = (rect.width  * (val/100));
		}else{
			val = val;
		}
		cx = val;

		val = parseFloat(posVals[1]);
		if(!posVals[1]){ val = cx; }
		else if(posVals[1].startsWith('%')){
			val = (rect.height  * (val/100));
			// MY.clog(val)
		}else{
			val = val;
		}
		cy = val;
	}

	// MY.clog({cx, cy})

	let pts:Vector2[] = []; let vertexCount = vertices ?? 10;
	if(vertexCount<4) vertexCount = 4;
	vertexCount = Math.trunc(Number(vertexCount));
	for(let i=0; i<vertexCount; i++){
		let angl = i * (Math.PI*2)/vertexCount;
		let pt = new Vector2(
			(rx) * Math.cos(angl), (ry) * Math.sin(angl)
		);
		pts.push(pt);
	}

	let t0 = new Transform2(new Vector2(cx,cy));
	let t1 = new Transform2(new Vector2(rect.left,rect.top));
	pts = pts.map((pt)=>(t1.applyTranslate(pt)))
	pts = pts.map((pt)=>(t0.applyTranslate(pt)));
	
	// pts = [new Vector2(cx,cy)];

	return pts;

}

export function getPointsInset(_rect:IRect, props=[], opts){
	if(!props?.length){
		if(props) props = [props];
		else props = [];
	}

	let rect = new Rect2(_rect);

	let t=0, l=0, r=0, b=0;
	let vals = [];
	for(let i=0; i<props.length; i++){
		let prop = props[i];
		if(isNaN(parseFloat(prop))) break;
		vals.push(prop);
	}
	
	switch(vals.length){
		case 1:{
			if(vals[0].endsWith('%')){
				let n = parseFloat(vals[0])/100;
				t = rect.top + (rect.height * n); l = rect.left + (rect.width * n);
				r = rect.right - (rect.width * n); b = rect.bottom  - (rect.height * n);
			}else{
				let n = parseFloat(vals[0]);
				t = rect.top + n; l = rect.left + n;
				r = rect.right - n; b = rect.bottom - n;
			}
		} break;
		case 2:{
			if(vals[0].endsWith('%')){
				let n = parseFloat(vals[0])/100;
				t = rect.top + (rect.height * n); b = rect.bottom - (rect.height * n);
			}else{
				let n = parseFloat(vals[0]);
				t = rect.top + n;  b = rect.bottom - n;
			}
			if(vals[1].endsWith('%')){
				let n = parseFloat(vals[1])/100;
				l = rect.left + (rect.width * n); r = rect.right - (rect.width * n);
			}else{
				let n = parseFloat(vals[1]);
				l = rect.left + n; r = rect.right - n;
			}
		} break;
		case 3:{
			if(vals[0].endsWith('%')) t = rect.top + (rect.height * ( parseFloat(vals[0])/100 ));
			else t = rect.top + ( parseFloat(vals[0]) );

			if(vals[1].endsWith('%')) {
				l = rect.left + (rect.width * ( parseFloat(vals[1])/100 ));
				r = rect.right - (rect.width * ( parseFloat(vals[1])/100 ));
			}
			else {
				l = rect.left + ( parseFloat(vals[1]) );
				r = rect.right - ( parseFloat(vals[1]) );
			}

			if(vals[2].endsWith('%')) b = rect.bottom - (rect.height * ( parseFloat(vals[2])/100 ));
			else b = rect.bottom + ( parseFloat(vals[2]) );
		} break;
		case 4:{
			if(vals[0].endsWith('%')) t = rect.top + (rect.height * ( parseFloat(vals[0])/100 ));
			else t = rect.top + ( parseFloat(vals[0]) );

			if(vals[1].endsWith('%')) r = rect.right - (rect.width * ( parseFloat(vals[1])/100 ));
			else r = rect.right - ( parseFloat(vals[1]) );

			if(vals[2].endsWith('%')) b = rect.bottom - (rect.height * ( parseFloat(vals[2])/100 ));
			else b = rect.bottom - ( parseFloat(vals[2]) );

			if(vals[3].endsWith('%')) l = rect.left + (rect.width * ( parseFloat(vals[3])/100 ));
			else l = rect.left + ( parseFloat(vals[3]) );
			
		} break;
		default:{
			t = rect.top; r = rect.right; b = rect.bottom; l = rect.left;
		}	break;
	}

	let newPts = new Rect2(l, t, (r-l),(b-t)).getCorners();

	return newPts;
}

// export function arePolygonsIntersecting(pA,pB, precision=Number.EPSILON){
// 	pA = pA.map((v)=>(new Vector2(v).asArray()));
// 	pB = pB.map((v)=>(new Vector2(v).asArray()));

// 	return (Geometric.polygonIntersectsPolygon(pA,pB, precision) || Geometric.polygonInPolygon(pA,pB,precision));
// }


export function isPointInsidePolygon(polygon:IVector2[], vec:IVector2){
	let arr = polygon.map(pt => new Vector2(pt));
	let len = arr.length;
	let v = new Vector2(vec);

	let rect = Rect2.from(arr);
	if(!rect.containsPoint(v)){
		return false;
	}

	let castLine = new Vector2Line(
		new Vector2(v), new Vector2(v.x + 1,v.y)
	);

	let intersects = [];

	for(let i=0; i<len; i++){
        let a = new Vector2(arr[i]);
        let b = new Vector2(arr[i+1]);

        let line = new Vector2Line(a,b);

		if(line.hasPoint(v)) return true;

		let intersect = line.intersect(castLine);

        if(intersect && intersect.x > v.x){
        	let rectAB = Rect2.from([a,b]);
        	if(rectAB.containsPoint(intersect)){
				intersects.push(intersect);
			}
        }
	}

	return ( intersects.length % 2 != 0 );
}

export function getPolygonIntersect(pA:IVector2[]|IVector2[][], pB:IVector2[]|IVector2[][], precision=Number.EPSILON){
	if( pA.every((v)=>(v instanceof Array)) ){
		let rects:IVector2[] = [];
		for(let _pA of pA as IVector2[][]){
			let _rect = getPolygonIntersect(_pA,pB);
			if(_rect){
				if(_rect instanceof Array) rects = rects.concat(_rect);
				// else if(_rect instanceof Rect2) rects.push(_rect);
			}
		}
		return rects;
	}else if( pB.every((v)=>(v instanceof Array)) ){
		let rects:IVector2[] = [];
		for(let _pB of pB as IVector2[][]){
			let _rect = getPolygonIntersect(pA,_pB);
			if(_rect){
				if(_rect instanceof Array) rects = rects.concat(_rect);
				// else if(_rect instanceof Rect2) rects.push(_rect);
			}
		}
		return rects;
	}else{

		let rectA = Rect2.from(pA as IVector2[]); let rectB = Rect2.from(pB as IVector2[]);
		let intersectRect = rectA.getIntersectWith(rectB, precision);

		if(!intersectRect) return null;

		let intersects:IVector2[] = [];

		for(let i=0; i<pA.length-1;i++){
			let aa = new Vector2(pA[i] as IVector2); let ab = new Vector2(pA[i+1] as IVector2);
			let lineA = new Vector2Line(aa,ab);
			let lineARect = Rect2.from([aa,ab]);

			for(let j=0; j<pB.length-1;j++){
				let ba = new Vector2(pB[j] as IVector2); let bb = new Vector2(pB[j+1] as IVector2);
				let lineB = new Vector2Line(ba,bb);
				let lineBRect = Rect2.from([ba,bb]);

				let v = lineB.intersect(lineA);
				if(!v) continue;

				if(lineBRect.containsPoint(v) && lineARect.containsPoint(v)){
					intersects.push(v);
				}
				
			}
			if(intersectRect.containsPoint(aa)){
				if(isPointInsidePolygon(pB as IVector2[], aa)){
					intersects.push(aa);
				}
			}
		}
		for(let j=0; j<pB.length-1;j++){
			let ba = new Vector2(pB[j] as IVector2);
			if(intersectRect.containsPoint(ba)){
				if(isPointInsidePolygon(pA as IVector2[], ba)){
					intersects.push(ba);
				}
			}
		}

		if(!intersects.length) return null;

		// let resRect = Rect2.from(intersects);
		// MY.clog({intersects})
		let resPolygon = (intersects);

		return resPolygon;

	}
}