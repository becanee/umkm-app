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
exports.updateService = exports.addService = exports.getServiceByID = exports.getServiceByMerchant = exports.getServiceByCategory = exports.getAllService = void 0;
const supabase_1 = require("../../config/supabase");
const helper_1 = require("../../utils/helper");
const base64_arraybuffer_1 = require("base64-arraybuffer");
const getAllService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield supabase_1.supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at, users (id, username, role, description, address, phone_number, profile_pict)').order('id', { ascending: true });
        (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data }), response.status);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getAllService = getAllService;
const getServiceByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.category) {
            const response = yield supabase_1.supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at').eq('category', req.params.category).order('id', { ascending: true });
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
exports.getServiceByCategory = getServiceByCategory;
const getServiceByMerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.merchant) {
            const user = yield supabase_1.supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('username', req.params.merchant).order('id', { ascending: true });
            const response = yield supabase_1.supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at').eq('user_id', user.data[0].id).order('id', { ascending: true });
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
exports.getServiceByMerchant = getServiceByMerchant;
const getServiceByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at, users (id, username, role, description, address, phone_number, profile_pict)').order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, { data: response.data.filter((e) => e.id === +req.params.id)[0] }, response.status);
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
exports.getServiceByID = getServiceByID;
const addService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const response = yield supabase_1.supabase.from('services').insert([{
                    user_id: req.body.user_id,
                    name: req.body.name,
                    price_start: req.body.price_start,
                    desc: req.body.desc,
                    category: req.body.category,
                    picture: image.publicUrl,
                }]).select('id, user_id, name, price_start, desc, category, picture, created_at');
            (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
        }
        else {
            res.status(500).send({
                message: "Upload Picture Failed"
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.addService = addService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('services').update({ name: req.body.name, category: req.body.category, price_start: parseInt(req.body.price_start), desc: req.body.desc }).eq('id', req.params.id).select('id, user_id, name, price_start, desc, category, picture, created_at');
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
exports.updateService = updateService;
