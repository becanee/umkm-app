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
exports.userRegister = void 0;
const supabase_1 = require("../../config/supabase");
const helper_1 = require("../../utils/helper");
const ts_md5_1 = require("ts-md5");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const checkUsername = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('username', req.body.username).order('id', { ascending: true });
        const checkPhoneNumber = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('phone_number', req.body.phone_number).order('id', { ascending: true });
        if (((_a = checkUsername.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            if (((_b = checkPhoneNumber.data) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                const response = yield supabase_1.supabase.from('users').insert([{
                        role: req.body.role,
                        username: req.body.username,
                        phone_number: req.body.phone_number,
                        password: ts_md5_1.Md5.hashAsciiStr(req.body.password),
                    }]).select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at');
                (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
            }
            else {
                res.status(200).send({
                    status: false,
                    httpCode: 200,
                    message: "Phone Number Already Registered!",
                });
            }
        }
        else {
            res.status(200).send({
                status: false,
                httpCode: 200,
                message: "Username Already Registered!",
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.userRegister = userRegister;
