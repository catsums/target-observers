import { Vector2, Rect2, Transform2 } from '@catsums/vector2';
export declare function compareJSON(a: any, b: any): boolean;
export declare function getAnchor(elem: Element, opts?: {
    global: boolean;
}): Vector2;
export declare function getGlobalOffsetRect(elem: Element): Rect2;
export declare function getLocalOffsetRect(elem: Element): Rect2;
export declare function getGlobalBoundingRect(elem: Element): Rect2;
export declare function getLocalBoundingRect(elem: Element): Rect2;
export declare function roundTo(num: number, step: number): number;
export declare function deltaTransformPoint(matrix: number[], point: IVector2): {
    x: number;
    y: number;
};
export declare function decomposeMatrix(matrix: number[], _t?: number): {
    translate: Vector2;
    scale: Vector2;
    skew: Vector2;
    rotation: number;
};
export declare function parseCSSTransform(transform: string): number[];
export declare function transformCSSCoord(transformArr: number[], v: IVector2): Vector2;
export declare function getElemExpandedTransformFromMatrix(elem: Element, _t?: number): Transform2;
export declare function getElemExpandedTransformFromCSSStyle(elem: Element, _t?: number): Transform2;
export declare function getElemTransformFromCSSStyle(elem: Element, _t?: number): Transform2;
export declare function getElemTransformFromMatrix(elem: Element, precision?: number): Transform2;
declare global {
    type CSSShapeType = 'inset' | 'circle' | 'ellipse' | 'path' | 'rectangle' | 'polygon' | 'none';
}
export declare function getBasicShapeProps(cssValueString: string): (string | string[])[];
export declare function getElemPointsBasedOnBasicShape(elem: Element, shape: CSSShapeType, props: any[], { transform, global, opts }: {
    transform?: boolean;
    global?: boolean;
    opts?: {};
}): Vector2[];
export declare function getPointsPath(r: IRect, props: any[], { increment, vertices }: {
    increment?: number;
    vertices?: number;
}): Vector2[];
export declare function getPointsPolygon(r: IRect, props: any[], opts: Object): Vector2[];
export declare function getPointsEllipse(r: IRect, props: any[], { vertices }: {
    vertices?: number;
}): Vector2[];
export declare function getPointsInset(_rect: IRect, props: any[], opts: any): Vector2[];
export declare function isPointInsidePolygon(polygon: IVector2[], vec: IVector2): boolean;
export declare function getPolygonIntersect(pA: IVector2[] | IVector2[][], pB: IVector2[] | IVector2[][], precision?: number): IVector2[];
export declare function fixPolygonPointsOrder(polygon: IVector2[], precision?: number): IVector2[];
export declare function convexHullSort(polygon: IVector2[]): IVector2[];
