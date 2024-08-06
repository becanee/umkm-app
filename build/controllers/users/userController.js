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
exports.updateUserProfile = exports.getUserByRole = exports.getUserByID = exports.getAllUsers = void 0;
const supabase_1 = require("../../config/supabase");
const location_1 = require("../location/location");
const helper_1 = require("../../utils/helper");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, created_at').order('id', { ascending: true });
        (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data }), response.status);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('id', req.params.id).order('id', { ascending: true });
            const province = yield (0, location_1.getProvince)();
            const state = yield (0, location_1.getState)((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.province);
            const city = yield (0, location_1.getCity)((_b = response.data[0]) === null || _b === void 0 ? void 0 : _b.state);
            (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: Object.assign(Object.assign({}, response.data[0]), { province: province.filter((el) => { var _a; return el.id === ((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.province); })[0].name, state: state.filter((el) => { var _a; return el.id === ((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.state); })[0].name, city: city.filter((el) => { var _a; return el.id === ((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.city); })[0].name }) }), response.status);
        }
        else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getUserByID = getUserByID;
const getUserByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.role) {
            const response = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('role', req.params.role).order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, response, response.status);
        }
        else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getUserByRole = getUserByRole;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('users').update({ username: req.body.username, description: req.body.description, address: req.body.address, phone_number: req.body.phone_number }).eq('id', req.params.id).select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at');
            (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
        }
        else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateUserProfile = updateUserProfile;
