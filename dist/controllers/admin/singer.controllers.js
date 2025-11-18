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
exports.deleteSinger = exports.editPost = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({ deleted: false });
    res.render("admin/pages/singer/index.pug", {
        pageTitle: "Trang quản lý ca sĩ",
        singers: singers,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singer/create.pug", {
        pageTitle: "Trang tạo mới ca sĩ",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSinger = {
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        status: req.body.status,
    };
    if (req.body.avatar) {
        dataSinger["avatar"] = req.body.avatar;
    }
    const singer = yield singer_model_1.default.create(dataSinger);
    singer.save();
    res.redirect(`/admin/singers`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.id;
    const singer = yield singer_model_1.default.findOne({ _id: singerId, deleted: false });
    res.render("admin/pages/singer/edit.pug", {
        pageTitle: "Trang chỉnh sửa ca sĩ",
        singer: singer,
    });
});
exports.edit = edit;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({ _id: id });
    const dataSinger = {
        fullName: singer.fullName,
        avatar: singer.avatar,
        status: singer.status,
    };
    if (req.body.avatar) {
        dataSinger["avatar"] = req.body.avatar;
    }
    yield singer_model_1.default.updateOne({ _id: id }, dataSinger);
    res.redirect(`/admin/singers`);
});
exports.editPost = editPost;
const deleteSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield singer_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200,
            message: "Xoá sản phẩm thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xoá sản phẩm chưa thành công",
        });
    }
});
exports.deleteSinger = deleteSinger;
