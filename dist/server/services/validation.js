"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { errors } = require('@strapi/utils');
const utils_1 = require("../utils");
exports.default = () => ({
    validateDeleteAction(entity, rules) {
        if (!rules.length) {
            return;
        }
        // Do not delete if this is a protected entry.
        if ((0, utils_1.isProtectedEntity)(entity, rules)) {
            throw new errors.ValidationError('This entry is protected and cannot be deleted.');
        }
    },
});
