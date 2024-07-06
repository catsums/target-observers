var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Vector2, Vector2Line, Rect2, Transform2 } from "@catsums/vector2";
import {
  getCSSValueInPixels,
  isInfinity,
  safeDivide,
  deg2rad
} from "@catsums/my";
import SVGPathParser from "svg-path-parser";
function compareJSON(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
__name(compareJSON, "compareJSON");
function getAnchor(elem, opts = { global: false }) {
  let { global } = opts;
  let rect = getLocalOffsetRect(elem);
  if (global) {
    rect = getGlobalOffsetRect(elem);
  }
  let compStyle = window.getComputedStyle(elem);
  let tOrigin = compStyle["transform-origin"].split(" ");
  let extents = rect.extents;
  let offset = new Vector2(extents);
  for (let i = 0; i < tOrigin.length; i++) {
    let val;
    if (!tOrigin[i])
      continue;
    switch (tOrigin[i].toLowerCase()) {
      case "top":
        offset.y = extents.y * 0;
        break;
      case "bottom":
        offset.y = extents.y * 2;
        break;
      case "left":
        offset.x = extents.y * 0;
        break;
      case "right":
        offset.x = extents.y * 2;
        break;
      case "center":
        if (i == 0)
          offset.x = extents.x;
        if (i == 1)
          offset.y = extents.y;
        break;
      default:
        if (tOrigin[i].endsWith("%")) {
          val = parseFloat(tOrigin[i]) / 100;
        } else {
          val = getCSSValueInPixels(tOrigin[i]);
        }
        if (i == 0)
          offset.x = val;
        if (i == 1)
          offset.y = val;
        break;
    }
  }
  let anchor = Vector2.ADD(rect.start, offset);
  return anchor;
}
__name(getAnchor, "getAnchor");
function getGlobalOffsetRect(elem) {
  let localRect = getLocalOffsetRect(elem);
  let globalRect = new Rect2(localRect);
  let parent = elem?.parentElement || null;
  if (parent && parent != document.body && parent != document.documentElement) {
    let parentRect = getLocalOffsetRect(parent);
    globalRect.position = Vector2.ADD(
      parentRect.position,
      globalRect.position
    );
  }
  return globalRect;
}
__name(getGlobalOffsetRect, "getGlobalOffsetRect");
function getLocalOffsetRect(elem) {
  let localRect;
  if (elem instanceof HTMLElement) {
    localRect = new Rect2(
      elem.offsetLeft,
      elem.offsetTop,
      elem.offsetWidth,
      elem.offsetHeight
    );
  } else if (elem instanceof SVGGraphicsElement) {
    let bbox = elem.getBBox();
    localRect = new Rect2(
      bbox.x,
      bbox.y,
      bbox.width,
      bbox.height
    );
  } else {
    localRect = getLocalBoundingRect(elem);
  }
  return localRect;
}
__name(getLocalOffsetRect, "getLocalOffsetRect");
function getGlobalBoundingRect(elem) {
  let _rect = elem.getBoundingClientRect();
  let globalRect = new Rect2(
    _rect.x,
    _rect.y,
    _rect.width,
    _rect.height
  );
  return globalRect;
}
__name(getGlobalBoundingRect, "getGlobalBoundingRect");
function getLocalBoundingRect(elem) {
  let globalRect = getGlobalBoundingRect(elem);
  let compStyle = window.getComputedStyle(elem);
  let positionType = compStyle.position?.toLowerCase();
  let parentRect = new Rect2(Vector2.ZERO, Vector2.ZERO);
  switch (positionType) {
    case "static":
    case "relative":
    case "absolute":
    case "sticky":
      {
        let parent = elem?.parentElement || null;
        if (positionType == "absolute") {
          while (parent && parent != elem && parent != document.body && parent != document.documentElement) {
            let parentPosType = window.getComputedStyle(parent)?.position?.toLowerCase();
            if (parentPosType == "static") {
              parent = parent?.parentElement || null;
            } else {
              break;
            }
          }
        }
        if (parent) {
          let prect = parent.getBoundingClientRect();
          parentRect = new Rect2(
            prect.x,
            prect.y,
            prect.width,
            prect.height
          );
        }
      }
      break;
    case "fixed":
      {
        let parent = elem.parentElement || null;
        if (parent) {
          let prect = document.body?.getBoundingClientRect() || document.documentElement?.getBoundingClientRect() || null;
          parentRect = new Rect2(
            prect.x,
            prect.y,
            prect.width,
            prect.height
          );
        }
      }
      break;
    default:
      break;
  }
  let localRect = new Rect2(
    Vector2.SUBTRACT(globalRect.position, parentRect.position),
    globalRect.size
  );
  return localRect;
}
__name(getLocalBoundingRect, "getLocalBoundingRect");
function roundTo(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo, "roundTo");
function deltaTransformPoint(matrix, point) {
  var dx = point.x * matrix[0] + point.y * matrix[2] + 0;
  var dy = point.x * matrix[1] + point.y * matrix[3] + 0;
  return { x: dx, y: dy };
}
__name(deltaTransformPoint, "deltaTransformPoint");
function decomposeMatrix(matrix, _t = 0) {
  if (matrix?.length !== 6) {
    matrix = [1, 0, 0, 1, 0, 0];
  }
  var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
  var py = deltaTransformPoint(matrix, { x: 1, y: 0 });
  let [a, b, c, d, tx, ty] = matrix;
  let det = a * d - c * b;
  let sx = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  let sy = det / sx;
  let r = Math.atan2(b, a);
  let kx = Math.tan(
    Math.atan2(a * c + b * d, a * a + b * b)
  );
  let ky = Math.tan(0);
  return {
    translate: new Vector2(roundTo(tx, _t), roundTo(ty, _t)),
    scale: new Vector2(roundTo(sx, _t), roundTo(sy, _t)),
    skew: new Vector2(roundTo(kx, _t), roundTo(ky, _t)),
    rotation: roundTo(r, _t / 10)
    // rotation is the same as skew x
    // rotation: (Math.atan2(matrix[]))
  };
}
__name(decomposeMatrix, "decomposeMatrix");
function parseCSSTransform(transform) {
  return transform.split(/\(|,|\)/).slice(1, -1).map(function(v) {
    return parseFloat(v);
  });
}
__name(parseCSSTransform, "parseCSSTransform");
function transformCSSCoord(transformArr, v) {
  v = new Vector2(v);
  let x = v.x, y = v.y;
  if (transformArr.length == 6) {
    var t = transformArr, det = t[0] * t[3] - t[1] * t[2];
    return new Vector2({
      x: safeDivide(x * t[3] - y * t[2] + t[2] * t[5] - t[4] * t[3], det),
      y: safeDivide(-x * t[1] + y * t[0] + t[4] * t[1] - t[0] * t[5], det)
    });
  } else {
    return v;
  }
}
__name(transformCSSCoord, "transformCSSCoord");
function getElemExpandedTransformFromMatrix(elem, _t = 0) {
  let localTransform = getElemTransformFromMatrix(elem, _t);
  if (elem != document.body && elem != document.documentElement) {
    let parent = elem?.parentElement || null;
    if (parent && parent != elem) {
      let parentTransform = getElemExpandedTransformFromMatrix(parent, _t);
      parentTransform.addChild(localTransform);
    }
  }
  return localTransform;
}
__name(getElemExpandedTransformFromMatrix, "getElemExpandedTransformFromMatrix");
function getElemExpandedTransformFromCSSStyle(elem, _t = 0) {
  let localTransform = getElemTransformFromCSSStyle(elem, _t);
  if (elem != document.body && elem != document.documentElement) {
    let parent = elem?.parentElement || null;
    if (parent && parent != elem) {
      let parentTransform = getElemExpandedTransformFromCSSStyle(parent, _t);
      parentTransform.addChild(localTransform);
    }
  }
  return localTransform;
}
__name(getElemExpandedTransformFromCSSStyle, "getElemExpandedTransformFromCSSStyle");
function getElemTransformFromCSSStyle(elem, _t = 0) {
  let compStyle = window.getComputedStyle(elem);
  let rect = getLocalOffsetRect(elem);
  let anchor = getAnchor(elem);
  let p, s, r;
  let cssTranslate = compStyle.translate.trim().split(" ");
  if (cssTranslate.length == 1) {
    let _x = parseFloat(compStyle.translate.split(" ")[0]);
    if (isNaN(_x))
      _x = 0;
    p = new Vector2(_x, 0);
  } else {
    let _x = parseFloat(compStyle.translate.split(" ")[0]);
    let _y = parseFloat(compStyle.translate.split(" ")[1]);
    if (isNaN(_x))
      _x = 0;
    if (isNaN(_y))
      _y = 0;
    p = new Vector2(_x, _y);
  }
  let cssRotate = compStyle.rotate.trim().split(" ");
  if (cssRotate.length == 1) {
    let _r = parseFloat(compStyle.rotate.split(" ")[0]);
    if (isNaN(_r))
      _r = 0;
    r = deg2rad(_r);
  } else {
    r = 0;
  }
  let cssScale = compStyle.scale.trim().split(" ");
  if (cssScale.length == 1) {
    let _x = parseFloat(compStyle.scale.split(" ")[0]);
    if (isNaN(_x))
      _x = 1;
    s = new Vector2(_x, _x);
  } else {
    let _x = parseFloat(compStyle.scale.split(" ")[0]);
    let _y = parseFloat(compStyle.scale.split(" ")[1]);
    if (isNaN(_x))
      _x = 0;
    if (isNaN(_y))
      _y = 0;
    s = new Vector2(_x, _y);
  }
  p = new Vector2(roundTo(p.x, _t), roundTo(p.y, _t));
  r = roundTo(r, _t / 10);
  s = new Vector2(roundTo(s.x, _t), roundTo(s.y, _t));
  let transform = new Transform2(
    p,
    r,
    s,
    Vector2.ZERO,
    anchor
  );
  return transform;
}
__name(getElemTransformFromCSSStyle, "getElemTransformFromCSSStyle");
function getElemTransformFromMatrix(elem, precision = 0) {
  let compStyle = window.getComputedStyle(elem);
  let parsedTrans = parseCSSTransform(compStyle["transform"]);
  if (!parsedTrans.length) {
    parsedTrans = [1, 0, 0, 1, 0, 0];
  } else if (parsedTrans.length == 16) {
    let t = parsedTrans;
    parsedTrans = [
      t[0],
      t[1],
      t[4],
      t[5],
      t[12],
      t[13]
    ];
  }
  let [a, b, c, d, tx, ty] = parsedTrans;
  let det = a * d - c * b;
  let decomp = decomposeMatrix(parsedTrans, precision);
  let {
    translate: p,
    rotation: r,
    scale: s,
    skew: k
  } = decomp;
  let rect = getLocalOffsetRect(elem);
  let anchor = getAnchor(elem);
  let transform = new Transform2(p, r, s, k, anchor);
  return transform;
}
__name(getElemTransformFromMatrix, "getElemTransformFromMatrix");
function getBasicShapeProps(cssValueString) {
  let cssBasicShapeStr = "";
  let _comps = cssValueString.split(" ");
  for (let s of _comps) {
    if (s.includes("(")) {
      cssBasicShapeStr = s;
      break;
    }
  }
  let cssBS = cssBasicShapeStr.split("(");
  let shape = cssBS[0] || "none";
  let propsString = cssValueString.split("(")[1]?.replaceAll(")", "") || "";
  let props = [propsString];
  switch (shape) {
    case "circle":
    case "polygon":
      props = propsString.split(",");
      break;
    case "path":
      try {
        propsString = propsString.replaceAll(`"`, ``);
        props = SVGPathParser.parseSVG(propsString);
        props = SVGPathParser.makeAbsolute(props);
      } catch (e) {
        console.log(e);
        props = [];
      }
      break;
    default:
      props = propsString.split(" ");
      break;
  }
  props = props.map((prop) => {
    if (prop)
      prop = prop.trim();
    return prop;
  });
  return [shape, props];
}
__name(getBasicShapeProps, "getBasicShapeProps");
function getElemPointsBasedOnBasicShape(elem, shape, props = [], { transform = true, global = true, opts = {} }) {
  let rect;
  if (global)
    rect = getGlobalOffsetRect(elem);
  else
    rect = getLocalOffsetRect(elem);
  let mTransform, sTransform;
  if (transform) {
    mTransform = getElemTransformFromMatrix(elem);
    sTransform = getElemTransformFromCSSStyle(elem);
  } else {
    mTransform = new Transform2();
    sTransform = new Transform2();
  }
  let points = [];
  switch (shape) {
    case "inset":
      points = getPointsInset(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "circle":
    case "ellipse":
      points = getPointsEllipse(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "polygon":
      points = getPointsPolygon(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "path":
      points = getPointsPath(rect, props, opts);
      break;
    default:
      points = rect.getCorners();
      points.push(new Vector2(points[0]));
      break;
  }
  let clampedPoints = rect.clampPoints(points);
  let anchor = getAnchor(elem, { global: true });
  let newPoints = clampedPoints.map((pt) => {
    return mTransform.applyTransform(pt, anchor);
  }).map((pt) => {
    return sTransform.applyTransform(pt, anchor);
  });
  return newPoints;
}
__name(getElemPointsBasedOnBasicShape, "getElemPointsBasedOnBasicShape");
function getPointsPath(r, props = [], { increment = 0.125, vertices = 8 }) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let pts = [];
  let paths = [];
  for (let prop of props) {
    if (!prop || !prop.command || !prop.code)
      continue;
    switch (prop.code) {
      case "V":
      case "H":
      case "L":
        {
          let pt = new Vector2(prop.x, prop.y);
          pts.push(pt);
        }
        break;
      case "S":
      case "C":
        {
          increment = Math.abs(increment);
          let _pts = Vector2.quadraticBezierPoints([
            new Vector2(prop.x0, prop.y0),
            new Vector2(prop.x1, prop.y1),
            new Vector2(prop.x2, prop.y2),
            new Vector2(prop.x, prop.y)
          ], increment);
          pts = pts.concat(_pts);
        }
        break;
      case "T":
      case "Q":
        {
          increment = Math.abs(increment);
          let _pts = Vector2.quadraticBezierPoints([
            new Vector2(prop.x0, prop.y0),
            new Vector2(prop.x1, prop.y1),
            new Vector2(prop.x, prop.y)
          ], increment);
          pts = pts.concat(_pts);
        }
        break;
      case "A":
        {
          pts.push(prop.x, prop.y);
        }
        break;
      case "Z": {
        pts.push(pts[0]);
      }
      case "M":
        {
          paths.push(pts);
          let pt = new Vector2(prop.x, prop.y);
          pts = [pt];
        }
        break;
    }
  }
  if (!paths.length)
    paths = [rect.getCorners()];
  let newPts = [];
  for (let path of paths) {
    for (let _pt of path) {
      newPts.push(new Vector2(_pt));
    }
  }
  let t1 = new Transform2(new Vector2(rect.left, rect.top));
  newPts = newPts.map((pt) => t1.applyTranslate(pt));
  return newPts;
}
__name(getPointsPath, "getPointsPath");
function getPointsPolygon(r, props = [], opts) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let pts = [];
  for (let prop of props) {
    if (prop == "nonzero" || prop == "evenodd") {
      continue;
    }
    let ptsStr = prop.split(" ");
    if (ptsStr.length != 2)
      return rect.getCorners();
    let _x = parseFloat(ptsStr[0]);
    let _y = parseFloat(ptsStr[1]);
    if (ptsStr[0].includes("%")) {
      _x = rect.width * (parseFloat(ptsStr[0]) / 100);
    }
    if (ptsStr[1].includes("%")) {
      _y = rect.height * (parseFloat(ptsStr[1]) / 100);
    }
    let x = rect.left + _x;
    let y = rect.top + _y;
    pts.push(new Vector2(x, y));
  }
  return pts;
}
__name(getPointsPolygon, "getPointsPolygon");
function getPointsEllipse(r, props = [], { vertices = 8 }) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let rx, ry, cx, cy;
  let radVals = [];
  let posVals = [];
  let hasAt = false;
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (prop == "at") {
      hasAt = true;
      continue;
    }
    if (isNaN(parseFloat(prop))) {
      if (hasAt)
        posVals.push(prop);
      else
        break;
    }
    if (hasAt)
      posVals.push(prop);
    else
      radVals.push(prop);
  }
  if (!radVals.length) {
    return rect.getCorners();
  }
  {
    let val = parseFloat(radVals[0]);
    if (radVals[0].startsWith("%")) {
      val = rect.width * (val / 100);
    }
    rx = val;
  }
  if (radVals[1]) {
    let val = parseFloat(radVals[1]);
    if (radVals[1].startsWith("%")) {
      val = rect.height * (val / 100);
    }
    ry = val;
  } else {
    ry = rx;
  }
  if (!posVals.length) {
    cx = rect.center.x;
    cy = rect.center.y;
  } else {
    let val = parseFloat(posVals[0]);
    if (posVals[0].startsWith("%")) {
      val = rect.width * (val / 100);
    } else {
      val = val;
    }
    cx = val;
    val = parseFloat(posVals[1]);
    if (!posVals[1]) {
      val = cx;
    } else if (posVals[1].startsWith("%")) {
      val = rect.height * (val / 100);
    } else {
      val = val;
    }
    cy = val;
  }
  let pts = [];
  let vertexCount = vertices ?? 10;
  if (vertexCount < 4)
    vertexCount = 4;
  vertexCount = Math.trunc(Number(vertexCount));
  for (let i = 0; i < vertexCount; i++) {
    let angl = i * (Math.PI * 2) / vertexCount;
    let pt = new Vector2(
      rx * Math.cos(angl),
      ry * Math.sin(angl)
    );
    pts.push(pt);
  }
  let t0 = new Transform2(new Vector2(cx, cy));
  pts = pts.map((pt) => t0.applyTranslate(pt));
  return pts;
}
__name(getPointsEllipse, "getPointsEllipse");
function getPointsInset(_rect, props = [], opts) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(_rect);
  let t = 0, l = 0, r = 0, b = 0;
  let vals = [];
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (isNaN(parseFloat(prop)))
      break;
    vals.push(prop);
  }
  switch (vals.length) {
    case 1:
      {
        if (vals[0].endsWith("%")) {
          let n = parseFloat(vals[0]) / 100;
          t = rect.top + rect.height * n;
          l = rect.left + rect.width * n;
          r = rect.right - rect.width * n;
          b = rect.bottom - rect.height * n;
        } else {
          let n = parseFloat(vals[0]);
          t = rect.top + n;
          l = rect.left + n;
          r = rect.right - n;
          b = rect.bottom - n;
        }
      }
      break;
    case 2:
      {
        if (vals[0].endsWith("%")) {
          let n = parseFloat(vals[0]) / 100;
          t = rect.top + rect.height * n;
          b = rect.bottom - rect.height * n;
        } else {
          let n = parseFloat(vals[0]);
          t = rect.top + n;
          b = rect.bottom - n;
        }
        if (vals[1].endsWith("%")) {
          let n = parseFloat(vals[1]) / 100;
          l = rect.left + rect.width * n;
          r = rect.right - rect.width * n;
        } else {
          let n = parseFloat(vals[1]);
          l = rect.left + n;
          r = rect.right - n;
        }
      }
      break;
    case 3:
      {
        if (vals[0].endsWith("%"))
          t = rect.top + rect.height * (parseFloat(vals[0]) / 100);
        else
          t = rect.top + parseFloat(vals[0]);
        if (vals[1].endsWith("%")) {
          l = rect.left + rect.width * (parseFloat(vals[1]) / 100);
          r = rect.right - rect.width * (parseFloat(vals[1]) / 100);
        } else {
          l = rect.left + parseFloat(vals[1]);
          r = rect.right - parseFloat(vals[1]);
        }
        if (vals[2].endsWith("%"))
          b = rect.bottom - rect.height * (parseFloat(vals[2]) / 100);
        else
          b = rect.bottom + parseFloat(vals[2]);
      }
      break;
    case 4:
      {
        if (vals[0].endsWith("%"))
          t = rect.top + rect.height * (parseFloat(vals[0]) / 100);
        else
          t = rect.top + parseFloat(vals[0]);
        if (vals[1].endsWith("%"))
          r = rect.right - rect.width * (parseFloat(vals[1]) / 100);
        else
          r = rect.right - parseFloat(vals[1]);
        if (vals[2].endsWith("%"))
          b = rect.bottom - rect.height * (parseFloat(vals[2]) / 100);
        else
          b = rect.bottom - parseFloat(vals[2]);
        if (vals[3].endsWith("%"))
          l = rect.left + rect.width * (parseFloat(vals[3]) / 100);
        else
          l = rect.left + parseFloat(vals[3]);
      }
      break;
    default:
      {
        t = rect.top;
        r = rect.right;
        b = rect.bottom;
        l = rect.left;
      }
      break;
  }
  let newPts = new Rect2(l, t, r - l, b - t).getCorners();
  return newPts;
}
__name(getPointsInset, "getPointsInset");
function isPointInsidePolygon(polygon, vec) {
  let arr = polygon.map((pt) => new Vector2(pt));
  let len = arr.length;
  let v = new Vector2(vec);
  let rect = Rect2.from(arr);
  if (!rect.containsPoint(v)) {
    return false;
  }
  let castLine = new Vector2Line(
    new Vector2(v),
    new Vector2(v.x + 1, v.y)
  );
  let intersects = [];
  for (let i = 0; i < len; i++) {
    let a = new Vector2(arr[i]);
    let b = new Vector2(arr[i + 1]);
    let line = new Vector2Line(a, b);
    if (line.hasPoint(v))
      return true;
    let intersect = line.intersect(castLine);
    if (intersect && intersect.x > v.x) {
      let rectAB = Rect2.from([a, b]);
      if (rectAB.containsPoint(intersect)) {
        intersects.push(intersect);
      }
    }
  }
  return intersects.length % 2 != 0;
}
__name(isPointInsidePolygon, "isPointInsidePolygon");
function getPolygonIntersect(pA, pB, precision = Number.EPSILON) {
  if (pA.every((v) => v instanceof Array)) {
    let rects = [];
    for (let _pA of pA) {
      let _rect = getPolygonIntersect(_pA, pB);
      if (_rect) {
        if (_rect instanceof Array)
          rects = rects.concat(_rect);
      }
    }
    return rects;
  } else if (pB.every((v) => v instanceof Array)) {
    let rects = [];
    for (let _pB of pB) {
      let _rect = getPolygonIntersect(pA, _pB);
      if (_rect) {
        if (_rect instanceof Array)
          rects = rects.concat(_rect);
      }
    }
    return rects;
  } else {
    let rectA = Rect2.from(pA);
    let rectB = Rect2.from(pB);
    let intersectRect = rectA.getIntersectWith(rectB, precision);
    if (!intersectRect)
      return null;
    let intersects = [];
    for (let i = 0; i < pA.length; i++) {
      let aa = new Vector2(pA[i]);
      let ab = new Vector2(pA[(i + 1) % pA.length]);
      let lineA = new Vector2Line(aa, ab);
      let lineARect = Rect2.from([aa, ab]);
      for (let j = 0; j < pB.length; j++) {
        let ba = new Vector2(pB[j]);
        let bb = new Vector2(pB[(j + 1) % pB.length]);
        let lineB = new Vector2Line(ba, bb);
        let lineBRect = Rect2.from([ba, bb]);
        let v = lineB.intersect(lineA);
        if (!v)
          continue;
        if (lineBRect.containsPoint(v) && lineARect.containsPoint(v)) {
          intersects.push(v);
        }
        if (intersectRect.containsPoint(ba)) {
          if (isPointInsidePolygon(pA, ba)) {
            intersects.push(ba);
          }
        }
      }
      if (intersectRect.containsPoint(ab)) {
        if (isPointInsidePolygon(pB, ab)) {
          intersects.push(ab);
        }
      }
    }
    if (!intersects.length)
      return null;
    let resPolygon = intersects;
    return resPolygon;
  }
}
__name(getPolygonIntersect, "getPolygonIntersect");
function fixPolygonPointsOrder(polygon, precision = Number.EPSILON) {
  let arr = polygon.map((pt) => new Vector2(pt)).slice();
  let len = arr.length;
  let rect = Rect2.from(arr);
  let swaps = [];
  mainLoop:
    for (let p = 0; p < len + 1; p++) {
      swaps = [];
      loopA:
        for (let i = 0; i < len; i++) {
          let nextI = (i + 1) % len;
          let aa = arr[i];
          let ab = arr[nextI];
          let lineA = new Vector2Line(aa, ab);
          let lineARect = Rect2.from([aa, ab]);
          console.log(`lineA ${aa} -- ${ab}`);
          loopB:
            for (let j = 0; j < len; j++) {
              if (j == i)
                continue;
              let nextJ = (j + 1) % len;
              let ba = arr[j];
              let bb = arr[(j + 1) % len];
              let lineB = new Vector2Line(ba, bb);
              let lineBRect = Rect2.from([ba, bb]);
              console.log(`lineB ${ba} -- ${bb}`);
              let intersectAB = lineA.intersect(lineB);
              console.log(`intersectAB ${intersectAB}`);
              if (!intersectAB)
                continue;
              for (let pt of arr) {
                if (Vector2.EQUALS(pt, intersectAB, precision)) {
                  console.log(`intersect ${intersectAB} is a polygon point`);
                  continue loopB;
                }
              }
              let rectIntersect = lineARect.getIntersectWith(lineBRect);
              if (rectIntersect && rectIntersect.containsPoint(intersectAB)) {
                swaps.push([i, nextJ]);
                let temp = arr[i];
                arr[i] = arr[nextJ];
                arr[nextJ] = temp;
                console.log(`swapped ${arr[i]} and ${arr[nextJ]}`);
              }
            }
        }
      if (!swaps.length) {
        break mainLoop;
      }
    }
  if (swaps.length) {
    console.log("I give up, just use convex hull");
    arr = sortPoints(arr);
  }
  return arr.slice();
}
__name(fixPolygonPointsOrder, "fixPolygonPointsOrder");
function convexHullSort(polygon) {
  return sortPoints(polygon);
}
__name(convexHullSort, "convexHullSort");
function sortPoints(points) {
  points = points.slice();
  let p0 = new Vector2();
  p0.y = Math.min.apply(null, points.map((p) => p.y));
  p0.x = Math.max.apply(null, points.filter((p) => p.y == p0.y).map((p) => p.x));
  points.sort((a, b) => angleCompare(p0, a, b));
  return points;
}
__name(sortPoints, "sortPoints");
;
function angleCompare(p0, a, b) {
  var left = isLeft(p0, a, b);
  if (left == 0)
    return distCompare(p0, a, b);
  return left;
}
__name(angleCompare, "angleCompare");
function isLeft(p0, a, b) {
  return (a.x - p0.x) * (b.y - p0.y) - (b.x - p0.x) * (a.y - p0.y);
}
__name(isLeft, "isLeft");
function distCompare(p0, a, b) {
  var distA = (p0.x - a.x) * (p0.x - a.x) + (p0.y - a.y) * (p0.y - a.y);
  var distB = (p0.x - b.x) * (p0.x - b.x) + (p0.y - b.y) * (p0.y - b.y);
  return distA - distB;
}
__name(distCompare, "distCompare");
export {
  compareJSON,
  convexHullSort,
  decomposeMatrix,
  deltaTransformPoint,
  fixPolygonPointsOrder,
  getAnchor,
  getBasicShapeProps,
  getElemExpandedTransformFromCSSStyle,
  getElemExpandedTransformFromMatrix,
  getElemPointsBasedOnBasicShape,
  getElemTransformFromCSSStyle,
  getElemTransformFromMatrix,
  getGlobalBoundingRect,
  getGlobalOffsetRect,
  getLocalBoundingRect,
  getLocalOffsetRect,
  getPointsEllipse,
  getPointsInset,
  getPointsPath,
  getPointsPolygon,
  getPolygonIntersect,
  isPointInsidePolygon,
  parseCSSTransform,
  roundTo,
  transformCSSCoord
};
