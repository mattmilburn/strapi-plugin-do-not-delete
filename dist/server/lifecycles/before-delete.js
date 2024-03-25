"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.default = async ({ strapi }) => {
    var _a;
    const configService = (0, utils_1.getService)('config');
    const validateService = (0, utils_1.getService)('validation');
    const { contentTypes } = await configService.get();
    const models = Object.keys(contentTypes);
    // Lifecycle hook to protect certain entries from being deleted.
    const beforeDelete = async (event) => {
        var _a;
        const { model, params } = event;
        const { uid } = model;
        const { where } = params;
        // Ensure the entity exists first.
        const entity = await ((_a = strapi.db) === null || _a === void 0 ? void 0 : _a.query(uid).findOne({ where }));
        if (!entity) {
            return;
        }
        validateService.validateDeleteAction(entity, contentTypes[uid]);
    };
    // Subscribe to lifecycle hook.
    (_a = strapi.db) === null || _a === void 0 ? void 0 : _a.lifecycles.subscribe({
        models,
        beforeDelete,
    });
};
