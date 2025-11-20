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
exports.logout = exports.login = exports.index = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Trang đăng nhập",
    });
});
exports.index = index;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const account = yield account_model_1.default.findOne({ email: email, deleted: false });
    if (!account) {
        return res.render("admin/pages/auth/login.pug", {
            pageTitle: "Trang đăng nhập",
            errorMessage: "Email khoản không tồn tại",
        });
    }
    const isMatch = yield bcrypt_1.default.compare(password, account.password);
    if (!isMatch) {
        return res.render("admin/pages/auth/login.pug", {
            pageTitle: "Trang đăng nhập",
            errorMessage: "Mật khẩu không đúng",
        });
    }
    if (account.status !== "active") {
        return res.render("admin/pages/auth/login.pug", {
            pageTitle: "Trang đăng nhập",
            errorMessage: "Tài khoản không hoạt động",
        });
    }
    res.cookie("token", account.token);
    res.redirect("http://localhost:3000/admin/dashboard");
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.redirect("http://localhost:3000/admin/auth/login");
});
exports.logout = logout;
