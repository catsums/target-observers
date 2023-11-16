import { ProcessingTarget } from './ProcessingTarget';
declare global {
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
        collisionLayers: (string | number)[];
        targetLayers: (string | number)[];
        targets?: Element[];
        tolerance?: number;
    }
    interface ITransformObserverData {
        boundingrect?: IRectProxyData;
        offsetrect?: IRectProxyData;
        transform?: ITransformProxyData;
        localtransform?: ITransformProxyData;
        globaltransform?: ITransformProxyData;
        matrixtransform?: ITransformProxyData;
        localmatrixtransform?: ITransformProxyData;
        globalmatrixtransform?: ITransformProxyData;
    }
    interface ICollisionObserverProxy extends IObserverProxy {
        currentCollisions: ICollisionData[];
        rects: ICollisionObserverRectOpts;
        tolerance?: number;
        collision: {
            layers?: (string | number)[];
            targets?: Element[];
            targetLayers?: (string | number)[];
        };
    }
    interface ICollisionData {
        id?: string;
        targetID?: string;
        target?: Element;
        rect?: string;
        type?: CollisionType;
        layers?: (string | number)[];
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
declare enum CollisionType {
    IN = 1,
    OUT = -1,
    CHANGE = 0
}
export declare class CollisionObserver extends ProcessingTarget {
    targetName: string;
    _precision: number;
    _tolerance: number;
    _observedElements: {
        [key: string]: Element;
    };
    _proxies: Map<Element, ICollisionObserverProxy>;
    _collisionLayers: {
        [key: string | number]: string[];
    };
    _entriesQueue: any[];
    _callback: (entries: ICollisionObserverEntry[], obs: CollisionObserver) => void;
    constructor(callback: (entries: ICollisionObserverEntry[], obs: CollisionObserver) => void, opts?: {
        FPS?: number;
        frameTolerance?: number;
        precision?: number;
        tolerance?: number;
        active?: boolean;
    });
    onPhysicsProcess(delta: number): void;
    checkUpdates(elements: Element[]): Promise<void>;
    checkUpdate(elem: Element): Promise<ICollisionObserverEntry>;
    handleEntries(ents: ICollisionObserverEntry[]): void;
    processEntry(elem: Element, entry: ICollisionObserverEntry, process: IProxyProcess): void;
    observe(elem: Element | Element[], opts?: ICollisionObserverOpts): ICollisionObserverProxy[];
    disconnect(elem: Element): void;
}
export {};
