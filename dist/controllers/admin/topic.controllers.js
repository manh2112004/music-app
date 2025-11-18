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
exports.editPatch = exports.edit = exports.detail = exports.deleteTopic = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/topics/index.pug", {
        pageTitle: "Trang quản lý chủ đề",
        topics: topics,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topics/create.pug", {
        pageTitle: "Trang tạo chủ đề ",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const topic = yield topic_model_1.default.create(body);
    topic.save();
    res.redirect("/admin/topics");
});
exports.createPost = createPost;
const deleteTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield topic_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200,
            message: "Xoá thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xoá thất bại",
        });
    }
});
exports.deleteTopic = deleteTopic;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({ _id: id });
    res.render("admin/pages/topics/detail.pug", {
        pageTitle: "Trang chi tiết Topic",
        topic: topic,
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({ _id: id });
    res.render("admin/pages/topics/edit.pug", {
        pageTitle: "Trang chỉnh sửa chủ đề",
        topic: topic,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dataTopic = {
            title: req.body.title,
            avatar: req.body.avatar,
            description: req.body.description,
            status: req.body.status,
        };
        if (req.params.avatar) {
            dataTopic["avatar"] = req.body.avatar;
        }
        yield topic_model_1.default.updateOne({ _id: id }, dataTopic);
        res.redirect(`${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        alert("cập nhật không thành công");
        res.redirect(req.get("referer"));
    }
});
exports.editPatch = editPatch;
