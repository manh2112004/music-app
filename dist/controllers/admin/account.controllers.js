"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.create = exports.index = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.find({ deleted: false, status: "active" });
    res.render("admin/pages/account/index.pug", {
        pageTitle: "Quản lý tài khoản Admin",
        accounts: accounts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/account/create.pug", {
        pageTitle: "Thêm tài khoản Admin",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataAccount = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        avatar: req.body.avatar,
        status: req.body.status,
    };
    if (req.body.avatar) {
        dataAccount.avatar = req.body.avatar;
    }
    if (req.body.password) {
        const saltRounds = 10;
        const passwordHas = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(passwordHas, saltRounds);
        dataAccount.password = hashedPassword;
    }
    const newAccount = new account_model_1.default(dataAccount);
    yield newAccount.save();
    res.redirect("http://localhost:3000/admin/accounts");
});
exports.createPost = createPost;
