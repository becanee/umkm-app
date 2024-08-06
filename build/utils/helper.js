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
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseLocationBuilder = exports.responseBuilder = void 0;
const location_1 = require("../controllers/location/location");
const responseBuilder = (res, data, httpCode) => {
    if (httpCode === 200 || httpCode === 201) {
        res.status(httpCode).send({
            status: true,
            httpCode: httpCode,
            message: "success",
            data: data.data,
        });
    }
    else {
        res.status(httpCode).send({
            status: false,
            httpCode: httpCode,
            message: data.error,
        });
    }
};
exports.responseBuilder = responseBuilder;
const responseLocationBuilder = (res, data, httpCode) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const province = yield (0, location_1.getProvince)();
    const state = yield (0, location_1.getState)((_a = data.data) === null || _a === void 0 ? void 0 : _a.province);
    const city = yield (0, location_1.getCity)((_b = data.data) === null || _b === void 0 ? void 0 : _b.state);
    if (httpCode === 200 || httpCode === 201) {
        res.status(httpCode).send({
            status: true,
            httpCode: httpCode,
            message: "success",
            data: Object.assign(Object.assign({}, data.data), { province: (_c = province === null || province === void 0 ? void 0 : province.filter((el) => { var _a; return el.id === ((_a = data.data) === null || _a === void 0 ? void 0 : _a.province); })[0]) === null || _c === void 0 ? void 0 : _c.name, state: (_d = state === null || state === void 0 ? void 0 : state.filter((el) => { var _a; return el.id === ((_a = data.data) === null || _a === void 0 ? void 0 : _a.state); })[0]) === null || _d === void 0 ? void 0 : _d.name, city: (_e = city === null || city === void 0 ? void 0 : city.filter((el) => { var _a; return el.id === ((_a = data.data) === null || _a === void 0 ? void 0 : _a.city); })[0]) === null || _e === void 0 ? void 0 : _e.name }),
        });
    }
    else {
        res.status(httpCode).send({
            status: false,
            httpCode: httpCode,
            message: data.error,
        });
    }
});
exports.responseLocationBuilder = responseLocationBuilder;
