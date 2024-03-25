"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const utils_1 = require("../utils");
exports.default = ({ strapi }) => ({
    async get() {
        const config = await strapi.config.get(`plugin.${utils_1.pluginId}`, config_1.default);
        return config;
    },
});
