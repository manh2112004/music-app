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
exports.logout = exports.loginPost = exports.login = exports.createUser = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/users/register.pug", { pageTitle: "Đăng Ký" });
});
exports.register = register;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.render("client/pages/users/register.pug", {
                errorMessage: "Mật khẩu xác nhận không khớp",
            });
        }
        if (req.body.password) {
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }
        yield user_model_1.default.create(req.body);
        res.redirect("http://localhost:3000/users/login");
    }
    catch (error) {
        if (error.code === 11000 && ((_a = error.keyPattern) === null || _a === void 0 ? void 0 : _a.email)) {
            return res.render("client/pages/users/register.pug", {
                errorMessage: "Email này đã được sử dụng!",
            });
        }
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/users/login.pug", { pageTitle: "Đăng Nhập" });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render("client/pages/users/login", {
            errorMessage: "Email và mật khẩu là bắt buộc",
        });
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return res.render("client/pages/users/login", {
            errorMessage: "Email hoặc mật khẩu không đúng",
        });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.render("client/pages/users/login", {
            errorMessage: "Email hoặc mật khẩu không đúng",
        });
    }
    res.cookie("tokenUser", user.token, { httpOnly: true });
    res.redirect("/");
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenUser");
    res.redirect("/");
});
exports.logout = logout;
