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
exports.userLogout = void 0;
const supabase_1 = require("../../config/supabase");
const helper_1 = require("../../utils/helper");
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || !((_b = req.headers) === null || _b === void 0 ? void 0 : _b.user_id)) {
            res.status(200).send({
                status: false,
                httpCode: 200,
                message: "Authorization not found!",
            });
        }
        else {
            const checkUser = yield supabase_1.supabase.from('users').select().eq('id', (_c = req.headers) === null || _c === void 0 ? void 0 : _c.user_id).order('id', { ascending: true });
            if (((_d = checkUser.data) === null || _d === void 0 ? void 0 : _d.length) === 1) {
                const response = yield supabase_1.supabase.from('active_session').delete().eq('user_id', checkUser.data[0].id).select().order('id', { ascending: true });
                (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data }), response.status);
            }
            else {
                res.status(200).send({
                    status: false,
                    httpCode: 200,
                    message: "[2] User not Authenticated!",
                });
            }
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.userLogout = userLogout;
