import { ProcessingTarget } from './ProcessingTarget';
declare global {
    interface ITransformObserverRectOpts {
        globalposition?: boolean;
        gp?: boolean;
        localposition?: boolean;
        lp?: boolean;
        size?: boolean;
        s?: boolean;
    }
    interface ITransformObserverTransformOpts {
        translation?: boolean;
        position?: boolean;
        translate?: boolean;
        p?: boolean;
        t?: boolean;
        rotation?: boolean;
        rotate?: boolean;
        r?: boolean;
        scale?: boolean;
        size?: boolean;
        s?: boolean;
        anchor?: boolean;
        origin?: boolean;
        a?: boolean;
    }
    interface ITransformObserverOpts {
        boundingrect?: ITransformObserverRectOpts;
        offsetrect?: ITransformObserverRectOpts;
        transform?: ITransformObserverTransformOpts;
        localtransform?: ITransformObserverTransformOpts;
        globaltransform?: ITransformObserverTransformOpts;
        matrixtransform?: ITransformObserverTransformOpts;
        localmatrixtransform?: ITransformObserverTransformOpts;
        globalmatrixtransform?: ITransformObserverTransformOpts;
    }
    interface ITransformObserverObserveOpts extends ITransformObserverOpts {
        precision?: number;
    }
    interface ITransformProxyData {
        translation?: IVector2;
        rotation?: number;
        scale?: IVector2;
        anchor?: IVector2;
    }
    interface IRectProxyData {
        globalposition?: IVector2;
        localposition?: IVector2;
        size?: IVector2;
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
    interface ITransformObserverProxy extends IObserverProxy, ITransformObserverData {
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
        changes: {
            [key: string]: ITransformObserverChange;
        };
        process?: IProxyProcess;
    }
}
export declare class TransformObserver extends ProcessingTarget {
    targetName: string;
    _precision: number;
    _observedElements: {
        [key: string]: Element;
    };
    _proxies: Map<Element, ITransformObserverProxy>;
    _entriesQueue: any[];
    _callback: (entries: ITransformObserverEntry[], obs?: TransformObserver) => void;
    constructor(callback?: (entries: ITransformObserverEntry[], obs: TransformObserver) => void, opts?: {
        FPS?: number;
        frameTolerance?: number;
        active?: boolean;
        precision?: number;
    });
    onPhysicsProcess(delta: number): void;
    checkUpdates(elements?: Element[]): any;
    checkUpdate(elem: Element): Promise<ITransformObserverEntry>;
    handleEntries(ents: ITransformObserverEntry[]): void;
    processEntry(elem: Element, entry: ITransformObserverEntry, process: IProxyProcess): void;
    observe(elem: Element, opts: ITransformObserverObserveOpts): any;
    observe(elems: Element[], opts: ITransformObserverObserveOpts): any;
    observe(elem: Element, opts: string[]): any;
    observe(elems: Element[], opts: string[]): any;
    disconnect(elem: Element): void;
}
