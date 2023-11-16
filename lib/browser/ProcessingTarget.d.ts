export declare class ProcessingTargetEvent<T> extends CustomEvent<T> {
    data: Object;
    constructor(a: any, b: any);
}
declare global {
    interface IProxyProcess {
        processTime?: number;
        logTime?: Date;
        timeTaken?: number;
    }
    interface IObserverProxy {
        id: string;
        _process: IProxyProcess;
    }
    interface IProxyChange<T> {
        old: T;
        new: T;
    }
}
export declare class ProcessingTarget extends EventTarget {
    FPS: number;
    targetName: string;
    connectId: string;
    _connectedObjects: {
        [key: string]: EventTarget;
    };
    _signals: {};
    _startSysTime: number;
    _lastSysTime: number;
    _currSysTime: number;
    _deltaSysTime: number;
    _fixedDeltaSysTime: number;
    _initDeltaSysTime: number;
    _elapsedDeltaTime: number;
    _elapsedFixedDeltaTime: number;
    _frameTolerance: number;
    _logs: boolean;
    _active: boolean;
    _isReady: boolean;
    _animFrame: number;
    get deltaTime(): number;
    get fixedDeltaTime(): number;
    get frameTime(): number;
    get elapsedTime(): number;
    get elapsedFixedTime(): number;
    constructor({ FPS, frameTolerance, active }: {
        FPS?: number;
        frameTolerance?: number;
        active?: boolean;
    });
    onPreProcess(timestamp: number): void;
    onReady(): void;
    onProcess(delta: number): void;
    onPhysicsProcess(delta: number): void;
    createSignal(name: string, ...vars: any[]): void;
    removeSignal(name: string): void;
    emitSignal(name: string, vars?: Object, elems?: EventTarget[]): void;
    connectElement(element: EventTarget): string;
    disconnectElement(element: EventTarget): boolean;
    disconnectAllElements(): void;
    connectElements(elementArr: EventTarget[]): void;
    isConnectedToElement(element: EventTarget): boolean;
    logsOn(): void;
    logsOff(): void;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
}
