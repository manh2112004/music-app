"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const dashboard = (req, res) => {
    res.render("admin/pages/dashboard.pug", {
        pageTitle: "Trang tổng quan",
    });
};
exports.dashboard = dashboard;
