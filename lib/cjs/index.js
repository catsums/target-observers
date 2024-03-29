var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  CollisionObserver: () => import_CollisionObserver.CollisionObserver,
  ElementFunctions: () => ElementFunctions,
  ProcessingTarget: () => import_ProcessingTarget.ProcessingTarget,
  PropertyObserver: () => import_PropertyObserver.PropertyObserver,
  TransformObserver: () => import_TransformObserver.TransformObserver,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_ProcessingTarget = require("./ProcessingTarget");
var import_TransformObserver = require("./TransformObserver");
var ElementFunctions = __toESM(require("./ElementFunctions"));
var import_PropertyObserver = require("./PropertyObserver");
var import_CollisionObserver = require("./CollisionObserver");
var import_ProcessingTarget2 = require("./ProcessingTarget");
var import_TransformObserver2 = require("./TransformObserver");
var ElementFunctions2 = __toESM(require("./ElementFunctions"));
var import_PropertyObserver2 = require("./PropertyObserver");
var import_CollisionObserver2 = require("./CollisionObserver");
var src_default = {
  ProcessingTarget: import_ProcessingTarget2.ProcessingTarget,
  TransformObserver: import_TransformObserver2.TransformObserver,
  ElementFunctions: ElementFunctions2,
  CollisionObserver: import_CollisionObserver2.CollisionObserver,
  PropertyObserver: import_PropertyObserver2.PropertyObserver
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollisionObserver,
  ElementFunctions,
  ProcessingTarget,
  PropertyObserver,
  TransformObserver
});
