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
exports.uploadService = exports.uploadAvatar = void 0;
const supabase_1 = require("../../config/supabase");
const helper_1 = require("../../utils/helper");
const base64_arraybuffer_1 = require("base64-arraybuffer");
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileBase64 = (0, base64_arraybuffer_1.decode)(req.file.buffer.toString("base64"));
        const { data, error } = yield supabase_1.supabase.storage.from("users")
            .upload(`avatar-${Date.now()}`, fileBase64, {
            contentType: req.file.mimetype
        });
        const { data: image } = supabase_1.supabase.storage
            .from("users")
            .getPublicUrl(data.path);
        if (image.publicUrl) {
            const response = yield supabase_1.supabase.from('users').update({ username: req.body.username, description: req.body.description, address: req.body.address, phone_number: req.body.phone_number, profile_pict: image.publicUrl }).eq('id', req.params.id).select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at');
            (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.uploadAvatar = uploadAvatar;
const uploadService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileBase64 = (0, base64_arraybuffer_1.decode)(req.file.buffer.toString("base64"));
        const { data, error } = yield supabase_1.supabase.storage.from("services")
            .upload(`service-${Date.now()}`, fileBase64, {
            contentType: req.file.mimetype
        });
        const { data: image } = supabase_1.supabase.storage
            .from("services")
            .getPublicUrl(data.path);
        if (image.publicUrl) {
            const response = yield supabase_1.supabase.from('services').update({ name: req.body.name, category: req.body.category, price_start: parseInt(req.body.price_start), desc: req.body.desc, picture: image.publicUrl }).eq('id', req.params.id).select('id, user_id, name, price_start, desc, category, picture, created_at').order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.uploadService = uploadService;
