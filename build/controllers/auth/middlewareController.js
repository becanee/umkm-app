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
exports.middleware = void 0;
const supabase_1 = require("../../config/supabase");
const helper_1 = require("../../utils/helper");
const ts_md5_1 = require("ts-md5");
const middleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || !((_b = req.headers) === null || _b === void 0 ? void 0 : _b.user_id)) {
            res.status(404).send({
                status: false,
                httpCode: 404,
                message: "Authorization Required!",
            });
        }
        else {
            let token = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization;
            const checkUser = yield supabase_1.supabase.from('users').select().eq('id', (_d = req.headers) === null || _d === void 0 ? void 0 : _d.user_id).order('id', { ascending: true });
            if (((_e = checkUser.data) === null || _e === void 0 ? void 0 : _e.length) === 1) {
                const checkPass = ts_md5_1.Md5.hashAsciiStr(token) === ts_md5_1.Md5.hashAsciiStr(checkUser.data[0].password);
                console.log("CP: ", checkPass);
                if (checkPass) {
                    const response = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('id', checkUser.data[0].id).order('id', { ascending: true });
                    yield (0, helper_1.responseLocationBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
                }
                else {
                    res.status(403).send({
                        status: false,
                        httpCode: 403,
                        message: "[1] User not Authenticated!",
                    });
                }
            }
            else {
                res.status(403).send({
                    status: false,
                    httpCode: 403,
                    message: "[2] User not Authenticated!",
                });
            }
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.middleware = middleware;
