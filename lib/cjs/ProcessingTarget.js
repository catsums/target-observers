var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ProcessingTarget_exports = {};
__export(ProcessingTarget_exports, {
  ProcessingTarget: () => ProcessingTarget,
  ProcessingTargetEvent: () => ProcessingTargetEvent
});
module.exports = __toCommonJS(ProcessingTarget_exports);
var import_my = require("@catsums/my");
class ProcessingTargetEvent extends CustomEvent {
  static {
    __name(this, "ProcessingTargetEvent");
  }
  data;
  constructor(a, b) {
    super(a, b);
    this.data = b?.detail || {};
  }
}
class ProcessingTarget extends EventTarget {
  static {
    __name(this, "ProcessingTarget");
  }
  FPS = 12;
  targetName = (0, import_my.randomID)("[ProcessingTarget:", "]");
  connectId = (0, import_my.randomID)("ConnectID:");
  // onProcessTimer; onPhysicsProcessTimer;
  _connectedObjects = {};
  _signals = {};
  _startSysTime = 0;
  _lastSysTime = 0;
  _currSysTime = 0;
  _deltaSysTime = 0;
  _fixedDeltaSysTime = 0;
  _initDeltaSysTime = 0;
  _elapsedDeltaTime = 0;
  _elapsedFixedDeltaTime = 0;
  _frameTolerance = Math.sqrt(Math.E) / 1e3;
  _logs = false;
  _active = false;
  _isReady = false;
  _animFrame;
  get deltaTime() {
    return this._deltaSysTime;
  }
  get fixedDeltaTime() {
    return this._fixedDeltaSysTime;
  }
  get frameTime() {
    return (0, import_my.safeDivide)(1, this.FPS);
  }
  get elapsedTime() {
    return this._elapsedDeltaTime;
  }
  get elapsedFixedTime() {
    return this._elapsedFixedDeltaTime;
  }
  constructor({ FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false }) {
    super();
    this.FPS = FPS;
    this._frameTolerance = frameTolerance;
    if (active) {
      this.activate();
    }
  }
  onPreProcess(timestamp) {
    try {
      this._animFrame = requestAnimationFrame(this.onPreProcess.bind(this));
      if (!this._isReady) {
        this._isReady = true;
        this.onReady();
      }
      this._currSysTime = window.performance.now();
      let fixedDelta = (0, import_my.safeDivide)(1, this.FPS);
      this._deltaSysTime = (this._currSysTime - this._lastSysTime) / 1e3;
      this._initDeltaSysTime += this._deltaSysTime;
      this.onProcess(this.deltaTime);
      this._elapsedDeltaTime += this.deltaTime;
      if (this._initDeltaSysTime >= this.frameTime) {
        this._fixedDeltaSysTime = this._initDeltaSysTime;
        this.onPhysicsProcess(this.fixedDeltaTime);
        this._elapsedFixedDeltaTime += this.fixedDeltaTime;
        this._initDeltaSysTime = 0;
      }
      this._lastSysTime = this._currSysTime;
    } catch (err) {
      console.log(err);
    }
  }
  onReady() {
  }
  onProcess(delta) {
  }
  onPhysicsProcess(delta) {
  }
  createSignal(name, ...vars) {
    let varsObj = {};
    for (let vvar of vars)
      varsObj[vvar] = null;
    let event = new ProcessingTargetEvent(name, {
      detail: varsObj
    });
    event.data = varsObj;
    this._signals[name] = event;
    if (this._logs)
      console.log("Signal " + name + " in " + this.targetName + " created");
  }
  removeSignal(name) {
    if (this._signals.hasOwnProperty(name)) {
      this._signals[name] = null;
      if (this._logs)
        console.log("Signal " + name + " in " + this.targetName + " removed");
    }
  }
  emitSignal(name, vars = {}, elems = Object.values(this._connectedObjects)) {
    let event = null;
    if (!this._signals.hasOwnProperty(name)) {
      let varKeys = Object.keys(vars);
      this.createSignal(name, ...varKeys);
    }
    event = this._signals[name];
    for (let kkey of Object.keys(vars))
      event.data[kkey] = vars[kkey];
    for (let elem of elems) {
      if (elem instanceof EventTarget)
        elem.dispatchEvent(event);
    }
  }
  connectElement(element) {
    let connectId = (0, import_my.randomID)("ConnectID:");
    if (element && element instanceof EventTarget) {
      let identifier = "";
      if (!("connectId" in element)) {
        if (element instanceof HTMLElement) {
          element.dataset.connectId = connectId;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id(" + element.id + ")";
        }
        if (String(element.className)) {
          identifier += " class(" + element.className + ")";
        }
        if (String(element.localName)) {
          identifier += " tag(" + element.localName + ")";
        } else {
          identifier += " tagName(" + element.tagName + ")";
        }
      }
      identifier += " (" + connectId + ")";
      if (this._connectedObjects.hasOwnProperty(connectId)) {
        if (this._logs)
          console.log("Element " + identifier + " is already connected");
        return connectId;
      } else {
        this._connectedObjects[connectId] = element;
        if (this._logs)
          console.log("Element " + identifier + " connected!");
        return connectId;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return null;
  }
  disconnectElement(element) {
    if (element && element instanceof EventTarget) {
      let identifier = "";
      let isDisconnected = false;
      let connectedIds = Object.keys(this._connectedObjects);
      for (let i = 0; i < connectedIds.length; i++) {
        let elem = this._connectedObjects[connectedIds[i]];
        if (elem === element) {
          delete this._connectedObjects[connectedIds[i]];
          isDisconnected = true;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id: " + element.id;
        }
        if (String(element.className)) {
          identifier += " class: " + element.className;
        }
        if (String(element.localName)) {
          identifier += " tag: " + element.localName;
        } else {
          identifier += " tagName:" + element.tagName;
        }
      }
      if (!isDisconnected) {
        if (this._logs)
          console.log("Element " + element + " was not connected/already disconnected");
        return false;
      } else {
        if (this._logs)
          console.log("Element " + element + " successfully disconnected!");
        return true;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return false;
  }
  disconnectAllElements() {
    for (let el of Object.values(this._connectedObjects)) {
      this.disconnectElement(el);
    }
  }
  connectElements(elementArr) {
    if (elementArr && elementArr instanceof Array) {
      for (let el of elementArr) {
        this.connectElement(el);
      }
    }
  }
  isConnectedToElement(element) {
    return (0, import_my.findItem)(Object.values(this._connectedObjects), element);
  }
  logsOn() {
    this._logs = true;
  }
  logsOff() {
    this._logs = false;
  }
  isActive() {
    return this._active;
  }
  activate() {
    if (this.isActive())
      return;
    this._active = true;
    this._lastSysTime = window.performance.now();
    this._startSysTime = this._lastSysTime;
    this._elapsedDeltaTime = 0;
    this._elapsedFixedDeltaTime = 0;
    this.onPreProcess(this._lastSysTime);
  }
  deactivate() {
    if (!this.isActive())
      return;
    this._active = false;
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }
}
