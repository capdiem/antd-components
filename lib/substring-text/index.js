"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var SubstringText = function (_a) {
    var _b = _a.text, text = _b === void 0 ? "" : _b, width = _a.width, _c = _a.row, row = _c === void 0 ? 1 : _c, separator = _a.separator;
    if (!width) {
        return react_1.default.createElement("span", null, text);
    }
    var limit = Number((Number(width) / 17).toFixed()) * row;
    if (separator && text.includes(separator)) {
        var arr = text.split(separator);
        text = arr.join("\n");
        if (arr.length <= 5) {
            return arr.some(function (u) { return u.length > limit; }) ? (react_1.default.createElement(antd_1.Tooltip, { title: text }, arr
                .map(function (item) {
                return item.length > limit ? item.substring(0, limit - 1) + "..." : item;
            })
                .join("\n"))) : (react_1.default.createElement("span", null, arr.join("\n")));
        }
        return (react_1.default.createElement(antd_1.Tooltip, { title: text },
            react_1.default.createElement("a", null,
                arr
                    .filter(function (_, i) { return i < 5; })
                    .map(function (item) {
                    return item.length > limit ? item.substring(0, limit - 1) + "..." : item;
                })
                    .join("\n"),
                react_1.default.createElement("br", null),
                ". . .")));
    }
    else if ((text && text.length) > limit) {
        return (react_1.default.createElement(antd_1.Tooltip, { title: text },
            react_1.default.createElement("a", null, text.substring(0, limit - 1) + "...")));
    }
    else {
        return react_1.default.createElement("span", null, text);
    }
};
exports.default = SubstringText;
