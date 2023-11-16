"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionObserver = exports.ElementFunctions = exports.TransformObserver = exports.ProcessingTarget = void 0;
var ProcessingTarget_1 = require("./ProcessingTarget");
Object.defineProperty(exports, "ProcessingTarget", { enumerable: true, get: function () { return ProcessingTarget_1.ProcessingTarget; } });
var TransformObserver_1 = require("./TransformObserver");
Object.defineProperty(exports, "TransformObserver", { enumerable: true, get: function () { return TransformObserver_1.TransformObserver; } });
exports.ElementFunctions = __importStar(require("./ElementFunctions"));
var CollisionObserver_1 = require("./CollisionObserver");
Object.defineProperty(exports, "CollisionObserver", { enumerable: true, get: function () { return CollisionObserver_1.CollisionObserver; } });
const ProcessingTarget_2 = require("./ProcessingTarget");
const TransformObserver_2 = require("./TransformObserver");
const ElementFunctions = __importStar(require("./ElementFunctions"));
const CollisionObserver_2 = require("./CollisionObserver");
exports.default = {
    ProcessingTarget: ProcessingTarget_2.ProcessingTarget,
    TransformObserver: TransformObserver_2.TransformObserver,
    ElementFunctions,
    CollisionObserver: CollisionObserver_2.CollisionObserver
};
