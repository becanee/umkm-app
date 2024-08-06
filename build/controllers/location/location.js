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
exports.getCity = exports.getState = exports.getProvince = void 0;
const getProvince = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = fetch("https://api.binderbyte.com/wilayah/provinsi?api_key=219fc27777d737478db21aa4121cd9a31564acac720c192c93cd7f70e80f6b1e", {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => { var _a; return (_a = JSON.parse(result)) === null || _a === void 0 ? void 0 : _a.value; })
        .catch(error => console.log('error', error));
    return res;
});
exports.getProvince = getProvince;
const getState = (provinceID) => __awaiter(void 0, void 0, void 0, function* () {
    const res = fetch(`https://api.binderbyte.com/wilayah/kabupaten?api_key=219fc27777d737478db21aa4121cd9a31564acac720c192c93cd7f70e80f6b1e&id_provinsi=${provinceID}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => { var _a; return (_a = JSON.parse(result)) === null || _a === void 0 ? void 0 : _a.value; })
        .catch(error => console.log('error', error));
    return res;
});
exports.getState = getState;
const getCity = (cityID) => __awaiter(void 0, void 0, void 0, function* () {
    const res = fetch(`https://api.binderbyte.com/wilayah/kecamatan?api_key=219fc27777d737478db21aa4121cd9a31564acac720c192c93cd7f70e80f6b1e&id_kabupaten=${cityID}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => { var _a; return (_a = JSON.parse(result)) === null || _a === void 0 ? void 0 : _a.value; })
        .catch(error => console.log('error', error));
    return res;
});
exports.getCity = getCity;
