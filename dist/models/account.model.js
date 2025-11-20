"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { generateRandomString } = require("../helpers/generate");
const singerSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generateRandomString(16),
    },
    phone: String,
    avatar: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Account = mongoose_1.default.model("Account", singerSchema, "accounts");
exports.default = Account;
