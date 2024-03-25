"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lifecycles_1 = require("./lifecycles");
exports.default = async (params) => {
    // Lifecycles.
    await (0, lifecycles_1.beforeDelete)(params);
};
