import { ProcessingTarget } from './ProcessingTarget';
export declare class PropertyObserver extends ProcessingTarget {
    targetName: string;
    _precision: number;
    _observedElements: Object;
    _proxies: Map<any, any>;
    _entriesQueue: any[];
    _callback: (entries: any, obs: any) => void;
    constructor(callback: (entries: IObject[], obs: PropertyObserver) => void, opts?: {
        FPS?: number;
        frameTolerance?: number;
        active?: boolean;
        precision?: number;
    });
    onPhysicsProcess(delta: any): void;
    checkUpdates(elements: Object[]): Promise<void>;
    checkUpdate(elem: Object): Promise<{
        id: any;
        target: Object;
        changes: {};
    }>;
    handleEntries(ents: any): void;
    processEntry(elem: any, entry: any, process: any): void;
    observe(elem: Object | Object[], opts: Object | any[]): any[];
    disconnect(elem: Object): void;
}
