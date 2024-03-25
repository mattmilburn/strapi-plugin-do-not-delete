"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = __importDefault(require("./bootstrap"));
const config_1 = __importDefault(require("./config"));
const services_1 = __importDefault(require("./services"));
exports.default = {
    bootstrap: bootstrap_1.default,
    config: config_1.default,
    // contentTypes,
    // controllers,
    // destroy,
    // middlewares,
    // policies,
    // register,
    // routes,
    services: services_1.default,
};
