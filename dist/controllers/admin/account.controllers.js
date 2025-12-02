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
exports.editPost = exports.edit = exports.deleteAccount = exports.profile = exports.createPost = exports.create = exports.index = void 0;
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
    else {
        dataAccount.avatar =
            "https://th.bing.com/th/id/OIP.DX4W2nTD1ritISen1crI2gHaHa?w=120&h=108&c=7&bgcl=3d0c7a&r=0&o=6&dpr=1.3&pid=13.1";
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
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const account = yield account_model_1.default.findOne({ token: token });
    res.render("admin/pages/account/profile.pug", {
        pageTitle: "Thông tin cá nhân",
        account: account,
    });
});
exports.profile = profile;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.id;
    yield account_model_1.default.findOne({ _id: accountId }).updateOne({ deleted: true });
    res.json({ success: true, message: "Xóa tài khoản thành công" });
});
exports.deleteAccount = deleteAccount;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const account = yield account_model_1.default.findById(id);
    res.render("admin/pages/account/edit.pug", {
        pageTitle: "Chỉnh sửa tài khoản Admin",
        account: account,
    });
});
exports.edit = edit;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.id;
    const account = yield account_model_1.default.findById(accountId).select("password");
    const dataAccount = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
        status: req.body.status,
        password: req.body.password,
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
    else {
        dataAccount.password = account === null || account === void 0 ? void 0 : account.password;
    }
    yield account_model_1.default.findOne({ _id: accountId }).updateOne(dataAccount);
    res.redirect("http://localhost:3000/admin/accounts");
});
exports.editPost = editPost;
