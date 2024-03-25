"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginId = exports.isProtectedEntity = exports.getService = void 0;
const get_service_1 = __importDefault(require("./get-service"));
exports.getService = get_service_1.default;
const is_protected_entity_1 = __importDefault(require("./is-protected-entity"));
exports.isProtectedEntity = is_protected_entity_1.default;
const plugin_id_1 = __importDefault(require("./plugin-id"));
exports.pluginId = plugin_id_1.default;
