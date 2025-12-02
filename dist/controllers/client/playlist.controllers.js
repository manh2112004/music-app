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
exports.detail = exports.create = exports.index = void 0;
const playlist_model_1 = __importDefault(require("../../models/playlist.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const playlists = yield playlist_model_1.default.find({ user_id: (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a._id });
    res.render("client/pages/playlists/index.pug", {
        pageTitle: "Playlists",
        playlists,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title } = req.body;
    const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a._id;
    yield playlist_model_1.default.create({
        title,
        user_id: userId,
        tracks: [],
    });
    res.json({ success: true });
});
exports.create = create;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const playlist = yield playlist_model_1.default.findOne({ _id: id });
    res.render("client/pages/playlists/detail.pug", {
        pageTitle: "Chi tiết playlist",
        playlist: playlist,
    });
});
exports.detail = detail;
